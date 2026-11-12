import { PrismaClient, UserRole, VendorStatus, VerificationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Categories
  const categoriesData = [
    { id: 'cat_photo', slug: 'traditional-photography', nameEn: 'Traditional Photography & Video', nameTe: 'సాంప్రదాయ ఫోటోగ్రఫీ & వీడియోగ్రఫీ', sortOrder: 1 },
    { id: 'cat_decor', slug: 'mandapam-decoration', nameEn: 'Mandapam & Stage Decoration', nameTe: 'మండపం & స్టేజ్ డెకరేషన్', sortOrder: 2 },
    { id: 'cat_music', slug: 'nadaswaram-shehnai', nameEn: 'Nadaswaram & Shehnai', nameTe: 'నాదస్వరం & సన్నాయి మేళం', sortOrder: 3 },
    { id: 'cat_pandits', slug: 'purohithulu-pandits', nameEn: 'Purohithulu & Vaidika Pandits', nameTe: 'పురోహితులు & వైదిక పండితులు', sortOrder: 4 },
    { id: 'cat_cater', slug: 'traditional-catering', nameEn: 'Traditional Catering & Vantavallu', nameTe: 'సాంప్రదాయ వంటలు & క్యాటరింగ్', sortOrder: 5 },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  // 2. Districts & Mandals
  const narayanpet = await prisma.district.upsert({
    where: { id: 'dist_narayanpet' },
    update: { nameEn: 'Narayanpet', nameTe: 'నారాయణపేట' },
    create: { id: 'dist_narayanpet', nameEn: 'Narayanpet', nameTe: 'నారాయణపేట' },
  });

  const mahabubnagar = await prisma.district.upsert({
    where: { id: 'dist_mahabubnagar' },
    update: { nameEn: 'Mahabubnagar', nameTe: 'మహబూబ్‌నగర్' },
    create: { id: 'dist_mahabubnagar', nameEn: 'Mahabubnagar', nameTe: 'మహబూబ్‌నగర్' },
  });

  const makthal = await prisma.mandal.upsert({
    where: { id: 'mandal_makthal' },
    update: { nameEn: 'Makthal', nameTe: 'మఖ్తల్', districtId: narayanpet.id },
    create: { id: 'mandal_makthal', nameEn: 'Makthal', nameTe: 'మఖ్తల్', districtId: narayanpet.id },
  });

  const maganoor = await prisma.village.upsert({
    where: { id: 'vil_maganoor' },
    update: { nameEn: 'Maganoor', nameTe: 'మగనూర్', mandalId: makthal.id },
    create: { id: 'vil_maganoor', nameEn: 'Maganoor', nameTe: 'మగనూర్', mandalId: makthal.id },
  });

  // 3. Admin User
  await prisma.user.upsert({
    where: { phone: '+919999900001' },
    update: { roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    create: {
      phone: '+919999900001',
      email: 'admin@telanganaweddings.com',
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    },
  });

  // 4. Sample Verified Vendor
  const vendorUser = await prisma.user.upsert({
    where: { phone: '+919848011223' },
    update: { roles: [UserRole.VENDOR_OWNER, UserRole.CUSTOMER] },
    create: {
      phone: '+919848011223',
      email: 'venkateshwara@example.com',
      roles: [UserRole.VENDOR_OWNER, UserRole.CUSTOMER],
      customerProfile: {
        create: {
          fullName: 'Ravi Teja',
          preferredLanguage: 'te',
        },
      },
    },
  });

  await prisma.vendorProfile.upsert({
    where: { userId: vendorUser.id },
    update: {
      status: VendorStatus.APPROVED,
      verificationStatus: VerificationStatus.VERIFIED,
    },
    create: {
      userId: vendorUser.id,
      businessName: 'Sri Venkateshwara Digital Studios',
      slug: 'sri-venkateshwara-digital-studios',
      primaryCategoryId: 'cat_photo',
      phone: '+919848011223',
      baseDistrict: 'Narayanpet',
      baseMandal: 'Makthal',
      baseVillageOrTown: 'Town Center',
      startingPricePaise: 2500000, // 25,000 INR
      ratingAverage: 4.9,
      ratingCount: 28,
      status: VendorStatus.APPROVED,
      verificationStatus: VerificationStatus.VERIFIED,
      leadWallet: {
        create: {
          balanceCredits: 10,
        },
      },
    },
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

