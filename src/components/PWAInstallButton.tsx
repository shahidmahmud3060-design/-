import React, { useState } from 'react';
import { Download, CheckCircle2, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { language } = useApp();
  const t = TRANSLATIONS[language];

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>{language === 'bn' ? 'অ্যাপ ইনস্টল্ড' : 'App Installed'}</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0B6B50] text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm hover:brightness-110 active:scale-95 transition-all font-medium ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm w-full justify-center'
        }`}
      >
        <Download className="w-4 h-4 text-[#D4AF37]" />
        <span>{t.pwaInstallBtn}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-2 rounded-xl bg-white dark:bg-[#182620] border border-[#064E3B]/20 text-[#064E3B] dark:text-[#D4AF37] shadow-sm hover:bg-slate-50 transition ${
            compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm w-full justify-center'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{language === 'bn' ? 'আইফোনে ইনস্টল' : 'Install on iOS'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#182620] p-6 shadow-2xl border border-[#D4AF37]/30">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-[#064E3B] dark:text-[#D4AF37]">
                  {language === 'bn' ? 'আইফোন / আইপ্যাডে ইনস্টল' : 'Install on iPhone / iPad'}
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {language === 'bn' ? (
                  <>
                    ১. সাফারি ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> বাটনে ট্যাপ করুন।<br />
                    ২. তালিকা থেকে নিচে স্ক্রোল করে <strong>Add to Home Screen (হোম স্ক্রিনে যোগ করুন)</strong> নির্বাচন করুন।
                  </>
                ) : (
                  <>
                    1. Tap the <strong>Share</strong> icon in Safari bottom bar.<br />
                    2. Scroll down and tap <strong>Add to Home Screen</strong>.
                  </>
                )}
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#064E3B] py-2.5 text-sm font-semibold text-white hover:bg-[#0B6B50] transition"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
