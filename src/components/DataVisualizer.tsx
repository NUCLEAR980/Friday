import React from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'motion/react';
import { X, TrendingUp, BarChart3, PieChart as PieChartIcon, AreaChart as AreaChartIcon } from 'lucide-react';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

export interface ChartData {
  type: ChartType;
  title: string;
  data: any[];
  xAxisKey: string;
  series: { key: string; color: string; name?: string }[];
}

interface DataVisualizerProps {
  chart: ChartData;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const COLORS = ['#00f2ff', '#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export function DataVisualizer({ chart, onClose, theme }: DataVisualizerProps) {
  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
            <XAxis dataKey={chart.xAxisKey} stroke={theme === 'dark' ? '#999' : '#666'} />
            <YAxis stroke={theme === 'dark' ? '#999' : '#666'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                borderColor: theme === 'dark' ? '#333' : '#ddd',
                color: theme === 'dark' ? '#fff' : '#000'
              }} 
            />
            <Legend />
            {chart.series.map((s, i) => (
              <Line 
                key={s.key} 
                type="monotone" 
                dataKey={s.key} 
                stroke={s.color || COLORS[i % COLORS.length]} 
                name={s.name || s.key}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
            <XAxis dataKey={chart.xAxisKey} stroke={theme === 'dark' ? '#999' : '#666'} />
            <YAxis stroke={theme === 'dark' ? '#999' : '#666'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                borderColor: theme === 'dark' ? '#333' : '#ddd',
                color: theme === 'dark' ? '#fff' : '#000'
              }} 
            />
            <Legend />
            {chart.series.map((s, i) => (
              <Bar 
                key={s.key} 
                dataKey={s.key} 
                fill={s.color || COLORS[i % COLORS.length]} 
                name={s.name || s.key}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
            <XAxis dataKey={chart.xAxisKey} stroke={theme === 'dark' ? '#999' : '#666'} />
            <YAxis stroke={theme === 'dark' ? '#999' : '#666'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                borderColor: theme === 'dark' ? '#333' : '#ddd',
                color: theme === 'dark' ? '#fff' : '#000'
              }} 
            />
            <Legend />
            {chart.series.map((s, i) => (
              <Area 
                key={s.key} 
                type="monotone" 
                dataKey={s.key} 
                stroke={s.color || COLORS[i % COLORS.length]} 
                fill={s.color || COLORS[i % COLORS.length]} 
                fillOpacity={0.3}
                name={s.name || s.key}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chart.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={chart.series[0].key}
            >
              {chart.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                borderColor: theme === 'dark' ? '#333' : '#ddd',
                color: theme === 'dark' ? '#fff' : '#000'
              }} 
            />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (chart.type) {
      case 'line': return <TrendingUp className="w-5 h-5" />;
      case 'bar': return <BarChart3 className="w-5 h-5" />;
      case 'pie': return <PieChartIcon className="w-5 h-5" />;
      case 'area': return <AreaChartIcon className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={`w-full max-w-2xl liquid-glass border rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
        theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'
      }`}
    >
      <div className={`p-4 border-b flex justify-between items-center ${
        theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
      }`}>
        <h2 className={`text-sm font-medium tracking-widest uppercase flex items-center gap-2 ${
          theme === 'dark' ? 'text-friday-cyan' : 'text-indigo-600'
        }`}>
          {getIcon()}
          {chart.title}
        </h2>
        <button 
          onClick={onClose}
          className={`p-1.5 rounded-md transition-colors ${
            theme === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-black/50 hover:text-black hover:bg-black/10'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6 h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() as any}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
