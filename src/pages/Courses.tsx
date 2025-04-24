
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  "All", "Technology", "Business", "Law", "Medicine", "Science", "Arts"
];

const coursesList = [
  {
    id: "1",
    title: "Introduction to Physics",
    category: "Science",
    image: "/lovable-uploads/e3324ac6-d92f-466e-919b-2206517abfb4.png",
    instructor: "Dr. Richard Feynman",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 1245,
    rating: 4.8
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop",
    instructor: "Sarah Johnson",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 3421,
    rating: 4.9
  },
  {
    id: "3",
    title: "Business Administration",
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop",
    instructor: "Mark Thompson",
    level: "Advanced",
    duration: "10 weeks",
    enrolled: 2187,
    rating: 4.7
  },
  {
    id: "4",
    title: "Medical Terminology",
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500&h=350&fit=crop",
    instructor: "Dr. Emily Chen",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: 1823,
    rating: 4.6
  }
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCourses = coursesList.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Browse Courses</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="search"
                  placeholder="Find a course..."
                  className="w-64 h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>
              <button className="h-10 px-4 rounded-lg bg-secondary/50 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white">
                <Filter size={18} className="mr-2" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <Tabs defaultValue="All" className="mb-8">
            <TabsList className="bg-secondary/50 border border-white/10 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id} className="block">
                <div className="bg-secondary/50 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground rounded-full">{course.category}</span>
                      <span className="text-xs text-muted-foreground">{course.level}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">By {course.instructor}</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                      <div className="flex items-center">
                        <span className="text-xs mr-1">⭐</span>
                        <span className="text-xs">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
