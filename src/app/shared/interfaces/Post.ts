import { Like } from "./Like";

export interface Comment {
    id: number;
    content: string;
    userId: number;
    userFullName: string;
    userUsername: string;
    userProfileImage: string;
    createdAt: string;
    modifiedAt?: string;
  }
  
  export interface Post {
    // Common fields
    id: number;
    content: string;
    likesCount: number;
    createdAt: string;
    modifiedAt: string;
  
    userId: number;
    userUsername: string;
    userFullName: string;
    userProfileImage: string;
  
    postType: string;
  
    // Fields specific to InternshipOffer
    internshipDuration?: string;
    internshipStartDate?: string;
    internshipEndDate?: string;
    internshipTitle?: string;
  
    // Fields specific to JobOffer
    jobStartDate?: string;
    jobEndDate?: string;
    jobTitle?: string;
    
    
    entrepriseId?: number;
    entrepriseName?: string;
    entrepriseImage?: string;
  
    // Fields specific to ScientificArticlePost
    scientificArticleId?: number;
    scientificArticleTitle?: string;
    scientificArticleDatePublished?: string;
    scientificArticlePath?: string;
    scientificArticleAuthors?: string;
    scientificArticlePublisherId?: number;
    scientificArticlePublisherName?: string;
  
    // Comments
    comments: Comment[];
  
    // Technologies map
    technologies: { [id: number]: [title:string] };
  
    // Attachments
    attachments: string[];
  
    // Likers' names
    likes: Like[];


    liked?:boolean;
  }