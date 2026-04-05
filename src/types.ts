import { LucideIcon } from "lucide-react";

export type ToolCategory = 
  | "AI & Language"
  | "Communication"
  | "Time & Focus"
  | "Utilities"
  | "Documents & Media"
  | "Organization"
  | "Creativity & Wellbeing";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  color: string;
}
