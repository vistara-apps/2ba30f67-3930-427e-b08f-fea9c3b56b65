'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MixerSliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  variant?: 'volume' | 'pan';
}

export function MixerSlider({ 
  label,
  value, 
  onChange, 
  min = 0, 
  max = 100,
  variant = 'volume' 
}: MixerSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;
  
  const getGradient = () => {
    switch (variant) {
      case 'volume':
        return 'from-accent to-primary';
      case 'pan':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-accent to-primary';
    }
  };

  const getDisplayValue = () => {
    if (variant === 'pan') {
      if (value === 0) return 'C';
      return value > 0 ? `R${value}` : `L${Math.abs(value)}`;
    }
    return `${value}${variant === 'volume' ? '%' : ''}`;
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-textSecondary">
            {label}
          </label>
          <span className="text-sm text-textPrimary font-medium">
            {getDisplayValue()}
          </span>
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="sr-only"
        />
        
        <div className="relative h-2 bg-bg/50 rounded-full overflow-hidden">
          {/* Track */}
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          
          {/* Fill */}
          <motion.div
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getGradient()} rounded-full`}
            style={{ width: `${percentage}%` }}
            animate={{ opacity: isDragging ? 1 : 0.8 }}
          />
          
          {/* Thumb */}
          <motion.div
            className={`
              absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-300
              cursor-pointer transform -translate-y-1/2 -translate-x-2
            `}
            style={{ left: `${percentage}%` }}
            animate={{ 
              scale: isDragging ? 1.2 : 1,
              boxShadow: isDragging ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.2)'
            }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
        
        {/* Invisible slider for interaction */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      {variant === 'pan' && (
        <div className="flex justify-between text-xs text-textSecondary">
          <span>L</span>
          <span>C</span>
          <span>R</span>
        </div>
      )}
    </div>
  );
}
