import { cloneElement } from "react";

import type { DetailCardProps } from "../model/types";

function DetailCard({ detail, label, icon }: DetailCardProps) {
  return (
    <div className="flex items-center gap-2">
      <div>{cloneElement(icon, { size: 28 })}</div>
      <div>
        <p className="text-lg leading-6 font-semibold">{detail}</p>
        <p className="text-base leading-5 font-medium">{label}</p>
      </div>
    </div>
  );
}

export default DetailCard;
