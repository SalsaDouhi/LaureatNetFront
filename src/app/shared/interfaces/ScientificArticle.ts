//import { UserAccount } from './UserAccount';
import { ScientificArticlePost } from './ScientificArticlePost';
export interface ScientificArticle {
    id?: number;
    title: string;
    dataPublished: string; // Date as string in ISO format; Todo: reconsider later
    path: string;
    authors: string;
    postList?: ScientificArticlePost[];
    publisherId?: number;
}
