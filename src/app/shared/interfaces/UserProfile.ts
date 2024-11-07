export interface UserProfile {
  id?: number;

  firstName: String;
  lastName: String;
  birthDate: Date;
  gender: Boolean;
  bio: String;
  picture: string;
  banner: string;
  location?: String;
  currentPosition?: String;
  major?: String;
  currentGrade?: String;
  graduated?: String;

  website?: String;
  facebook?: String;
  instagram?: String;
  twitter?: String;
  youtube?: String;
  linkedin?: String;

  userAccountId: number;
}
