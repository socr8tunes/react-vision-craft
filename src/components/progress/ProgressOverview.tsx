import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { Award, Clock } from "lucide-react";

interface ChartData {
  name: string;
  value?: number;
  score?: number;
}

interface ProgressOverviewProps {
  pieData: ChartData[];
  quizResultsData: ChartData[];
  studyTimeData: { name: string; hours: number; }[];
}

const COLORS = ["#8b5cf6", "#1e40af", "#1f2937"];

export function ProgressOverview({ pieData, quizResultsData, studyTimeData }: ProgressOverviewProps) {
  const totalHours = studyTimeData.reduce((sum, day) => sum + day.hours, 0);
  const completedCourses = 2; // This should come from props if it's dynamic

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-gray-200/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Study Time Distribution</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="hours" fill="#8b5cf6" />
            </BarChart>
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
  );
}
