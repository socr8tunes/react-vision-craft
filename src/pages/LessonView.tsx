import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, MessageSquare, CheckCircle, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock course data (in a real app, this would come from an API)
const courseData = {
  "1": {
    id: "1",
    title: "Introduction to Physics",
    progress: 20,
    modules: [
      {
        id: "m1",
        title: "Introduction to Classical Mechanics",
        lessons: [
          { 
            id: "l1", 
            title: "Newton's Laws of Motion", 
            duration: "45 min", 
            type: "video", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/6wjqLAaCAyw",
            content: "Newton's laws of motion are three physical laws that form the basis for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it."
          },
          { 
            id: "l2", 
            title: "Conservation of Energy", 
            duration: "50 min", 
            type: "video", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/IqV5L66EP2E",
            content: "The law of conservation of energy states that energy can neither be created nor destroyed - only converted from one form of energy to another."
          },
          { 
            id: "l3", 
            title: "Momentum and Collisions", 
            duration: "55 min", 
            type: "video", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/4X6Yyf-Vjzg",
            content: "Momentum is a vector quantity that represents the product of an object's mass and velocity. In an isolated system, the total momentum is conserved."
          },
          { 
            id: "l4", 
            title: "Module Quiz", 
            duration: "30 min", 
            type: "quiz", 
            completed: false,
            quizUrl: "/courses/1/quiz/m1"
          }
        ]
      },
      {
        id: "m2",
        title: "Thermodynamics",
        lessons: [
          { 
            id: "l5", 
            title: "Heat and Temperature", 
            duration: "40 min", 
            type: "video", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/Xb05CaG7TsQ",
            content: "Heat is the transfer of energy from one system to another due to temperature difference. Temperature is a measure of the average kinetic energy of particles in a substance."
          },
          // ... more lessons
        ]
      },
    ]
  }
};

export default function LessonView() {
  const { toast } = useToast();
  const { courseId, moduleId, lessonId } = useParams<{ courseId: string, moduleId: string, lessonId: string }>();
  const [searchParams] = useSearchParams();
  const startParam = searchParams.get("start");
  
  const [activeTab, setActiveTab] = useState("content");
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  
  // Get all lessons in a flat array for easier navigation
  useEffect(() => {
    const selectedCourse = courseData[courseId as keyof typeof courseData];
    if (selectedCourse) {
      setCourse(selectedCourse);
      
      // Create a flat array of all lessons across modules
      const lessonsArray: any[] = [];
      selectedCourse.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          lessonsArray.push({
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title
          });
        });
      });
      
      setAllLessons(lessonsArray);
      
      // If lessonId is provided, find that lesson
      if (lessonId) {
        const foundLesson = lessonsArray.find(lesson => lesson.id === lessonId);
        if (foundLesson) {
          setCurrentLesson(foundLesson);
        }
      } 
      // If start param is true, start with first lesson
      else if (startParam === "true" && lessonsArray.length > 0) {
        setCurrentLesson(lessonsArray[0]);
      }
      // Otherwise start with the first incomplete lesson
      else {
        const firstIncompleteLesson = lessonsArray.find(lesson => !lesson.completed);
        if (firstIncompleteLesson) {
          setCurrentLesson(firstIncompleteLesson);
        } else {
          setCurrentLesson(lessonsArray[0]);
        }
      }
    }
  }, [courseId, lessonId, startParam]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;
  
  const markAsComplete = () => {
    // In a real app, this would update the database
    toast({
      title: "Lesson completed",
      description: "Your progress has been updated."
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <Link to={`/courses/${courseId}`} className="text-sm text-muted-foreground hover:text-white flex items-center">
              <ChevronRight className="rotate-180 mr-1" size={16} />
              Back to course
            </Link>
          </div>
          
          {/* Progress header */}
          <div className="bg-secondary/50 border border-white/10 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Course progress</h3>
              <span className="text-sm">{course.progress}% complete</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          {/* Lesson navigation */}
          <div className="bg-secondary/50 border border-white/10 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{currentLesson.moduleTitle}</p>
                <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
              </div>
              <div className="flex space-x-2">
                {previousLesson && (
                  <Link 
                    to={`/courses/${courseId}/learn/${previousLesson.id}`}
                    className="px-3 py-1.5 bg-secondary text-muted-foreground rounded-lg hover:bg-secondary/80 flex items-center"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    <span className="text-sm">Previous</span>
                  </Link>
                )}
                
                {nextLesson && (
                  <Link 
                    to={`/courses/${courseId}/learn/${nextLesson.id}`}
                    className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
                  >
                    <span className="text-sm">Next</span>
                    <ChevronRight size={18} className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Lesson content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentLesson.type === "video" && (
                <div className="bg-secondary/50 border border-white/10 rounded-lg overflow-hidden mb-6">
                  <div className="aspect-video w-full bg-black flex items-center justify-center">
                    <iframe 
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {currentLesson.type === "quiz" && (
                <div className="bg-secondary/50 border border-white/10 rounded-lg p-8 text-center mb-6">
                  <h3 className="text-xl font-semibold mb-4">Ready for the quiz?</h3>
                  <p className="text-muted-foreground mb-6">
                    This quiz will test your understanding of the module concepts.
                  </p>
                  <Link 
                    to={`/courses/${courseId}/quiz/${currentLesson.moduleId}`}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 inline-flex items-center"
                  >
                    <Play size={16} className="mr-2" />
                    <span>Start Quiz</span>
                  </Link>
                </div>
              )}
              
              <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="bg-secondary/50 border border-white/10 p-1">
                  <TabsTrigger 
                    value="content" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="discussion" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Discussion
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">{currentLesson.title}</h3>
                    <p className="text-muted-foreground">{currentLesson.content}</p>
                    
                    {!currentLesson.completed && (
                      <button 
                        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
                        onClick={markAsComplete}
                      >
                        <CheckCircle size={18} className="mr-2" />
                        <span>Mark as Complete</span>
                      </button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion" className="mt-6">
                  <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Discussion</h3>
                      <button className="px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 flex items-center">
                        <MessageSquare size={16} className="mr-2" />
                        <span className="text-sm">New Comment</span>
                      </button>
                    </div>
                    
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Be the first to start a discussion about this lesson.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                
                <div className="space-y-6">
                  {course.modules.map((module: any) => (
                    <div key={module.id} className="border border-white/10 rounded-lg overflow-hidden">
                      <div className="bg-secondary/70 px-4 py-3">
                        <h4 className="font-medium">{module.title}</h4>
                      </div>
                      <div className="divide-y divide-white/5">
                        {module.lessons.map((lesson: any) => (
                          <Link 
                            key={lesson.id}
                            to={`/courses/${courseId}/learn/${lesson.id}`}
                            className={`px-4 py-2 flex items-center ${lesson.id === currentLesson.id ? 'bg-primary/20' : ''}`}
                          >
                            <div>
                              <p className={`text-sm ${lesson.completed ? "text-muted-foreground" : ""}`}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                            {lesson.completed && (
                              <div className="ml-auto w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
