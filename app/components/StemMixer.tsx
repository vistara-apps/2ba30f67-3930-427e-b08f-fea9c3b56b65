'use client';

import { motion } from 'framer-motion';
import { StemCard } from './StemCard';
import { MixerSlider } from './MixerSlider';

interface Stem {
  id: string;
  type: 'vocal' | 'drums' | 'instruments' | 'bass';
  audioUrl: string;
  volume: number;
  pan: number;
  key: string;
  tempo: number;
}

interface StemMixerProps {
  stems: Stem[];
  onStemUpdate: (stemId: string, updates: Partial<Stem>) => void;
}

export function StemMixer({ stems, onStemUpdate }: StemMixerProps) {
  const handleVolumeChange = (stemId: string, volume: number) => {
    onStemUpdate(stemId, { volume });
  };

  const handlePanChange = (stemId: string, pan: number) => {
    onStemUpdate(stemId, { pan });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-surface/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-semibold text-textPrimary mb-6">
        Stem Mixer
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stems.map((stem, index) => (
          <motion.div
            key={stem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StemCard stem={stem} variant="draggable">
              <div className="space-y-4 mt-4">
                <MixerSlider
                  label="Volume"
                  value={stem.volume}
                  onChange={(value) => handleVolumeChange(stem.id, value)}
                  variant="volume"
                  min={0}
                  max={100}
                />
                <MixerSlider
                  label="Pan"
                  value={stem.pan}
                  onChange={(value) => handlePanChange(stem.id, value)}
                  variant="pan"
                  min={-50}
                  max={50}
                />
              </div>
            </StemCard>
          </motion.div>
        ))}
      </div>

      {/* Master Controls */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h4 className="text-lg font-medium text-textPrimary mb-4">
          Master Controls
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg/50 rounded-xl p-4">
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Master Volume
            </label>
            <MixerSlider
              value={75}
              onChange={() => {}}
              variant="volume"
              min={0}
              max={100}
            />
          </div>
          <div className="bg-bg/50 rounded-xl p-4">
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Tempo (BPM)
            </label>
            <MixerSlider
              value={120}
              onChange={() => {}}
              variant="volume"
              min={60}
              max={200}
            />
          </div>
          <div className="bg-bg/50 rounded-xl p-4">
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Key
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2 text-textPrimary focus:border-accent outline-none">
              <option value="C">C Major</option>
              <option value="D">D Major</option>
              <option value="E">E Major</option>
              <option value="F">F Major</option>
              <option value="G">G Major</option>
              <option value="A">A Major</option>
              <option value="B">B Major</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
