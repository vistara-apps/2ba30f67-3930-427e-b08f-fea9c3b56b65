'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from './components/AppShell';
import { FileUploader } from './components/FileUploader';
import { StemMixer } from './components/StemMixer';
import { WalletConnection } from './components/WalletConnection';
import { CreditManager } from './components/CreditManager';
import { ProjectManager } from './components/ProjectManager';
import { Music } from 'lucide-react';

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

export default function Home() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userCredits, setUserCredits] = useState(3);

  const handleFileUpload = async (file: File) => {
    if (userCredits < 1) {
      alert('Insufficient credits. Please purchase more to continue.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate AI stem separation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock separated stems
      const mockStems: Stem[] = [
        {
          id: '1',
          type: 'vocal',
          audioUrl: URL.createObjectURL(file),
          volume: 75,
          pan: 0,
          key: 'C',
          tempo: 120
        },
        {
          id: '2',
          type: 'drums',
          audioUrl: URL.createObjectURL(file),
          volume: 80,
          pan: 0,
          key: 'C',
          tempo: 120
        },
        {
          id: '3',
          type: 'instruments',
          audioUrl: URL.createObjectURL(file),
          volume: 70,
          pan: 0,
          key: 'C',
          tempo: 120
        },
        {
          id: '4',
          type: 'bass',
          audioUrl: URL.createObjectURL(file),
          volume: 85,
          pan: 0,
          key: 'C',
          tempo: 120
        }
      ];

      const newProject: Project = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        stems: mockStems,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setCurrentProject(newProject);
      setUserCredits(prev => prev - 1);
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStemUpdate = (stemId: string, updates: Partial<Stem>) => {
    if (!currentProject) return;

    const updatedStems = currentProject.stems.map(stem =>
      stem.id === stemId ? { ...stem, ...updates } : stem
    );

    setCurrentProject({
      ...currentProject,
      stems: updatedStems,
      updatedAt: new Date()
    });
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-bg to-purple-900/20">
        {/* Header */}
        <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-textPrimary">
                    Stemsync Studio
                  </h1>
                  <p className="text-sm text-textSecondary">
                    Remix the world, one stem at a time
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CreditManager credits={userCredits} onCreditsUpdate={setUserCredits} />
                <WalletConnection />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {!currentProject ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-textPrimary mb-4">
                  Start Your Musical Journey
                </h2>
                <p className="text-lg text-textSecondary mb-8">
                  Upload any audio file and watch our AI separate it into individual stems for remixing
                </p>
                
                <FileUploader
                  onFileUpload={handleFileUpload}
                  isProcessing={isProcessing}
                  disabled={userCredits < 1}
                />

                {userCredits < 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
                  >
                    <p className="text-primary font-medium">
                      You need credits to separate stems. Purchase credits to continue.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Project Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-textPrimary">
                    {currentProject.title}
                  </h2>
                  <p className="text-textSecondary">
                    {currentProject.stems.length} stems • Created {currentProject.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentProject(null)}
                    className="px-4 py-2 bg-surface hover:bg-surface/80 text-textPrimary rounded-lg transition-colors"
                  >
                    New Project
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-accent to-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    Export Mix
                  </button>
                </div>
              </div>

              {/* Stem Mixer */}
              <StemMixer
                stems={currentProject.stems}
                onStemUpdate={handleStemUpdate}
              />

              {/* Project Manager */}
              <ProjectManager
                project={currentProject}
                onProjectUpdate={setCurrentProject}
              />
            </div>
          )}
        </main>
      </div>
    </AppShell>
  );
}
