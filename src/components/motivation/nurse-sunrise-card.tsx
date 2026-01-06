
export default function NurseSunriseCard() {
  return (
    <div className="relative h-48 rounded-2xl bg-gradient-to-br from-sky-100 to-white p-4 shadow-sm overflow-hidden">
      <p className="z-10 relative text-lg font-semibold text-slate-700">
        Caring hands. Calm mind.
      </p>
      <p className="z-10 relative text-sm text-slate-500">
        A new day to make a difference.
      </p>

      {/* Decorative Sunrise */}
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-200 opacity-40" />
      <div className="absolute bottom-[-20px] right-[-20px] h-56 w-56 rounded-full bg-orange-100 opacity-30" />

      {/* Nurse Silhouette (simple shape) */}
      <div className="absolute bottom-4 left-4 opacity-20 text-6xl">
        🧑‍⚕️
      </div>
    </div>
  );
}
