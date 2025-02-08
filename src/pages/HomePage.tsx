import { useState } from 'react';
import { TokenCard } from '../components/TokenCard';
import { tokens } from '../data/tokens';
import { SupportModal } from '../components/SupportModal';
import { Footer } from '../components/Footer';
import { Heart } from 'lucide-react';

export const HomePage = () => {
  const [view] = useState<'grid' | 'table'>('grid');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 flex flex-col items-center pt-4">
        <main className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 glass-panel rounded-lg">
          <div className="logo-container">
            <img
              src="https://sadpepedev.github.io/TheLegionProject/images/logos/degion.png"
              alt="Degion Logo"
              className="degion"
            />
            <img
              src="https://sadpepedev.github.io/TheLegionProject/images/logos/legion.png"
              alt="Legion Logo"
              className="legion-hover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tokens.map(token => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>

          <div className="flex justify-center mt-8 mb-8">
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00ffee]/20 to-[#37fffc]/20 rounded-full 
                         hover:from-[#00ffee] hover:to-[#37fffc] transition-all duration-300
                         border border-[#00ffee]/30 hover:border-[#00ffee] backdrop-blur-sm
                         hover:shadow-[0_0_30px_rgba(0,255,238,0.3)]"
              onClick={() => setIsSupportModalOpen(true)}
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-5 h-5 text-black animate-pulse" />
              </span>
              <span className="flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                <Heart className="w-5 h-5 group-hover:opacity-0 transition-opacity duration-300" />
                Support Degion.xyz
              </span>
            </button>
          </div>

          <Footer />
        </main>
      </div>

      <SupportModal 
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
};