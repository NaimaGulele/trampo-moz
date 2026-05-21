export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/logo.jpg" 
        alt="Trampo Moz Logo" 
        className="w-10 h-10 object-contain"
      />
      <h1 className="font-bold text-lg text-primary hidden sm:inline">
        Trampo Moz
      </h1>
    </div>
  );
}
