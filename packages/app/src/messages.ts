import { UserProfile } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: UserProfile }]
  | ["profile/select", { userid: string }];