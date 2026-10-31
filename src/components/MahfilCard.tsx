import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart, Share2, Sparkles, ExternalLink, Palette, Check, ArrowRight } from 'lucide-react';
import { Mahfil } from '../types';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { formatMahfilDate, calculateMahfilDuration, formatTimeSlot } from '../utils/bengali';
import { SpeakerAvatar } from './SpeakerAvatar';

interface MahfilCardProps {
  mahfil: Mahfil;
  onOpenDetails?: (mahfil: Mahfil) => void;
}

export const MahfilCard: React.FC<MahfilCardProps> = ({ mahfil, onOpenDetails }) => {
  const { language, toggleFavorite, isFavorite, setSelectedMahfilForPoster, setActiveTab } = useApp();
  const t = TRANSLATIONS[language];
  const favorited = isFavorite(mahfil.id);
  const [copied, setCopied] = useState(false);

  const durationInfo = calculateMahfilDuration(mahfil.startDate, mahfil.endDate, language === 'bn');
  const dateFormatted = formatMahfilDate(mahfil.startDate, language === 'bn');
  const timeFormatted = formatTimeSlot(mahfil.startTime, mahfil.endTime, language === 'bn');

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*${mahfil.title}*\n📅 ${dateFormatted}\n📍 ${mahfil.upazila}, ${mahfil.district}\n🎙️ ${t.principalSpeaker}: ${mahfil.principalSpeaker.nameBn}\n\nমাহফিলের সময়সূচি অ্যাপে বিস্তারিত দেখুন।`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: mahfil.title,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // Fallback
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenPosterStudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMahfilForPoster(mahfil);
    setActiveTab('poster-studio');
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(mahfil)}
      className="bg-white dark:bg-[#13221C] rounded-3xl border-2 border-[#D4AF37]/35 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group relative"
    >
      {/* Decorative Islamic top trim */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#064E3B] via-[#D4AF37] to-[#064E3B]" />

      {/* Poster Preview with Arch Header */}
      <div className="relative h-48 sm:h-52 w-full bg-[#04281E] overflow-hidden">
        <img
          src={mahfil.posterUrl || '/logo.png'}
          alt={mahfil.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
        />
        {/* Deep contrast gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="bg-[#064E3B]/95 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50 px-3 py-1 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{durationInfo.durationText}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenPosterStudio}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] hover:bg-black/80 border border-[#D4AF37]/40 transition active:scale-90"
              title="পোস্টার স্টুডিওতে রূপান্তর"
              aria-label="Poster Studio"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(mahfil.id);
              }}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 border border-white/20 transition active:scale-90"
              title={favorited ? t.favorited : t.favorite}
              aria-label="Toggle Favorite"
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-emerald-300 border border-white/20 transition active:scale-90"
              title={t.share}
              aria-label="Share"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Overlaid Location Strip */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{mahfil.upazila}, {mahfil.district}</span>
            <span aria-hidden="true" className="text-white/60">·</span>
            <span className="text-white/90">{mahfil.division} বিভাগ</span>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Mahfil Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#064E3B] dark:group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
            {mahfil.title}
          </h3>

          {/* Date & Time with Unboxed Gold Separators */}
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold text-[#064E3B] dark:text-[#D4AF37]">
              <Calendar className="w-3.5 h-3.5" />
              {dateFormatted}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {timeFormatted}
            </span>
          </div>

          {/* Principal Speaker with Dignified Islamic Crest Avatar */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
            <SpeakerAvatar speaker={mahfil.principalSpeaker} size="md" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-[#064E3B] dark:text-[#D4AF37] uppercase tracking-wide block">
                {t.principalSpeaker}
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                {language === 'bn' ? mahfil.principalSpeaker.nameBn : mahfil.principalSpeaker.nameEn}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {mahfil.principalSpeaker.district}
              </p>
            </div>
          </div>

          {/* 2nd Speaker if available */}
          {mahfil.secondSpeaker && (
            <div className="mt-2 pl-2 text-xs text-slate-600 dark:text-slate-400 truncate border-l-2 border-[#D4AF37]/50">
              <span className="text-slate-400">{t.secondSpeaker}: </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {language === 'bn' ? mahfil.secondSpeaker.nameBn : mahfil.secondSpeaker.nameEn}
              </span>
            </div>
          )}

          {/* Special Attraction */}
          {mahfil.specialAttraction && (
            <div className="mt-3 flex items-start gap-1.5 text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/40 p-2.5 rounded-2xl border border-[#064E3B]/15">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="line-clamp-2 leading-relaxed">{mahfil.specialAttraction}</p>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          {mahfil.googleMapsUrl ? (
            <a
              href={mahfil.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#064E3B] dark:hover:text-[#D4AF37] font-medium transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.openMaps}</span>
            </a>
          ) : (
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {mahfil.organizerName}
            </span>
          )}

          <button
            onClick={() => onOpenDetails && onOpenDetails(mahfil)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0B6B50] text-[#D4AF37] hover:brightness-110 text-xs font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5 border border-[#D4AF37]/40"
          >
            <span>{t.details}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
