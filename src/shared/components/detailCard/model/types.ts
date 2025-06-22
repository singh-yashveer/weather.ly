import { ReactNode } from "react";

export interface DetailCardProps {
  detail: string | number | undefined;
  label: string;
  icon: ReactNode;
  className?: string;
}
