
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, FileText, MessageSquare, Award, Clock, Users, ChevronRight, Star, BookOpen } from "lucide-react";

// Mock course data (in a real app, this would come from an API)
const courseData = {
  "1": {
    id: "1",
    title: "Introduction to Physics",
    description: "Learn the fundamental principles of physics that govern the physical world around us. This course will take you through mechanics, thermodynamics, electricity and more.",
    category: "Science",
    image: "/lovable-uploads/e3324ac6-d92f-466e-919b-2206517abfb4.png",
    instructor: "Dr. Richard Feynman",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 1245,
    rating: 4.8,
    progress: 20,
    modules: [
      {
        title: "Introduction to Classical Mechanics",
        lessons: [
          { title: "Newton's Laws of Motion", duration: "45 min", type: "video", completed: true },
          { title: "Conservation of Energy", duration: "50 min", type: "video", completed: true },
          { title: "Momentum and Collisions", duration: "55 min", type: "video", completed: false },
          { title: "Module Quiz", duration: "30 min", type: "quiz", completed: false }
        ]
      },
      {
        title: "Thermodynamics",
        lessons: [
          { title: "Heat and Temperature", duration: "40 min", type: "video", completed: false },
          { title: "The Laws of Thermodynamics", duration: "60 min", type: "video", completed: false },
          { title: "Entropy and Disorder", duration: "45 min", type: "video", completed: false },
          { title: "Module Quiz", duration: "30 min", type: "quiz", completed: false }
        ]
      },
      {
        title: "Electricity and Magnetism",
        lessons: [
          { title: "Electric Charge and Fields", duration: "50 min", type: "video", completed: false },
          { title: "Electric Potential", duration: "45 min", type: "video", completed: false },
          { title: "Circuits and Current", duration: "55 min", type: "video", completed: false },
          { title: "Magnetic Fields", duration: "60 min", type: "video", completed: false },
          { title: "Module Quiz", duration: "30 min", type: "quiz", completed: false }
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer through this comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js and more.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop",
    instructor: "Sarah Johnson",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 3421,
    rating: 4.9,
    progress: 0,
    modules: [
      {
        title: "HTML & CSS Fundamentals",
        lessons: [
          { title: "Introduction to HTML", duration: "45 min", type: "video", completed: false },
          { title: "CSS Styling", duration: "60 min", type: "video", completed: false },
          { title: "Responsive Design", duration: "55 min", type: "video", completed: false },
          { title: "HTML/CSS Project", duration: "120 min", type: "project", completed: false }
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JavaScript Basics", duration: "60 min", type: "video", completed: false },
          { title: "DOM Manipulation", duration: "55 min", type: "video", completed: false },
          { title: "Event Handling", duration: "45 min", type: "video", completed: false },
          { title: "JavaScript Quiz", duration: "30 min", type: "quiz", completed: false }
        ]
      }
    ]
  }
};

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const course = courseData[courseId as keyof typeof courseData];
  
  if (!course) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Course not found</h2>
              <Link to="/courses" className="text-primary hover:underline">
                Return to courses page
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <Link to="/courses" className="text-sm text-muted-foreground hover:text-white flex items-center">
              <ChevronRight className="rotate-180 mr-1" size={16} />
              Back to courses
            </Link>
          </div>
          
          {/* Course header */}
          <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/80 to-blue-900/80 mb-8">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
            <div className="relative z-20 h-full p-8 flex flex-col justify-end">
              <div className="flex items-center mb-2">
                <span className="text-xs px-3 py-1 bg-primary/30 border border-primary/40 text-white rounded-full mr-3">{course.category}</span>
                <span className="text-xs px-3 py-1 bg-white/10 text-white rounded-full">{course.level}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
              <div className="flex items-center text-white/80">
                <p className="mr-4 text-sm">By {course.instructor}</p>
                <div className="flex items-center mr-4 text-sm">
                  <Clock size={14} className="mr-1" />
                  <p>{course.duration}</p>
                </div>
                <div className="flex items-center mr-4 text-sm">
                  <Users size={14} className="mr-1" />
                  <p>{course.enrolled.toLocaleString()} students</p>
                </div>
                <div className="flex items-center text-sm">
                  <Star size={14} className="mr-1 text-yellow-400" />
                  <p>{course.rating}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course progress */}
          <div className="bg-secondary/50 border border-white/10 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Your progress</h3>
              <span className="text-sm">{completedLessons} of {totalLessons} lessons completed</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <div className="mt-4 flex justify-end">
              <Link 
                to={course.progress > 0 ? `/courses/${courseId}/learn` : `/courses/${courseId}/learn?start=true`} 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
              >
                <span className="text-sm font-medium">
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                </span>
              </Link>
            </div>
          </div>
          
          {/* Course content tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="bg-secondary/50 border border-white/10 p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="curriculum" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger 
                value="discussions" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Discussions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">About this course</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                  
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.modules.map((module, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="mr-2 mt-1 text-primary">•</div>
                          <span>{module.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">This course includes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <PlayCircle size={18} className="mr-3 text-primary" />
                        <span>{totalLessons - course.modules.length} video lessons</span>
                      </li>
                      <li className="flex items-center">
                        <FileText size={18} className="mr-3 text-primary" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center">
                        <MessageSquare size={18} className="mr-3 text-primary" />
                        <span>Discussion forum</span>
                      </li>
                      <li className="flex items-center">
                        <Award size={18} className="mr-3 text-primary" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-secondary mr-3"></div>
                      <div>
                        <p className="font-medium">{course.instructor}</p>
                        <p className="text-sm text-muted-foreground">Course Instructor</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Expert instructor with years of experience in teaching and research.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Course Curriculum</h3>
                
                <div className="space-y-6">
                  {course.modules.map((module, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                      <div className="bg-secondary/70 px-6 py-4">
                        <h4 className="font-semibold">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">{module.lessons.length} lessons</p>
                      </div>
                      <div className="divide-y divide-white/5">
                        {module.lessons.map((lesson, lessonIdx) => (
                          <div key={lessonIdx} className="px-6 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              {lesson.type === 'video' && <PlayCircle size={18} className="mr-3 text-muted-foreground" />}
                              {lesson.type === 'quiz' && <FileText size={18} className="mr-3 text-muted-foreground" />}
                              {lesson.type === 'project' && <BookOpen size={18} className="mr-3 text-muted-foreground" />}
                              <div>
                                <p className={`${lesson.completed ? "text-muted-foreground line-through" : ""}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                            {lesson.completed && (
                              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Course Discussions</h3>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Join the conversation and connect with fellow students.</p>
                  <button className="mt-4 px-4 py-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors">
                    View All Discussions
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
