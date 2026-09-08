import React, { useState } from 'react';
import { 
  User, 
  Car, 
  Phone, 
  Laptop, 
  MapPin, 
  Building2, 
  CreditCard, 
  FileText, 
  Calendar,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SymbolLegendProps {
  className?: string;
  defaultExpanded?: boolean;
}

export const SYMBOL_DEFINITIONS = [
  {
    type: 'Person',
    label: 'Person / Suspect',
    icon: User,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/30',
    dotColor: '#38bdf8',
    description: 'Individuals, suspects, operators, informants, and alias holders.'
  },
  {
    type: 'Vehicle',
    label: 'Vehicle / Transit',
    icon: Car,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    dotColor: '#10b981',
    description: 'Automobiles, transport trucks, clone plate vehicles, and carriers.'
  },
  {
    type: 'Phone',
    label: 'Phone / Cellular',
    icon: Phone,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30',
    dotColor: '#f59e0b',
    description: 'Burner SIM cards, registered phone numbers, and call records.'
  },
  {
    type: 'Device',
    label: 'Device / Hardware',
    icon: Laptop,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/30',
    dotColor: '#f43f5e',
    description: 'Workstations, telemetry units, GPS jammers, and OBD programmers.'
  },
  {
    type: 'Location',
    label: 'Location / Landmark',
    icon: MapPin,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30',
    dotColor: '#a855f7',
    description: 'Warehouses, toll plazas, shipping docks, and meeting waypoints.'
  },
  {
    type: 'Organization',
    label: 'Organization / Front',
    icon: Building2,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/30',
    dotColor: '#6366f1',
    description: 'Shell companies, logistics brokerages, trade guilds, and syndicates.'
  },
  {
    type: 'Account',
    label: 'Account / Financial',
    icon: CreditCard,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/30',
    dotColor: '#06b6d4',
    description: 'Bank accounts, hawala ledgers, shell balances, and payoff accounts.'
  },
  {
    type: 'Evidence',
    label: 'Evidence / Document',
    icon: FileText,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
    dotColor: '#ef4444',
    description: 'Physical logs, manifests, CCTV stills, seized smartcards, and FIRs.'
  },
  {
    type: 'Event',
    label: 'Event / Timeline',
    icon: Calendar,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    dotColor: '#eab308',
    description: 'Time-stamped occurrences, toll bursts, overrides, and disconnections.'
  }
];

export const SymbolLegend: React.FC<SymbolLegendProps> = ({ 
  className = '', 
  defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm transition-all select-none ${className}`}>
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-900/50 rounded-xl transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-slate-300">
            SYMBOL LEGEND
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            • What do the node symbols mean?
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <span>{isExpanded ? 'Hide' : 'Show Legend'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded grid */}
      {isExpanded && (
        <div className="p-3 pt-1 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {SYMBOL_DEFINITIONS.map(sym => {
              const Icon = sym.icon;
              return (
                <div 
                  key={sym.type}
                  className={`p-2 rounded-lg border ${sym.bg} flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${sym.color} shrink-0`} />
                    <span className={`text-[11px] font-bold font-mono ${sym.color} truncate`}>
                      {sym.type}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {sym.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
