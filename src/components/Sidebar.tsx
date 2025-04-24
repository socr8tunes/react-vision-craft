
import { Home, BookOpen, BarChart2, Calendar, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: BookOpen, label: "Classes" },
  { icon: BarChart2, label: "Statistics" },
  { icon: Calendar, label: "Schedule" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <div className="w-16 min-h-screen bg-secondary/50 border-r border-white/10 flex flex-col items-center py-4 space-y-8">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <div className="w-4 h-4 text-white">✦</div>
      </div>
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              item.active
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-primary/10 hover:text-white"
            )}
          >
            <item.icon size={20} />
          </button>
        ))}
      </nav>
    </div>
  );
}
