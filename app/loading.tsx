export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs uppercase tracking-widest text-primary font-bold animate-pulse">Loading Archive...</p>
      </div>
    </div>
  );
}
