import { ReactNode } from "@tanstack/react-router";

export interface DetailCardProps {
  detail: string | number | undefined;
  label: string | undefined;
  icon: ReactNode;
}
