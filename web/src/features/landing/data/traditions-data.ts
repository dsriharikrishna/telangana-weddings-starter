export interface HeritageTradition {
  id: string;
  number: string;
  nameEn: string;
  nameTe: string;
  significanceEn: string;
  significanceTe: string;
  photoUrl: string;
  ritualSymbol: string;
  essentialItemsEn: string[];
  essentialItemsTe: string[];
  connectedCategorySlug: string;
  connectedCategoryTitleEn: string;
  connectedCategoryTitleTe: string;
}

export const TELANGANA_HERITAGE_TRADITIONS: HeritageTradition[] = [
  {
    id: "trad-01",
    number: "01",
    nameEn: "Jeelakarra Bellam & Muhurtham",
    nameTe: "జీలకర్ర బెల్లం & ముహూర్త బలం",
    significanceEn: "Placing cumin seeds and jaggery paste on each other's head at the exact auspicious second, symbolizing the inseparable union of two souls.",
    significanceTe: "జీలకర్ర మరియు బెల్లం మిశ్రమాన్ని సరైన ముహూర్త కాలంలో ఒకరి తలపై ఒకరు ఉంచే పవిత్ర క్రతువు. చేదు, తీపి కలగలిసిన జీవితాన్ని సమభావంతో స్వీకరించే సంకేతం.",
    photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ritualSymbol: "🌿",
    essentialItemsEn: ["Vedic Purohitulu", "Lagna Patrika", "Curtain (Theracheera)"],
    essentialItemsTe: ["వేద పురోహితులు", "లగ్న పత్రిక", "తెరచీర"],
    connectedCategorySlug: "band-melam-sannai",
    connectedCategoryTitleEn: "Purohitulu & Siddhanti",
    connectedCategoryTitleTe: "పురోహితులు & సిద్ధాంతులు"
  },
  {
    id: "trad-02",
    number: "02",
    nameEn: "Golden Talambralu Showers",
    nameTe: "బంగారు ముత్యాల తలంబ్రాలు",
    significanceEn: "Showers of sacred rice mixed with turmeric, rose water, and pearls poured playfully by bride and groom over each other.",
    significanceTe: "పసుపు, ఆవు నెయ్యి, గులాబీ నీరు మరియు ముత్యాలతో కలిపిన పవిత్ర బియ్యాన్ని వధూవరులు ఒకరిపై ఒకరు సరదాగా పోసుకునే ఆనందమయ వేడుక.",
    photoUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    ritualSymbol: "🌾",
    essentialItemsEn: ["Talambralu Rice", "Brass Basins", "Basikam & Garlands"],
    essentialItemsTe: ["పసుపు తలంబ్రాలు", "ఇత్తడి గిన్నెలు", "బాసికం & పూలదండలు"],
    connectedCategorySlug: "wedding-photography",
    connectedCategoryTitleEn: "Candid Talambralu Shoot",
    connectedCategoryTitleTe: "తలంబ్రాల కాండిడ్ ఫోటోగ్రఫీ"
  },
  {
    id: "trad-03",
    number: "03",
    nameEn: "Traditional Sannai Melam",
    nameTe: "మంగళ సన్నాయి & డప్పు మేళం",
    significanceEn: "The sacred sound of the Nadaswaram dispelling negative energy and filling the village with divine vibration at dawn.",
    significanceTe: "ఉదయాన్నే వీధుల్లో మారుమోగే సన్నాయి రాగాలు, డప్పు చప్పుళ్లు... సకల శుభాలను ఆవాహన చేస్తూ నూతన దంపతులను ఆశీర్వదించే మంగళ వాద్యాలు.",
    photoUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
    ritualSymbol: "🪈",
    essentialItemsEn: ["Nadaswaram Maestros", "Dolu & Dappu Artists", "Procession Band"],
    essentialItemsTe: ["నాదస్వర విద్వాంసులు", "డోలు & డప్పు కళాకారులు", "ఊరేగింపు బాజా"],
    connectedCategorySlug: "band-melam-sannai",
    connectedCategoryTitleEn: "Sannai Melam Teams",
    connectedCategoryTitleTe: "సన్నాయి మేళం బృందాలు"
  },
  {
    id: "trad-04",
    number: "04",
    nameEn: "Pochampally, Gadwal & Narayanpet Handlooms",
    nameTe: "గద్వాల, నారాయణపేట & పోచంపల్లి పట్టు",
    significanceEn: "Handcrafted pure silk sarees woven with gold zari borders by generational Telangana master weavers.",
    significanceTe: "తరతరాల అనుభవంతో నేసిన స్వచ్ఛమైన చేనేత పట్టు చీరలు, జరీ అంచులు... తెలంగాణ వివాహ వైభవానికి నిండైన ప్రతిరూపాలు.",
    photoUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ritualSymbol: "✨",
    essentialItemsEn: ["Pure Zari Pattu", "Temple Jewelry", "Groom Dhoti & Kanduva"],
    essentialItemsTe: ["స్వచ్ఛమైన పట్టు చీరలు", "టెంపుల్ నగల అద్దె", "పెళ్లికొడుకు ధోవతి జత"],
    connectedCategorySlug: "bridal-makeup",
    connectedCategoryTitleEn: "Bridal Wear & Jewelry",
    connectedCategoryTitleTe: "పెళ్లి పట్టు చీరలు & నగలు"
  }
];

