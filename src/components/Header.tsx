import React from 'react';
import { Search, Palette, Sun, Moon, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';

export const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme, setActiveTab, isAdmin, toggleAdminPreview } = useApp();
  const t = TRANSLATIONS[language];

  const handleNextTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('theme-blue');
    else setTheme('light');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#064E3B] dark:bg-[#0C1512] text-white border-b-2 border-[#D4AF37]/50 shadow-md transition-colors">
      {/* Top micro bar with Bismillah and greeting */}
      <div className="bg-[#043327] dark:bg-[#070D0B] text-[#D4AF37] text-[11px] py-0.5 px-4 text-center border-b border-[#D4AF37]/20 font-medium tracking-wide flex items-center justify-between">
        <span className="hidden sm:inline text-emerald-200/80">বাংলাদেশ জাতীয় মাহফিল সময়সূচি পোর্টাল</span>
        <span className="mx-auto font-serif">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
        <span className="hidden sm:inline text-emerald-200/80">সঠিক সময়ে, সঠিক মাহফিল</span>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone with Official Uploaded Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="relative">
            <img
              src="/logo.png"
              alt="মাহফিল Schedule Logo"
              className="w-11 h-11 rounded-xl object-contain shadow-md border-2 border-[#D4AF37] group-hover:scale-105 transition-transform bg-white/5"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full border border-[#064E3B] flex items-center justify-center text-[7px] font-bold text-slate-950">
              ★
            </span>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-extrabold text-[#D4AF37] leading-tight tracking-tight drop-shadow-xs">
              {t.appName}
            </span>
            <span className="block text-[10px] text-emerald-200 font-medium">
              {t.tagline}
            </span>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Shortcut */}
          <button
            onClick={() => setActiveTab('search')}
            className="p-2 text-emerald-100 hover:text-[#D4AF37] hover:bg-white/10 rounded-xl transition"
            title={t.searchCategories.location}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Poster Studio button */}
          <button
            onClick={() => setActiveTab('poster-studio')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm hover:brightness-110 transition active:scale-95"
            title={t.posterStudioTitle}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'bn' ? 'পোস্টার' : 'Poster'}</span>
          </button>

          {/* Admin Role Toggle */}
          <button
            onClick={toggleAdminPreview}
            className={`p-1.5 text-xs rounded-xl border flex items-center gap-1 transition ${
              isAdmin
                ? 'bg-[#D4AF37] text-slate-950 border-amber-300 shadow-sm font-bold'
                : 'text-emerald-200 hover:text-white border-white/20 hover:bg-white/10'
            }`}
            title={isAdmin ? 'Admin Mode Active' : 'Switch to Admin Review Mode'}
          >
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-bold hidden md:inline">{isAdmin ? 'ADMIN' : 'USER'}</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={handleNextTheme}
            className="p-2 text-emerald-200 hover:text-[#D4AF37] rounded-xl hover:bg-white/10 transition"
            title={`Theme: ${theme}`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' && <Sun className="w-4.5 h-4.5 text-amber-300" />}
            {theme === 'dark' && <Moon className="w-4.5 h-4.5 text-slate-200" />}
            {theme === 'theme-blue' && <span className="w-4 h-4 block rounded-full bg-blue-400 border border-white" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-2 py-1 text-xs font-bold rounded-lg border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 transition"
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </button>
        </div>
      </div>
    </header>
  );
};
