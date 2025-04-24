
import { Search, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <h1 className="text-2xl font-semibold">My Classes</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="w-10 h-10 rounded-lg bg-secondary/50 border border-white/10 flex items-center justify-center">
          <Bell size={20} className="text-muted-foreground" />
        </button>
        <button className="w-10 h-10 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
