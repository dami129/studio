
export default function NurseSunriseCard() {
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-blue-50 to-white p-6 shadow-sm">
      
      {/* Text */}
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-slate-700">
          A New Day Begins
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your care brings hope with every sunrise.
        </p>
      </div>

      {/* Sunrise */}
      <div className="absolute bottom-[-40px] right-[-40px] h-56 w-56 rounded-full bg-orange-200 opacity-40" />
      <div className="absolute bottom-[-70px] right-[-70px] h-72 w-72 rounded-full bg-orange-100 opacity-30" />

      {/* Soft clouds */}
      <div className="absolute top-10 right-20 h-10 w-20 rounded-full bg-white opacity-40" />
      <div className="absolute top-14 right-32 h-8 w-14 rounded-full bg-white opacity-30" />

      {/* Nurse silhouette */}
      <div className="absolute bottom-4 left-6 text-7xl opacity-20">
        🧑‍⚕️
      </div>
    </div>
  );
}
