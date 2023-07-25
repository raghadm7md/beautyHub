export interface ISalon {
  saloonId: number;
  nameAr: string;
  nameEn: string;
  logo: string;
  descrpitonEn: string;
  descrpitonAr: string;
  location: string;
}

export interface IService {
  serviceId: number;
  saloonId: number;
  nameEn: string;
  nameAr: string;
  isAvailable: number;
  descriptionAr: string;
  descriptionEn: string;
  serviceAvailabilityStart: string;
  serviceAvailabilityEnd: string;
  img: string;
  isAvailableAtHome: number;
  durationInHours: number;
  durationInMinutes: number;
  deposit: number;
  price: number;
}

export interface IStylist {
  assignId: number;
  stylistId: number;
  serviceId: number;
  nameEn: string;
  nameAr: string;
}
