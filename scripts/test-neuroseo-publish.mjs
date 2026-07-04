#!/usr/bin/env node

/**
 * Test script for NeuroSEO webhook integration.
 * 
 * Usage:
 *   NEUROSEO_SIGNING_SECRET=<secret> node scripts/test-neuroseo-publish.mjs [url]
 * 
 * Example:
 *   NEUROSEO_SIGNING_SECRET=my-secret node scripts/test-neuroseo-publish.mjs
 *   NEUROSEO_SIGNING_SECRET=my-secret node scripts/test-neuroseo-publish.mjs http://localhost:3100
 */

import crypto from 'crypto';

const signingSecret = process.env.NEUROSEO_SIGNING_SECRET;
const webhookUrl = process.argv[2] ?? 'http://127.0.0.1:3100/api/neuroseo-webhook';

if (!signingSecret) {
  console.error('Error: NEUROSEO_SIGNING_SECRET environment variable is not set');
  process.exit(1);
}

// Sample NeuroSEO payload (compare type with FAQs)
const payload = {
  title: 'Callbox vs Competitors: Feature Comparison 2024',
  slug: 'callbox-vs-competitors-2024',
  meta_title: 'Callbox vs Other AI Sales Platforms',
  meta_description:
    'Compare Callbox with other AI-powered lead qualification and sales automation platforms. See why leading companies choose Callbox.',
  excerpt:
    'Discover how Callbox stacks up against other solutions in the market and why teams choose us.',
  featured_image: {
    url: '/hero_bg.png',
    alt: 'Feature comparison showing Callbox advantages over competitors',
  },
  tags: ['compare', 'features', '2024'],
  status: 'published',
  content: `# Why Teams Choose Callbox Over Other Platforms

When evaluating AI sales platforms, you should consider several key factors:

## Natural Conversation Quality

Callbox uses proprietary voice AI that sounds genuinely human. Other platforms often sound robotic or scripted, which kills conversion rates.

## Speed Matters

Lead response time directly correlates with conversion. Callbox dials leads within 30 seconds—faster than any competitor.

## Integrated Platform

Instead of juggling separate tools for calling, SMS, email, and routing, Callbox gives you one unified platform.

## Flexible Pricing

Pay only for qualified leads, not fixed monthly fees for unused capacity.

## Dedicated Support

Our success team works with you to optimize your qualification criteria continuously.`,
  faq: [
    {
      question: 'How long does it take to set up Callbox?',
      answer:
        'Most teams are live and handling leads within 24-48 hours of signing up. We provide pre-built integrations with popular CRMs and form platforms.',
    },
    {
      question: 'Can I customize the qualification criteria?',
      answer:
        'Absolutely. You can adjust qualification rules, call scripts, and routing in real-time through the dashboard. No technical knowledge required.',
    },
    {
      question: 'What if I need to pause or cancel my subscription?',
      answer:
        'There are no long-term contracts. Cancel anytime with no penalties. Pay only for the leads you process.',
    },
  ],
  content_format: 'markdown',
};

async function publishPost() {
  // Serialize payload to JSON string
  const bodyString = JSON.stringify(payload);

  // Compute HMAC-SHA256 signature
  const signature = crypto
    .createHmac('sha256', signingSecret)
    .update(bodyString)
    .digest('hex');

  // Log what we're sending
  console.log(`📤 Sending post.publish event to ${webhookUrl}`);
  console.log(`   Payload slug: ${payload.slug}`);
  console.log(`   Tags: ${payload.tags.join(', ')}`);
  console.log(`   Route: ${payload.tags.includes('compare') ? 'compare' : 'blog'}`);
  console.log(`   FAQs: ${payload.faq.length}`);
  console.log('');

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-neuroseo-event': 'post.publish',
        'x-neuroseo-signature': signature,
      },
      body: bodyString,
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ Success (${response.status})`);
      console.log(`   ID: ${data.id}`);
      console.log(`   URL: ${data.url}`);
      console.log('');
      console.log(`📁 Check: content/compare/${payload.slug}.mdx should now exist`);
    } else {
      console.error(`❌ Error (${response.status})`);
      console.error(data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    process.exit(1);
  }
}

publishPost();
