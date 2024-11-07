import { AccountType } from './AccountType';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';

export interface UserAccount {
  id?: number;

  email: string;
  lastLogout: Date;
  accountType: AccountType;
  userProfile: UserProfile;
  userSettings: UserSettings;
}
