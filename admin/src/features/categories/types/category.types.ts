export interface AdminCategory {
  id: string;
  slug: string;
  number?: number;
  nameEn: string;
  nameTe: string;
  descriptionEn?: string;
  descriptionTe?: string;
  iconName?: string;
  image?: string;
  subcategories?: {
    id: string;
    slug: string;
    nameEn: string;
    nameTe: string;
  }[];
}

