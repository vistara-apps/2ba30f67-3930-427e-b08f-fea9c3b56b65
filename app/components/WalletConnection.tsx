'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Identity, Name, Avatar } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

export function WalletConnection() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <Wallet>
        <Identity className="px-4 py-2 bg-surface/80 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-surface/90 transition-colors">
          <Avatar className="w-6 h-6" />
          <Name className="text-textPrimary" />
        </Identity>
      </Wallet>
    );
  }

  return (
    <ConnectWallet className="px-6 py-2 bg-gradient-to-r from-accent to-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium">
      Connect Wallet
    </ConnectWallet>
  );
}
