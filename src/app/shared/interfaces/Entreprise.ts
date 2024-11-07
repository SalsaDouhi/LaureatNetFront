export interface Entreprise {
    id?: number;
    title: string;
    logo: string;
    localisationX: number;
    localisationY: number;
    tel: string;
    email: string;
    website: string;
    internshipOfferList?: any[]; 
    jobOfferList?: any[];
}
