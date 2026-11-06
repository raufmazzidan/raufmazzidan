import { LucideIcon } from "lucide-react";

export interface IPlaygroundLink {
  url: string;
  label: string;
}

export interface IPlayground {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  primaryLink: IPlaygroundLink;
  secondaryLinks?: IPlaygroundLink[];
  stack: string[];
}

