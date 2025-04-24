
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseData {
  name: string;
  progress: number;
}

interface CourseProgressListProps {
  courses: CourseData[];
}

export function CourseProgressList({ courses }: CourseProgressListProps) {
  return (
    <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
      <h3 className="font-medium mb-6">Course Progress</h3>
      
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="border border-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{course.name}</h4>
              <span className="text-sm">{course.progress}%</span>
            </div>
            <Progress 
              value={course.progress} 
              className={cn(
                "h-2",
                course.progress === 100 ? "bg-green-500" : ""
              )}
            />
            <div className="flex justify-end mt-2">
              {course.progress === 100 ? (
                <span className="text-xs text-green-500 flex items-center">
                  <Award size={14} className="mr-1" />
                  Completed
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">In Progress</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
