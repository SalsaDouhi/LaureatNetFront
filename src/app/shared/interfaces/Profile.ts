import { Like } from './Like';
import { Post } from './Post';
import { Section } from './Section';
import { UserProfile } from './UserProfile';
import { Comment } from './Comment';

export interface Profile {
  userId: number;
  email: string;
  userProfile: UserProfile;
  isOwner: boolean;

  posts: Post[];
  friends: Profile[];
  comments: Comment[];
  likes: Like[];
  sections: Section[];
}
