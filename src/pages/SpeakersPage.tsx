import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Users,
  UserCheck,
  MapPin,
  Calendar,
  Phone,
  UserPlus,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Filter,
  Camera,
  Upload,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { Speaker } from '../types';
import { SpeakerAvatar } from '../components/SpeakerAvatar';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshLocations';

export const SpeakersPage: React.FC = () => {
  const {
    language,
    speakers,
    mahfils,
    openMahfilDetailModal,
    suggestSpeaker,
    updateSpeakerPhoto,
    setSearchFilterSpeakerName,
    setActiveTab,
  } = useApp();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'Bangladesh' | 'India'>('all');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [activeSpeakerModal, setActiveSpeakerModal] = useState<Speaker | null>(null);

  // Suggest speaker modal
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestNameBn, setSuggestNameBn] = useState('');
  const [suggestNameEn, setSuggestNameEn] = useState('');
  const [suggestDistrict, setSuggestDistrict] = useState('');
  const [suggestBio, setSuggestBio] = useState('');
  const [suggestPhoto, setSuggestPhoto] = useState<string>('');
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);

  const modalPhotoInputRef = useRef<HTMLInputElement | null>(null);

  // Filter approved speakers
  const filteredSpeakers = useMemo(() => {
    return speakers.filter((s) => {
      if (s.status !== 'approved') return false;

      if (selectedCountry !== 'all' && s.country !== selectedCountry) {
        return false;
      }

      if (selectedDivision && s.division !== selectedDivision) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchBn = s.nameBn.toLowerCase().includes(q);
        const matchEn = s.nameEn.toLowerCase().includes(q);
        const matchDist = s.district.toLowerCase().includes(q);
        const matchAlts = s.alternativeSpellings?.some((alt) => alt.toLowerCase().includes(q));
        if (!matchBn && !matchEn && !matchDist && !matchAlts) return false;
      }

      return true;
    });
  }, [speakers, selectedCountry, selectedDivision, searchQuery]);

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestNameBn.trim()) return;

    suggestSpeaker({
      nameBn: suggestNameBn.trim(),
      nameEn: suggestNameEn.trim() || suggestNameBn.trim(),
      country: 'Bangladesh',
      district: suggestDistrict.trim() || 'ঢাকা',
      photoUrl: suggestPhoto || undefined,
      biographyBn: suggestBio.trim() || 'ব্যবহারকারী প্রস্তাবিত বক্তা। যাচাইকরণ প্রক্রিয়াধীন।',
      biographyEn: 'User-suggested Islamic speaker profile pending administrative review.',
      phonePubliclyApproved: false,
    });

    setSuggestSubmitted(true);
    setTimeout(() => {
      setShowSuggestModal(false);
      setSuggestSubmitted(false);
      setSuggestNameBn('');
      setSuggestNameEn('');
      setSuggestDistrict('');
      setSuggestBio('');
      setSuggestPhoto('');
    }, 2000);
  };

  const handleModalPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSpeakerModal) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const photoUrl = event.target.result as string;
        updateSpeakerPhoto(activeSpeakerModal.id, photoUrl);
        setActiveSpeakerModal({ ...activeSpeakerModal, photoUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const getSpeakerMahfils = (speaker: Speaker) => {
    return mahfils.filter(
      (m) =>
        m.status === 'approved' &&
        (m.principalSpeaker.id === speaker.id ||
          m.secondSpeaker?.id === speaker.id ||
          m.principalSpeaker.nameBn === speaker.nameBn)
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#085340] to-[#043327] text-white shadow-lg border-2 border-[#D4AF37]/50">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-bold mb-1.5 border border-[#D4AF37]/30">
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'যাচাইকৃত ইসলামি বক্তা ডেটাবেজ' : 'Verified Speaker Directory'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#D4AF37]">
            {t.speakerDatabaseTitle}
          </h1>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-xl">
            {language === 'bn'
              ? 'বক্তার আসল ছবি যোগ করার জন্য কার্ডের ক্যামেরায় ট্যাপ করুন। কোনো ভুয়া বা ভুল ছবি প্রদর্শন করা হবে না।'
              : 'Tap the camera icon on any speaker card to attach an authentic photo.'}
          </p>
        </div>

        <button
          onClick={() => setShowSuggestModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#D4AF37] text-slate-950 font-extrabold text-xs hover:brightness-110 active:scale-95 transition shadow-md flex items-center gap-1.5 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.suggestSpeakerBtn}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#13221C] border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchSpeakerPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedCountry === 'all'
                  ? 'bg-white dark:bg-[#182620] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              সকল দেশ ({speakers.filter((s) => s.status === 'approved').length})
            </button>
            <button
              onClick={() => setSelectedCountry('Bangladesh')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedCountry === 'Bangladesh'
                  ? 'bg-white dark:bg-[#182620] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              বাংলাদেশ
            </button>
            <button
              onClick={() => setSelectedCountry('India')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedCountry === 'India'
                  ? 'bg-white dark:bg-[#182620] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              আমন্ত্রিত ভারতীয় বক্তা
            </button>
          </div>

          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 ml-auto"
          >
            <option value="">সকল বিভাগ</option>
            {BANGLADESH_DIVISIONS.map((d) => (
              <option key={d.id} value={d.nameBn}>
                {d.nameBn} বিভাগ
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSpeakers.map((speaker) => {
          const speakerMahfils = getSpeakerMahfils(speaker);
          return (
            <div
              key={speaker.id}
              onClick={() => setActiveSpeakerModal(speaker)}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#13221C] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-start gap-3.5">
                {/* Speaker Avatar with Photo Upload trigger */}
                <SpeakerAvatar speaker={speaker} size="lg" allowUpload={true} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-[#064E3B] dark:group-hover:text-[#D4AF37] transition-colors truncate">
                      {language === 'bn' ? speaker.nameBn : speaker.nameEn}
                    </h3>
                    {speaker.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {language === 'bn' ? speaker.titleBn : speaker.titleEn}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#064E3B] dark:text-[#D4AF37]" />
                      <span>{speaker.district}</span>
                    </span>
                    {speaker.country === 'India' && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                        ভারত (আমন্ত্রিত)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Biography snippet */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {language === 'bn' ? speaker.biographyBn : speaker.biographyEn}
              </p>

              {/* Footer */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-[#064E3B] dark:text-[#D4AF37]">
                  {speakerMahfils.length > 0
                    ? `${speakerMahfils.length} টি মাহফিল নির্ধারিত`
                    : 'নিয়মিত আলোচক'}
                </span>

                <div className="flex items-center gap-1 text-slate-400 group-hover:text-[#064E3B] dark:group-hover:text-[#D4AF37] font-bold">
                  <span>প্রোফাইল ও ছবি</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Speaker Profile Modal with Direct Image Upload Option */}
      {activeSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#13221C] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-[#064E3B] text-white">
              <div className="flex items-center gap-3.5">
                <SpeakerAvatar speaker={activeSpeakerModal} size="xl" allowUpload={true} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#D4AF37]">
                      {language === 'bn' ? activeSpeakerModal.nameBn : activeSpeakerModal.nameEn}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  </div>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    {language === 'bn' ? activeSpeakerModal.titleBn : activeSpeakerModal.titleEn}
                  </p>
                  <p className="text-xs text-emerald-200 mt-0.5 font-medium">
                    জেলা: {activeSpeakerModal.district} · {activeSpeakerModal.country}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSpeakerModal(null)}
                className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Photo Upload Card Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center justify-between gap-3">
                <div className="text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold block">বক্তার আসল ছবি যোগ করতে চান?</span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300">
                    {activeSpeakerModal.photoUrl ? 'ছবি পরিবর্তন করতে এখানে চাপুন' : 'সরাসরি ডিভাইস থেকে ছবি আপলোড করুন'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => modalPhotoInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-[#064E3B] text-[#D4AF37] font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs hover:bg-[#0B6B50]"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{activeSpeakerModal.photoUrl ? 'ছবি পরিবর্তন' : 'ছবি যোগ করুন'}</span>
                </button>
                <input
                  ref={modalPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleModalPhotoUpload}
                  className="hidden"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                  সংক্ষিপ্ত পরিচিতি ও অবদান:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {language === 'bn' ? activeSpeakerModal.biographyBn : activeSpeakerModal.biographyEn}
                </p>
              </div>

              {activeSpeakerModal.documentedVisitOrInvite && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                    বাংলাদেশ সফর ও আমন্ত্রণ সম্পর্কিত নথি:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200">
                    {activeSpeakerModal.documentedVisitOrInvite}
                  </p>
                </div>
              )}

              {/* Scheduled Mahfils */}
              <div>
                <h4 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider mb-2">
                  নির্ধারিত মাহফিলসমূহ:
                </h4>
                {getSpeakerMahfils(activeSpeakerModal).length > 0 ? (
                  <div className="space-y-2">
                    {getSpeakerMahfils(activeSpeakerModal).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setActiveSpeakerModal(null);
                          openMahfilDetailModal(m);
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-[#D4AF37]"
                      >
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">{m.title}</h5>
                          <span className="text-[11px] text-slate-500">
                            {m.startDate} · {m.upazila}, {m.district}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37]">
                          সময়সূচি →
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    বর্তমানে কোনো আসন্ন পাবলিক মাহফিল পোস্ট অনুমোদিত নেই।
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggest Speaker Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#13221C] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-[#064E3B] text-white">
              <h3 className="font-bold text-sm text-white">
                {t.suggestModalTitle}
              </h3>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="p-1 rounded-full text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSuggestSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">বক্তার নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={suggestNameBn}
                  onChange={(e) => setSuggestNameBn(e.target.value)}
                  placeholder="যেমন: মাওলানা আব্দুর রহিম"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Speaker Name (English)</label>
                <input
                  type="text"
                  value={suggestNameEn}
                  onChange={(e) => setSuggestNameEn(e.target.value)}
                  placeholder="e.g. Maulana Abdur Rahim"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">জেলা বা অঞ্চল *</label>
                <input
                  type="text"
                  required
                  value={suggestDistrict}
                  onChange={(e) => setSuggestDistrict(e.target.value)}
                  placeholder="যেমন: সিলেট / ঢাকা"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              {/* Photo upload option */}
              <div>
                <label className="block font-semibold mb-1">বক্তার ছবি (ঐচ্ছিক):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) setSuggestPhoto(ev.target.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#064E3B] file:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">সংক্ষিপ্ত বিবরণ বা শিক্ষাগত তথ্য</label>
                <textarea
                  rows={2}
                  value={suggestBio}
                  onChange={(e) => setSuggestBio(e.target.value)}
                  placeholder="বক্তার মাদরাসা বা প্রাতিষ্ঠানিক দায়িত্ব..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              {suggestSubmitted ? (
                <p className="text-center font-bold text-emerald-600 py-2">
                  ✓ প্রস্তাব সফলভাবে পাঠানো হয়েছে!
                </p>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#064E3B] text-[#D4AF37] font-bold hover:bg-[#0B6B50] transition"
                >
                  প্রস্তাব পাঠান
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
