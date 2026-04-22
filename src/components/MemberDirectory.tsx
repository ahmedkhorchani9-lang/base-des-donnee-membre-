import React, { useState, useMemo } from 'react'
import { Search, Filter, Download, Plus, X, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import MemberCard from './MemberCard'
import type { Member } from '../App'

interface MemberDirectoryProps {
  members: Member[]
  openModal: () => void
  onViewMember: (member: Member) => void
  onEditMember: (member: Member) => void
  onDeleteMember: (id: any) => void
}

const MemberDirectory: React.FC<MemberDirectoryProps> = ({ 
  members, 
  openModal, 
  onViewMember,
  onEditMember,
  onDeleteMember
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const roles = [
    'All', 'past président', 'president', 'VPFD', 'VPPRE', 
    'TRESORIER', 'SG', 'MEMBRE', 'membre observateur', 
    'membre stagaire', 'conseiller'
  ]

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = selectedRole === 'All' || member.role === selectedRole
      
      return matchesSearch && matchesRole
    })
  }, [searchTerm, selectedRole, members])

  const exportToCSV = () => {
    const headers = ['Name', 'Role', 'Email', 'Phone', 'Parrain', 'Joined Date', 'Status']
    const data = filteredMembers.map(m => [
      m.name, m.role, m.email, m.phone, m.parrain || '', m.joined_date, m.status
    ])
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + data.map(e => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `ahmd-members-export-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fade-in max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-text-main tracking-tight">Member Directory</h1>
            <p className="text-text-muted mt-1">Manage and connect with members across the organization.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-main font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button onClick={openModal} className="bg-button text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2">
              <Plus size={18} />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border transition-all ${
              showFilters ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-200 text-text-main shadow-sm hover:bg-gray-50'
            }`}
          >
            <Filter size={20} />
            <span className="font-medium">Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-premium flex flex-wrap gap-8">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Role</label>
                  <select 
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-text-main focus:bg-white focus:border-primary/20 transition-all outline-none cursor-pointer"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setSelectedRole('All')
                      setSearchTerm('')
                    }}
                    className="text-danger flex items-center gap-1.5 font-medium hover:underline px-2 py-2"
                  >
                    <X size={16} />
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted font-medium">Found <span className="text-primary font-bold">{filteredMembers.length}</span> members</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard 
              key={member._id} 
              member={member} 
              onViewProfile={onViewMember}
              onEdit={onEditMember}
              onDelete={onDeleteMember}
            />
          ))}
          {filteredMembers.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-premium">
              <Users className="mx-auto text-gray-200 mb-4" size={64} />
              <h3 className="text-xl font-bold text-text-main">No members found</h3>
              <p className="text-text-muted">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberDirectory
