export interface JobOfferCreationVM {
    content: string;
    entrepriseId: number;
    startDate: Date | null;
    endDate: Date | null;
    jobTitle: string;
    attachments: File[];
    posterId:number;
    technologyList : number[]
}