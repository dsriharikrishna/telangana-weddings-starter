export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
  iconName?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
