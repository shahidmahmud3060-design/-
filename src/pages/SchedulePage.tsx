import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, CalendarDays, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { MahfilCard } from '../components/MahfilCard';
import { BANGLADESH_DIVISIONS, getDistrictsByDivision } from '../data/bangladeshLocations';

export const SchedulePage: React.FC = () => {
  const { language, mahfils, openMahfilDetailModal } = useApp();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Available districts based on selected division
  const availableDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    return getDistrictsByDivision(selectedDivision);
  }, [selectedDivision]);

  // Show only approved posts
  const filteredMahfils = useMemo(() => {
    return mahfils.filter((m) => {
      if (m.status !== 'approved') return false;

      // Division filter
      if (selectedDivision && m.division !== selectedDivision) {
        return false;
      }

      // District filter
      if (selectedDistrict && m.district !== selectedDistrict) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDistrict = m.district.toLowerCase().includes(q);
        const matchUpazila = m.upazila.toLowerCase().includes(q);
        const matchSpeaker = m.principalSpeaker.nameBn.toLowerCase().includes(q) ||
          m.principalSpeaker.nameEn.toLowerCase().includes(q);
        const matchSecSpeaker = m.secondSpeaker?.nameBn.toLowerCase().includes(q) || false;

        if (!matchTitle && !matchDistrict && !matchUpazila && !matchSpeaker && !matchSecSpeaker) {
          return false;
        }
      }

      return true;
    });
  }, [mahfils, selectedDivision, selectedDistrict, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('');
    setSelectedDistrict('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] dark:text-[#D4AF37] flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-[#064E3B] dark:text-[#D4AF37]" />
          <span>{t.navSchedule}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {language === 'bn' ? 'অ্যাডমিন অনুমোদিত ও যাচাইকৃত মাহফিলের তালিকা' : 'Admin-verified Mahfil schedules across Bangladesh'}
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              {t.cancel}
            </button>
          )}
        </div>

        {/* Division & District Dynamic Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Division */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              {t.filterByDivision}:
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict('');
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="">{t.allDivisions}</option>
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div.id} value={div.nameBn}>
                  {language === 'bn' ? div.nameBn : div.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              {t.filterByDistrict}:
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedDivision}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
            >
              <option value="">{t.allDistricts}</option>
              {availableDistricts.map((dist) => (
                <option key={dist.id} value={dist.nameBn}>
                  {language === 'bn' ? dist.nameBn : dist.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter stats & Reset button */}
        {(searchQuery || selectedDivision || selectedDistrict) && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              ফলাফল: {filteredMahfils.length} টি মাহফিল পাওয়া গেছে
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mahfil Cards Grid */}
      {filteredMahfils.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMahfils.map((mahfil) => (
            <MahfilCard
              key={mahfil.id}
              mahfil={mahfil}
              onOpenDetails={openMahfilDetailModal}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <CalendarDays className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            কোনো মাহফিল পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের সাথে মিল রেখে কোনো অনুমোদিত মাহফিল খুঁজে পাওয়া যায়নি।
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#0B6B50] transition inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ফিল্টার রিসেট করুন</span>
          </button>
        </div>
      )}
    </div>
  );
};
