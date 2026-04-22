import { motion } from 'framer-motion'
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts'
import { BarChart3, PieChart as PieIcon } from 'lucide-react'
import type { Member } from '../App'

interface AnalyticsProps {
  members: Member[]
}

const Analytics: React.FC<AnalyticsProps> = ({ members }) => {
  // 1. Gender Data
  const genderBreakdown = [
    { name: 'Male', value: members.filter(m => m.gender === 'Male').length },
    { name: 'Female', value: members.filter(m => m.gender === 'Female').length },
  ].filter(d => d.value > 0)

  // 2. Level Data (Junior vs Senior)
  const levelData = [
    { name: 'Junior', count: members.filter(m => m.level === 'Junior').length, color: '#10b981' },
    { name: 'Senior', count: members.filter(m => m.level === 'Senior').length, color: '#f59e0b' },
  ]

  const COLORS = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b']

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-heading text-text-main tracking-tight">Analytics Command Center</h1>
          <p className="text-text-muted mt-2 font-medium">
            Live data ingestion from Convex Storage & Cloud Database
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-premium border border-gray-50 hidden md:block">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Intelligence</p>
           <p className="text-2xl font-bold text-primary">{members.length} Entities</p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Gender Breakdown */}
        <motion.div variants={item} className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-premium">
           <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-3">
             <PieIcon size={24} className="text-button" />
             Gender Diversity
           </h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={genderBreakdown}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={110}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {genderBreakdown.map((_entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
                 <Legend />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </motion.div>

        {/* Seniority Comparison */}
        <motion.div variants={item} className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-premium">
           <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-3">
             <BarChart3 size={24} className="text-success" />
             Seniority Distribution
           </h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={levelData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={60}>
                   {levelData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Analytics
