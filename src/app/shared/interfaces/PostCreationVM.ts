import { Technology } from "./Technology";

export interface PostCreationVM {
    content: string;
    posterId: number;
    attachmentList?: File[];
    technologyList?: Technology[];
}