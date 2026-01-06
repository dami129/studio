import { AffirmationsPlayer } from "@/components/motivation/affirmations-player";
import NurseSunriseCard from "@/components/motivation/nurse-sunrise-card";
import { SelfCareCards } from "@/components/motivation/self-care-cards";


export default function MotivationPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Motivational Hub
        </h1>
        <p className="text-muted-foreground mt-1">
            A quiet space for self-care and encouragement.
        </p>
      </div>
      
      <NurseSunriseCard />
      <SelfCareCards />
      <AffirmationsPlayer />
    </div>
  );
}
