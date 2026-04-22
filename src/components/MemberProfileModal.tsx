import { X, Mail, Phone, Calendar, Shield, Users, UserRound, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Member } from '../App'

interface MemberProfileModalProps {
  member: Member | null
  onClose: () => void
}

const MemberProfileModal: React.FC<MemberProfileModalProps> = ({ member, onClose }) => {
  if (!member) return null

  const isOnline = member.status === 'Active'
  
  const detailItems = [
    { label: 'Role', value: member.role, icon: Shield, color: 'text-primary' },
    { label: 'Email', value: member.email, icon: Mail, color: 'text-button' },
    { label: 'Phone', value: member.phone, icon: Phone, color: 'text-success' },
    { label: 'Joined', value: member.joined_date, icon: Calendar, color: 'text-purple-500' },
    { label: 'Mentor', value: member.parrain || 'Self-Sponsored', icon: Users, color: 'text-amber-600' },
    { label: 'Gender', value: member.gender || 'Not specified', icon: UserRound, color: member.gender === 'Female' ? 'text-pink-500' : 'text-blue-500' },
    { label: 'Seniority', value: member.level || 'Not specified', icon: Briefcase, color: member.level === 'Senior' ? 'text-amber-700' : 'text-emerald-600' },
  ]

  const bio = `${member.name} is a ${member.level || 'dedicated'} ${member.role} within our organization. 
  Joining on ${member.joined_date}, ${member.gender === 'Female' ? 'she' : 'he'} has been an integral part of the team. 
  ${member.parrain ? `Guided by ${member.parrain}, ` : ''}${member.name} continues to contribute significantly to our collective mission.`

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-main/40 backdrop-blur-md z-[200]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-premium-hover z-[201] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Profile Image & Status Sidebar */}
            <div className="w-full md:w-2/5 bg-primary/5 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="relative mb-6">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-[2rem] object-cover ring-8 ring-white shadow-xl"
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg ${isOnline ? 'bg-success' : 'bg-gray-300'}`} />
              </div>
              <h2 className="text-2xl font-bold font-heading text-center mb-1">{member.name}</h2>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <Shield size={14} />
                {member.role}
              </div>
              
              <div className="w-full space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className={`font-bold ${isOnline ? 'text-success' : 'text-gray-400'}`}>{member.status}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                  <p className="font-bold text-text-main flex items-center gap-2">
                    <Briefcase size={16} className={member.level === 'Senior' ? 'text-amber-600' : 'text-emerald-600'} />
                    {member.level || 'Junior'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              <div className="mb-8">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Professional Bio</h3>
                <p className="text-text-muted leading-relaxed italic">"{bio}"</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {detailItems.slice(1).map((item, idx) => (
                  <div key={idx} className="group">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{item.label}</p>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-50 ${item.color} group-hover:bg-white group-hover:shadow-sm transition-all`}>
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-bold text-text-main truncate">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">ID: {member._id.substring(0, 12)}...</p>
                <button 
                  onClick={onClose}
                  className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MemberProfileModal
