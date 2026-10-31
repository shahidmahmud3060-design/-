import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Palette,
  Sparkles,
  Calendar,
  MapPin,
  User,
  Check,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { toBengaliNumber } from '../utils/bengali';

type PosterTemplateId = 'emerald_gold' | 'royal_dark' | 'mihrab_arch';

export const PosterStudio: React.FC = () => {
  const { language, selectedMahfilForPoster, mahfils } = useApp();
  const t = TRANSLATIONS[language];

  // Poster fields
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplateId>('emerald_gold');
  const [title, setTitle] = useState(
    selectedMahfilForPoster?.title || 'ঐতিহাসিক তাফসিরুল কুরআন মাহফিল'
  );
  const [subtitle, setSubtitle] = useState('দ্বীনি দাওয়াত ও ইসলাহী মহাসম্মেলন');
  const [dateText, setDateText] = useState(
    selectedMahfilForPoster?.startDate ? `${selectedMahfilForPoster.startDate}` : '১০ ও ১১ নভেম্বর ২০২৬'
  );
  const [timeText, setTimeText] = useState(
    selectedMahfilForPoster?.startTime ? `${selectedMahfilForPoster.startTime} হতে রাত ১১:০০` : 'বাদ আছর হতে রাত ১১:০০ পর্যন্ত'
  );
  const [locationText, setLocationText] = useState(
    selectedMahfilForPoster?.fullAddress || 'পাইকপাড়া কেন্দ্রীয় ঈদগাহ ময়দান, মিরপুর-১, ঢাকা'
  );
  const [principalSpeaker, setPrincipalSpeaker] = useState(
    selectedMahfilForPoster?.principalSpeaker.nameBn || 'মাওলানা মিজানুর রহমান আজহারী'
  );
  const [secondSpeaker, setSecondSpeaker] = useState(
    selectedMahfilForPoster?.secondSpeaker?.nameBn || 'শায়খ আহমাদুল্লাহ'
  );
  const [specialSpeaker, setSpecialSpeaker] = useState(
    selectedMahfilForPoster?.specialSpeaker?.nameBn || 'মুফতি আমির হামজা'
  );
  const [specialAttraction, setSpecialAttraction] = useState(
    selectedMahfilForPoster?.specialAttraction || 'যুব সমাজের চরিত্র গঠন ও কোরআনের জীবনমুখী দাওয়াত'
  );
  const [organizer, setOrganizer] = useState(
    selectedMahfilForPoster?.organizerName || 'সার্বিক পরিচালনায়: তাওহীদী যুব কাফেলা'
  );

  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render canvas whenever inputs change
  useEffect(() => {
    renderPosterCanvas();
  }, [
    selectedTemplate,
    title,
    subtitle,
    dateText,
    timeText,
    locationText,
    principalSpeaker,
    secondSpeaker,
    specialSpeaker,
    specialAttraction,
    organizer,
  ]);

  const renderPosterCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas resolution: 1080 x 1350 (Standard Instagram / Mobile Poster Aspect Ratio 4:5)
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Background Gradient
    if (selectedTemplate === 'emerald_gold') {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#04382A');
      grad.addColorStop(0.4, '#064E3B');
      grad.addColorStop(1, '#02231A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (selectedTemplate === 'royal_dark') {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0B192C');
      grad.addColorStop(0.5, '#06141D');
      grad.addColorStop(1, '#02060D');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      // mihrab arch
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#064E3B');
      grad.addColorStop(0.3, '#083B2D');
      grad.addColorStop(1, '#0B221B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    // 2. Ornate Gold Borders & Corners
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, W - 72, H - 72);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    // Decorative corner diamonds
    const drawDiamond = (x: number, y: number, s: number) => {
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + s, y);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - s, y);
      ctx.closePath();
      ctx.fill();
    };
    drawDiamond(36, 36, 14);
    drawDiamond(W - 36, 36, 14);
    drawDiamond(36, H - 36, 14);
    drawDiamond(W - 36, H - 36, 14);

    // 3. Header: Bismillah Calligraphy representation
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 30px "Hind Siliguri", sans-serif';
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W / 2, 105);

    // Subtle divider
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 160, 125);
    ctx.lineTo(W / 2 + 160, 125);
    ctx.stroke();

    // 4. Subtitle Tag
    ctx.fillStyle = '#FEF3C7';
    ctx.font = '500 24px "Hind Siliguri", sans-serif';
    ctx.fillText(subtitle, W / 2, 170);

    // 5. Main Title (Huge & Bold with gold shadow)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px "Hind Siliguri", sans-serif';

    // Wrap title if long
    const words = title.split(' ');
    if (words.length > 5) {
      const mid = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, mid).join(' '), W / 2, 245);
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(words.slice(mid).join(' '), W / 2, 310);
    } else {
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(title, W / 2, 260);
    }
    ctx.shadowBlur = 0;

    // 6. Date & Time Capsule Card
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    const cardY = 370;
    ctx.roundRect(100, cardY, W - 200, 110, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Hind Siliguri", sans-serif';
    ctx.fillText(`📅 তারিখ: ${dateText}`, W / 2, cardY + 45);

    ctx.fillStyle = '#FDE68A';
    ctx.font = '500 24px "Hind Siliguri", sans-serif';
    ctx.fillText(`⏰ সময়: ${timeText}`, W / 2, cardY + 85);

    // 7. Venue / Location Section
    const locY = 525;
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px "Hind Siliguri", sans-serif';
    ctx.fillText('📍 মাহফিলের স্থান', W / 2, locY);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px "Hind Siliguri", sans-serif';
    ctx.fillText(locationText, W / 2, locY + 40);

    // 8. Speakers Box
    const spBoxY = 625;
    ctx.fillStyle = 'rgba(6, 78, 59, 0.45)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 2;
    ctx.roundRect(80, spBoxY, W - 160, 390, 24);
    ctx.fill();
    ctx.stroke();

    // Box Header
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 26px "Hind Siliguri", sans-serif';
    ctx.fillText('—: আমন্ত্রিত ওলামায়ে কেরাম ও বক্তাবৃন্দ :—', W / 2, spBoxY + 45);

    // Principal Speaker
    ctx.fillStyle = '#FEF08A';
    ctx.font = 'bold 22px "Hind Siliguri", sans-serif';
    ctx.fillText('★ প্রধান বক্তা ★', W / 2, spBoxY + 95);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px "Hind Siliguri", sans-serif';
    ctx.fillText(principalSpeaker, W / 2, spBoxY + 145);

    // 2nd Speaker
    if (secondSpeaker) {
      ctx.fillStyle = '#D1D5DB';
      ctx.font = 'bold 20px "Hind Siliguri", sans-serif';
      ctx.fillText('বিশেষ আকর্ষণ / ২য় বক্তা:', W / 2, spBoxY + 205);

      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 28px "Hind Siliguri", sans-serif';
      ctx.fillText(secondSpeaker, W / 2, spBoxY + 245);
    }

    // Special Speaker
    if (specialSpeaker) {
      ctx.fillStyle = '#D1D5DB';
      ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
      ctx.fillText('বিশেষ বক্তা:', W / 2, spBoxY + 295);

      ctx.fillStyle = '#E5E7EB';
      ctx.font = 'bold 24px "Hind Siliguri", sans-serif';
      ctx.fillText(specialSpeaker, W / 2, spBoxY + 330);
    }

    // 9. Special Attraction banner
    if (specialAttraction) {
      const attY = 1045;
      ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.5;
      ctx.roundRect(100, attY, W - 200, 75, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 20px "Hind Siliguri", sans-serif';
      ctx.fillText('বিশেষ আকর্ষণ', W / 2, attY + 30);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '500 20px "Hind Siliguri", sans-serif';
      ctx.fillText(specialAttraction, W / 2, attY + 58);
    }

    // 10. Organizer & Footer Stamp
    const footY = 1170;
    ctx.fillStyle = '#FDE68A';
    ctx.font = 'bold 24px "Hind Siliguri", sans-serif';
    ctx.fillText(organizer, W / 2, footY);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '16px "Hind Siliguri", sans-serif';
    ctx.fillText('মাহফিলের সময়সূচি অ্যাপ দ্বারা তৈরিকৃত ও ডিজিটালভাবে সংগৃহীত', W / 2, footY + 50);

    // Decorative bottom emblem
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('۞', W / 2, footY + 85);
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setTimeout(() => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `mahfil-poster-${title.replace(/[\s/]/g, '_').slice(0, 30)}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setExportedSuccess(true);
        setTimeout(() => setExportedSuccess(false), 3000);
      } catch (err) {
        console.error('Export failed', err);
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  const handleSelectExistingMahfil = (mId: string) => {
    const target = mahfils.find((m) => m.id === mId);
    if (!target) return;
    setTitle(target.title);
    setDateText(target.startDate);
    setTimeText(`${target.startTime} - ${target.endTime}`);
    setLocationText(target.fullAddress);
    setPrincipalSpeaker(target.principalSpeaker.nameBn);
    setSecondSpeaker(target.secondSpeaker?.nameBn || '');
    setSpecialSpeaker(target.specialSpeaker?.nameBn || '');
    setSpecialAttraction(target.specialAttraction || '');
    setOrganizer(target.organizerName);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#0B6B50] to-[#064E3B] text-white border border-[#D4AF37]/40 shadow-md">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'bn' ? 'ডিজিটাল পোস্টার নির্মাতা' : 'Digital Poster Studio'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mt-1 text-[#D4AF37]">
          {t.posterStudioTitle}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
          {t.posterStudioSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Customizer Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Import from Mahfils */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              {language === 'bn' ? 'বিদ্যমান মাহফিল থেকে তথ্য নিন:' : 'Auto-fill from existing Mahfil:'}
            </label>
            <select
              onChange={(e) => handleSelectExistingMahfil(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="">{language === 'bn' ? '-- মাহফিল নির্বাচন করুন --' : '-- Choose Mahfil --'}</option>
              {mahfils.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.district})
                </option>
              ))}
            </select>
          </div>

          {/* Template Choice */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-2.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              {language === 'bn' ? 'পোস্টার থিম নির্বাচন:' : 'Select Poster Theme:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTemplate('emerald_gold')}
                className={`p-2.5 rounded-xl border text-center transition text-xs font-semibold ${
                  selectedTemplate === 'emerald_gold'
                    ? 'border-[#064E3B] bg-emerald-50 dark:bg-emerald-950/50 text-[#064E3B] dark:text-[#D4AF37]'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                রয়্যাল পান্না
              </button>
              <button
                type="button"
                onClick={() => setSelectedTemplate('royal_dark')}
                className={`p-2.5 rounded-xl border text-center transition text-xs font-semibold ${
                  selectedTemplate === 'royal_dark'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                রজনী ব্ল্যাক
              </button>
              <button
                type="button"
                onClick={() => setSelectedTemplate('mihrab_arch')}
                className={`p-2.5 rounded-xl border text-center transition text-xs font-semibold ${
                  selectedTemplate === 'mihrab_arch'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                মেহরাব গ্রিন
              </button>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                মাহফিলের নাম / শিরোনাম:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                উপ-শিরোনাম:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  তারিখ:
                </label>
                <input
                  type="text"
                  value={dateText}
                  onChange={(e) => setDateText(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  সময়:
                </label>
                <input
                  type="text"
                  value={timeText}
                  onChange={(e) => setTimeText(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                স্থান ও ময়দান:
              </label>
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                প্রধান বক্তা:
              </label>
              <input
                type="text"
                value={principalSpeaker}
                onChange={(e) => setPrincipalSpeaker(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                ২য় বক্তা / বিশেষ আকর্ষণ:
              </label>
              <input
                type="text"
                value={secondSpeaker}
                onChange={(e) => setSecondSpeaker(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                আয়োজক পরিষদ:
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Canvas Preview & PNG Export */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-white dark:bg-[#182620] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center space-y-4 shadow-sm">
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#064E3B] dark:text-[#D4AF37]" />
                <span>{language === 'bn' ? 'লাইভ পোস্টার প্রিভিউ (১০৮০ × ১৩৫০)' : 'Live Preview (1080x1350)'}</span>
              </span>
              <button
                type="button"
                onClick={renderPosterCanvas}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                title="Refresh preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>রিফ্রেশ</span>
              </button>
            </div>

            {/* Canvas Container with scaled mobile view */}
            <div className="w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/50 bg-black flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>

            {/* PNG Export Action Button */}
            <div className="w-full pt-2">
              <button
                onClick={handleExportPNG}
                disabled={isExporting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#064E3B] via-[#0B6B50] to-[#064E3B] text-[#D4AF37] border-2 border-[#D4AF37]/50 font-bold text-sm shadow-md hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : exportedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>{language === 'bn' ? 'পোস্টার ডাউনলোড সম্পন্ন হয়েছে!' : 'Downloaded successfully!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>{t.exportPosterPNG}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                উচ্চ রেজ্যুলেশন (1080x1350) পিএনজি ফরম্যাটে সরাসরি ডিভাইসে সংরক্ষিত হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
