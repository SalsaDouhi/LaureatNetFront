export interface InternshipOfferCreationVM {
    content: string;
    entrepriseId: number;
    roleTitle: string;
    startDate: Date | null;
    endDate: Date | null;
    duration: string;
    attachments: File[];
    posterId:number;
    technologyList : number[]
}