import React, { useState } from 'react'
import { Mail, Phone, MoreVertical, ShieldCheck, Edit2, Trash2, UserRound, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Member } from '../App'

interface MemberCardProps {
  member: Member
  onViewProfile: (member: Member) => void
  onEdit: (member: Member) => void
  onDelete: (id: any) => void
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onViewProfile, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)
  const isOnline = member.status === 'Active'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-premium transition-all duration-300 relative group"
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
        >
          <MoreVertical size={20} />
        </button>

        <AnimatePresence>
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)} 
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-20 py-2"
              >
                <button 
                  onClick={() => {
                    onEdit(member)
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-main hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={16} className="text-primary" />
                  <span className="font-semibold">Edit Member</span>
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
                      onDelete(member._id)
                    }
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                  <span className="font-semibold">Delete Member</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-50"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-success' : 'bg-gray-300'}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-heading text-text-main group-hover:text-primary transition-colors">{member.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="flex items-center gap-1.5 text-primary bg-primary/5 px-2 py-0.5 rounded-lg">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{member.role}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg ${member.gender === 'Female' ? 'bg-pink-50 text-pink-500' : 'bg-blue-50 text-blue-500'}`}>
              <UserRound size={12} />
              <span className="text-[9px] font-bold uppercase">{member.gender}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg ${member.level === 'Senior' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <Briefcase size={12} />
              <span className="text-[9px] font-bold uppercase">{member.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-text-muted group-hover:text-text-main transition-colors">
          <Mail size={16} className="text-gray-400" />
          <span className="text-sm truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-3 text-text-muted group-hover:text-text-main transition-colors">
          <Phone size={16} className="text-gray-400" />
          <span className="text-sm">{member.phone}</span>
        </div>
        {/* Local branch removed per user request */}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
          isOnline ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'
        }`}>
          {member.status}
        </div>
        <button 
          onClick={() => onViewProfile(member)}
          className="text-button text-sm font-semibold hover:underline"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  )
}

export default MemberCard
