
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schedule, ShiftType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const shiftColors: Record<ShiftType, string> = {
  Morning: "bg-blue-200 text-blue-800",
  Evening: "bg-orange-200 text-orange-800",
  Night: "bg-indigo-200 text-indigo-800",
  'Overtime (Morning)': "bg-yellow-300 text-yellow-900",
  'Overtime (Evening)': "bg-yellow-300 text-yellow-900",
  'Overtime (Night)': "bg-yellow-300 text-yellow-900",
  Training: "bg-green-200 text-green-800",
  'Leave (CL/VL/SL)': "bg-purple-200 text-purple-800",
  'Off (Day Off)': "bg-gray-200 text-gray-800",
};

function ShiftBadge({ type }: { type: ShiftType }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-bold rounded-full",
        shiftColors[type] || "bg-gray-200 text-gray-800"
      )}
    >
      {t(`shift_${type}`)}
    </span>
  );
}

export function DutyCard({ schedule }: { schedule: Schedule | { next: null; previous: null } }) {
  const { t } = useLanguage();
  const { next, previous } = schedule;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-5 h-5 text-primary" />
          <span>{t('duty_schedule')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4 justify-center">
        {next ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t('next_duty')}
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <ShiftBadge type={next.type} />
              <div className="text-right">
                <p className="font-semibold">{format(parseISO(next.date), "EEE, MMM d")}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(parseISO(next.date), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">{t('no_upcoming_duties')}</p>
        )}
        {previous && (
           <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t('previous_duty')}
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <ShiftBadge type={previous.type} />
              <div className="text-right">
                <p className="font-semibold">
                  {format(parseISO(previous.date), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(parseISO(previous.date), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
