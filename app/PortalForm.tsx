"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PortalFormProps {
  type: 'email' | 'whatsapp';
  position: 'top' | 'bottom';
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string, position: 'top' | 'bottom', type: 'email' | 'whatsapp') => Promise<boolean>;
  placeholder: string;
  icon: string;
  buttonText: string;
}

export const PortalForm = ({ 
  type, 
  position, 
  value, 
  onChange, 
  onSubmit, 
  placeholder, 
  icon, 
  buttonText 
}: PortalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value || (type === 'whatsapp' && value === "+91 ") || isSubmitting) return;
    
    setIsSubmitting(true);
    
    const success = await onSubmit(value, position, type);
    
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-base">
            {icon}
          </span>
          <input
            type={type === 'email' ? 'email' : 'tel'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-10 pr-3 py-3 text-sm rounded-xl border-2 transition-all bg-white 
              ${type === 'email' 
                ? 'hover:border-purple-500 focus:border-purple-600' 
                : 'hover:border-green-500 focus:border-green-600'
              } focus:outline-none font-medium text-gray-700 focus:text-gray-900`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`text-white px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap 
            transition-all hover:shadow-xl active:scale-95 min-w-[90px] disabled:opacity-50
            ${type === 'email' 
              ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-300' 
              : 'bg-green-500 hover:bg-green-600 hover:shadow-green-300'
            }`}
        >
          {isSubmitting ? '🌀...' : buttonText}
        </button>
      </form>

      {/* Success Message - Position specific */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`absolute ${
              position === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'
            } left-0 right-0 text-center z-50`}
          >
            <div className={`inline-block px-6 py-3 rounded-2xl shadow-2xl text-white
              ${type === 'email' 
                ? 'bg-gradient-to-r from-purple-600 to-lime-500' 
                : 'bg-gradient-to-r from-green-500 to-teal-500'
              }`}
            >
              <p className="font-bold text-sm">
                {type === 'email' 
                  ? '✨ PORTAL ACCESS GRANTED! 📧' 
                  : '📱 WHATSAPP LOCKED IN! 👻'}
              </p>
              <p className="text-xs opacity-90 mt-1">
                {type === 'email' 
                  ? 'Check your inbox bestie!' 
                  : 'We\'ll slide into your DMs!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};