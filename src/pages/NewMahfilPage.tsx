import React, { useState, useMemo } from 'react';
import {
  Upload,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  LogIn,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { Speaker } from '../types';
import { SpeakerSelectorModal } from '../components/SpeakerSelectorModal';
import { SpeakerAvatar } from '../components/SpeakerAvatar';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  WARDS_LIST,
} from '../data/bangladeshLocations';
import { calculateMahfilDuration } from '../utils/bengali';

export const NewMahfilPage: React.FC = () => {
  const {
    language,
    user,
    loginWithGoogle,
    setShowPhoneOtpModal,
    setPhoneOtpTargetAction,
    submitMahfil,
    setActiveTab,
  } = useApp();
  const t = TRANSLATIONS[language];

  // 20 fields state
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('15:00');
  const [endTime, setEndTime] = useState('23:00');

  // Location cascade
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [union, setUnion] = useState('');
  const [ward, setWard] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  // 4 Speakers
  const [principalSpeaker, setPrincipalSpeaker] = useState<Speaker | null>(null);
  const [secondSpeaker, setSecondSpeaker] = useState<Speaker | null>(null);
  const [thirdSpeaker, setThirdSpeaker] = useState<Speaker | null>(null);
  const [specialSpeaker, setSpecialSpeaker] = useState<Speaker | null>(null);

  // Other details
  const [specialAttraction, setSpecialAttraction] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState(user?.phone || '');

  // 20. Poster Image (Mandatory)
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [posterFileName, setPosterFileName] = useState<string>('');

  // Speaker Modal State
  const [selectorTarget, setSelectorTarget] = useState<
    'principal' | 'second' | 'third' | 'special' | null
  >(null);

  // Form submission feedback
  const [formError, setFormError] = useState<string>('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  // Dynamic cascades
  const districts = useMemo(() => {
    if (!division) return [];
    return getDistrictsByDivision(division);
  }, [division]);

  const upazilas = useMemo(() => {
    if (!district) return [];
    return getUpazilasByDistrict(district);
  }, [district]);

  const unions = useMemo(() => {
    if (!district || !upazila) return [];
    return getUnionsByUpazila(district, upazila);
  }, [district, upazila]);

  // Automatic calculation of duration, weekdays, year
  const durationCalculation = useMemo(() => {
    return calculateMahfilDuration(startDate, endDate, language === 'bn');
  }, [startDate, endDate, language]);

  // Handle local image upload with FileReader for preview
  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('অনুগ্রহ করে সঠিক ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('পোস্টারের ফাইলের আকার ৫ মেগাবাইটের (5MB) নিচে হতে হবে।');
      return;
    }

    setPosterFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPosterUrl(event.target.result as string);
        setFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSpeakerSelect = (speaker: Speaker) => {
    if (selectorTarget === 'principal') setPrincipalSpeaker(speaker);
    else if (selectorTarget === 'second') setSecondSpeaker(speaker);
    else if (selectorTarget === 'third') setThirdSpeaker(speaker);
    else if (selectorTarget === 'special') setSpecialSpeaker(speaker);
    setSelectorTarget(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Pre-submission validation
    if (!user) {
      setFormError('অনুগ্রহ করে প্রথমে গুগল একাউন্টে সাইন-ইন করুন।');
      return;
    }

    if (!user.isPhoneVerified) {
      setPhoneOtpTargetAction(() => {
        // Retry submission
      });
      setShowPhoneOtpModal(true);
      return;
    }

    if (!posterUrl) {
      setFormError(t.posterMandatoryNote);
      return;
    }

    if (!principalSpeaker) {
      setFormError('অনুগ্রহ করে প্রধান বক্তা নির্বাচন করুন।');
      return;
    }

    if (!division || !district || !upazila) {
      setFormError('অনুগ্রহ করে বিভাগ, জেলা ও থানা নির্বাচন করুন।');
      return;
    }

    const res = submitMahfil({
      title,
      startDate,
      endDate: endDate || startDate,
      startTime,
      endTime,
      division,
      district,
      upazila,
      union: union || undefined,
      ward: ward || undefined,
      fullAddress,
      googleMapsUrl: googleMapsUrl.trim() || undefined,
      principalSpeaker,
      secondSpeaker: secondSpeaker || undefined,
      thirdSpeaker: thirdSpeaker || undefined,
      specialSpeaker: specialSpeaker || undefined,
      specialAttraction: specialAttraction.trim() || undefined,
      organizerName,
      organizerPhone,
      posterUrl,
    });

    if (res.success) {
      setIsSubmittedSuccess(true);
    } else {
      setFormError(res.error || 'ফর্ম সাবমিট করতে সমস্যা হয়েছে।');
    }
  };

  if (isSubmittedSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          মাহফিলের তথ্য সফলভাবে জমা হয়েছে!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          {t.successSubmitMsg}
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => setActiveTab('account')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            আমার পোস্টের অবস্থা দেখুন
          </button>
          <button
            onClick={() => {
              setIsSubmittedSuccess(false);
              setTitle('');
              setStartDate('');
              setEndDate('');
              setPosterUrl('');
              setPrincipalSpeaker(null);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-semibold"
          >
            আরেকটি মাহফিল জমা দিন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Page Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#0B6B50] text-white shadow-md border border-[#D4AF37]/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#D4AF37]">
          {t.newMahfilTitle}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
          {t.newMahfilSubtitle}
        </p>
      </div>

      {/* Auth Gatekeeper if not logged in */}
      {!user ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#182620] border border-amber-300 dark:border-amber-800/50 shadow-sm text-center space-y-3">
          <LogIn className="w-10 h-10 mx-auto text-[#064E3B] dark:text-[#D4AF37]" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            মাহফিল পোস্ট করার জন্য গুগল সাইন-ইন আবশ্যক
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            স্প্যামিং রোধ এবং সত্যতা নিশ্চিত করতে প্রত্যেক পোস্টদাতার পরিচয় সংরক্ষিত রাখা হয়।
          </p>
          <button
            onClick={loginWithGoogle}
            className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs sm:text-sm font-semibold hover:bg-[#0B6B50] transition inline-flex items-center gap-2 shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInWithGoogle}</span>
          </button>
        </div>
      ) : !user.isPhoneVerified ? (
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 mx-auto text-amber-600 dark:text-amber-400" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            মোবাইল নম্বর ওটিপি ভেরিফিকেশন বাকি
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            আপনার প্রথম মাহফিল জমা দেওয়ার পূর্বে একটি ৬-সংখ্যার এসএমএস কোডের মাধ্যমে মোবাইল নম্বর যাচাই সম্পন্ন করতে হবে।
          </p>
          <button
            onClick={() => setShowPhoneOtpModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition"
          >
            {t.verifyNow}
          </button>
        </div>
      ) : null}

      {/* The 20-Field Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error notification */}
        {formError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* SECTION 1: Mandatory Poster Image (Field 20 highlighted at top) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border-2 border-dashed border-[#064E3B]/40 dark:border-[#D4AF37]/40 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-[#064E3B] dark:text-[#D4AF37]" />
              <span>মাহফিলের মূল পোস্টার ছবি (বাধ্যতামূলক) *</span>
            </label>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
              MANDATORY
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            {t.posterMandatoryNote}
          </p>

          {posterUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-72 flex justify-center bg-black/5">
              <img
                src={posterUrl}
                alt="Poster preview"
                className="max-h-72 object-contain"
              />
              <label
                htmlFor="poster-upload"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-semibold cursor-pointer shadow-md transition"
              >
                {t.changePoster}
              </label>
            </div>
          ) : (
            <label
              htmlFor="poster-upload"
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 cursor-pointer transition border border-slate-200 dark:border-slate-800 group"
            >
              <Upload className="w-8 h-8 text-[#064E3B] dark:text-[#D4AF37] group-hover:scale-110 transition-transform mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {t.uploadPoster}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                JPG, PNG, WebP (সর্বোচ্চ 5MB)
              </span>
            </label>
          )}

          <input
            id="poster-upload"
            type="file"
            accept="image/*"
            onChange={handlePosterUpload}
            className="hidden"
          />
        </div>

        {/* SECTION 2: Basic Information (Title, Dates, Times, Auto-Calculations) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider">
            প্রাথমিক সময়সূচি ও শিরোনাম
          </h3>

          {/* 1. Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১. মাহফিলের নাম / শিরোনাম *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: ঐতিহাসিক বার্ষিক তাফসিরুল কুরআন ও ইসলাহী মাহফিল"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
            />
          </div>

          {/* 2 & 3. Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ২. শুরুর তারিখ *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৩. সমাপ্তির তারিখ (বহুদিনব্যাপী হলে)
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Automatic Calculation Banner */}
          {startDate && (
            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-[#064E3B]/20 text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-600 dark:text-slate-300">
                স্বয়ংক্রিয় গণনা: <strong>{durationCalculation.durationText}</strong> ({durationCalculation.startWeekday}, {durationCalculation.yearText} সাল)
              </span>
              <span className="text-[11px] text-[#064E3B] dark:text-[#D4AF37] font-bold">
                ✓ স্বয়ংক্রিয় সময়কাল সমন্বিত
              </span>
            </div>
          )}

          {/* 4 & 5. Start Time & End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৪. শুরুর সময় *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৫. সমাপ্তির সময়
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Administrative Location Hierarchy (Fields 6-12) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>প্রশাসনিক অবস্থান ও ঠিকানা (বাংলাদেশ ডেটাবেজ)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 6. Division */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৬. বিভাগ *
              </label>
              <select
                required
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                  setUpazila('');
                  setUnion('');
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              >
                <option value="">-- বিভাগ নির্বাচন --</option>
                {BANGLADESH_DIVISIONS.map((d) => (
                  <option key={d.id} value={d.nameBn}>
                    {d.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৭. জেলা *
              </label>
              <select
                required
                value={district}
                disabled={!division}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila('');
                  setUnion('');
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
              >
                <option value="">-- জেলা নির্বাচন --</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.nameBn}>
                    {d.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. Upazila/Thana */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৮. উপজেলা / থানা *
              </label>
              <select
                required
                value={upazila}
                disabled={!district}
                onChange={(e) => {
                  setUpazila(e.target.value);
                  setUnion('');
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
              >
                <option value="">-- উপজেলা নির্বাচন --</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.nameBn}>
                    {u.nameBn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 9. Union */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ৯. ইউনিয়ন
              </label>
              <select
                value={union}
                onChange={(e) => setUnion(e.target.value)}
                disabled={!upazila}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
              >
                <option value="">-- ইউনিয়ন নির্বাচন (ঐচ্ছিক) --</option>
                {unions.map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* 10. Ward */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                ১০. ওয়ার্ড
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              >
                <option value="">-- ওয়ার্ড নির্বাচন (ঐচ্ছিক) --</option>
                {WARDS_LIST.map((w, idx) => (
                  <option key={idx} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 11. Full Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১১. সম্পূর্ণ ময়দান ও ভেন্যুর ঠিকানা *
            </label>
            <input
              type="text"
              required
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="যেমন: পাইকপাড়া কেন্দ্রীয় ঈদগাহ মাঠ, মিরপুর-১, ঢাকা"
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* 12. Google Maps Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>১২. গুগল ম্যাপস লিংক (Google Maps Location)</span>
            </label>
            <input
              type="url"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              placeholder="https://maps.google.com/?q=..."
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* SECTION 4: Four Independent Searchable Speaker Selectors (Fields 13-16) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>আমন্ত্রিত ওলামায়ে কেরাম নির্বাচন (৪টি স্বতন্ত্র নির্বাচক)</span>
            </h3>
            <span className="text-[10px] text-slate-400">ডেটাবেজ হতে নির্বাচনযোগ্য</span>
          </div>

          {/* 13. Principal Speaker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৩. প্রধান বক্তা *
            </label>
            <div
              onClick={() => setSelectorTarget('principal')}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between cursor-pointer hover:border-[#064E3B] transition"
            >
              {principalSpeaker ? (
                <div className="flex items-center gap-2.5">
                  <SpeakerAvatar speaker={principalSpeaker} size="sm" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      {principalSpeaker.nameBn}
                    </span>
                    <span className="text-[10px] text-slate-500">{principalSpeaker.district}</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  ট্যাপ করে প্রধান বক্তা নির্বাচন করুন...
                </span>
              )}
              <span className="text-xs font-semibold text-[#064E3B] dark:text-[#D4AF37]">
                {principalSpeaker ? 'পরিবর্তন' : 'নির্বাচন করুন'}
              </span>
            </div>
          </div>

          {/* 14. Second Speaker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৪. দ্বিতীয় বক্তা / বিশেষ আকর্ষণ
            </label>
            <div
              onClick={() => setSelectorTarget('second')}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between cursor-pointer hover:border-[#064E3B] transition"
            >
              {secondSpeaker ? (
                <div className="flex items-center gap-2.5">
                  <SpeakerAvatar speaker={secondSpeaker} size="sm" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      {secondSpeaker.nameBn}
                    </span>
                    <span className="text-[10px] text-slate-500">{secondSpeaker.district}</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  ট্যাপ করে দ্বিতীয় বক্তা নির্বাচন করুন (ঐচ্ছিক)...
                </span>
              )}
              <span className="text-xs font-semibold text-[#064E3B] dark:text-[#D4AF37]">
                {secondSpeaker ? 'পরিবর্তন' : 'নির্বাচন করুন'}
              </span>
            </div>
          </div>

          {/* 15. Third Speaker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৫. তৃতীয় বক্তা
            </label>
            <div
              onClick={() => setSelectorTarget('third')}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between cursor-pointer hover:border-[#064E3B] transition"
            >
              {thirdSpeaker ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {thirdSpeaker.nameBn}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  ট্যাপ করে তৃতীয় বক্তা নির্বাচন করুন (ঐচ্ছিক)...
                </span>
              )}
              <span className="text-xs font-semibold text-[#064E3B] dark:text-[#D4AF37]">
                {thirdSpeaker ? 'পরিবর্তন' : 'নির্বাচন করুন'}
              </span>
            </div>
          </div>

          {/* 16. Special Speaker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৬. বিশেষ বক্তা
            </label>
            <div
              onClick={() => setSelectorTarget('special')}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between cursor-pointer hover:border-[#064E3B] transition"
            >
              {specialSpeaker ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {specialSpeaker.nameBn}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  ট্যাপ করে বিশেষ বক্তা নির্বাচন করুন (ঐচ্ছিক)...
                </span>
              )}
              <span className="text-xs font-semibold text-[#064E3B] dark:text-[#D4AF37]">
                {specialSpeaker ? 'পরিবর্তন' : 'নির্বাচন করুন'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 5: Special Attraction & Organizer Details (Fields 17-19) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-3.5">
          <h3 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider">
            বিশেষ আকর্ষণ ও আয়োজক তথ্য
          </h3>

          {/* 17. Special Attraction */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৭. বিশেষ আকর্ষণ
            </label>
            <input
              type="text"
              value={specialAttraction}
              onChange={(e) => setSpecialAttraction(e.target.value)}
              placeholder="যেমন: বাদ মাগরিব সরাসরি প্রশ্নোত্তর ও বিশেষ দোয়া মাহফিল"
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* 18. Organizer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৮. আয়োজক কমিটির নাম / সংস্থা *
            </label>
            <input
              type="text"
              required
              value={organizerName}
              onChange={(e) => setOrganizerName(e.target.value)}
              placeholder="যেমন: কেন্দ্রীয় জামে মসজিদ কমিটি ও যুব সমাজ"
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* 19. Organizer Contact Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              ১৯. আয়োজকের মোবাইল নম্বর *
            </label>
            <input
              type="tel"
              required
              value={organizerPhone}
              onChange={(e) => setOrganizerPhone(e.target.value)}
              placeholder="017xxxxxxxx"
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono"
            />
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#064E3B] via-[#0B6B50] to-[#064E3B] text-[#D4AF37] border border-[#D4AF37]/50 font-extrabold text-sm sm:text-base shadow-lg hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>{t.submitButton}</span>
        </button>
      </form>

      {/* Speaker Selector Modal */}
      {selectorTarget && (
        <SpeakerSelectorModal
          isOpen={!!selectorTarget}
          onClose={() => setSelectorTarget(null)}
          onSelect={handleSpeakerSelect}
          fieldLabel={
            selectorTarget === 'principal'
              ? t.principalSpeaker
              : selectorTarget === 'second'
              ? t.secondSpeaker
              : selectorTarget === 'third'
              ? t.thirdSpeaker
              : t.specialSpeaker
          }
          selectedSpeakerId={
            selectorTarget === 'principal'
              ? principalSpeaker?.id
              : selectorTarget === 'second'
              ? secondSpeaker?.id
              : selectorTarget === 'third'
              ? thirdSpeaker?.id
              : specialSpeaker?.id
          }
        />
      )}
    </div>
  );
};
