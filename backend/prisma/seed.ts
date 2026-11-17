import { PrismaClient, UserRole, VendorStatus, VerificationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Universal Village Life-Cycle Categories & Vendors...');

  // 1. ALL 24 Village Life-Cycle Service Categories
  const categoriesData = [
    {
      id: 'cat_purohit_subha',
      slug: 'subha-karya-purohitulu',
      nameEn: 'Vedic Pandits & Auspicious Priests',
      nameTe: 'శుభకార్యాల పురోహితులు',
      sortOrder: 1,
    },
    {
      id: 'cat_purohit_asubha',
      slug: 'apara-karma-purohitulu',
      nameEn: 'Funeral & Memorial Priests',
      nameTe: 'అపర కర్మ & దినవారాల పురోహితులు',
      sortOrder: 2,
    },
    {
      id: 'cat_tent_house',
      slug: 'tent-house-chairs',
      nameEn: 'Tent House, Shamiana & Chairs',
      nameTe: 'టెంట్ హౌస్, షామియానా & కుర్చీలు',
      sortOrder: 3,
    },
    {
      id: 'cat_pandiri_decor',
      slug: 'mandapam-pandiri-decor',
      nameEn: 'Traditional Pandiri & Floral Stage Decor',
      nameTe: 'పెళ్లి పందిరి & కల్యాణ మండపం డెకరేషన్',
      sortOrder: 4,
    },
    {
      id: 'cat_cater_subha',
      slug: 'traditional-catering-bhojanalu',
      nameEn: 'Feast Cooks & Banana Leaf Catering',
      nameTe: 'వంటవాళ్ళు & బంతి భోజనాలు',
      sortOrder: 5,
    },
    {
      id: 'cat_cater_asubha',
      slug: 'memorial-dinavaralu-cooks',
      nameEn: 'Memorial Feast & Dinavaralu Cooks',
      nameTe: 'దినవారాల వంటవాళ్ళు & పెద్ద కర్మ భోజనాలు',
      sortOrder: 6,
    },
    {
      id: 'cat_photo_video',
      slug: 'village-photo-video-drone',
      nameEn: 'Photography, 4K Video & Drone',
      nameTe: 'ఫొటోలు, 4K వీడియో & డ్రోన్ రికార్డింగ్',
      sortOrder: 7,
    },
    {
      id: 'cat_nadaswaram',
      slug: 'nadaswaram-sannayi-melam',
      nameEn: 'Nadaswaram & Mangala Vadhyam',
      nameTe: 'సన్నాయి మేళం & మంగళ వాయిద్యాలు',
      sortOrder: 8,
    },
    {
      id: 'cat_dappulu_band',
      slug: 'dappulu-brass-band',
      nameEn: 'Traditional Dappulu & Brass Band',
      nameTe: 'డప్పు కళాకారులు & బ్రాస్ బ్యాండ్',
      sortOrder: 9,
    },
    {
      id: 'cat_generator_sound',
      slug: 'generator-mic-sound-system',
      nameEn: 'Generator, PA System & Mic Set',
      nameTe: 'జనరేటర్, మైక్ సెట్ & సౌండ్ సిస్టమ్',
      sortOrder: 10,
    },
    {
      id: 'cat_lighting',
      slug: 'festive-serial-lighting',
      nameEn: 'Festive Serial & Illumination Lighting',
      nameTe: 'పండుగ సీరియల్ లైటింగ్ & డెకరేషన్',
      sortOrder: 11,
    },
    {
      id: 'cat_funeral_services',
      slug: 'funeral-materials-paade',
      nameEn: 'Funeral Last Rites Materials & Bamboo Bier',
      nameTe: 'అంత్యక్రియల సామగ్రి & వెదురు పాడే',
      sortOrder: 12,
    },
    {
      id: 'cat_freezer_hearse',
      slug: 'freezer-box-hearse-van',
      nameEn: 'Dead Body Freezer Box & Hearse Van',
      nameTe: 'వైకుంఠ రథం & ఫ్రీజర్ బాక్స్',
      sortOrder: 13,
    },
    {
      id: 'cat_mehendi_makeup',
      slug: 'bridal-mehendi-saree-draping',
      nameEn: 'Bridal Mehendi, Hairstyle & Saree Draping',
      nameTe: 'మెహందీ & పెళ్లికూతురు అలంకరణ',
      sortOrder: 14,
    },
    {
      id: 'cat_sweets_snacks',
      slug: 'traditional-sweets-pindi-vantalu',
      nameEn: 'Traditional Sweets, Ariselu & Pindi Vantalu',
      nameTe: 'సాంప్రదాయ మిఠాయిలు & పిండివంటలు',
      sortOrder: 15,
    },
    {
      id: 'cat_flowers_garlands',
      slug: 'fresh-flowers-garlands-poolajada',
      nameEn: 'Fresh Flower Garlands & Poola Jada',
      nameTe: 'పూలదండలు, పూలజడ & పూల బుట్టలు',
      sortOrder: 16,
    },
    {
      id: 'cat_transport_vehicles',
      slug: 'event-travel-vehicles-buses',
      nameEn: 'Procession Jeeps, Mini Buses & Travel',
      nameTe: 'ఊరేగింపు వాహనాలు & ప్రయాణ బస్సులు',
      sortOrder: 17,
    },
    {
      id: 'cat_vessels_rent',
      slug: 'cooking-vessels-leaf-plates-rent',
      nameEn: 'Large Cooking Vessels & Leaf Plates Rent',
      nameTe: 'పెద్ద వంట పాత్రలు & విస్తరాకులు అద్దె',
      sortOrder: 18,
    },
    {
      id: 'cat_water_supply',
      slug: 'mineral-water-tanker-supply',
      nameEn: 'Mineral Water Cans & Water Tankers',
      nameTe: 'మినరల్ వాటర్ క్యాన్లు & ట్యాంకర్ సప్లై',
      sortOrder: 19,
    },
    {
      id: 'cat_flex_framing',
      slug: 'flex-banners-photo-framing',
      nameEn: 'Flex Banners & Photo Framing',
      nameTe: 'ఫ్లెక్సీ బ్యానర్లు & ఫొటో ఫ్రేమింగ్',
      sortOrder: 20,
    },
    {
      id: 'cat_tailors_draping',
      slug: 'traditional-pattu-tailoring',
      nameEn: 'Narayanpet Pattu & Function Tailoring',
      nameTe: 'పట్టు వస్త్రాలు & ఫంక్షన్ టైలరింగ్',
      sortOrder: 21,
    },
    {
      id: 'cat_dj_lighting',
      slug: 'mobile-dj-lighting',
      nameEn: 'Mobile DJ & Procession Sound',
      nameTe: 'మొబైల్ డిజే & ఊరేగింపు సౌండ్',
      sortOrder: 22,
    },
    {
      id: 'cat_barbers_traditional',
      slug: 'traditional-tonsure-barbers',
      nameEn: 'Traditional Tonsure (Puttu Vendrukalu) Barbers',
      nameTe: 'సాంప్రదాయ క్షురకులు (పుట్టువెండ్రుకలు)',
      sortOrder: 23,
    },
    {
      id: 'cat_cleaning_labor',
      slug: 'event-helpers-waste-cleanup',
      nameEn: 'Event Helpers & Post-Event Cleaning',
      nameTe: 'ఫంక్షన్ సహాయకులు & క్లీనింగ్ సిబ్బంది',
      sortOrder: 24,
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  // 1b. Life-cycle Subcategories
  const subcategoriesData = [
    // Subha Purohitulu
    { id: 'sub_lagna_muhurtham', categoryId: 'cat_purohit_subha', slug: 'lagna-muhurtham', nameEn: 'Wedding & Muhurtham Vedic Pandit', nameTe: 'పెళ్లి & లగ్న ముహూర్తం' },
    { id: 'sub_gruhapravesam', categoryId: 'cat_purohit_subha', slug: 'gruhapravesam-vratham', nameEn: 'Housewarming & Satyanarayana Vratham', nameTe: 'గృహప్రవేశం & సత్యనారాయణ వ్రతం' },
    { id: 'sub_namakaranam_cradle', categoryId: 'cat_purohit_subha', slug: 'namakaranam-uyyala', nameEn: 'Naming Ceremony & Cradle Puja', nameTe: 'బారసాల & తొట్ల పూజ' },
    // Asubha Purohitulu
    { id: 'sub_dahanam_vidhi', categoryId: 'cat_purohit_asubha', slug: 'antima-samskaram', nameEn: 'Cremation & Funeral Mantras', nameTe: 'అంతిమ సంస్కార మంత్రాలు' },
    { id: 'sub_chinna_dinam', categoryId: 'cat_purohit_asubha', slug: 'chinna-karma-3rd-day', nameEn: '3rd Day Palu Dimmala Vidhi', nameTe: '3వ రోజు పాలు పొయ్యడం (చిన్న కర్మ)' },
    { id: 'sub_pedda_dinam', categoryId: 'cat_purohit_asubha', slug: 'pedda-karma-masikam', nameEn: '10th-13th Day Dinavaralu & Shraddha', nameTe: '10-13వ రోజు పెద్ద కర్మ & శ్రాద్ధం' },
    // Tent House
    { id: 'sub_shamiana_tent', categoryId: 'cat_tent_house', slug: 'cloth-shamiana-poles', nameEn: 'Waterproof Shamiana & Iron Poles', nameTe: 'షామియానా & పైపుల సెట్' },
    { id: 'sub_plastic_chairs', categoryId: 'cat_tent_house', slug: 'chairs-round-tables', nameEn: 'Moulded Chairs & Dining Tables', nameTe: 'ప్లాస్టిక్ కుర్చీలు & భోజన బల్లలు' },
    { id: 'sub_sound_mic', categoryId: 'cat_tent_house', slug: 'mic-horns-box-speakers', nameEn: 'Ahuja Microphones & Horn Speakers', nameTe: 'మైకు సెట్, హారన్లు & బాక్సులు' },
    // Decor
    { id: 'sub_traditional_pandiri', categoryId: 'cat_pandiri_decor', slug: 'aaku-pandiri-ariti-chettu', nameEn: 'Palm Leaf Pandiri & Banana Trunks', nameTe: 'తాటి ఆకుల పందిరి & అరటి బోదెలు' },
    { id: 'sub_mandapam_flowers', categoryId: 'cat_pandiri_decor', slug: 'reception-stage-floral', nameEn: 'Wedding Reception Stage & Flowers', nameTe: 'కల్యాణ వేదిక & పూల అలంకరణ' },
    // Cooks Subha
    { id: 'sub_banti_bhojanam', categoryId: 'cat_cater_subha', slug: 'traditional-banti-sweets', nameEn: 'Traditional Feast with Sweets', nameTe: 'పసందైన విందు భోజనాలు & మిఠాయిలు' },
    { id: 'sub_breakfast_tiffin', categoryId: 'cat_cater_subha', slug: 'morning-tiffin-coffee', nameEn: 'Morning Tiffins, Upma, Mysore Bajji & Tea', nameTe: 'ఉదయం టిఫిన్లు & టీ కాఫీ' },
    // Cooks Asubha
    { id: 'sub_memorial_cooks', categoryId: 'cat_cater_asubha', slug: 'shokadinam-bhojanam', nameEn: 'Memorial Feast for Village Gatherings', nameTe: 'దినవారాల భోజనం & సాంప్రదాయ వంట' },
    // Photography
    { id: 'sub_photo_drone', categoryId: 'cat_photo_video', slug: 'wedding-drone-video', nameEn: 'Wedding 4K Video, Drone & Candid', nameTe: '4K వీడియోగ్రఫీ & డ్రోన్ కెమెరా' },
    { id: 'sub_urgent_portrait', categoryId: 'cat_photo_video', slug: 'urgent-portrait-framing', nameEn: 'Emergency Memorial Frame & Canvas', nameTe: 'అత్యవసర ఫొటో ఫ్రేమ్ & పోర్ట్రెయిట్' },
    // Hearse / Freezer
    { id: 'sub_freezer_box', categoryId: 'cat_freezer_hearse', slug: 'ac-freezer-box', nameEn: 'Emergency AC Body Freezer Box (24x7)', nameTe: '24 గంటల ఏసీ బాడీ ఫ్రీజర్ బాక్స్' },
    { id: 'sub_vaikuntha_ratham', categoryId: 'cat_freezer_hearse', slug: 'hearse-van-transport', nameEn: 'Hearse Van (Vaikuntha Ratham)', nameTe: 'వైకుంఠ రథం & ఊరేగింపు వాహనం' },
    // Musical Bands
    { id: 'sub_nadaswaram', categoryId: 'cat_nadaswaram', slug: 'mangala-vaadyam-sannayi', nameEn: 'Sannayi & Mangala Vaadhyam', nameTe: 'సన్నాయి వాయిద్యం & మంగళ వాద్యాలు' },
    { id: 'sub_dappulu_band', categoryId: 'cat_dappulu_band', slug: 'traditional-dappulu-shobha', nameEn: 'Village Dappulu for Procession & Rites', nameTe: 'ఊరేగింపు డప్పు కళాకారులు' },
  ];

  for (const sub of subcategoriesData) {
    await prisma.subcategory.upsert({
      where: {
        categoryId_slug: {
          categoryId: sub.categoryId,
          slug: sub.slug,
        },
      },
      update: sub,
      create: sub,
    });
  }

  // 2. Districts & Mandals
  const narayanpet = await prisma.district.upsert({
    where: { id: 'dist_narayanpet' },
    update: { nameEn: 'Narayanpet', nameTe: 'నారాయణపేట' },
    create: { id: 'dist_narayanpet', nameEn: 'Narayanpet', nameTe: 'నారాయణపేట' },
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

  // 4. Multi-Service Vendors Representing Joy & Solace Village Needs
  const sampleVendors = [
    {
      phone: '+919848011223',
      email: 'venkateshwara@example.com',
      ownerName: 'Ravi Teja',
      businessName: 'Sri Venkateshwara Digital Studios & 4K Drone',
      slug: 'sri-venkateshwara-digital-studios',
      primaryCategoryId: 'cat_photo_video',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Town Center',
      startingPricePaise: 2500000,
      ratingAverage: 4.9,
      ratingCount: 38,
      description: 'Candid wedding photography, traditional 4K videography, drone coverage, and high-end albums across Makthal & Narayanpet.',
    },
    {
      phone: '+919848022334',
      email: 'lakshmidecor@example.com',
      ownerName: 'Bheemesha Chary',
      businessName: 'Sri Lakshmi Traditional Pandiri & Mandapam Decor',
      slug: 'sri-lakshmi-mandapam-decor',
      primaryCategoryId: 'cat_pandiri_decor',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Station Road',
      startingPricePaise: 3500000,
      ratingAverage: 4.8,
      ratingCount: 45,
      description: 'Authentic palm & coconut leaf house pandiri, floral mandapam, and wedding stage decorations.',
    },
    {
      phone: '+919848033445',
      email: 'raghavendrapandits@example.com',
      ownerName: 'Venkata Sastry',
      businessName: 'Brahmasri Raghavendra Vaidika Purohitha Seva',
      slug: 'raghavendra-vaidika-purohitha-seva',
      primaryCategoryId: 'cat_purohit_subha',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Brahmana Veedhi',
      startingPricePaise: 1200000,
      ratingAverage: 5.0,
      ratingCount: 52,
      description: 'Vedic pandits for wedding muhurtham, vivaha vidhi, naming ceremony, housewarming, and homams with samagri.',
    },
    {
      phone: '+919848066778',
      email: 'aparakarma@example.com',
      ownerName: 'Subrahmanya Sarma',
      businessName: 'Sanatana Apara Karma & Dinavaralu Purohitha Seva',
      slug: 'sanatana-apara-karma-purohitha-seva',
      primaryCategoryId: 'cat_purohit_asubha',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Temple Road',
      startingPricePaise: 800000,
      ratingAverage: 4.9,
      ratingCount: 41,
      description: 'Dignified traditional Vedic last rites, 3rd day palupoyadam, 10th-13th day dinavaralu, and annual shraddha ceremonies.',
    },
    {
      phone: '+919848077889',
      email: 'bhavanitenthouse@example.com',
      ownerName: 'Mallesh Goud',
      businessName: 'Sri Bhavani Tent House, Shamiana & Generator Services',
      slug: 'sri-bhavani-tent-house-generator',
      primaryCategoryId: 'cat_tent_house',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Bus Stand Circle',
      startingPricePaise: 1000000,
      ratingAverage: 4.7,
      ratingCount: 68,
      description: 'Shamianas, VIP plastic & banquet chairs, green carpets, water proof sheds, and silent generator backups for all village functions.',
    },
    {
      phone: '+919848088990',
      email: 'vaikunta@example.com',
      ownerName: 'Ramesh Reddy',
      businessName: 'Shanti Vaikuntha Ratham, Freezer Box & Last Rites Support',
      slug: 'shanti-vaikuntha-ratham-freezer-box',
      primaryCategoryId: 'cat_freezer_hearse',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'bypass Road',
      startingPricePaise: 250000,
      ratingAverage: 5.0,
      ratingCount: 76,
      description: '24/7 dead body freezer box delivery to homes, AC hearse van service, and emergency funeral arrangements in rural mandals.',
    },
    {
      phone: '+919848044556',
      email: 'madhuricatering@example.com',
      ownerName: 'Sridhar Rao',
      businessName: 'Madhuri Traditional Feast Caterers & Vantavallu',
      slug: 'madhuri-traditional-wedding-caterers',
      primaryCategoryId: 'cat_cater_subha',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Market Yard',
      startingPricePaise: 45000,
      ratingAverage: 4.7,
      ratingCount: 64,
      description: 'Authentic Telugu banti bhojanam on banana leaves for weddings, housewarmings, and village gatherings up to 3000 people.',
    },
    {
      phone: '+919848055667',
      email: 'balajinadaswaram@example.com',
      ownerName: 'Yellappa Brothers',
      businessName: 'Sri Balaji Mangala Vadhyam & Nadaswaram Troupe',
      slug: 'sri-balaji-mangala-vadhyam-nadaswaram',
      primaryCategoryId: 'cat_nadaswaram',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Koilkonda Road',
      startingPricePaise: 1500000,
      ratingAverage: 4.9,
      ratingCount: 29,
      description: 'Auspicious nadaswaram and thavil musicians for kalyana muhurtham, temple celebrations, and procession melody.',
    },
    {
      phone: '+919848099001',
      email: 'dappukala@example.com',
      ownerName: 'Shankar & Team',
      businessName: 'Jai Bheem Traditional Dappulu & Marfa Beats Troupe',
      slug: 'jai-bheem-traditional-dappulu-marfa',
      primaryCategoryId: 'cat_dappulu_band',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Gram Panchayat Center',
      startingPricePaise: 800000,
      ratingAverage: 4.8,
      ratingCount: 33,
      description: 'High-energy traditional Telangana dappulu, marfa beats, and procession rhythms for Baraat, Jatara, and funeral honour.',
    },
  ];

  for (const v of sampleVendors) {
    const user = await prisma.user.upsert({
      where: { phone: v.phone },
      update: { roles: [UserRole.VENDOR_OWNER, UserRole.CUSTOMER] },
      create: {
        phone: v.phone,
        email: v.email,
        roles: [UserRole.VENDOR_OWNER, UserRole.CUSTOMER],
        customerProfile: {
          create: {
            fullName: v.ownerName,
            preferredLanguage: 'te',
          },
        },
      },
    });

    await prisma.vendorProfile.upsert({
      where: { userId: user.id },
      update: {
        businessName: v.businessName,
        slug: v.slug,
        primaryCategoryId: v.primaryCategoryId,
        phone: v.phone,
        baseDistrict: v.district,
        baseMandal: v.mandal,
        baseVillageOrTown: v.village,
        startingPricePaise: v.startingPricePaise,
        ratingAverage: v.ratingAverage,
        ratingCount: v.ratingCount,
        description: v.description,
        status: VendorStatus.APPROVED,
        verificationStatus: VerificationStatus.VERIFIED,
      },
      create: {
        userId: user.id,
        businessName: v.businessName,
        slug: v.slug,
        primaryCategoryId: v.primaryCategoryId,
        phone: v.phone,
        baseDistrict: v.district,
        baseMandal: v.mandal,
        baseVillageOrTown: v.village,
        startingPricePaise: v.startingPricePaise,
        ratingAverage: v.ratingAverage,
        ratingCount: v.ratingCount,
        description: v.description,
        status: VendorStatus.APPROVED,
        verificationStatus: VerificationStatus.VERIFIED,
        leadWallet: {
          create: {
            balanceCredits: 20,
          },
        },
      },
    });
  }

  console.log(`✅ Successfully seeded all 24 categories and ${sampleVendors.length} multi-service vendors!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
