
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const data = [
  { value: 40 },
  { value: 30 },
  { value: 20 },
  { value: 27 },
  { value: 18 },
  { value: 23 },
  { value: 34 },
  { value: 30 },
  { value: 45 },
  { value: 65 },
  { value: 40 },
  { value: 30 },
];

export function Analytics() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-secondary/50 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Track your study time</h3>
          <button className="text-xs text-muted-foreground hover:text-white">
            Last month ▾
          </button>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(139, 92, 246)"
                fill="rgba(139, 92, 246, 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">124</div>
          <div className="text-xs text-muted-foreground">Hours</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-primary/20 border border-primary/20">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Courses completed</h3>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
              2
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">36</div>
            <div className="text-xs text-muted-foreground">70% Success rate</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Performance</h3>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
              4
            </span>
          </div>
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(139, 92, 246)"
                  fill="rgba(139, 92, 246, 0.1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
