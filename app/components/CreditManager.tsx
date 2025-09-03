'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Plus, X, CreditCard } from 'lucide-react';

interface CreditManagerProps {
  credits: number;
  onCreditsUpdate: (credits: number) => void;
}

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

const creditPackages: CreditPackage[] = [
  {
    id: '1',
    credits: 1,
    price: 0.5
  },
  {
    id: '12',
    credits: 12,
    price: 5,
    bonus: 2,
    popular: true
  },
  {
    id: '30',
    credits: 30,
    price: 10,
    bonus: 8
  }
];

export function CreditManager({ credits, onCreditsUpdate }: CreditManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async (pkg: CreditPackage) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCredits = credits + pkg.credits + (pkg.bonus || 0);
      onCreditsUpdate(newCredits);
      setIsModalOpen(false);
      
      // Show success notification
      alert(`Successfully purchased ${pkg.credits + (pkg.bonus || 0)} credits!`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-surface/90 transition-colors"
      >
        <Coins className="w-4 h-4 text-accent" />
        <span className="text-textPrimary font-medium">{credits}</span>
        <Plus className="w-4 h-4 text-textSecondary" />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-textPrimary">
                  Purchase Credits
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-bg/50 rounded-lg flex items-center justify-center hover:bg-bg/70 transition-colors"
                >
                  <X className="w-4 h-4 text-textSecondary" />
                </button>
              </div>

              <div className="space-y-4">
                {creditPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className={`
                      relative p-4 rounded-xl border cursor-pointer transition-all
                      ${pkg.popular 
                        ? 'border-accent bg-accent/10 ring-2 ring-accent/20' 
                        : 'border-white/10 bg-bg/30 hover:bg-bg/50'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !isProcessing && handlePurchase(pkg)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-4 px-3 py-1 bg-gradient-to-r from-accent to-primary text-white text-xs font-medium rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-textPrimary">
                            {pkg.credits} Credits
                          </span>
                          {pkg.bonus && (
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                              +{pkg.bonus} Bonus
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-textSecondary">
                          ${pkg.price} • ${(pkg.price / (pkg.credits + (pkg.bonus || 0))).toFixed(2)} per credit
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-accent" />
                        <span className="text-lg font-bold text-textPrimary">
                          ${pkg.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-bg/30 rounded-xl">
                <p className="text-sm text-textSecondary text-center">
                  Credits are used for AI stem separation. Each upload costs 1 credit.
                </p>
              </div>

              {isProcessing && (
                <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-textPrimary font-medium">Processing Payment...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
