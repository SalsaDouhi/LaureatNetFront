export interface EntrepriseVM {
    id?: number;
    title: string;
    //logo: File;
    localisationX: number;
    localisationY: number;
    tel: string;
    email: string;
    website: string;
    internshipOfferList?: any[]; 
    jobOfferList?: any[];
}
