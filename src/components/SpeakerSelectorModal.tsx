import React, { useState, useMemo, useRef } from 'react';
import { Search, X, Check, UserPlus, UserCheck, MapPin, Camera } from 'lucide-react';
import { Speaker } from '../types';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { SpeakerAvatar } from './SpeakerAvatar';

interface SpeakerSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (speaker: Speaker) => void;
  fieldLabel: string;
  selectedSpeakerId?: string;
}

export const SpeakerSelectorModal: React.FC<SpeakerSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  fieldLabel,
  selectedSpeakerId,
}) => {
  const { speakers, language, suggestSpeaker } = useApp();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [suggestNameBn, setSuggestNameBn] = useState('');
  const [suggestNameEn, setSuggestNameEn] = useState('');
  const [suggestDistrict, setSuggestDistrict] = useState('');
  const [suggestPhotoUrl, setSuggestPhotoUrl] = useState<string>('');
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSuggestPhotoUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredSpeakers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const approvedOnly = speakers.filter((s) => s.status === 'approved');
    if (!q) return approvedOnly;

    return approvedOnly.filter((s) => {
      const matchBn = s.nameBn.toLowerCase().includes(q);
      const matchEn = s.nameEn.toLowerCase().includes(q);
      const matchDistrict = s.district.toLowerCase().includes(q);
      const matchAlts = s.alternativeSpellings?.some((alt) => alt.toLowerCase().includes(q));
      return matchBn || matchEn || matchDistrict || matchAlts;
    });
  }, [speakers, searchQuery]);

  if (!isOpen) return null;

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestNameBn.trim()) return;

    suggestSpeaker({
      nameBn: suggestNameBn.trim(),
      nameEn: suggestNameEn.trim() || suggestNameBn.trim(),
      country: 'Bangladesh',
      district: suggestDistrict.trim() || 'ঢাকা',
      photoUrl: suggestPhotoUrl || undefined,
      biographyBn: 'ব্যবহারকারী কর্তৃক প্রস্তাবিত নতুন বক্তা। অ্যাডমিন যাচাইকরণ প্রক্রিয়াধীন।',
      biographyEn: 'User-suggested speaker profile pending admin verification.',
      phonePubliclyApproved: false,
    });

    setSuggestSuccess(true);
    setTimeout(() => {
      setShowSuggestForm(false);
      setSuggestSuccess(false);
      setSuggestNameBn('');
      setSuggestNameEn('');
      setSuggestDistrict('');
      setSuggestPhotoUrl('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#13221C] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-[#064E3B] text-white">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wide">
              {fieldLabel}
            </span>
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'বক্তা নির্বাচন করুন' : 'Select Speaker'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchSpeakerPlaceholder}
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                {t.cancel}
              </button>
            )}
          </div>
        </div>

        {/* Speakers List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredSpeakers.length > 0 ? (
            filteredSpeakers.map((speaker) => {
              const isSelected = selectedSpeakerId === speaker.id;
              return (
                <button
                  key={speaker.id}
                  onClick={() => {
                    onSelect(speaker);
                    onClose();
                  }}
                  className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between gap-3 text-left transition-all border ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#064E3B] dark:border-[#D4AF37]'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <SpeakerAvatar speaker={speaker} size="sm" />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                          {language === 'bn' ? speaker.nameBn : speaker.nameEn}
                        </span>
                        {speaker.isVerified && (
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{speaker.district}</span>
                        {speaker.country === 'India' && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                            · {language === 'bn' ? 'আমন্ত্রিত অতিথি' : 'Guest'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#064E3B] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              <p>{language === 'bn' ? 'এই নামে কোনো অনুমোদিত বক্তা পাওয়া যায়নি।' : 'No approved speaker found.'}</p>
              <button
                onClick={() => setShowSuggestForm(true)}
                className="mt-3 px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#0B6B50] transition inline-flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.suggestSpeakerBtn}</span>
              </button>
            </div>
          )}
        </div>

        {/* Suggest Speaker Accordion */}
        {showSuggestForm ? (
          <form onSubmit={handleSuggestSubmit} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37]">
                {t.suggestModalTitle}
              </span>
              <button
                type="button"
                onClick={() => setShowSuggestForm(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                {t.cancel}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="বক্তার নাম (বাংলায়) *"
                value={suggestNameBn}
                onChange={(e) => setSuggestNameBn(e.target.value)}
                required
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <input
                type="text"
                placeholder="Speaker Name (English)"
                value={suggestNameEn}
                onChange={(e) => setSuggestNameEn(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <input
              type="text"
              placeholder="বক্তার জেলা বা কর্মস্থল"
              value={suggestDistrict}
              onChange={(e) => setSuggestDistrict(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />

            {/* Photo upload option */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl border border-dashed border-[#064E3B] text-[11px] font-semibold text-[#064E3B] dark:text-[#D4AF37] flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{suggestPhotoUrl ? 'ছবি নির্বাচিত হয়েছে' : 'বক্তার ছবি আপলোড করুন'}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {suggestSuccess ? (
              <p className="text-xs text-emerald-600 font-semibold text-center">
                ✓ বক্তার প্রস্তাবনাটি সফলভাবে জমা হয়েছে!
              </p>
            ) : (
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#0B6B50] transition"
              >
                প্রস্তাব জমা দিন
              </button>
            )}
          </form>
        ) : (
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">বক্তা খুঁজে পাচ্ছেন না?</span>
            <button
              onClick={() => setShowSuggestForm(true)}
              className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.suggestSpeakerBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
