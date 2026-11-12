export interface District {
  id: string;
  nameEn: string;
  nameTe: string;
  code: string;
  sortOrder: number;
}

export interface Mandal {
  id: string;
  nameEn: string;
  nameTe: string;
  districtId: string;
}

export interface Village {
  id: string;
  nameEn: string;
  nameTe: string;
  mandalId: string;
}

export interface LocationSearchResult {
  districts: District[];
  mandals: Mandal[];
  villages: Village[];
}
