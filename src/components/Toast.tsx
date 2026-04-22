import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const config = {
    success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
    error: { icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/5', border: 'border-danger/20' },
    info: { icon: Info, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' }
  }

  const { icon: Icon, color, bg, border } = config[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`fixed bottom-8 right-8 z-[1000] flex items-center gap-4 p-4 pr-12 rounded-2xl ${bg} ${border} border backdrop-blur-xl shadow-2xl min-w-[320px]`}
    >
      <div className={`p-2 rounded-xl bg-white shadow-sm ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-text-main">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="absolute top-1/2 -translate-y-1/2 right-4 p-1 text-gray-400 hover:text-text-main transition-colors"
      >
        <X size={16} />
      </button>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 4, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-1 ${color.replace('text-', 'bg-')} bg-opacity-30 rounded-full`}
      />
    </motion.div>
  )
}

export default Toast
