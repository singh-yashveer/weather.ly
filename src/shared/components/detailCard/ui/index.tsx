import type { DetailCardProps } from "../model/types";

function DetailCard({ detail, label, icon }: DetailCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
      <div className="flex-shrink-0 text-accent dark:text-primary">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
          {detail || "--"}
        </p>
      </div>
    </div>
  );
}

export default DetailCard;
