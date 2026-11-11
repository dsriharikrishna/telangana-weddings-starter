export interface WeddingEmotionItem {
  id: string;
  emoji: string;
  titleEn: string;
  titleTe: string;
  subtitleEn: string;
  subtitleTe: string;
  photoUrl: string;
  quoteEn: string;
  quoteTe: string;
  accentColor: string;
  connectedCategorySlug: string;
  connectedCategoryTitleEn: string;
  connectedCategoryTitleTe: string;
}

export const WEDDING_EMOTIONS_DATA: WeddingEmotionItem[] = [
  {
    id: "emo-happiness",
    emoji: "😄",
    titleEn: "Happiness",
    titleTe: "పరిపూర్ణ ఆనందం",
    subtitleEn: "Unfiltered smiles & family laughter",
    subtitleTe: "కల్మషం లేని నవ్వులు & బంధువుల సంబరం",
    photoUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    quoteEn: "When the groom's friends pull him into the courtyard dance under the shamiana.",
    quoteTe: "షామియానా కింద పెళ్లికొడుకును ఎత్తుకుని స్నేహితులు చేసే సందడి ఆనందం.",
    accentColor: "from-amber-500/20 to-[#762B46]",
    connectedCategorySlug: "wedding-photography",
    connectedCategoryTitleEn: "Candid Moments Photography",
    connectedCategoryTitleTe: "కాండిడ్ ఫోటోగ్రఫీ"
  },
  {
    id: "emo-hunger",
    emoji: "🍛",
    titleEn: "Feast & Flavor",
    titleTe: "రుచికరమైన విందు ఆకలి",
    subtitleEn: "Telangana Bagara rice & rich Dalcha",
    subtitleTe: "ఘుమఘుమలాడే బగారా అన్నం & దాల్చా",
    photoUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    quoteEn: "No ceremony starts before hot filter coffee, and no one leaves without royal feast contentment.",
    quoteTe: "వేడి వేడి కాఫీ తాగనిదే ముచ్చట్లు మొదలవ్వవు... బగారా దాల్చా తిననిదే కడుపు నిండదు.",
    accentColor: "from-orange-600/20 to-[#542034]",
    connectedCategorySlug: "catering-cooking-team",
    connectedCategoryTitleEn: "Master Cooking Teams",
    connectedCategoryTitleTe: "వంటల బృందాలు"
  },
  {
    id: "emo-fun",
    emoji: "🎺",
    titleEn: "Music & Beats",
    titleTe: "సన్నాయి & డప్పు చప్పుళ్లు",
    subtitleEn: "High-octane baaja melam & dancing",
    subtitleTe: "దడదడలాడే డప్పు శబ్దం & నాట్యాలు",
    photoUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
    quoteEn: "The rhythm of the Dappu echoing across the village street at sunrise.",
    quoteTe: "పొద్దుపొడవగానే వీధి మొదట్లో వినిపించే సన్నాయి నాదం & డప్పు మోత.",
    accentColor: "from-rose-600/20 to-[#762B46]",
    connectedCategorySlug: "band-melam-sannai",
    connectedCategoryTitleEn: "Band & Sannai Melam",
    connectedCategoryTitleTe: "బ్యాండ్ బాజా & సన్నాయి"
  },
  {
    id: "emo-tears",
    emoji: "🥺",
    titleEn: "Tears & Send-off",
    titleTe: "కంటతడి పెట్టించే అప్పగింతలు",
    subtitleEn: "A father's proud hug, mother's whispered blessing",
    subtitleTe: "తండ్రి నిండిన కళ్లు... తల్లి అపురూప ఆలింగనం",
    photoUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    quoteEn: "The silence when the daughter takes her first step out of the parental threshold.",
    quoteTe: "పుట్టింటి గడప దాటి అత్తారింటికి అడుగులు వేసే క్షణం... మాటలు రాని భావోద్వేగం.",
    accentColor: "from-stone-800/40 to-[#292524]",
    connectedCategorySlug: "wedding-videography",
    connectedCategoryTitleEn: "Emotional Cinematic Films",
    connectedCategoryTitleTe: "సినిమాటిక్ వెడ్డింగ్ ఫిల్మ్స్"
  }
];

