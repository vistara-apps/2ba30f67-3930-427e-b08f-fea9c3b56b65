'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Share2, Download, Clock, Music } from 'lucide-react';

interface Stem {
  id: string;
  type: 'vocal' | 'drums' | 'instruments' | 'bass';
  audioUrl: string;
  volume: number;
  pan: number;
  key: string;
  tempo: number;
}

interface Project {
  id: string;
  title: string;
  stems: Stem[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectManagerProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

export function ProjectManager({ project, onProjectUpdate }: ProjectManagerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProject = {
        ...project,
        updatedAt: new Date()
      };
      
      onProjectUpdate(updatedProject);
      
      // Show success notification
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export operation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a mock download
      const blob = new Blob(['Mock audio data'], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title}_remix.mp3`;
      a.click();
      URL.revokeObjectURL(url);
      
      alert('Export completed successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export project.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      // Mock share functionality
      if (navigator.share) {
        await navigator.share({
          title: `Check out my remix: ${project.title}`,
          text: 'Created with Stemsync Studio',
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      alert('Failed to share project.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-semibold text-textPrimary mb-6">
        Project Settings
      </h3>
      
      {/* Project Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => onProjectUpdate({
                ...project,
                title: e.target.value,
                updatedAt: new Date()
              })}
              className="w-full px-3 py-2 bg-bg/50 border border-white/10 rounded-lg text-textPrimary focus:border-accent outline-none"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm text-textSecondary">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Created {project.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              <span>{project.stems.length} stems</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors disabled:opacity-50"
            whileHover={!isSaving ? { scale: 1.02 } : {}}
            whileTap={!isSaving ? { scale: 0.98 } : {}}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Project'}
          </motion.button>
          
          <motion.button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            whileHover={!isExporting ? { scale: 1.02 } : {}}
            whileTap={!isExporting ? { scale: 0.98 } : {}}
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export Mix'}
          </motion.button>
          
          <motion.button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-surface hover:bg-surface/80 text-textPrimary rounded-lg transition-colors border border-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 className="w-4 h-4" />
            Share Project
          </motion.button>
        </div>
      </div>
      
      {/* Export Progress */}
      {isExporting && (
        <div className="mt-4 p-4 bg-bg/30 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-textPrimary font-medium">Rendering Mix...</span>
          </div>
          <div className="w-full bg-bg/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-primary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
          </div>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-6 p-4 bg-bg/20 rounded-xl">
        <h4 className="text-sm font-medium text-textPrimary mb-2">
          Pro Tips
        </h4>
        <ul className="text-sm text-textSecondary space-y-1">
          <li>• Adjust volume levels to balance your mix</li>
          <li>• Use panning to create stereo width</li>
          <li>• Export in high quality for best results</li>
          <li>• Share your remixes with the community</li>
        </ul>
      </div>
    </motion.div>
  );
}
