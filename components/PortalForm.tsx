"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PortalFormProps {
  position: 'top' | 'bottom';
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string, position: 'top' | 'bottom') => Promise<boolean>;
  placeholder: string;
  icon: string;
  buttonText: string;
}

export const PortalForm = ({ 
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
    
    if (!value || isSubmitting) return;
    
    setIsSubmitting(true);
    
    const success = await onSubmit(value, position);
    
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
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border-2 border-purple-300 bg-white hover:border-purple-500 focus:border-purple-600 focus:outline-none transition-all font-medium text-gray-700 focus:text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 text-white px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-300 active:scale-95 min-w-[90px] disabled:opacity-50"
        >
          {isSubmitting ? '🌀...' : buttonText}
        </button>
      </form>

      {/* Success Message */}
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
            <div className="inline-block px-6 py-3 rounded-2xl shadow-2xl text-white bg-gradient-to-r from-purple-600 to-lime-500">
              <p className="font-bold text-sm">✨ PORTAL ACCESS GRANTED! 📧</p>
              <p className="text-xs opacity-90 mt-1">Check your inbox bestie!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};