
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Award, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudyTimeStats } from "@/components/progress/StudyTimeStats";
import { CourseProgressList } from "@/components/progress/CourseProgressList";
import { CertificatesList } from "@/components/progress/CertificatesList";
import { ProgressOverview } from "@/components/progress/ProgressOverview";

const studyTimeData = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 1.8 },
  { name: "Wed", hours: 3.2 },
  { name: "Thu", hours: 2.0 },
  { name: "Fri", hours: 0.5 },
  { name: "Sat", hours: 4.0 },
  { name: "Sun", hours: 2.7 },
];

const courseData = [
  { name: "Physics", progress: 65 },
  { name: "Economics", progress: 100 },
  { name: "First Aid", progress: 74 },
  { name: "Literature", progress: 20 },
  { name: "Calculus", progress: 45 },
];

const certificates = [
  { 
    id: 1, 
    course: "Economics", 
    date: "Apr 15, 2025", 
    instructor: "Dr. Emily Chang"
  },
];

const quizResultsData = [
  { name: "Physics", score: 82 },
  { name: "Economics", score: 94 },
  { name: "First Aid", score: 76 },
  { name: "Literature", score: 68 },
];

const pieData = [
  { name: "Completed", value: 35 },
  { name: "In Progress", value: 20 },
  { name: "Not Started", value: 45 },
];

export default function Progress() {
  const [period, setPeriod] = useState("week");
  const totalHours = studyTimeData.reduce((sum, day) => sum + day.hours, 0);
  const completedCourses = courseData.filter(course => course.progress === 100).length;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-8">Your Learning Progress</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Study Time</h3>
                <Clock size={18} className="text-primary" />
              </div>
              <div className="text-3xl font-bold">{totalHours.toFixed(1)} hrs</div>
              <div className="text-xs text-muted-foreground">This week</div>
            </div>
            
            <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Course Completion</h3>
                <Award size={18} className="text-primary" />
              </div>
              <div className="text-3xl font-bold">{completedCourses} courses</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            
            <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Average Quiz Score</h3>
                <Award size={18} className="text-primary" />
              </div>
              <div className="text-3xl font-bold">
                {(quizResultsData.reduce((sum, quiz) => sum + quiz.score, 0) / quizResultsData.length).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Overall performance</div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-secondary/50 border border-white/10 p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="courses" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Courses
              </TabsTrigger>
              <TabsTrigger 
                value="time" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Study Time
              </TabsTrigger>
              <TabsTrigger 
                value="certificates" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Certificates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <ProgressOverview 
                pieData={pieData}
                quizResultsData={quizResultsData}
                studyTimeData={studyTimeData}
              />
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <CourseProgressList courses={courseData} />
            </TabsContent>
            
            <TabsContent value="time" className="mt-6">
              <StudyTimeStats 
                data={studyTimeData}
                period={period}
                setPeriod={setPeriod}
              />
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-6">
              <CertificatesList certificates={certificates} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
