
export function FeaturedCourse() {
  return (
    <div className="relative h-[200px] rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 mb-8">
      <div className="relative z-10">
        <span className="text-purple-400 text-sm font-medium">Physics</span>
        <h2 className="text-3xl font-bold mt-2 mb-4">
          The study of the<br />structure of matter.
        </h2>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors">
          <span className="text-sm font-medium">CONTINUE COURSE</span>
        </button>
      </div>
      <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-50 bg-[url('/lovable-uploads/e3324ac6-d92f-466e-919b-2206517abfb4.png')] bg-contain bg-right-bottom bg-no-repeat" />
    </div>
  );
}
