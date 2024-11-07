export interface UserSettings {
  id?: number;

  acceptMsgs: boolean;

  privateMsgs: boolean;
  administrativePosts: boolean;
  connectionRequest: boolean;

  userAccountId: number;
}
