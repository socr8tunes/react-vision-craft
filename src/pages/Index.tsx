
import { Analytics } from "@/components/Analytics";
import { CourseProgress } from "@/components/CourseProgress";
import { FeaturedCourse } from "@/components/FeaturedCourse";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <FeaturedCourse />
          <div className="grid grid-cols-2 gap-6">
            <CourseProgress />
            <Analytics />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
