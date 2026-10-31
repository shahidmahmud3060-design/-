import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Users,
  Calendar,
  RotateCcw,
  Search as SearchIcon,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  CalendarDays,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { MahfilCard } from '../components/MahfilCard';
import { SpeakerAvatar } from '../components/SpeakerAvatar';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  WARDS_LIST,
} from '../data/bangladeshLocations';
import { toBengaliNumber, formatMahfilDate } from '../utils/bengali';

type SearchCategory = 'location' | 'speaker' | 'date';

export const SearchPage: React.FC = () => {
  const {
    language,
    mahfils,
    speakers,
    openMahfilDetailModal,
    setActiveTab,
    searchFilterSpeakerName,
    setSearchFilterSpeakerName,
  } = useApp();
  const t = TRANSLATIONS[language];

  // Exactly three search categories
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('location');

  // Category A: Location Search State (Division -> District -> Upazila -> Union -> Ward)
  const [locDivision, setLocDivision] = useState('');
  const [locDistrict, setLocDistrict] = useState('');
  const [locUpazila, setLocUpazila] = useState('');
  const [locUnion, setLocUnion] = useState('');
  const [locWard, setLocWard] = useState('');

  // Category B: Speaker Search State
  const [speakerQuery, setSpeakerQuery] = useState(searchFilterSpeakerName || '');

  // Category C: Date Search State
  const [dateSearchMode, setDateSearchMode] = useState<'specific' | 'month' | 'today' | 'tomorrow'>('specific');
  const [specificDate, setSpecificDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('11'); // November
  const [selectedYear, setSelectedYear] = useState('2026');

  // Location cascades
  const locDistricts = useMemo(() => {
    if (!locDivision) return [];
    return getDistrictsByDivision(locDivision);
  }, [locDivision]);

  const locUpazilas = useMemo(() => {
    if (!locDistrict) return [];
    return getUpazilasByDistrict(locDistrict);
  }, [locDistrict]);

  const locUnions = useMemo(() => {
    if (!locDistrict || !locUpazila) return [];
    return getUnionsByUpazila(locDistrict, locUpazila);
  }, [locDistrict, locUpazila]);

  // Approved mahfils baseline
  const approvedMahfils = useMemo(() => {
    return mahfils.filter((m) => m.status === 'approved');
  }, [mahfils]);

  // 1. Location Matching Mahfils
  const locationMatchingMahfils = useMemo(() => {
    if (!locDivision && !locDistrict && !locUpazila) {
      return [];
    }
    return approvedMahfils.filter((m) => {
      if (locDivision && m.division !== locDivision) return false;
      if (locDistrict && m.district !== locDistrict) return false;
      if (locUpazila && m.upazila !== locUpazila) return false;
      if (locUnion && m.union && m.union !== locUnion) return false;
      if (locWard && m.ward && m.ward !== locWard) return false;
      return true;
    });
  }, [approvedMahfils, locDivision, locDistrict, locUpazila, locUnion, locWard]);

  // 2. Speaker Matching Results
  const speakerSearchResults = useMemo(() => {
    const q = speakerQuery.toLowerCase().trim();
    if (!q) return { matchingSpeakers: [], scheduledMahfils: [] };

    const matchingSpeakers = speakers.filter(
      (s) =>
        s.status === 'approved' &&
        (s.nameBn.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.alternativeSpellings?.some((alt) => alt.toLowerCase().includes(q)))
    );

    const scheduledMahfils = approvedMahfils.filter(
      (m) =>
        m.principalSpeaker.nameBn.toLowerCase().includes(q) ||
        m.principalSpeaker.nameEn.toLowerCase().includes(q) ||
        (m.secondSpeaker && m.secondSpeaker.nameBn.toLowerCase().includes(q)) ||
        (m.thirdSpeaker && m.thirdSpeaker.nameBn.toLowerCase().includes(q)) ||
        (m.specialSpeaker && m.specialSpeaker.nameBn.toLowerCase().includes(q))
    );

    return { matchingSpeakers, scheduledMahfils };
  }, [speakers, approvedMahfils, speakerQuery]);

  // 3. Date Matching Mahfils
  const dateMatchingMahfils = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];

    return approvedMahfils.filter((m) => {
      if (dateSearchMode === 'today') {
        return m.startDate === today;
      }
      if (dateSearchMode === 'tomorrow') {
        return m.startDate === tomorrow;
      }
      if (dateSearchMode === 'specific') {
        if (!specificDate) return true;
        return m.startDate === specificDate || (m.endDate && specificDate >= m.startDate && specificDate <= m.endDate);
      }
      if (dateSearchMode === 'month') {
        const [year, month] = m.startDate.split('-');
        return year === selectedYear && month === selectedMonth;
      }
      return true;
    });
  }, [approvedMahfils, dateSearchMode, specificDate, selectedMonth, selectedYear]);

  const clearLocationSelection = () => {
    setLocDivision('');
    setLocDistrict('');
    setLocUpazila('');
    setLocUnion('');
    setLocWard('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header with back navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] dark:text-[#D4AF37]">
              {language === 'bn' ? 'মাহফিল অনুসন্ধান কেন্দ্র' : 'Mahfil Search Hub'}
            </h1>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'স্থান, বক্তা বা তারিখ অনুযায়ী নির্দিষ্ট অনুসন্ধান' : 'Filter precisely by location, speaker, or date'}
            </p>
          </div>
        </div>
      </div>

      {/* Exactly Three Main Search Categories Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveCategory('location')}
          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
            activeCategory === 'location'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span>A. {language === 'bn' ? 'স্থান অনুসন্ধান' : 'Location'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('speaker')}
          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
            activeCategory === 'speaker'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#D4AF37]" />
          <span>B. {language === 'bn' ? 'বক্তা অনুসন্ধান' : 'Speaker'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('date')}
          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
            activeCategory === 'date'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>C. {language === 'bn' ? 'তারিখ অনুসন্ধান' : 'Date'}</span>
        </button>
      </div>

      {/* CATEGORY A: LOCATION SEARCH */}
      {activeCategory === 'location' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] flex items-center gap-1.5 uppercase">
                <MapPin className="w-4 h-4" />
                <span>প্রশাসনিক স্তর নির্বাচন (Division → District → Upazila → Union → Ward)</span>
              </span>
              {(locDivision || locDistrict) && (
                <button
                  onClick={clearLocationSelection}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetFilters}</span>
                </button>
              )}
            </div>

            {/* Cascade dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Division */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  ১. বিভাগ:
                </label>
                <select
                  value={locDivision}
                  onChange={(e) => {
                    setLocDivision(e.target.value);
                    setLocDistrict('');
                    setLocUpazila('');
                    setLocUnion('');
                    setLocWard('');
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  <option value="">-- বিভাগ নির্বাচন করুন --</option>
                  {BANGLADESH_DIVISIONS.map((d) => (
                    <option key={d.id} value={d.nameBn}>
                      {d.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. District */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  ২. জেলা:
                </label>
                <select
                  value={locDistrict}
                  disabled={!locDivision}
                  onChange={(e) => {
                    setLocDistrict(e.target.value);
                    setLocUpazila('');
                    setLocUnion('');
                    setLocWard('');
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
                >
                  <option value="">-- জেলা নির্বাচন করুন --</option>
                  {locDistricts.map((dist) => (
                    <option key={dist.id} value={dist.nameBn}>
                      {dist.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Upazila */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  ৩. উপজেলা / থানা:
                </label>
                <select
                  value={locUpazila}
                  disabled={!locDistrict}
                  onChange={(e) => {
                    setLocUpazila(e.target.value);
                    setLocUnion('');
                    setLocWard('');
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
                >
                  <option value="">-- উপজেলা নির্বাচন করুন --</option>
                  {locUpazilas.map((u) => (
                    <option key={u.id} value={u.nameBn}>
                      {u.nameBn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Union & Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  ৪. ইউনিয়ন (ঐচ্ছিক):
                </label>
                <select
                  value={locUnion}
                  disabled={!locUpazila}
                  onChange={(e) => setLocUnion(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
                >
                  <option value="">-- সকল ইউনিয়ন --</option>
                  {locUnions.map((u, i) => (
                    <option key={i} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  ৫. ওয়ার্ড (ঐচ্ছিক):
                </label>
                <select
                  value={locWard}
                  onChange={(e) => setLocWard(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  <option value="">-- সকল ওয়ার্ড --</option>
                  {WARDS_LIST.map((w, idx) => (
                    <option key={idx} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Location Summary */}
            {locDivision && (
              <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-[#064E3B]/20 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  নির্বাচিত স্থান: <strong>{locDivision}</strong> {locDistrict ? `→ ${locDistrict}` : ''} {locUpazila ? `→ ${locUpazila}` : ''} {locUnion ? `→ ${locUnion}` : ''}
                </span>
                <span className="font-bold text-[#064E3B] dark:text-[#D4AF37]">
                  {locationMatchingMahfils.length} টি মাহফিল পাওয়া গেছে
                </span>
              </div>
            )}
          </div>

          {/* Results Display */}
          {locDivision ? (
            locationMatchingMahfils.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locationMatchingMahfils.map((m) => (
                  <MahfilCard key={m.id} mahfil={m} onOpenDetails={openMahfilDetailModal} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                <MapPin className="w-10 h-10 mx-auto text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  এই স্থানে কোনো অনুমোদিত মাহফিল পাওয়া যায়নি
                </h4>
                <p className="text-xs text-slate-500">
                  বিভাগ বা জেলা পরিবর্তন করে পুনরায় অনুসন্ধান করুন।
                </p>
              </div>
            )
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <MapPin className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs text-slate-500">
                অনুসন্ধান করতে উপরে প্রথমে একটি বিভাগ নির্বাচন করুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* CATEGORY B: SPEAKER NAME SEARCH */}
      {activeCategory === 'speaker' && (
        <div className="space-y-5">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase">
              বক্তার নাম দিয়ে খুঁজুন (বাংলা বা ইংরেজি বানান)
            </label>
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={speakerQuery}
                onChange={(e) => setSpeakerQuery(e.target.value)}
                placeholder="যেমন: আজহারী, আহমাদুল্লাহ, আব্দুর রাজ্জাক, তারেক মনোয়ার..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
              />
              {speakerQuery && (
                <button
                  onClick={() => setSpeakerQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  মুছুন
                </button>
              )}
            </div>

            {/* Quick suggestions pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400">জনপ্রিয় অনুসন্ধান:</span>
              {['মিজানুর রহমান আজহারী', 'শায়খ আহমাদুল্লাহ', 'আব্দুর রাজ্জাক বিন ইউসুফ', 'আমির হামজা'].map((name) => (
                <button
                  key={name}
                  onClick={() => setSpeakerQuery(name)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 transition"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Results: Speaker Profiles & Schedules */}
          {speakerQuery ? (
            <div className="space-y-5">
              {/* Matching Speakers Profiles */}
              {speakerSearchResults.matchingSpeakers.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    মিলে যাওয়া বক্তার প্রোফাইল ({speakerSearchResults.matchingSpeakers.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {speakerSearchResults.matchingSpeakers.map((sp) => (
                      <div
                        key={sp.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                      >
                        <SpeakerAvatar speaker={sp} size="md" allowUpload={true} />
                        <div className="truncate">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                            {language === 'bn' ? sp.nameBn : sp.nameEn}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">{sp.district} · {sp.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Mahfil Schedules */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  বক্তার নির্ধারিত মাহফিল সময়সূচি ({speakerSearchResults.scheduledMahfils.length})
                </h3>
                {speakerSearchResults.scheduledMahfils.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {speakerSearchResults.scheduledMahfils.map((m) => (
                      <MahfilCard key={m.id} mahfil={m} onOpenDetails={openMahfilDetailModal} />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs">এই বক্তার বর্তমানে কোনো আসন্ন অনুমোদিত মাহফিল পোস্ট পাওয়া যায়নি।</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs text-slate-500">বক্তার নাম লিখে অনুসন্ধান করুন।</p>
            </div>
          )}
        </div>
      )}

      {/* CATEGORY C: DATE SEARCH */}
      {activeCategory === 'date' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <label className="block text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase">
              তারিখ, দিন, মাস বা বছর অনুযায়ী অনুসন্ধান
            </label>

            {/* Quick date switches */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setDateSearchMode('specific')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                  dateSearchMode === 'specific'
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                নির্দিষ্ট তারিখ
              </button>
              <button
                onClick={() => setDateSearchMode('today')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                  dateSearchMode === 'today'
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                আজকের মাহফিল
              </button>
              <button
                onClick={() => setDateSearchMode('tomorrow')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                  dateSearchMode === 'tomorrow'
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                আগামীকাল
              </button>
              <button
                onClick={() => setDateSearchMode('month')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                  dateSearchMode === 'month'
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                মাস ও বছর
              </button>
            </div>

            {/* Specific Date picker input */}
            {dateSearchMode === 'specific' && (
              <div className="pt-2">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  তারিখ নির্বাচন করুন:
                </label>
                <input
                  type="date"
                  value={specificDate}
                  onChange={(e) => setSpecificDate(e.target.value)}
                  className="w-full sm:w-64 p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
            )}

            {/* Month & Year pickers */}
            {dateSearchMode === 'month' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">মাস:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                    <option value="01">জানুয়ারি</option>
                    <option value="02">ফেব্রুয়ারি</option>
                    <option value="03">মার্চ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">বছর:</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="2026">২০২৬</option>
                    <option value="2027">২০২৭</option>
                  </select>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>
                ফলাফল: {dateMatchingMahfils.length} টি মাহফিল পাওয়া গেছে
              </span>
            </div>
          </div>

          {/* Date Matching Mahfil Cards */}
          {dateMatchingMahfils.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dateMatchingMahfils.map((m) => (
                <MahfilCard key={m.id} mahfil={m} onOpenDetails={openMahfilDetailModal} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <Calendar className="w-10 h-10 mx-auto text-slate-300" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                এই তারিখে কোনো অনুমোদিত মাহফিল নির্ধারিত নেই
              </h4>
              <p className="text-xs text-slate-500">অন্য কোনো তারিখ বা মাস নির্বাচন করুন।</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
