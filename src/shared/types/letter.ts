import { IAttachments } from "./attachmets";
import { IFlag } from "./flag";
import { IFolder } from "./folder";
import { IUser } from "./user";

export type ILetter = {
  author: IUser;
  to: Array<IUser>;
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  folder: IFolder;
  date: string;
  flag: IFlag;
  doc: IAttachments;
};
