import { Attachment } from './Attachment';
import { Technology } from './Technology';
import { Like } from './Like';
import { Comment } from './Post';

export interface ScientificArticlePost {
    id?: number;
    content: string;
    likesCount: number;
    createdAt?: string;
    modifiedAt?: string;
    //poster?: UserAccount; // Todo: implement a userAccount interface
    attachmentList?: Attachment[];
    technologyList?: Technology[];
    likesList?: Like[];
    commentList?: Comment[];
    articleId?: number;
}
