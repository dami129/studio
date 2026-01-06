
export default function NurseSunriseCard() {
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl 
      bg-gradient-to-br from-sky-200 via-blue-100 to-white 
      p-6 shadow-md">
      
      {/* Text */}
      <div className="relative z-10 max-w-sm">
        <h2 className="text-xl font-bold text-slate-800">
          A New Day Begins
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Your care brings hope with every sunrise.
        </p>
      </div>

      {/* Sunrise glow */}
      <div className="absolute bottom-[-30px] right-[-30px] 
        h-64 w-64 rounded-full bg-orange-300 opacity-60" />
      <div className="absolute bottom-[-70px] right-[-70px] 
        h-96 w-96 rounded-full bg-orange-200 opacity-50" />

      {/* Sky accent */}
      <div className="absolute top-0 right-0 h-full w-1/3 
        bg-gradient-to-l from-sky-100 opacity-60" />

      {/* Nurse silhouette */}
      <div className="absolute bottom-6 left-6 
        text-8xl opacity-25">
        🧑‍⚕️
      </div>
    </div>
  );
}
