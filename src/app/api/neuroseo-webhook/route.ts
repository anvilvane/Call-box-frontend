import { createHmac, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { mapPayloadToMdx, type NeuroSeoPayload } from '@/lib/neuroseo/mapPayload';
import { routeFor } from '@/lib/neuroseo/routeFor';

const MAX_BODY_SIZE_BYTES = 2 * 1024 * 1024;

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    // Read the raw body first so the HMAC can be verified against the exact bytes received.
    // Using req.json() first would change the payload and break signature validation.
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_SIZE_BYTES) {
      return new Response('request body too large', { status: 413 });
    }

    const signature = req.headers.get('x-neuroseo-signature');
    const event = req.headers.get('x-neuroseo-event');

    if (!signature) {
      return new Response('bad signature', { status: 401 });
    }

    const signingSecret = process.env.NEUROSEO_SIGNING_SECRET;

    if (!signingSecret) {
      console.error('Missing NEUROSEO_SIGNING_SECRET');
      return new Response('internal server error', { status: 500 });
    }

    const expectedSignature = createHmac('sha256', signingSecret)
      .update(rawBody)
      .digest('hex');

    const providedSignatureBuffer = Buffer.from(signature, 'hex');
    const expectedSignatureBuffer = Buffer.from(expectedSignature, 'hex');

    if (
      providedSignatureBuffer.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer)
    ) {
      return new Response('bad signature', { status: 401 });
    }

    if (event === 'ping') {
      return Response.json({ ok: true });
    }

    if (event === 'post.publish') {
      // Parse the payload
      const payload: NeuroSeoPayload = JSON.parse(rawBody);

      // Determine which content folder to use based on tags
      const folder = routeFor(payload.tags);

      // Map the payload to MDX format
      const mdx = mapPayloadToMdx(payload);

      // Write to local disk
      const contentDir = path.join(process.cwd(), 'content', folder);
      const filePath = path.join(contentDir, `${payload.slug}.mdx`);

      // NOTE: writes to local disk for now. Replace with commitToGit() once GitHub API access is available.
      await mkdir(contentDir, { recursive: true });
      await writeFile(filePath, mdx, 'utf-8');

      // Return success response
      const siteUrl = process.env.SITE_PUBLIC_URL ?? 'http://localhost:3100';
      return Response.json({
        id: payload.slug,
        url: `${siteUrl}/${folder}/${payload.slug}`,
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('neuroseo webhook error', error);
    return new Response('internal server error', { status: 500 });
  }
}
