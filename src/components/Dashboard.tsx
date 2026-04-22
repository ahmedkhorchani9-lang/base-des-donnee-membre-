import { Users, UserPlus, UserCheck, PieChart as PieChartIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { Member } from '../App'

interface DashboardProps {
  members: Member[]
}

const Dashboard: React.FC<DashboardProps> = ({ members }) => {
  const activeCount = members.filter(m => m.status === 'Active').length
  
  // Calculate New Members (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newMembersCount = members.filter(m => new Date(m.joined_date) >= thirtyDaysAgo).length

  // Prepare Distribution Data for Gender

  // Prepare Distribution Data for Gender
  const genderData = [
    { name: 'Male', value: members.filter(m => m.gender === 'Male').length },
    { name: 'Female', value: members.filter(m => m.gender === 'Female').length }
  ].filter(d => d.value > 0)

  const GENDER_COLORS = ['#3b82f6', '#ec4899']

  const stats = [
    { label: 'Total Members', value: members.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Members', value: activeCount, icon: UserCheck, color: 'text-success', bg: 'bg-success/10' },
    { label: 'New Members', value: newMembersCount, icon: UserPlus, color: 'text-button', bg: 'bg-button/10' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="fade-in max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-main tracking-tight italic">Pulse Overview</h1>
          <p className="text-text-muted mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">Real-time organizational telemetry</p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={item}
            className="p-6 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold font-heading text-text-main group-hover:scale-110 transition-transform origin-left">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-success">↑</span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:rotate-12 transition-transform`}>
                <stat.icon size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-premium">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                <PieChartIcon className="text-primary" size={20} />
                Global Gender Pulse
              </h3>
           </div>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {genderData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="middle" align="center" layout="horizontal" />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
