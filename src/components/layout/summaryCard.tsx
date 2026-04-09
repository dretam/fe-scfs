import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

type SummaryCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color?: "orange" | "yellow" | "green" | "blue" | "red";
};

const colorStyles = {
  orange: "bg-orange-100 text-orange-600",
  yellow: "bg-yellow-100 text-yellow-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
};

export function SummaryCard({
  title,
  value,
  icon,
  color = "blue",
}: SummaryCardProps) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${colorStyles[color]}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-lg font-semibold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}