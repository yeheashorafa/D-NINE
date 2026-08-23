import { prisma } from '../src/lib/prisma.js';

async function runSmokeTest() {
  console.log('--- 1. Submitting Contact Form via Backend API ---');
  const payload = {
    fullName: 'Smoke Test User',
    email: 'smoke.test@dnine.agency',
    serviceSlug: 'graphic-design',
    message: 'This is an automated smoke test verification message.',
    locale: 'ar',
    sourcePage: '/ar/contact',
    website: '', // honeypot empty
  };

  const response = await fetch('http://localhost:4000/api/v1/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ar',
      Origin: 'http://localhost:3000',
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json()) as {
    success: boolean;
    code: string;
    message: string;
    data: { submissionId: string };
  };

  console.log('HTTP Status:', response.status);
  console.log('API Response:', JSON.stringify(json, null, 2));

  if (response.status !== 201 || json.code !== 'CONTACT_SUBMITTED') {
    throw new Error('Contact submission failed: ' + JSON.stringify(json));
  }

  const submissionId = json.data.submissionId;
  console.log('\n--- 2. Verifying in Prisma PostgreSQL Database ---');
  console.log('Looking for submission ID:', submissionId);

  const record = await prisma.contactSubmission.findUnique({
    where: { id: submissionId },
  });

  console.log('Found Database Record:', JSON.stringify(record, null, 2));

  if (!record || record.id !== submissionId || record.serviceSlug !== 'graphic-design') {
    throw new Error('Database verification failed for submission: ' + submissionId);
  }

  console.log('\n--- 3. Cleaning up Test Record (Exact ID Only) ---');
  const deleted = await prisma.contactSubmission.delete({
    where: { id: submissionId },
  });
  console.log('Successfully cleaned up smoke test record:', deleted.id);

  const checkDeleted = await prisma.contactSubmission.findUnique({
    where: { id: submissionId },
  });
  console.log('Post-cleanup check (should be null):', checkDeleted);

  console.log('\n>>> SMOKE TEST PASSED SUCCESSFULLY <<<');
  await prisma.$disconnect();
}

runSmokeTest().catch((err) => {
  console.error('Smoke Test Error:', err);
  process.exit(1);
});
