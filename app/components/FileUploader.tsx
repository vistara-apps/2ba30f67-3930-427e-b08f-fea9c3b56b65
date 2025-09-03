'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileAudio, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing?: boolean;
  disabled?: boolean;
  variant?: 'audio';
}

export function FileUploader({ 
  onFileUpload, 
  isProcessing = false, 
  disabled = false,
  variant = 'audio' 
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !disabled && !isProcessing) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload, disabled, isProcessing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.flac']
    },
    maxFiles: 1,
    disabled: disabled || isProcessing
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
        ${isDragActive || dragActive
          ? 'border-accent bg-accent/5 scale-105'
          : 'border-white/20 hover:border-accent/50 hover:bg-white/5'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isProcessing ? 'pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4">
        {isProcessing ? (
          <>
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">
                Processing Your Audio
              </h3>
              <p className="text-textSecondary">
                Our AI is separating your track into stems...
              </p>
              <div className="mt-4 flex justify-center">
                <div className="waveform-bars">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="waveform-bar" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
              {isDragActive ? (
                <FileAudio className="w-8 h-8 text-white" />
              ) : (
                <Upload className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">
                {isDragActive ? 'Drop your audio file' : 'Upload Audio File'}
              </h3>
              <p className="text-textSecondary mb-4">
                Drag & drop or click to select • MP3, WAV, M4A, AAC, FLAC
              </p>
              {disabled && (
                <p className="text-primary font-medium">
                  Purchase credits to upload files
                </p>
              )}
            </div>
          </>
        )}
      </div>
      
      {isDragActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border-2 border-accent"
        />
      )}
    </div>
  );
}
