import { AccountType } from './AccountType';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';

export interface UserAccountMV {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: boolean;
  role: string;
  roleId: number;
  major?: string;
  currentGrade?: string;
}
