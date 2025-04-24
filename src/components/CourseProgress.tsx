
import { cn } from "@/lib/utils";

const courses = [
  {
    name: "Economics",
    hours: 120,
    progress: 100,
    grade: "192/200",
    status: "Completed",
    icon: "📊",
  },
  {
    name: "Physics",
    hours: 18,
    progress: 20,
    status: "In progress",
    icon: "⚛️",
  },
  {
    name: "First Aid",
    hours: 64,
    progress: 74,
    status: "In progress",
    icon: "🏥",
  },
  {
    name: "Literature",
    hours: 0,
    progress: 0,
    status: "In progress",
    icon: "📚",
  },
];

export function CourseProgress() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Course you're taking</h3>
        <button className="text-xs text-muted-foreground hover:text-white">
          Filter by ▾
        </button>
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.name}
            className="p-4 rounded-xl bg-secondary/50 border border-white/10"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{course.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {course.hours} hours spent
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex-1 h-2 rounded-full bg-secondary">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        course.progress === 100 ? "bg-green-500" : "bg-primary"
                      )}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {course.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
