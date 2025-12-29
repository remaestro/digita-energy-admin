import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create templates
  const templates = [
    {
      name: 'Full-Stack Web Application',
      slug: 'fullstack-web-app',
      description: 'Complete SaaS starter with React + Express',
      type: 'fullstack',
      icon: '🚀',
      category: 'Web',
      variables: {
        PROJECT_NAME: 'Project name',
        PROJECT_DESCRIPTION: 'Project description',
        DATABASE_URL: 'PostgreSQL connection string',
        SUPABASE_URL: 'Supabase project URL',
        SUPABASE_ANON_KEY: 'Supabase anonymous key',
        JWT_SECRET: 'JWT secret key',
        PORT: 'Server port',
      },
      metadata: {
        dependencies: ['react', 'express', 'prisma', 'supabase'],
        features: ['authentication', 'database', 'api', 'ui'],
      },
    },
    {
      name: 'Landing Page',
      slug: 'landing-page',
      description: 'Marketing site with React + Tailwind',
      type: 'frontend',
      icon: '🎨',
      category: 'Web',
      variables: {
        PROJECT_NAME: 'Project name',
        SITE_URL: 'Website URL',
        SITE_NAME: 'Site name',
        CONTACT_EMAIL: 'Contact email',
      },
      metadata: {
        dependencies: ['react', 'tailwindcss'],
        features: ['seo', 'responsive', 'animations'],
      },
    },
    {
      name: 'Mobile Application',
      slug: 'mobile-app',
      description: 'Cross-platform app with React Native + Expo',
      type: 'mobile',
      icon: '📱',
      category: 'Mobile',
      variables: {
        PROJECT_NAME: 'App name',
        SUPABASE_URL: 'Supabase project URL',
        SUPABASE_ANON_KEY: 'Supabase anonymous key',
      },
      metadata: {
        dependencies: ['react-native', 'expo', 'supabase'],
        features: ['navigation', 'authentication', 'offline-sync'],
      },
    },
    {
      name: 'REST API Service',
      slug: 'api-service',
      description: 'Backend API with Express + Prisma',
      type: 'backend',
      icon: '⚡',
      category: 'Backend',
      variables: {
        PROJECT_NAME: 'API name',
        DATABASE_URL: 'PostgreSQL connection string',
        JWT_SECRET: 'JWT secret key',
        PORT: 'Server port',
      },
      metadata: {
        dependencies: ['express', 'prisma', 'jwt'],
        features: ['authentication', 'swagger', 'validation', 'logging'],
      },
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: template,
      create: template,
    });
    console.log(`✅ Created template: ${template.name}`);
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
