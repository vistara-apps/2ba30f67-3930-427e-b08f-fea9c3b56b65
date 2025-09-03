'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Drum, Music, Music2, Play, Pause, Volume2 } from 'lucide-react';

interface Stem {
  id: string;
  type: 'vocal' | 'drums' | 'instruments' | 'bass';
  audioUrl: string;
  volume: number;
  pan: number;
  key: string;
  tempo: number;
}

interface StemCardProps {
  stem: Stem;
  variant?: 'draggable';
  children?: ReactNode;
}

const stemIcons = {
  vocal: Mic,
  drums: Drum,
  instruments: Music,
  bass: Music2
};

const stemColors = {
  vocal: 'from-blue-500 to-purple-500',
  drums: 'from-red-500 to-pink-500',
  instruments: 'from-green-500 to-teal-500',
  bass: 'from-orange-500 to-yellow-500'
};

export function StemCard({ stem, variant = 'draggable', children }: StemCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const IconComponent = stemIcons[stem.type];
  const gradientColor = stemColors[stem.type];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    // Mute logic would go here
  };

  return (
    <motion.div
      className={`
        bg-surface/80 backdrop-blur-xl rounded-xl border border-white/10 p-4
        ${variant === 'draggable' ? 'cursor-move hover:bg-surface/90' : ''}
        transition-colors
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${gradientColor} rounded-lg flex items-center justify-center`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-textPrimary capitalize">
              {stem.type}
            </h4>
            <p className="text-sm text-textSecondary">
              {stem.key} • {stem.tempo} BPM
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleMute}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-surface hover:bg-white/10 text-textSecondary'}
            `}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlayPause}
            className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="mb-4">
        <div className="h-16 bg-bg/30 rounded-lg flex items-end justify-center gap-1 p-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t ${gradientColor} rounded-full transition-all duration-300`}
              style={{
                height: `${Math.random() * 80 + 20}%`,
                opacity: isPlaying ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      {children}
      
      {/* Volume Indicator */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-textSecondary">Level</span>
          <span className="text-textPrimary font-medium">
            {isMuted ? '0%' : `${stem.volume}%`}
          </span>
        </div>
        <div className="mt-2 h-1 bg-bg/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradientColor} transition-all duration-300`}
            style={{ width: isMuted ? '0%' : `${stem.volume}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
