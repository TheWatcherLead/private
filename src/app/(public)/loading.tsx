export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1117]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#2E3447]" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#C9A96E] animate-spin" />
        </div>
        <p className="font-sans text-xs tracking-widest uppercase text-[#A89F94]">Loading</p>
      </div>
    </div>
  )
}
