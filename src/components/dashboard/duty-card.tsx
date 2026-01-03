import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schedule, ShiftType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Clock } from "lucide-react";

const shiftColors: Record<ShiftType, string> = {
  Morning: "bg-blue-200 text-blue-800",
  Evening: "bg-orange-200 text-orange-800",
  Night: "bg-indigo-200 text-indigo-800",
  Off: "bg-gray-200 text-gray-800",
  Leave: "bg-purple-200 text-purple-800",
  Overtime: "bg-yellow-200 text-yellow-800",
};

function ShiftBadge({ type }: { type: ShiftType }) {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-bold rounded-full",
        shiftColors[type]
      )}
    >
      {type}
    </span>
  );
}

export function DutyCard({ schedule }: { schedule: Schedule }) {
  const { next, previous } = schedule;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Duty Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Next Duty
          </h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <ShiftBadge type={next.type} />
            <div className="text-right">
              <p className="font-semibold">{format(new Date(next.date), "EEE, MMM d")}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(next.date), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Previous Duty
          </h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <ShiftBadge type={previous.type} />
            <div className="text-right">
              <p className="font-semibold">
                {format(new Date(previous.date), "EEE, MMM d")}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(previous.date), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
