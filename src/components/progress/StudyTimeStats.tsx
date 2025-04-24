
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StudyTimeData {
  name: string;
  hours: number;
}

interface StudyTimeStatsProps {
  data: StudyTimeData[];
  period: string;
  setPeriod: (period: string) => void;
}

export function StudyTimeStats({ data, period, setPeriod }: StudyTimeStatsProps) {
  const totalHours = data.reduce((sum, day) => sum + day.hours, 0);

  return (
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
          <LineChart data={data}>
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
  );
}
