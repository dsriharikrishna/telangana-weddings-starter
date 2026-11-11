export interface DayServiceHighlight {
  id: string;
  categorySlug: string;
  titleEn: string;
  titleTe: string;
  roleEn: string;
  roleTe: string;
  startingPrice: string;
  iconName: string;
  badgeEn?: string;
  badgeTe?: string;
}

export interface WeddingDayStory {
  dayNumber: number;
  dayLabelEn: string;
  dayLabelTe: string;
  themeTitleEn: string;
  themeTitleTe: string;
  taglineEn: string;
  taglineTe: string;
  emotionalHookEn: string;
  emotionalHookTe: string;
  atmosphereColor: string;
  ceremonyImage: string;
  ceremonyDetailsEn: string[];
  ceremonyDetailsTe: string[];
  relatableMemoryEn: string;
  relatableMemoryTe: string;
  services: DayServiceHighlight[];
}

export const FIVE_DAY_WEDDING_STORIES: WeddingDayStory[] = [
  {
    dayNumber: 1,
    dayLabelEn: "Day 01",
    dayLabelTe: "1వ రోజు",
    themeTitleEn: "The Gathering",
    themeTitleTe: "బంధువుల రాక & సంబరం",
    taglineEn: "The house is no longer quiet. The festival has begun.",
    taglineTe: "ఇల్లు బంధువులతో నిండిపోయింది. పండుగ వాతావరణం మొదలైంది.",
    emotionalHookEn: "Grandparents blessing cousins arriving from afar, luggage lined in the verandah, hot filter coffee and freshly fried Murukulu.",
    emotionalHookTe: "దూర ప్రాంతాల నుండి వచ్చే బంధువులు, పలకరింపులు, వీధి అరుగుపై నవ్వులు, ఘుమఘుమలాడే కాఫీ మరియు కరకరలాడే మురుకులు.",
    atmosphereColor: "from-amber-900/40 to-[#542034]",
    ceremonyImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    ceremonyDetailsEn: [
      "Traditional welcome with Harathi & Kumkuma",
      "Setting up Shamiana, guest beds & welcoming spaces",
      "Pindi Vantalu preparations (Murukulu, Ariselu, Sakinalu)"
    ],
    ceremonyDetailsTe: [
      "హారతి & కుంకుమతో బంధువుల స్వాగతం",
      "షామియానా, వసతి మరియు విడిది ఏర్పాట్లు",
      "పిండి వంటల సందడి (మురుకులు, సకినాలు, అరిసెలు)"
    ],
    relatableMemoryEn: "That one favorite uncle who starts managing all logistics the moment his car enters the gate!",
    relatableMemoryTe: "గేటు దగ్గర కారు ఆగగానే మొదలయ్యే బాబాయ్ పర్యవేక్షణ & సందడి!",
    services: [
      {
        id: "s-101",
        categorySlug: "function-hall-tent-house",
        titleEn: "Shamiana & Tent House Arrangements",
        titleTe: "టెంట్ హౌస్ & షామియానా ఏర్పాట్లు",
        roleEn: "Seating, mattresses, coolers & fairy lights",
        roleTe: "విడిది బస, కూలర్లు, లైటింగ్ ఏర్పాట్లు",
        startingPrice: "₹12,000",
        iconName: "Tent",
        badgeEn: "Essential Day 1",
        badgeTe: "ముఖ్యమైన సేవ"
      },
      {
        id: "s-102",
        categorySlug: "wedding-photography",
        titleEn: "Arrivals & Candid Moments Shoot",
        titleTe: "బంధువుల రాక కాండిడ్ ఫోటోగ్రఫీ",
        roleEn: "Candid portraits of family reunions",
        roleTe: "కుటుంబ ఆత్మీయ కలయికల చిత్రాలు",
        startingPrice: "₹18,000",
        iconName: "Camera"
      },
      {
        id: "s-103",
        categorySlug: "catering-cooking-team",
        titleEn: "Welcome Refreshments & Traditional Tiffins",
        titleTe: "స్వాగత టిఫిన్లు & సంప్రదాయ ఫలహారాలు",
        roleEn: "Authentic hot breakfast, chai & traditional sweets",
        roleTe: "వేడి వేడి పెసరెట్టు, ఇడ్లీ, కాఫీ & మిఠాయిలు",
        startingPrice: "₹120 / plate",
        iconName: "Coffee"
      }
    ]
  },
  {
    dayNumber: 2,
    dayLabelEn: "Day 02",
    dayLabelTe: "2వ రోజు",
    themeTitleEn: "Traditions & Colours",
    themeTitleTe: "పసుపు, నలుగు & సంప్రదాయాలు",
    taglineEn: "Yellow turmeric, fragrant jasmines, and the radiant smile of the bride & groom.",
    taglineTe: "పసుపు నలుగు, గుబాళించే మల్లెలు, పెళ్లికూతురు పెళ్లికొడుకు ముఖంలో దివ్యమైన కళ.",
    emotionalHookEn: "Women singing traditional mangala harathulu, cousins splashing turmeric water, and playful haldi warfare in the courtyard.",
    emotionalHookTe: "మంగళ హారతులు పాడే అక్కాచెల్లెళ్లు, అల్లరి పసుపు నీళ్ల ఆటలు, పెరట్లో మోగే పాటల సందడి.",
    atmosphereColor: "from-amber-600/30 to-[#762B46]",
    ceremonyImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    ceremonyDetailsEn: [
      "Pellikuthuru / Pellillkoduku Nalugu ceremonial bath",
      "Gorintaku (Traditional Bridal Henna & Mehendi)",
      "Traditional yellow cotton sarees & floral jewelry"
    ],
    ceremonyDetailsTe: [
      "పెళ్లికూతురు / పెళ్లికొడుకు నలుగు స్నానం",
      "చేతులకు పండే ఎర్రటి గోరింటాకు / మెహందీ",
      "పసుపు వస్త్రాలు, పూల నగలు & మామిడాకుల అలంకరణ"
    ],
    relatableMemoryEn: "The bride pretending to be annoyed while her cousins chase her with handfuls of wet haldi!",
    relatableMemoryTe: "అక్కాచెల్లెళ్లు పసుపు పూస్తుంటే నవ్వుతూ దాక్కునే పెళ్లికూతురు అల్లరి!",
    services: [
      {
        id: "s-201",
        categorySlug: "bridal-makeup",
        titleEn: "Bridal Mehendi & Henna Art",
        titleTe: "బ్రైడల్ మెహందీ & గోరింటాకు డిజైన్స్",
        roleEn: "Intricate Arabic, Bridal & Traditional designs",
        roleTe: "చేతులు, పాదాలకు అందమైన కళాత్మక డిజైన్లు",
        startingPrice: "₹4,500",
        iconName: "Sparkles",
        badgeEn: "Top Rated",
        badgeTe: "అత్యుత్తమ రేటింగ్"
      },
      {
        id: "s-202",
        categorySlug: "stage-mandap-decoration",
        titleEn: "Nalugu & Haldi Floral Backdrop",
        titleTe: "నలుగు & హల్దీ పూల డెకరేషన్",
        roleEn: "Marigold hanging strings, brass Urli & swing decor",
        roleTe: "బంతిపూల తోరణాలు, ఉయ్యాల & సంప్రదాయ ఊర్లి",
        startingPrice: "₹15,000",
        iconName: "Flower2"
      },
      {
        id: "s-203",
        categorySlug: "band-melam-sannai",
        titleEn: "Traditional Sannai Melam for Haldi",
        titleTe: "హల్దీ వేడుక సన్నాయి మేళం",
        roleEn: "Auspicious morning Nadaswaram notes",
        roleTe: "శుభోదయ మంగళ వాద్యాలు",
        startingPrice: "₹10,000",
        iconName: "Music"
      }
    ]
  },
  {
    dayNumber: 3,
    dayLabelEn: "Day 03",
    dayLabelTe: "3వ రోజు",
    themeTitleEn: "Music & Telangana Feast",
    themeTitleTe: "ఆటలు, పాటలు & రాయల్ విందు",
    taglineEn: "The aroma of Bagara Rice & Dalcha, laughter filling the banquet hall, and high-energy celebrations.",
    taglineTe: "బగారా అన్నం & ఘుమఘుమలాడే దాల్చా సువాసనలు, డప్పు చప్పుళ్లు, బంధువుల డ్యాన్సులు.",
    emotionalHookEn: "When the caterer opens the giant copper Handi of Bagara rice, and every uncle rushes with extra bowls for the younger cousins.",
    emotionalHookTe: "పెద్ద రాగి డేగిశాలోంచి బగారా రైస్ వడ్డిస్తుంటే పంక్తి భోజనంలో పెరిగే సందడి మరియు ఆనందం.",
    atmosphereColor: "from-rose-900/40 to-[#542034]",
    ceremonyImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    ceremonyDetailsEn: [
      "Authentic Telangana Wedding Vantalu (Bagara, Dalcha, Mutton Fry/Paneer)",
      "Evening Sangeet & Folk Dappu beats",
      "Cocktail / Mocktail live counters & dessert stations"
    ],
    ceremonyDetailsTe: [
      "ఘుమఘుమలాడే తెలంగాణ సాంప్రదాయ వంటలు",
      "సాయంత్రం సంగీత్, డప్పు వాయిద్యాల నృత్యాలు",
      "లైవ్ స్వీట్ కౌంటర్లు, జామున్, డబుల్ కా మీఠా"
    ],
    relatableMemoryEn: "That quiet uncle who insists he doesn't dance, suddenly rocking the dance floor during the Dappu beat!",
    relatableMemoryTe: "నాకు డ్యాన్స్ రాదు అన్న మామయ్య డప్పు కొట్టగానే స్టేజ్ పైకి దూకడం!",
    services: [
      {
        id: "s-301",
        categorySlug: "catering-cooking-team",
        titleEn: "Telangana Master Vantalu Team",
        titleTe: "తెలంగాణ రాయల్ వంటల బృందం",
        roleEn: "Traditional Bagara Rice, Dalcha, Dum Biryani & Sweets",
        roleTe: "విందు భోజనాలు, స్వీట్లు & లైవ్ కౌంటర్లు",
        startingPrice: "₹350 / plate",
        iconName: "UtensilsCrossed",
        badgeEn: "Authentic Taste",
        badgeTe: "అసలైన రుచి"
      },
      {
        id: "s-302",
        categorySlug: "wedding-videography",
        titleEn: "Cinematic Sangeet & Drone Film",
        titleTe: "సినిమాటిక్ సంగీత్ & డ్రోన్ షూట్",
        roleEn: "4K live footage, gimbal stabilizer & highlight reels",
        roleTe: "4K లైవ్ స్ట్రీమింగ్ & రీల్స్ ఎడిటింగ్",
        startingPrice: "₹25,000",
        iconName: "Video"
      },
      {
        id: "s-303",
        categorySlug: "stage-mandap-decoration",
        titleEn: "Sangeet Stage, DJ Sound & Truss Lighting",
        titleTe: "సంగీత్ స్టేజ్, డీజే సౌండ్ & లైటింగ్",
        roleEn: "High-wattage acoustic sound & ambient wash lights",
        roleTe: "క్రిస్టల్ క్లియర్ సౌండ్ సిస్టమ్ & కలర్ లైటింగ్",
        startingPrice: "₹20,000",
        iconName: "Headphones"
      }
    ]
  },
  {
    dayNumber: 4,
    dayLabelEn: "Day 04",
    dayLabelTe: "4వ రోజు",
    themeTitleEn: "The Sacred Muhurtham",
    themeTitleTe: "మాంగల్యం, తలంబ్రాలు & జీలకర్ర బెల్లం",
    taglineEn: "Two families become one under Vedic chants, the fragrance of sambrani, and showers of golden Talambralu.",
    taglineTe: "వేద మంత్రాల సాక్షిగా, సాంబ్రాణి సువాసనల నడుమ, బంగారు తలంబ్రాల వర్షంలో ఒక్కటయ్యే రెండు కుటుంబాలు.",
    emotionalHookEn: "The silence when the curtain drops at the exact Muhurtham second, as Jeelakarra-Bellam touches their heads and tears well up in the father's eyes.",
    emotionalHookTe: "తెర తొలగించి జీలకర్ర బెల్లం పెట్టే పవిత్ర క్షణం... వధూవరుల కళ్లల్లో కాంతులు, తల్లిదండ్రుల కళ్లల్లో ఆనంద భాష్పాలు.",
    atmosphereColor: "from-[#762B46] via-[#542034] to-[#292524]",
    ceremonyImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ceremonyDetailsEn: [
      "Jeelakarra Bellam & Mangalasutra Dharana",
      "Joyous Talambralu pearls competition between bride & groom",
      "Saptapadi, Arundhati Nakshatram viewing & Brahma Mudi"
    ],
    ceremonyDetailsTe: [
      "జీలకర్ర బెల్లం & మాంగల్య ధారణ వేడుక",
      "వధూవరుల సరదా తలంబ్రాల పోటీ",
      "సప్తపది అడుగులు, బ్రహ్మముడి & అరుంధతి నక్షత్ర దర్శనం"
    ],
    relatableMemoryEn: "Both families lifting the bride and groom higher so the other can't pour the Talambralu first!",
    relatableMemoryTe: "తలంబ్రాలు ఎవరు ముందు పోయాలన్న పంతంతో వధూవరులను భుజాలపైకి ఎత్తే బావమరుదులు!",
    services: [
      {
        id: "s-401",
        categorySlug: "band-melam-sannai",
        titleEn: "Vedic Purohitulu & Muhurtham Melam",
        titleTe: "వేద పురోహితులు & సన్నాయి మేళం",
        roleEn: "Lagna Patrika, sacred rituals, authentic Nadaswaram",
        roleTe: "శాస్త్రోక్త వివాహ క్రతువు & సన్నాయి వాద్యం",
        startingPrice: "₹15,000",
        iconName: "Flame",
        badgeEn: "Vedic Certified",
        badgeTe: "వేద పండితులు"
      },
      {
        id: "s-402",
        categorySlug: "stage-mandap-decoration",
        titleEn: "Grand Traditional Kalyana Mandapam",
        titleTe: "రాయల్ కళ్యాణ మండప డెకరేషన్",
        roleEn: "Fresh rose & jasmine pandiri, sacred Homa kundam",
        roleTe: "తాజా పూల మండపం, హోమగుండం, రాజసమైన వేదిక",
        startingPrice: "₹35,000",
        iconName: "Building2"
      },
      {
        id: "s-403",
        categorySlug: "wedding-photography",
        titleEn: "Muhurtham High-Speed Candid & Album",
        titleTe: "ముహూర్తం ఫోటోగ్రఫీ & రాయల్ లెదర్ ఆల్బమ్",
        roleEn: "Capturing the split-second Jeelakarra & Talambralu",
        roleTe: "జీలకర్ర బెల్లం క్షణాలను క్లోజప్‌లో బంధించే కళ",
        startingPrice: "₹30,000",
        iconName: "Camera"
      }
    ]
  },
  {
    dayNumber: 5,
    dayLabelEn: "Day 05",
    dayLabelTe: "5వ రోజు",
    themeTitleEn: "The Send-off & Forever Memories",
    themeTitleTe: "అప్పగింతలు, వీడ్కోలు & జ్ఞాపకాలు",
    taglineEn: "Tearful embraces, folded hands of gratitude, and the start of a lifetime of togetherness.",
    taglineTe: "కంటతడి పెట్టించే అప్పగింతలు, బంధువుల ఆశీస్సులు, కలకాలం నిలిచే మధుర జ్ఞాపకాలు.",
    emotionalHookEn: "The bride hugging her mother by the decorated car, whispered promises to call every day, and warm rice thrown back over the shoulders.",
    emotionalHookTe: "అలంకరించిన కారు ఎక్కే ముందు అమ్మను గట్టిగా హత్తుకుని ఏడ్చే బిడ్డ... మా బిడ్డను మీ చేతుల్లో పెడుతున్నామనే తండ్రి ఆవేదన.",
    atmosphereColor: "from-[#292524] via-[#542034] to-[#1C1917]",
    ceremonyImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    ceremonyDetailsEn: [
      "Appaginthalu (Formal handover of the bride with blessings)",
      "Decorated Bridal Farewell car departure",
      "Grand Reception & greeting extended village communities"
    ],
    ceremonyDetailsTe: [
      "శాస్త్రోక్తంగా జరిగే అప్పగింతల కార్యక్రమం",
      "పూలతో అలంకరించిన పెళ్లి కారు వీడ్కోలు",
      "గ్రామ పెద్దలు, స్నేహితులతో ఘనమైన రిసెప్షన్"
    ],
    relatableMemoryEn: "The father smiling bravely through his moist eyes, blessing the newly married couple as the car drives away.",
    relatableMemoryTe: "కళ్లల్లో నీళ్లను దిగమింగుతూ చిరునవ్వుతో చేతులు జోడించి సాగనంపే నాన్న!",
    services: [
      {
        id: "s-501",
        categorySlug: "function-hall-tent-house",
        titleEn: "Reception Stage & Banquet Arrangements",
        titleTe: "రిసెప్షన్ స్టేజ్ & విందు ఏర్పాట్లు",
        roleEn: "Contemporary LED backdrop & family seating",
        roleTe: "గ్రాండ్ రిసెప్షన్ స్టేజ్ & డెకరేషన్",
        startingPrice: "₹25,000",
        iconName: "Sparkles",
        badgeEn: "Grand Finale",
        badgeTe: "ఆఖరి రోజు"
      },
      {
        id: "s-502",
        categorySlug: "wedding-videography",
        titleEn: "Teaser Film & Same-Day Highlight Edit",
        titleTe: "సేమ్ డే వెడ్డింగ్ టీజర్ & రీల్స్",
        roleEn: "Quick turnaround teaser for WhatsApp & Instagram",
        roleTe: "బంధువులకు షేర్ చేసే అందమైన 2 నిమిషాల టీజర్",
        startingPrice: "₹15,000",
        iconName: "Share2"
      },
      {
        id: "s-503",
        categorySlug: "wedding-photography",
        titleEn: "Family Heirloom Wedding Albums",
        titleTe: "రాయల్ వెడ్డింగ్ ఆల్బమ్ డిజైనింగ్",
        roleEn: "Velvet cover, non-tearable metallic print sheets",
        roleTe: "తరతరాలు దాచుకునే ప్రీమియం ఫోటో ఆల్బమ్",
        startingPrice: "₹18,000",
        iconName: "BookOpen"
      }
    ]
  }
];

