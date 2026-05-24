export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        {/* Gradient background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg transform -rotate-12"></div>
        {/* Logo icon - briefcase with jobs */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg rounded-lg transform -rotate-12">
          💼
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Trampo Moz
        </h1>
        <p className="text-xs text-blue-500 font-medium">Emprego em MZ</p>
      </div>
    </div>
  );
}
