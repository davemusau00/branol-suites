import React, { useState } from 'react';
import { ConferencePackagesSection } from './ConferencePackagesSection';
import { IMAGES, BRANOL_INFO } from '../data/hotelData';
import { Calculator, Check } from 'lucide-react';

interface MeetPageProps {
  onOpenQuoteModalWithPackage: (packageName: string) => void;
}

export const MeetPage: React.FC<MeetPageProps> = ({ onOpenQuoteModalWithPackage }) => {
  // Interactive Cost Calculator
  const [delegates, setDelegates] = useState<number>(20);
  const [days, setDays] = useState<number>(1);
  const [packageType, setPackageType] = useState<'half' | 'full' | 'residential'>('full');

  const rates = {
    half: 600, // per delegate estimate supplement
    full: 18000 / 10, // KES 1,800 per delegate / day estimate
    residential: 28000 / 10, // KES 2,800 per delegate / day estimate
  };

  const estimatedTotal = Math.round(delegates * days * rates[packageType] * 10);

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] text-[#121212]">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-16 lg:py-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
              BRANOL / MEET
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            MEET WITHOUT THE NOISE.
          </h1>

          <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-xl leading-relaxed">
            Bring the team, the conversation and the agenda. We'll take care of the setting.
          </p>
        </div>
      </div>

      {/* Interactive Conference Calculator Section */}
      <section className="py-16 bg-[#F3EFEA] border-b border-[#E0D8CB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold flex items-center justify-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>INTERACTIVE COST ESTIMATOR</span>
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#121212]">
              Estimate Your Conference Budget
            </h2>
          </div>

          <div className="bg-white border border-[#D6CEBE] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#444] mb-2">
                  Number of Delegates: <span className="text-[#B85228] font-mono font-bold text-sm">{delegates}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={delegates}
                  onChange={(e) => setDelegates(Number(e.target.value))}
                  className="w-full accent-[#B85228]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#444] mb-2">
                  Duration (Days): <span className="text-[#B85228] font-mono font-bold text-sm">{days} Day{days > 1 ? 's' : ''}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#B85228]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#444] mb-2">
                  Select Package Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPackageType('half')}
                    className={`py-2 text-xs font-semibold uppercase border ${
                      packageType === 'half'
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#FAF8F5] text-[#555] border-[#D6CEBE]'
                    }`}
                  >
                    Half Day
                  </button>
                  <button
                    onClick={() => setPackageType('full')}
                    className={`py-2 text-xs font-semibold uppercase border ${
                      packageType === 'full'
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#FAF8F5] text-[#555] border-[#D6CEBE]'
                    }`}
                  >
                    Full Day
                  </button>
                  <button
                    onClick={() => setPackageType('residential')}
                    className={`py-2 text-xs font-semibold uppercase border ${
                      packageType === 'residential'
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#FAF8F5] text-[#555] border-[#D6CEBE]'
                    }`}
                  >
                    Residential
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#121212] text-white p-6 text-center space-y-4 border border-[#2A2A2A]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B85228]">
                ESTIMATED INVESTMENT
              </span>
              <div className="font-mono text-3xl font-bold text-white">
                KES {estimatedTotal.toLocaleString()}
              </div>
              <p className="text-[11px] text-[#A8A299] font-light">
                Includes venue allocation, high-speed Wi-Fi, audio-visual equipment, and catering.
              </p>
              <button
                onClick={() =>
                  onOpenQuoteModalWithPackage(
                    packageType === 'half'
                      ? 'Half Day Conference'
                      : packageType === 'full'
                      ? 'Full Day Conference'
                      : 'Residential Conference'
                  )
                }
                className="w-full py-2.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                REQUEST FORMAL PROFORMA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages & Form */}
      <ConferencePackagesSection onOpenQuoteModalWithPackage={onOpenQuoteModalWithPackage} />
    </div>
  );
};
