import React from 'react';
import { Home, CalendarDays, Plus, Users, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#064E3B] dark:bg-[#0C1512] text-white border-t-2 border-[#D4AF37]/50 shadow-[0_-4px_25px_rgba(0,0,0,0.3)] pb-safe">
      <div className="max-w-md md:max-w-xl mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* 1. Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all min-w-[50px] ${
            activeTab === 'home'
              ? 'text-[#D4AF37] font-bold scale-105'
              : 'text-emerald-200/70 hover:text-white'
          }`}
          aria-label={t.navHome}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight">{t.navHome}</span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 2. Mahfil Schedule */}
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all min-w-[50px] ${
            activeTab === 'schedule'
              ? 'text-[#D4AF37] font-bold scale-105'
              : 'text-emerald-200/70 hover:text-white'
          }`}
          aria-label={t.navSchedule}
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight">{t.navSchedule}</span>
          {activeTab === 'schedule' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 3. Center Plus (+) Button */}
        <div className="flex-1 flex justify-center items-center relative -top-4">
          <button
            onClick={() => setActiveTab('new-post')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#064E3B] via-[#0B6B50] to-[#04281E] text-white flex items-center justify-center shadow-xl shadow-black/40 border-2 border-[#D4AF37] active:scale-90 transition-transform cursor-pointer group"
            title={t.navAdd}
            aria-label={t.navAdd}
          >
            <div className="relative flex items-center justify-center">
              <Plus className="w-7 h-7 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300 stroke-[3]" />
            </div>
          </button>
        </div>

        {/* 4. Speakers */}
        <button
          onClick={() => setActiveTab('speakers')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all min-w-[50px] ${
            activeTab === 'speakers'
              ? 'text-[#D4AF37] font-bold scale-105'
              : 'text-emerald-200/70 hover:text-white'
          }`}
          aria-label={t.navSpeakers}
        >
          <Users className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight">{t.navSpeakers}</span>
          {activeTab === 'speakers' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 5. Account */}
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all min-w-[50px] ${
            activeTab === 'account'
              ? 'text-[#D4AF37] font-bold scale-105'
              : 'text-emerald-200/70 hover:text-white'
          }`}
          aria-label={t.navAccount}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight">{t.navAccount}</span>
          {activeTab === 'account' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
