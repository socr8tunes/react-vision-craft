
import { BookOpen, Home, BarChart2, Calendar, MessageSquare, Settings, User, List, Award, BookOpenCheck, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: BarChart2, label: "Progress", path: "/progress" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-16 min-h-screen bg-secondary/50 border-r border-white/10 flex flex-col items-center py-4 space-y-8">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <div className="w-4 h-4 text-white">✦</div>
      </div>
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-white"
              )}
            >
              <item.icon size={20} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
