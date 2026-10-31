import React from 'react';
import {
  Search,
  Calendar,
  Sparkles,
  MapPin,
  Users,
  Bell,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { MahfilCard } from '../components/MahfilCard';
import { SpeakerAvatar } from '../components/SpeakerAvatar';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshLocations';

export const HomePage: React.FC = () => {
  const {
    language,
    mahfils,
    speakers,
    announcements,
    setActiveTab,
    openMahfilDetailModal,
    setSearchFilterSpeakerName,
  } = useApp();
  const t = TRANSLATIONS[language];

  // Approved posts
  const approvedMahfils = mahfils.filter((m) => m.status === 'approved');

  // Today's Mahfils
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysMahfils = approvedMahfils.filter((m) => m.startDate === todayStr);

  // Upcoming Mahfils
  const upcomingMahfils = approvedMahfils.slice(0, 4);

  // Featured Speakers
  const featuredSpeakers = speakers.filter((s) => s.status === 'approved').slice(0, 10);

  const handleSpeakerClick = (speakerName: string) => {
    setSearchFilterSpeakerName(speakerName);
    setActiveTab('search');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 space-y-7 pb-24">
      {/* 1. Hero Brand Card with Arch Frame & Royal Gold Trim */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#085340] to-[#03261C] text-white p-6 sm:p-8 shadow-xl border-2 border-[#D4AF37]/50 overflow-hidden">
        {/* Subtle decorative Islamic minaret & dome glow */}
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-radial from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent rounded-full pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <img
              src="/logo.png"
              alt="মাহফিল Schedule Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-contain shadow-xl border-2 border-[#D4AF37] bg-black/10 shrink-0"
            />
            <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 text-[9px] font-extrabold uppercase shadow-sm tracking-wider">
              অফিশিয়াল
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2 mt-1 sm:mt-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সারা বাংলাদেশের প্রিমিয়াম প্ল্যাটফর্ম' : 'Nationwide Premium Portal'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {t.appName}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              {language === 'bn'
                ? 'সঠিক সময়ে সঠিক মাহফিলে যোগ দিন। সারাদেশের ভেরিফায়েড ওলামায়ে কেরামের ওয়াজ ও তাফসির মাহফিলের সম্পূর্ণ সময়সূচি।'
                : 'Join the right Mahfil at the right time. Authentic, verified Islamic lectures across Bangladesh.'}
            </p>

            {/* Quick Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <button
                onClick={() => setActiveTab('schedule')}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-extrabold text-xs hover:brightness-110 active:scale-95 transition shadow-md"
              >
                {t.navSchedule}
              </button>
              <button
                onClick={() => setActiveTab('new-post')}
                className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#0B6B50] border border-[#D4AF37]/50 text-white font-bold text-xs active:scale-95 transition"
              >
                {language === 'bn' ? 'নতুন মাহফিল যোগ করুন +' : 'Submit Mahfil +'}
              </button>
              <button
                onClick={() => setActiveTab('poster-studio')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] font-semibold text-xs transition"
              >
                পোস্টার স্টুডিও
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search Bar trigger */}
      <div
        onClick={() => setActiveTab('search')}
        className="w-full p-4 rounded-3xl bg-white dark:bg-[#13221C] border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#D4AF37] transition cursor-pointer flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
          <Search className="w-5 h-5 text-[#064E3B] dark:text-[#D4AF37]" />
          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            {t.searchPlaceholder}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-[#064E3B]/20">
          <span>{language === 'bn' ? 'অনুসন্ধান' : 'Search'}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* 3. Important Announcements */}
      {announcements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>{t.importantAnnouncements}</span>
            </h2>
          </div>
          <div className="space-y-2">
            {announcements.map((anc) => (
              <div
                key={anc.id}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 to-emerald-50/50 dark:from-amber-950/30 dark:to-emerald-950/30 border-2 border-amber-300/50 dark:border-amber-800/40 flex items-start gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {language === 'bn' ? anc.titleBn : anc.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {language === 'bn' ? anc.contentBn : anc.contentEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Today's Mahfils (if any) */}
      {todaysMahfils.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                {t.todaysMahfils}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todaysMahfils.map((m) => (
              <MahfilCard key={m.id} mahfil={m} onOpenDetails={openMahfilDetailModal} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Featured Islamic Speakers with SpeakerAvatar & Photo Upload */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-[#064E3B] dark:text-[#D4AF37]" />
              <span>{t.featuredSpeakers}</span>
            </h2>
            <p className="text-[11px] text-slate-500">বক্তার আসল ছবি যোগ করতে ক্যামেরায় ট্যাপ করুন</p>
          </div>
          <button
            onClick={() => setActiveTab('speakers')}
            className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
          {featuredSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => handleSpeakerClick(speaker.nameBn)}
              className="w-36 shrink-0 bg-white dark:bg-[#13221C] rounded-3xl p-3 border-2 border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#D4AF37] transition cursor-pointer text-center group flex flex-col items-center justify-between"
            >
              <div className="relative mb-2">
                <SpeakerAvatar speaker={speaker} size="lg" allowUpload={true} />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">
                {language === 'bn' ? speaker.nameBn : speaker.nameEn}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate w-full">
                {speaker.district}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Upcoming Mahfils */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-[#064E3B] dark:text-[#D4AF37]" />
            <span>{t.upcomingMahfils}</span>
          </h2>
          <button
            onClick={() => setActiveTab('schedule')}
            className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcomingMahfils.map((m) => (
            <MahfilCard key={m.id} mahfil={m} onOpenDetails={openMahfilDetailModal} />
          ))}
        </div>
      </section>

      {/* 7. Popular Locations Directory */}
      <section className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MapPin className="w-4.5 h-4.5 text-[#064E3B] dark:text-[#D4AF37]" />
          <span>{t.popularLocations}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BANGLADESH_DIVISIONS.map((div) => {
            const count = approvedMahfils.filter((m) => m.division === div.nameBn).length;
            return (
              <button
                key={div.id}
                onClick={() => setActiveTab('schedule')}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#13221C] border-2 border-slate-200 dark:border-slate-800 text-left hover:border-[#D4AF37] transition group"
              >
                <span className="block font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-[#064E3B] dark:group-hover:text-[#D4AF37]">
                  {language === 'bn' ? div.nameBn : div.nameEn}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'bn' ? `${count}টি মাহফিল` : `${count} Mahfils`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 8. PWA Install Banner */}
      <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#064E3B] dark:text-[#D4AF37] shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {t.pwaInstallTitle}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'bn' ? 'দ্রুত ব্রাউজিং ও নোটিফিকেশনের জন্য হোম স্ক্রিনে যোগ করুন।' : 'Install for offline access and swift browsing.'}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <PWAInstallButton compact={true} />
        </div>
      </div>
    </div>
  );
};
