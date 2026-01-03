import { RosterCalendar } from "@/components/roster/roster-calendar";
import { RosterSummary } from "@/components/roster/roster-summary";
import { mockDuties } from "@/lib/data";

export default function RosterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Duty Roster
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your monthly shifts and track your schedule.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RosterCalendar duties={mockDuties} />
        </div>
        <div>
            <RosterSummary duties={mockDuties} />
        </div>
      </div>
    </div>
  );
}
