import { useState, useCallback } from 'react'
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import MemberDirectory from './components/MemberDirectory'
import Analytics from './components/Analytics'
import MemberModal from './components/MemberModal'
import MemberProfileModal from './components/MemberProfileModal'
import Toast from './components/Toast'
import type { ToastType } from './components/Toast'
import { AnimatePresence } from 'framer-motion'
import './index.css'

export interface Member {
  _id: string; // Convex uses _id
  name: string
  role: string
  email: string
  phone: string
  parrain?: string
  joined_date: string
  status: string
  gender: string 
  level: string
  avatar: string 
  storageId?: string
}

function App() {
  const members = useQuery(api.members.list);
  const saveMember = useMutation(api.members.save);
  const deleteMember = useMutation(api.members.remove);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [activeSegment, setActiveSegment] = useState('dashboard')
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type })
  }

  const handleAddOrUpdateMember = useCallback(async (memberData: any) => {
    try {
      await saveMember({
        id: editingMember?._id as any,
        ...memberData
      });
      showToast(editingMember ? 'Member profile updated successfully!' : 'New member added to the roster!')
      setEditingMember(null)
    } catch (error: any) {
      console.error('Error saving member to Convex:', error)
      showToast(error.message || 'Failed to sync member profile.', 'error')
    }
  }, [editingMember, saveMember])

  const handleDeleteMember = useCallback(async (id: any) => {
    try {
      await deleteMember({ id });
      showToast('Member removed from the system.', 'info')
    } catch (error: any) {
      console.error('Error deleting member from Convex:', error)
      showToast('Failed to delete member.', 'error')
    }
  }, [deleteMember])

  const openAddModal = () => {
    setEditingMember(null)
    setIsModalOpen(true)
  }

  const openEditModal = (member: Member) => {
    setEditingMember(member)
    setIsModalOpen(true)
  }

  const isLoading = members === undefined;

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar activeTab={activeSegment} setActiveTab={setActiveSegment} />
      <main className="flex-1 ml-64 p-10 overflow-x-hidden space-y-12">
        <section id="dashboard" className="scroll-mt-10">
          <Dashboard members={members || []} />
        </section>
        
        <div className="border-t border-gray-100 w-full" />

        <section id="members" className="scroll-mt-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-premium">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-text-muted font-medium">Connecting to Convex Engine...</p>
            </div>
          ) : (
            <MemberDirectory 
              members={members || []} 
              openModal={openAddModal} 
              onViewMember={setSelectedMember}
              onEditMember={openEditModal}
              onDeleteMember={handleDeleteMember}
            />
          )}
        </section>

        <div className="border-t border-gray-100 w-full" />

        <section id="analytics" className="scroll-mt-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-premium">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-text-muted font-medium">Processing Analytics Intelligence...</p>
            </div>
          ) : (
            <Analytics members={members || []} />
          )}
        </section>

        <footer className="py-12 border-t border-gray-50 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <img src="/src/assets/personal_logo.png" className="h-6 w-auto" alt="AHMD Small" />
             <span className="text-xs font-bold tracking-widest text-text-main">AHMD DESIGN</span>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-text-main">Member Intelligence Dashboard</p>
            <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase mb-2">Developed by Ahmed Baha Eddine Khorchani</p>
            <p className="text-[9px] text-text-muted font-medium opacity-50">
              © 2026 AHMD Systems • All Rights Reserved for Branding & Design
            </p>
          </div>
        </footer>
      </main>

      <MemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddOrUpdateMember}
        initialData={editingMember}
        onNotification={showToast}
      />

      <MemberProfileModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
