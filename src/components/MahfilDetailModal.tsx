import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Share2,
  ExternalLink,
  Phone,
  Palette,
  Heart,
  CalendarPlus,
  ShieldAlert,
  Send,
  CheckCircle,
} from 'lucide-react';
import { Mahfil } from '../types';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { formatMahfilDate, calculateMahfilDuration, formatTimeSlot } from '../utils/bengali';
import { SpeakerAvatar } from './SpeakerAvatar';

interface MahfilDetailModalProps {
  mahfil: Mahfil | null;
  onClose: () => void;
}

export const MahfilDetailModal: React.FC<MahfilDetailModalProps> = ({ mahfil, onClose }) => {
  const { language, toggleFavorite, isFavorite, setSelectedMahfilForPoster, setActiveTab, requestApprovedMahfilDeletion } = useApp();
  const t = TRANSLATIONS[language];
  const [showDeleteRequestForm, setShowDeleteRequestForm] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteRequestSubmitted, setDeleteRequestSubmitted] = useState(false);

  if (!mahfil) return null;

  const favorited = isFavorite(mahfil.id);
  const durationInfo = calculateMahfilDuration(mahfil.startDate, mahfil.endDate, language === 'bn');
  const dateFormatted = formatMahfilDate(mahfil.startDate, language === 'bn');
  const endDateFormatted = mahfil.endDate ? formatMahfilDate(mahfil.endDate, language === 'bn') : '';
  const timeFormatted = formatTimeSlot(mahfil.startTime, mahfil.endTime, language === 'bn');

  const handleShare = async () => {
    const text = `*${mahfil.title}*\n📅 ${dateFormatted}\n📍 ${mahfil.fullAddress}\n🎙️ ${t.principalSpeaker}: ${mahfil.principalSpeaker.nameBn}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: mahfil.title,
          text,
          url: window.location.href,
        });
      } catch {
        /* ignore */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert(language === 'bn' ? 'মাহফিলের তথ্য কপি করা হয়েছে!' : 'Details copied to clipboard!');
    }
  };

  const handleAddToCalendar = () => {
    const startClean = mahfil.startDate.replace(/-/g, '');
    const endClean = (mahfil.endDate || mahfil.startDate).replace(/-/g, '');
    const calTitle = encodeURIComponent(mahfil.title);
    const calDetails = encodeURIComponent(`স্থান: ${mahfil.fullAddress}\nপ্রধান বক্তা: ${mahfil.principalSpeaker.nameBn}\nআয়োজক: ${mahfil.organizerName}`);
    const calLocation = encodeURIComponent(mahfil.fullAddress);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${startClean}/${endClean}&details=${calDetails}&location=${calLocation}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleOpenPosterStudio = () => {
    setSelectedMahfilForPoster(mahfil);
    setActiveTab('poster-studio');
    onClose();
  };

  const handleSubmitDeletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteReason.trim()) return;
    requestApprovedMahfilDeletion(mahfil.id, deleteReason);
    setDeleteRequestSubmitted(true);
    setTimeout(() => {
      setShowDeleteRequestForm(false);
      setDeleteRequestSubmitted(false);
      setDeleteReason('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#13221C] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Trim */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#064E3B] via-[#D4AF37] to-[#064E3B]" />

        {/* Modal Top Bar */}
        <div className="relative h-60 sm:h-72 w-full bg-[#04281E] shrink-0">
          <img
            src={mahfil.posterUrl || '/logo.png'}
            alt={mahfil.title}
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenPosterStudio}
                className="p-2.5 rounded-full bg-black/60 text-[#D4AF37] hover:bg-black/80 transition"
                title={t.posterStudioTitle}
              >
                <Palette className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleFavorite(mahfil.id)}
                className="p-2.5 rounded-full bg-black/60 text-white hover:text-rose-400 transition"
                title={t.favorite}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/60 text-white hover:text-emerald-400 transition"
                title={t.share}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Header Title */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#064E3B] text-[#D4AF37] border border-[#D4AF37]/50 mb-2 inline-block">
              {durationInfo.durationText}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold leading-tight drop-shadow-md text-white">
              {mahfil.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Key Date & Location Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] dark:text-[#D4AF37]">
                <Calendar className="w-4 h-4" />
                <span>{t.date} ও {t.time}</span>
              </div>
              <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                {dateFormatted}
                {endDateFormatted && endDateFormatted !== dateFormatted && ` - ${endDateFormatted}`}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeFormatted}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] dark:text-[#D4AF37]">
                <MapPin className="w-4 h-4" />
                <span>{t.location}</span>
              </div>
              <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                {mahfil.upazila}, {mahfil.district}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {mahfil.division} বিভাগ {mahfil.union ? `· ${mahfil.union}` : ''} {mahfil.ward ? `· ${mahfil.ward}` : ''}
              </p>
            </div>
          </div>

          {/* Full Address & Google Maps */}
          <div className="p-4 rounded-2xl bg-[#064E3B]/10 dark:bg-[#064E3B]/25 border border-[#064E3B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">সম্পূর্ণ ঠিকানা:</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {mahfil.fullAddress}
              </p>
            </div>
            {mahfil.googleMapsUrl && (
              <a
                href={mahfil.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#064E3B] text-[#D4AF37] hover:bg-[#0B6B50] text-xs font-bold transition border border-[#D4AF37]/30 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.openMaps}</span>
              </a>
            )}
          </div>

          {/* Speakers List with Photo Upload Support */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wider">
                {language === 'bn' ? 'আমন্ত্রিত ওলামায়ে কেরাম ও বক্তাবৃন্দ' : 'Invited Islamic Speakers'}
              </h4>
              <span className="text-[11px] text-slate-500">বক্তার আসল ছবি যোগ করতে আইকনে চাপুন</span>
            </div>

            <div className="space-y-3">
              {/* Principal Speaker */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3.5">
                <SpeakerAvatar speaker={mahfil.principalSpeaker} size="lg" allowUpload={true} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#064E3B] dark:text-[#D4AF37] px-2 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80">
                      {t.principalSpeaker}
                    </span>
                    {mahfil.principalSpeaker.isVerified && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ {t.verifiedBadge}
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                    {language === 'bn' ? mahfil.principalSpeaker.nameBn : mahfil.principalSpeaker.nameEn}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'bn' ? mahfil.principalSpeaker.titleBn : mahfil.principalSpeaker.titleEn}
                  </p>
                </div>
              </div>

              {/* 2nd Speaker */}
              {mahfil.secondSpeaker && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <SpeakerAvatar speaker={mahfil.secondSpeaker} size="md" allowUpload={true} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-400 font-semibold">{t.secondSpeaker}</span>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {language === 'bn' ? mahfil.secondSpeaker.nameBn : mahfil.secondSpeaker.nameEn}
                    </h5>
                  </div>
                </div>
              )}

              {/* 3rd Speaker */}
              {mahfil.thirdSpeaker && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <SpeakerAvatar speaker={mahfil.thirdSpeaker} size="md" allowUpload={true} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-400 font-semibold">{t.thirdSpeaker}</span>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {language === 'bn' ? mahfil.thirdSpeaker.nameBn : mahfil.thirdSpeaker.nameEn}
                    </h5>
                  </div>
                </div>
              )}

              {/* Special Speaker */}
              {mahfil.specialSpeaker && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <SpeakerAvatar speaker={mahfil.specialSpeaker} size="md" allowUpload={true} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-400 font-semibold">{t.specialSpeaker}</span>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {language === 'bn' ? mahfil.specialSpeaker.nameBn : mahfil.specialSpeaker.nameEn}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Attraction */}
          {mahfil.specialAttraction && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/40">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">{t.specialAttraction}:</span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                {mahfil.specialAttraction}
              </p>
            </div>
          )}

          {/* Organizer Info */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">{t.organizer}</span>
              <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">{mahfil.organizerName}</h5>
            </div>
            {mahfil.organizerPhone && (
              <a
                href={`tel:${mahfil.organizerPhone}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#064E3B] text-[#D4AF37] text-xs font-bold transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{mahfil.organizerPhone}</span>
              </a>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
            >
              <CalendarPlus className="w-4 h-4 text-[#064E3B] dark:text-[#D4AF37]" />
              <span>{t.addToCalendar}</span>
            </button>

            <button
              onClick={handleOpenPosterStudio}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#0B6B50] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold transition hover:brightness-110 shadow-sm"
            >
              <Palette className="w-4 h-4" />
              <span>{language === 'bn' ? 'পোস্টার ডিজাইন কাস্টমাইজ' : 'Customize in Studio'}</span>
            </button>
          </div>

          {/* Request Deletion for Approved Posts */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {!showDeleteRequestForm ? (
              <button
                onClick={() => setShowDeleteRequestForm(true)}
                className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t.deleteRequest}</span>
              </button>
            ) : (
              <form onSubmit={handleSubmitDeletion} className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                  {t.deleteRequestReason}:
                </span>
                <textarea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="যেমন: তারিখ পরিবর্তন হয়েছে, স্থান বাতিল হয়েছে বা পোস্টার ভুল..."
                  rows={2}
                  className="w-full text-xs p-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-white dark:bg-[#182620] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  required
                />
                {deleteRequestSubmitted ? (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>মুছে ফেলার আবেদনটি অ্যাডমিনদের কাছে পাঠানো হয়েছে।</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteRequestForm(false)}
                      className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>{t.sendRequest}</span>
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
