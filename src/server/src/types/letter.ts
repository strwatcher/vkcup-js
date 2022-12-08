import { Flag } from "./flag";
import { Folder } from "./folder";
import { User } from "./user";

export type Letter = {
  author: User;
  to: Array<User>;
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  folder: Folder;
  date: string;
  flag: Flag;
  doc: any;
};
