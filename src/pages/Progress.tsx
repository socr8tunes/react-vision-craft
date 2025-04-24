
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Award, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress as ProgressBar } from "@/components/ui/progress";

// Mock progress data
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

const COLORS = ["#8b5cf6", "#1e40af", "#1f2937"];

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Study Time Distribution</h3>
                    <div className="flex space-x-2">
                      <button 
                        className={`text-xs px-3 py-1 rounded-full ${period === "week" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                        onClick={() => setPeriod("week")}
                      >
                        Week
                      </button>
                      <button 
                        className={`text-xs px-3 py-1 rounded-full ${period === "month" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                        onClick={() => setPeriod("month")}
                      >
                        Month
                      </button>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studyTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip />
                        <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                  <h3 className="font-medium mb-4">Course Completion Status</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                  <h3 className="font-medium mb-4">Quiz Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quizResultsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                  <h3 className="font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Award size={18} />
                      </div>
                      <div>
                        <p className="font-medium">Quiz Completed</p>
                        <p className="text-sm text-muted-foreground">Physics: Classical Mechanics</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">82%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <Award size={18} />
                      </div>
                      <div>
                        <p className="font-medium">Course Completed</p>
                        <p className="text-sm text-muted-foreground">Economics</p>
                        <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">Certificate</p>
                        <p className="text-xs text-primary">View</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="font-medium">Course Started</p>
                        <p className="text-sm text-muted-foreground">First Aid</p>
                        <p className="text-xs text-muted-foreground mt-1">2 weeks ago</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">74%</p>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium mb-6">Course Progress</h3>
                
                <div className="space-y-6">
                  {courseData.map((course, index) => (
                    <div key={index} className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{course.name}</h4>
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <ProgressBar 
                        value={course.progress} 
                        className="h-2" 
                        indicatorClassName={course.progress === 100 ? "bg-green-500" : ""}
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
            </TabsContent>
            
            <TabsContent value="time" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Study Time Analytics</h3>
                  <div className="flex space-x-2">
                    <button 
                      className={`text-xs px-3 py-1 rounded-full ${period === "week" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                      onClick={() => setPeriod("week")}
                    >
                      Week
                    </button>
                    <button 
                      className={`text-xs px-3 py-1 rounded-full ${period === "month" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                      onClick={() => setPeriod("month")}
                    >
                      Month
                    </button>
                    <button 
                      className={`text-xs px-3 py-1 rounded-full ${period === "year" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                      onClick={() => setPeriod("year")}
                    >
                      Year
                    </button>
                  </div>
                </div>
                
                <div className="h-80 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studyTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hours" name="Hours Studied" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-1">Total Hours</h4>
                    <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-1">Average Per Day</h4>
                    <p className="text-2xl font-bold">{(totalHours / 7).toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Hours per day</p>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-1">Most Productive Day</h4>
                    <p className="text-2xl font-bold">Saturday</p>
                    <p className="text-xs text-muted-foreground">4.0 hours</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium mb-6">Your Certificates</h3>
                
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="border border-white/10 rounded-lg overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 flex flex-col justify-end">
                          <Award size={36} className="text-primary mb-3" />
                          <h4 className="text-xl font-semibold">{cert.course}</h4>
                          <p className="text-sm text-muted-foreground">Certificate of Completion</p>
                        </div>
                        <div className="p-4 bg-secondary/30">
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Issued on</p>
                            <p className="text-sm">{cert.date}</p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p className="text-sm">{cert.instructor}</p>
                          </div>
                          <button className="w-full mt-4 p-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors text-sm">
                            View Certificate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-secondary/30 rounded-lg">
                    <Award size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-xl font-medium mb-2">No certificates yet</h4>
                    <p className="text-muted-foreground mb-6">Complete a course to earn your first certificate</p>
                    <button className="px-6 py-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors">
                      Explore Courses
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
