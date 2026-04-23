import React, { useState, useEffect, useRef } from 'react'
import { X, User, Mail, Shield, Camera, Save, UserPlus, Phone, Users, Calendar, Loader2, UserRound, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Member } from '../App'

interface MemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (member: any) => void
  initialData?: Member | null
  onNotification?: (message: string, type: 'success' | 'error' | 'info') => void
}

const MemberModal: React.FC<MemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  onNotification 
}) => {
  const generateUploadUrl = useMutation(api.members.generateUploadUrl);
  
  const [formData, setFormData] = useState<any>({
    name: '',
    role: 'MEMBRE',
    gender: 'Male',
    level: 'Junior',
    email: '',
    phone: '',
    parrain: '',
    joined_date: new Date().toISOString().split('T')[0],
    status: 'Active',
    avatarUrl: 'https://i.pravatar.cc/150?u=' + Math.random(),
    storageId: undefined
  })
  
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      const { _id, _creationTime, avatarUrl, ...data } = initialData as any
      setFormData({ 
        ...data, 
        avatarUrl, 
        gender: data.gender || 'Male',
        level: data.level || 'Junior'
      })
    } else {
      setFormData({
        name: '',
        role: 'MEMBRE',
        gender: 'Male',
        level: 'Junior',
        email: '',
        phone: '',
        parrain: '',
        joined_date: new Date().toISOString().split('T')[0],
        status: 'Active',
        avatarUrl: 'https://i.pravatar.cc/150?u=' + Math.random(),
        storageId: undefined
      })
    }
  }, [initialData, isOpen])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      onNotification?.('Please upload a valid image file (PNG, JPG).', 'error')
      return
    }

    setIsUploading(true)
    setUploadProgress(10)

    try {
      const postUrl = await generateUploadUrl();
      setUploadProgress(30);

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      setUploadProgress(80);

      const { storageId } = await result.json();
      
      setFormData((prev: any) => ({ ...prev, storageId, avatarUrl: URL.createObjectURL(file) }));
      setIsUploading(false);
      setUploadProgress(100);
    } catch (err) {
      console.error("Convex Upload Error:", err);
      setIsUploading(false);
      onNotification?.('Cloud storage sync failed. Please try again.', 'error')
    }
  }

  const roles = [
    'past président', 'president', 'VPFD', 'VPPRE', 
    'TRESORIER', 'SG', 'MEMBRE', 'membre observateur', 
    'membre stagaire', 'conseiller'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submissionData = { ...formData };
    if (submissionData.avatarUrl.startsWith('blob:')) {
      delete (submissionData as any).avatarUrl;
    }
    onSubmit(submissionData)
    onClose()
  }

  const isEdit = !!initialData

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-main/20 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-primary/5">
              <div>
                <h2 className="text-xl font-bold font-heading text-primary">
                  {isEdit ? 'Update Member Profile' : 'Register New Member'}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors transition-all">
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-center mb-4">
                <div 
                  className="relative group cursor-pointer" 
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all shadow-lg relative">
                    <img src={formData.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                    
                    <AnimatePresence>
                      {isUploading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white"
                        >
                          <Loader2 size={24} className="animate-spin mb-1" />
                          <span className="text-[10px] font-bold">{Math.round(uploadProgress)}%</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                        <Camera size={24} />
                      </div>
                    )}
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                {/* Gender & Level - New Premium Toggle UI */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Gender</label>
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    {['Male', 'Female'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                          formData.gender === g 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <UserRound size={16} className={g === 'Female' ? 'text-pink-500' : 'text-blue-500'} />
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Seniority</label>
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    {['Junior', 'Senior'].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setFormData({...formData, level: l})}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                          formData.level === l 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Briefcase size={16} className={l === 'Senior' ? 'text-amber-600' : 'text-emerald-600'} />
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
                      placeholder="+216 22 123 456"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Joined Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input 
                      required
                      type="date"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
                      value={formData.joined_date}
                      onChange={e => setFormData({...formData, joined_date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Role</label>
                  <div className="relative">
                    <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none appearance-none cursor-pointer"
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                    >
                      {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Parrain (Mentor)</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
                      placeholder="Mentor's Name"
                      value={formData.parrain}
                      onChange={e => setFormData({...formData, parrain: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-text-main font-bold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="flex-[2] bg-button text-white px-5 py-3 rounded-xl font-bold transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2 justify-center text-lg disabled:opacity-50"
                >
                  {isEdit ? <Save size={18} /> : <UserPlus size={18} />}
                  <span>{isUploading ? 'Uploading...' : (isEdit ? 'Save Changes' : 'Create Member')}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MemberModal
