import React, { useState } from 'react';
import { AppView } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CaseList } from './components/investigation/CaseList';
import { InvestigationWorkspace } from './components/investigation/InvestigationWorkspace';
import { UlukaChallenge } from './components/challenge/UlukaChallenge';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeCaseId, setActiveCaseId] = useState<string | null>('ULK-2047');

  const handleOpenCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setCurrentView('investigation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 font-sans">
      {/* Global Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        activeCaseId={activeCaseId}
      />

      {/* Main Mode Views */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenCase={handleOpenCase}
          />
        )}

        {currentView === 'cases' && (
          <CaseList
            onOpenCase={handleOpenCase}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'investigation' && (
          <InvestigationWorkspace
            caseId={activeCaseId || 'ULK-2047'}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'challenge' && (
          <UlukaChallenge
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Global Protocol Footer */}
      <Footer />
    </div>
  );
};

export default App;
