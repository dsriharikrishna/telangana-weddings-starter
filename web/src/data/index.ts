import { Category, LocationHierarchy, Vendor } from "../types";

export const TELANGANA_LOCATIONS: LocationHierarchy = {
  state: "Telangana",
  districts: [
    {
      id: "narayanpet",
      nameEn: "Narayanpet",
      nameTe: "నారాయణపేట",
      mandals: [
        {
          id: "narayanpet-mandal",
          nameEn: "Narayanpet",
          nameTe: "నారాయణపేట",
          villages: [
            { id: "narayanpet-town", nameEn: "Narayanpet Town", nameTe: "నారాయణపేట టౌన్", isTown: true },
            { id: "singaram", nameEn: "Singaram", nameTe: "సింగారం" },
            { id: "kollampally", nameEn: "Kollampally", nameTe: "కొల్లంపల్లి" },
            { id: "abhangapur", nameEn: "Abhangapur", nameTe: "అభంగాపూర్" }
          ]
        },
        {
          id: "makthal",
          nameEn: "Makthal",
          nameTe: "మఖ్తల్",
          villages: [
            { id: "makthal-town", nameEn: "Makthal Town", nameTe: "మఖ్తల్ టౌన్", isTown: true },
            { id: "jaklair", nameEn: "Jaklair", nameTe: "జక్లైర్" },
            { id: "chandapur", nameEn: "Chandapur", nameTe: "చందాపుర్" }
          ]
        },
        {
          id: "kosgi",
          nameEn: "Kosgi",
          nameTe: "కోస్గి",
          villages: [
            { id: "kosgi-town", nameEn: "Kosgi Town", nameTe: "కోస్గి టౌన్", isTown: true },
            { id: "sarjakhanpet", nameEn: "Sarjakhanpet", nameTe: "సర్జాఖాన్‌పేట" },
            { id: "mirzapur", nameEn: "Mirzapur", nameTe: "మిర్జాపూర్" }
          ]
        },
        {
          id: "damaragidda",
          nameEn: "Damaragidda",
          nameTe: "దామరగిద్ద",
          villages: [
            { id: "damaragidda-v", nameEn: "Damaragidda", nameTe: "దామరగిద్ద" },
            { id: "maddur", nameEn: "Maddur", nameTe: "మద్దూరు" }
          ]
        }
      ]
    },
    {
      id: "mahabubnagar",
      nameEn: "Mahabubnagar",
      nameTe: "మహబూబ్‌నగర్",
      mandals: [
        {
          id: "mahabubnagar-urban",
          nameEn: "Mahabubnagar Urban",
          nameTe: "మహబూబ్‌నగర్ అర్బన్",
          villages: [
            { id: "mahabubnagar-city", nameEn: "Mahabubnagar Town / City", nameTe: "మహబూబ్‌నగర్ టౌన్", isTown: true },
            { id: "yenugonda", nameEn: "Yenugonda", nameTe: "ఏనుగొండ" },
            { id: "boyapalle", nameEn: "Boyapalle", nameTe: "బోయపల్లి" },
            { id: "palakonda", nameEn: "Palakonda", nameTe: "పాలకొండ" }
          ]
        },
        {
          id: "jadcherla",
          nameEn: "Jadcherla",
          nameTe: "జడ్చర్ల",
          villages: [
            { id: "jadcherla-town", nameEn: "Jadcherla Town", nameTe: "జడ్చర్ల టౌన్", isTown: true },
            { id: "badepalle", nameEn: "Badepalle", nameTe: "బాదేపల్లి" },
            { id: "kaverammapeta", nameEn: "Kaverammapeta", nameTe: "కావేరమ్మపేట" }
          ]
        },
        {
          id: "bhoothpur",
          nameEn: "Bhoothpur",
          nameTe: "భూత్పూర్",
          villages: [
            { id: "bhoothpur-town", nameEn: "Bhoothpur Town", nameTe: "భూత్పూర్ టౌన్", isTown: true },
            { id: "ammapur", nameEn: "Ammapur", nameTe: "అమ్మాపూర్" }
          ]
        },
        {
          id: "devarkadra",
          nameEn: "Devarkadra",
          nameTe: "దేవరకద్ర",
          villages: [
            { id: "devarkadra-v", nameEn: "Devarkadra", nameTe: "దేవరకద్ర" },
            { id: "gudur", nameEn: "Gudur", nameTe: "గూడూరు" }
          ]
        }
      ]
    }
  ]
};

export const WEDDING_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "function-hall-tent-house",
    number: 1,
    nameEn: "Marriage Function Hall / Tent House",
    nameTe: "కళ్యాణ మండపం / టెంట్ హౌస్",
    descriptionEn: "AC & Non-AC Function Halls, Shadhi Khanas, Traditional Kalyana Mandapams & Complete Shamiana Tent Setups.",
    descriptionTe: "ఏసీ & నాన్ ఏసీ ఫంక్షన్ హాళ్ళు, కళ్యాణ మండపాలు మరియు పూర్తి షామియానా టెంట్ ఏర్పాట్లు.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Hall", "AC", "Dining", "Mandapam", "Kalyana Vedika"]
  },
  {
    id: "cat-2",
    slug: "catering-cooking-team",
    number: 2,
    nameEn: "Catering & Cooking Team",
    nameTe: "వంటల బృందం & క్యాటరింగ్ సర్వీసెస్",
    descriptionEn: "Authentic Telangana Vantalu, Bagara Rice & Dalcha, Sweets, Pure Veg and Non-Veg traditional wedding feasts.",
    descriptionTe: "రుచికరమైన తెలంగాణ సాంప్రదాయ వంటలు, బగారా అన్నం & దాల్చా, మిఠాయిలు మరియు రాయల్ విందు ఏర్పాట్లు.",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    tags: ["Telangana Vantalu", "Veg & Non-Veg", "Live Counters", "Breakfast"]
  },
  {
    id: "cat-3",
    slug: "wedding-photography",
    number: 3,
    nameEn: "Wedding Photography",
    nameTe: "వెడ్డింగ్ ఫోటోగ్రఫీ",
    descriptionEn: "Candid wedding moments, couple portraits, traditional Muhurtham ceremony shoots, and high-res albums.",
    descriptionTe: "ముహూర్తం, సాంప్రదాయ ఘట్టాలు, కాండిడ్ ఫోటోలు మరియు ఆల్బమ్ డిజైనింగ్.",
    iconName: "Camera",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    tags: ["Candid", "Traditional", "Pre-Wedding", "Albums"]
  },
  {
    id: "cat-4",
    slug: "wedding-videography",
    number: 4,
    nameEn: "Wedding Videography",
    nameTe: "వెడ్డింగ్ వీడియోగ్రఫీ",
    descriptionEn: "Cinematic 4K wedding films, drone shoots, live LED wall telecast, and YouTube/Instagram wedding teasers.",
    descriptionTe: "సినిమాటిక్ 4K వెడ్డింగ్ ఫిల్మ్స్, డ్రోన్ కెమెరా, లైవ్ ఎల్ఈడీ వాల్ స్ట్రీమింగ్.",
    iconName: "Video",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
    tags: ["Cinematic", "Drone 4K", "Live Telecast", "Teasers"]
  },
  {
    id: "cat-5",
    slug: "stage-mandap-decoration",
    number: 5,
    nameEn: "Stage & Mandap Decoration",
    nameTe: "స్టేజ్ & కళ్యాణ మండప డెకరేషన్",
    descriptionEn: "Grand Telugu mandap setups, royal backdrop themes, Pellikuturu ceremony decor, and entry archways.",
    descriptionTe: "రాయల్ కళ్యాణ వేదికలు, పెళ్లికూతురు / పెళ్లికొడుకు వేడుక డెకరేషన్ మరియు గ్రాండ్ ఎంట్రీ గేట్లు.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Floral Mandap", "Stage Themes", "Haldi Decor", "Entry Gate"]
  },
  {
    id: "cat-6",
    slug: "lighting-electrical-setup",
    number: 6,
    nameEn: "Lighting & Electrical Setup",
    nameTe: "లైటింగ్ & ఎలక్ట్రికల్ సెటప్",
    descriptionEn: "Illuminated serial lighting, moving LED focus lights, heavy-duty silent generators, and power backup.",
    descriptionTe: "రమణీయమైన సీరియల్ లైట్లు, మూవింగ్ ఎల్ఈడీ ఫోకస్ లైట్లు మరియు సైలెంట్ జనరేటర్ల సరఫరా.",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    tags: ["Focus Lights", "Serial Lights", "Silent Genset", "Haldi Lighting"]
  },
  {
    id: "cat-7",
    slug: "dj-sound-system",
    number: 7,
    nameEn: "DJ / Sound System",
    nameTe: "డీజే & సౌండ్ సిస్టమ్",
    descriptionEn: "High-bass DJ setups for Sangeet & Baraat, crystal-clear speakers for Muhurtham mantras, and party lights.",
    descriptionTe: "సంగీత్, బారాత్ కోసం హై బాస్ డీజే, ముహూర్తానికి స్పష్టమైన సౌండ్ సిస్టమ్ & స్పీకర్లు.",
    iconName: "Volume2",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    tags: ["Sangeet DJ", "Bass Tops", "Mantras Audio", "Truss Lighting"]
  },
  {
    id: "cat-8",
    slug: "bridal-makeup-hairstyling",
    number: 8,
    nameEn: "Bridal Makeup & Hairstyling",
    nameTe: "బ్రైడల్ మేకప్ & హెయిర్‌స్టైలింగ్",
    descriptionEn: "HD & Airbrush Telugu bridal makeup, authentic poolajada, saree draping, and Mehendi artists.",
    descriptionTe: "హెచ్‌డీ & ఎయిర్‌బ్రష్ బ్రైడల్ మేకప్, సాంప్రదాయ పూలజడ, చీర కట్టడం మరియు మెహందీ డిజైన్లు.",
    iconName: "HeartHandshake",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    tags: ["HD Makeup", "Poolajada", "Saree Draping", "Mehendi"]
  },
  {
    id: "cat-9",
    slug: "wedding-priest-purohit",
    number: 9,
    nameEn: "Wedding Priest / Purohit",
    nameTe: "పురోహితులు / వేద పండితులు",
    descriptionEn: "Experienced Vedic scholars for traditional Telugu Muhurtham, Homam, Kanyadanam, and Talambralu ceremonies.",
    descriptionTe: "శాస్త్రోక్తంగా వివాహ ముహూర్తం, హోమం, కన్యాదానం, తలంబ్రాలు జరిపించే వేద పండితులు.",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    tags: ["Vedic Muhurtham", "Smartha", "Pooja Samagri Guidance", "Homam"]
  },
  {
    id: "cat-10",
    slug: "wedding-clothes",
    number: 10,
    nameEn: "Wedding Clothes",
    nameTe: "పెళ్లి వస్త్రాలు (పట్టుచీరలు & కుర్తా)",
    descriptionEn: "Pure Narayanpet Handloom sarees, Kanchi & Gadwal pattu sarees, Sherwanis, Dhotis, and ethnic matching sets.",
    descriptionTe: "ప్రసిద్ధ నారాయణపేట చేనేత పట్టుచీరలు, గద్వాల పట్టు, పట్టు పంచెలు, షేర్వానీలు.",
    iconName: "Shirt",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    tags: ["Narayanpet Sarees", "Silk Sarees", "Pattu Panchalu", "Sherwani"]
  },
  {
    id: "cat-11",
    slug: "jewellery",
    number: 11,
    nameEn: "Jewellery",
    nameTe: "వివాహ ఆభరణాలు",
    descriptionEn: "Traditional Temple Jewellery, Gold & Antique sets for rent, Vaddanam (waist belt), Aravanki, and bridal sets.",
    descriptionTe: "సాంప్రదాయ టెంపుల్ జ్యువెలరీ, వడ్డాణం, కాసుల పేరు, బాజుబంద్ మరియు అద్దె ఆభరణాలు.",
    iconName: "Gem",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    tags: ["Temple Jewellery", "Rental Sets", "Vaddanam", "Antique Gold"]
  },
  {
    id: "cat-12",
    slug: "flower-decoration-garlands",
    number: 12,
    nameEn: "Flower Decoration & Garlands",
    nameTe: "పూల డెకరేషన్ & కళ్యాణ పూలదండలు",
    descriptionEn: "Fresh Jasmine, Rose, and Orchid garlands (Pelli Dandalalu), Talambralu flowers, car decoration, and floral canopies.",
    descriptionTe: "తాజా గులాబీ, మల్లెల పెళ్లి దండలు, తలంబ్రాల పూలు, కార్ అలంకరణ మరియు పూల చప్పరం.",
    iconName: "Flower2",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    tags: ["Pelli Dandalalu", "Car Decor", "Fresh Flowers", "Poola Chappara"]
  },
  {
    id: "cat-13",
    slug: "chairs-tables-utensils",
    number: 13,
    nameEn: "Chairs, Tables & Utensils",
    nameTe: "కుర్చీలు, బల్లలు & వంట పాత్రలు",
    descriptionEn: "VIP banquet chairs, round tables, buffet stalls, large boiling cauldrons, water drums, and serving vessels.",
    descriptionTe: "విఐపి కుర్చీలు, భోజన బల్లలు, పెద్ద వంట డెగిశాలు, బఫే కౌంటర్లు మరియు పాత్రలు అద్దెకు.",
    iconName: "Armchair",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    tags: ["Banquet Chairs", "Buffet Counters", "Cooking Vessels", "Tables"]
  },
  {
    id: "cat-14",
    slug: "drinking-water-supply",
    number: 14,
    nameEn: "Drinking Water Supply",
    nameTe: "మంచి నీటి సరఫరా (మినరల్ వాటర్ ట్యాంకర్లు)",
    descriptionEn: "Chilled mineral water cans (20L), 250ml sealed cups, bulk RO water tankers for cooking and guest washing.",
    descriptionTe: "20 లీటర్ల మినరల్ వాటర్ క్యాన్లు, సీల్డ్ వాటర్ గ్లాసులు మరియు శుద్ధి చేసిన నీటి ట్యాంకర్లు.",
    iconName: "Droplets",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    tags: ["20L Cans", "Water Bottles", "Tanker Supply", "Coolers"]
  },
  {
    id: "cat-15",
    slug: "transportation",
    number: 15,
    nameEn: "Transportation",
    nameTe: "రవాణా & ప్రయాణ వాహనాలు",
    descriptionEn: "Decorated luxury bridal cars, 17/32-seater tempo travellers for relatives, and local guest shuttle buses.",
    descriptionTe: "డెకరేటెడ్ పెళ్లికారు, బంధువుల ప్రయాణానికి ట్రావెలర్లు (Tempo Travellers) మరియు బస్సులు.",
    iconName: "Car",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    tags: ["Bridal Car", "Tempo Traveller", "Buses", "A/C Cabs"]
  },
  {
    id: "cat-16",
    slug: "invitation-printing",
    number: 16,
    nameEn: "Invitation Printing",
    nameTe: "వివాహ ఆహ్వాన పత్రికల ముద్రణ",
    descriptionEn: "Traditional Telugu Lagna Patrika, laser-cut luxury cards, digital animated WhatsApp video invites, and box cards.",
    descriptionTe: "సాంప్రదాయ తెలుగు శుభలేఖలు, డిజిటల్ వీడియో ఆహ్వానాలు మరియు లగ్న పత్రికలు.",
    iconName: "MailOpen",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    tags: ["Lagna Patrika", "Digital Video Invite", "Luxury Cards", "Fast Printing"]
  },
  {
    id: "cat-17",
    slug: "cleaning-maintenance",
    number: 17,
    nameEn: "Cleaning & Maintenance",
    nameTe: "శుభ్రత & వ్యర్థాల నిర్వహణ",
    descriptionEn: "Professional event cleaning crews, dining hall plate clearance, post-event waste management, and washroom sanitation.",
    descriptionTe: "భోజనశాల మరియు ఫంక్షన్ హాల్ క్లీనింగ్ సిబ్బంది, చెత్త తొలగింపు మరియు పారిశుధ్య నిర్వహణ.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    tags: ["Hall Cleaning", "Dining Waste Disposal", "Sanitation Team", "Post Event"]
  },
  {
    id: "cat-18",
    slug: "band-melam-sannai",
    number: 18,
    nameEn: "Band Melam & Sannai",
    nameTe: "బ్యాండ్ మేళం & సన్నాయి మేళం",
    descriptionEn: "Vibrant wedding brass bands for procession and authentic divine Sannai / Nadaswaram for sacred Telugu ceremonies.",
    descriptionTe: "బారాత్, ఊరేగింపు కోసం రాయల్ బ్రాస్ బ్యాండ్ మరియు పవిత్ర ముహూర్తానికి నాదస్వర సన్నాయి మేళం.",
    iconName: "Music",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    tags: ["Baraat", "Brass Band", "Nadaswaram", "Telugu Sannai", "Mangala Vadyalu"],
    subcategories: [
      {
        id: "sub-18-1",
        slug: "band-melam",
        nameEn: "Band Melam (బ్యాండ్ మేళం)",
        nameTe: "బ్యాండ్ మేళం",
        descriptionEn: "Traditional wedding band teams, brass band performers, procession drums, and energetic Baraat entrances.",
        descriptionTe: "వివాహ ఊరేగింపు, బారాత్ మరియు పెళ్లి ప్రవేశం కోసం సంప్రదాయ బ్రాస్ బ్యాండ్ బృందాలు.",
        features: [
          "Baraat procession band",
          "Brass band performers with trumpets & drums",
          "Wedding entrance fanfare",
          "Uniformed artists & mobile lighting setup"
        ]
      },
      {
        id: "sub-18-2",
        slug: "sannai-melam",
        nameEn: "Sannai Melam (సన్నాయి మేళం)",
        nameTe: "సన్నాయి మేళం",
        descriptionEn: "Traditional Sannai artists, Nadaswaram and Thavil performers creating auspicious divine music for Vedic rituals.",
        descriptionTe: "నాదస్వరం, డోలు విద్వాంసులచే పవిత్ర మంగళ వాయిద్యాలు, ముహూర్త కాలం మరియు స్వాగత గీతాలు.",
        features: [
          "Traditional Sannai & Nadaswaram artists",
          "Thavil percussions for auspicious rituals",
          "Sacred welcome and Muhurtham performances",
          "Heritage Telugu wedding melodies"
        ]
      }
    ]
  }
];

export const SAMPLE_VENDORS: Vendor[] = [
  {
    id: "ven-01",
    businessName: "Sri Srinivasa Kalyana Mandapam & A/C Hall",
    ownerName: "M. Ramakrishna Goud",
    categorySlug: "function-hall-tent-house",
    district: "narayanpet",
    mandal: "narayanpet-mandal",
    townOrVillage: "narayanpet-town",
    businessType: "town",
    servesVillages: ["narayanpet-town", "singaram", "kollampally", "abhangapur", "jaklair"],
    servesMandals: ["narayanpet-mandal", "damaragidda", "makthal"],
    willTravel: true,
    travelChargesPolicyEn: "Fixed venue location; supports travel for mobile shamiana tent setups beyond 15 km with nominal transport charge.",
    travelChargesPolicyTe: "శాశ్వత కళ్యాణ మండపం; 15 కి.మీ దాటితే మొబైల్ షామియానా ఏర్పాట్లకు రవాణా ఛార్జీ వర్తిస్తుంది.",
    minimumBookingNoticeDays: 7,
    rating: 4.8,
    reviewCount: 38,
    startingPricePaise: 5000000, // Rs. 50,000 / day
    pricingUnitEn: "per day",
    pricingUnitTe: "రోజుకు",
    isVerified: true,
    verificationBadgeType: "field_verified",
    yearsOfExperience: 14,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Most Booked in Narayanpet",
    aboutEn: "Centrally located in Narayanpet town with 1000+ guest seating capacity, separate 400-capacity dining hall, and generator backup.",
    aboutTe: "నారాయణపేట పట్టణంలో 1000 మంది కూర్చునే సౌకర్యం, ప్రత్యేక భోజన శాల మరియు నిరంతర విద్యుత్ సౌకర్యం గల ప్రముఖ కళ్యాణ మండపం.",
    sampleNotice: "Sample Provider for Narayanpet District",
    phone: "+91 94401 XXXXX",
    whatsapp: "+91 94401 XXXXX",
    approxDistanceKm: 0
  },
  {
    id: "ven-02",
    businessName: "Telangana Ruchulu & Royal Catering",
    ownerName: "Chef Venkatesh Reddy",
    categorySlug: "catering-cooking-team",
    district: "narayanpet",
    mandal: "makthal",
    townOrVillage: "makthal-town",
    businessType: "town",
    servesVillages: ["makthal-town", "jaklair", "chandapur", "singaram", "kollampally"],
    servesMandals: ["makthal", "narayanpet-mandal", "damaragidda", "bhoothpur"],
    willTravel: true,
    travelChargesPolicyEn: "Willing to travel across all mandals of Narayanpet & Mahabubnagar. Free travel within 25 km.",
    travelChargesPolicyTe: "నారాయణపేట, మహబూబ్‌నగర్ జిల్లాలలోని అన్ని గ్రామాలకు వంటల బృందంతో వస్తాము. 25 కి.మీ వరకు ప్రయాణ ఛార్జీ ఉచితం.",
    minimumBookingNoticeDays: 5,
    rating: 4.9,
    reviewCount: 52,
    startingPricePaise: 35000, // Rs. 350 / plate
    pricingUnitEn: "per plate",
    pricingUnitTe: "ప్లేటుకు",
    isVerified: true,
    verificationBadgeType: "field_verified",
    yearsOfExperience: 18,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Authentic Flavours",
    aboutEn: "Specialists in pure Telangana wedding cuisines, traditional Bagara rice with dalcha, sweet delicacies, and hygienic serving staff.",
    aboutTe: "సాంప్రదాయ తెలంగాణ రుచులు, బగారా రైస్, దాల్చా, మిఠాయిలు మరియు పరిశుభ్రమైన వడ్డనలో 18 ఏళ్ల అనుభవం.",
    sampleNotice: "Sample Provider for Makthal Mandal",
    phone: "+91 98480 XXXXX",
    whatsapp: "+91 98480 XXXXX",
    approxDistanceKm: 18
  },
  {
    id: "ven-03",
    businessName: "Mahabubnagar Royal Brass Band Melam",
    ownerName: "K. Balappa & Brothers",
    categorySlug: "band-melam-sannai",
    subcategorySlug: "band-melam",
    district: "mahabubnagar",
    mandal: "mahabubnagar-urban",
    townOrVillage: "mahabubnagar-city",
    businessType: "town",
    servesVillages: ["mahabubnagar-city", "yenugonda", "boyapalle", "palakonda", "badepalle", "jadcherla-town"],
    servesMandals: ["mahabubnagar-urban", "jadcherla", "bhoothpur", "devarkadra", "narayanpet-mandal"],
    willTravel: true,
    travelChargesPolicyEn: "Travels to any village in Mahabubnagar and Narayanpet with vehicle setup. Fixed vehicle fare added for > 30 km.",
    travelChargesPolicyTe: "మహబూబ్‌నగర్ మరియు నారాయణపేటలోని ప్రతి గ్రామానికి బ్యాండ్ వాహనంతో వస్తాము. 30 కి.మీ మించితే వాహన రవాణా ఖర్చు వర్తిస్తుంది.",
    minimumBookingNoticeDays: 3,
    rating: 4.7,
    reviewCount: 44,
    startingPricePaise: 2500000, // Rs. 25,000 / event
    pricingUnitEn: "per event",
    pricingUnitTe: "ఈవెంట్ కు",
    isVerified: true,
    verificationBadgeType: "master_artisan",
    yearsOfExperience: 22,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Procession Specialist",
    aboutEn: "21-member energetic Brass Band with uniform attire, trumpet soloists, and rolling procession lights for memorable Baraat entries.",
    aboutTe: "21 మంది కళాకారులతో కూడిన బ్రాస్ బ్యాండ్, యూనిఫాం వస్త్రధారణ మరియు ఘనమైన బారాత్ ఊరేగింపు ప్రత్యేకత.",
    sampleNotice: "Sample Provider for Mahabubnagar",
    phone: "+91 99890 XXXXX",
    whatsapp: "+91 99890 XXXXX",
    approxDistanceKm: 32
  },
  {
    id: "ven-04",
    businessName: "Sri Venkateshwara Nadaswara Sannai Brundam",
    ownerName: "Vidwan Narasimhulu",
    categorySlug: "band-melam-sannai",
    subcategorySlug: "sannai-melam",
    district: "narayanpet",
    mandal: "narayanpet-mandal",
    townOrVillage: "singaram",
    businessType: "village",
    servesVillages: ["singaram", "narayanpet-town", "kollampally", "abhangapur", "damaragidda-v", "maddur"],
    servesMandals: ["narayanpet-mandal", "damaragidda", "makthal", "kosgi"],
    willTravel: true,
    travelChargesPolicyEn: "Local village-based troupe. Travels anywhere across rural Narayanpet mandals with local transport arrangements.",
    travelChargesPolicyTe: "గ్రామీణ కళాకారులు. నారాయణపేట పరిధిలోని అన్ని గ్రామాలకు ముహూర్త సన్నాయి వాయించడానికి అందుబాటులో ఉంటారు.",
    minimumBookingNoticeDays: 2,
    rating: 5.0,
    reviewCount: 29,
    startingPricePaise: 1800000, // Rs. 18,000 / event
    pricingUnitEn: "per event",
    pricingUnitTe: "ఈవెంట్ కు",
    isVerified: true,
    verificationBadgeType: "master_artisan",
    yearsOfExperience: 30,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Heritage Master Artists",
    aboutEn: "Generational classical Nadaswaram & Thavil vidwans for sacred Telugu wedding rituals, mangala snanam, and traditional muhurtham.",
    aboutTe: "తరతరాలుగా వస్తున్న సాంప్రదాయ నాదస్వరం & డోలు విద్వాంసులు. పవిత్ర వివాహ ఘట్టాలకు మంగళ ప్రదాతలు.",
    sampleNotice: "Sample Provider for Singaram Village",
    phone: "+91 97010 XXXXX",
    whatsapp: "+91 97010 XXXXX",
    approxDistanceKm: 4
  },
  {
    id: "ven-05",
    businessName: "Palamuru Candid Moments Photography",
    ownerName: "Sanjay Kumar",
    categorySlug: "wedding-photography",
    district: "mahabubnagar",
    mandal: "jadcherla",
    townOrVillage: "jadcherla-town",
    businessType: "town",
    servesVillages: ["jadcherla-town", "badepalle", "kaverammapeta", "mahabubnagar-city", "bhoothpur-town"],
    servesMandals: ["jadcherla", "mahabubnagar-urban", "bhoothpur", "devarkadra"],
    willTravel: true,
    travelChargesPolicyEn: "Covers all mandals of Mahabubnagar and Narayanpet with drone & cinematic gear. Modest fuel charge for rural locations.",
    travelChargesPolicyTe: "మహబూబ్‌నగర్ మరియు నారాయణపేటలోని అన్ని గ్రామాల్లో డ్రోన్ & సినిమాటిక్ షూట్స్ చేస్తాము. గ్రామీణ ప్రాంతాలకు నామమాత్రపు ప్రయాణ ఖర్చు.",
    minimumBookingNoticeDays: 7,
    rating: 4.9,
    reviewCount: 65,
    startingPricePaise: 4000000, // Rs. 40,000
    pricingUnitEn: "per package",
    pricingUnitTe: "ప్యాకేజీకి",
    isVerified: true,
    verificationBadgeType: "field_verified",
    yearsOfExperience: 9,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Award Winning",
    aboutEn: "Capturing candid tears, smiles, and sacred moments across Telangana. Includes high-end synthetic albums and pre-wedding shoots.",
    aboutTe: "ముహూర్త ఘట్టాలు, కాండిడ్ ఫోటోగ్రఫీ మరియు ప్రీ-వెడ్డింగ్ షూట్స్ లో ప్రముఖ ఫోటోగ్రాఫర్ బృందం.",
    sampleNotice: "Sample Provider for Jadcherla",
    phone: "+91 98492 XXXXX",
    whatsapp: "+91 98492 XXXXX",
    approxDistanceKm: 24
  },
  {
    id: "ven-06",
    businessName: "Sri Laxmi Floral & Stage Mandap Decor",
    ownerName: "B. Chandrashekar",
    categorySlug: "stage-mandap-decoration",
    district: "narayanpet",
    mandal: "kosgi",
    townOrVillage: "kosgi-town",
    businessType: "mandal",
    servesVillages: ["kosgi-town", "sarjakhanpet", "mirzapur", "damaragidda-v", "singaram"],
    servesMandals: ["kosgi", "damaragidda", "narayanpet-mandal"],
    willTravel: true,
    travelChargesPolicyEn: "Serves all villages within Kosgi and surrounding mandals. Setup van travels to village function spots.",
    travelChargesPolicyTe: "కోస్గి మరియు సమీప గ్రామాలలోని కల్యాణ వేదికల వద్దకే మా డెకరేషన్ వాహనంతో వచ్చి అలంకరణ చేస్తాము.",
    minimumBookingNoticeDays: 4,
    rating: 4.8,
    reviewCount: 31,
    startingPricePaise: 3000000, // Rs. 30,000
    pricingUnitEn: "per setup",
    pricingUnitTe: "సెటప్ కు",
    isVerified: true,
    verificationBadgeType: "field_verified",
    yearsOfExperience: 11,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Creative Designs",
    aboutEn: "Exquisite mandap decorations, floral arches, entrance walkways, Pellikuturu ceremony backdrops with authentic flowers.",
    aboutTe: "ఆకర్షణీయమైన కళ్యాణ వేదికలు, పూల అలంకరణ మరియు పెళ్లికూతురు వేడుకల డెకరేషన్.",
    sampleNotice: "Sample Provider for Kosgi",
    phone: "+91 94900 XXXXX",
    whatsapp: "+91 94900 XXXXX",
    approxDistanceKm: 14
  }
];

