import React from 'react'
import { LayoutDashboard, Users, PieChart, Award } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ]

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Award size={24} />
        </div>
        <span className="text-xl font-bold font-heading text-primary tracking-tight">JCI Manager</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-muted hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-primary transition-colors'} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 flex flex-col gap-4">
        <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=admin" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" 
            alt="Admin" 
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-text-main truncate">Admin User</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium</p>
          </div>
        </div>
        <p className="text-[10px] text-text-muted text-center font-bold tracking-widest uppercase">System v1.0.4</p>
      </div>
    </aside>
  )
}

export default Sidebar
