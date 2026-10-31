import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Phone,
  Mail,
  LogIn,
  LogOut,
  Clock,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Globe,
  Palette,
  Heart,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { formatMahfilDate } from '../utils/bengali';
import { AdminApprovalModal } from '../components/AdminApprovalModal';

export const AccountPage: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    user,
    loginWithGoogle,
    logout,
    updateUserProfile,
    mahfils,
    favorites,
    deletePendingMahfil,
    openMahfilDetailModal,
    setShowPhoneOtpModal,
    isAdmin,
    toggleAdminPreview,
  } = useApp();
  const t = TRANSLATIONS[language];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState<'submissions' | 'favorites' | 'settings'>('submissions');

  // Submissions submitted by this user
  const mySubmissions = user
    ? mahfils.filter((m) => m.submittedByUserId === user.id)
    : [];

  // Favorite Mahfils
  const myFavorites = mahfils.filter((m) => favorites.includes(m.id) && m.status === 'approved');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateUserProfile(editName.trim(), editPhone.trim());
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* User Identity Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {user ? (
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={user.photoUrl || '/logo.png'}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]/50 shadow-sm"
              />
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                    {user.name}
                  </h2>
                  {user.isPhoneVerified && (
                    <span title={t.verifiedPhone}>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </p>

                {/* Phone status */}
                <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{user.phone || 'নম্বর যুক্ত নেই'}</span>
                  </span>

                  {user.isPhoneVerified ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      ✓ ওটিপি ভেরিফায়েড
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowPhoneOtpModal(true)}
                      className="text-[10px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded transition"
                    >
                      {t.verifyNow}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditName(user.name);
                  setEditPhone(user.phone || '');
                  setIsEditingProfile(!isEditingProfile);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold transition"
                title="প্রোফাইল সম্পাদনা"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition"
                title={t.signOut}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#064E3B] dark:text-[#D4AF37] mx-auto flex items-center justify-center">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                অতিথি ব্যবহারকারী (Guest Account)
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                মাহফিলের শিডিউল ব্রাউজ করতে লগইন প্রয়োজন নেই। তবে নতুন মাহফিল পোস্ট করার পূর্বে গুগল সাইন-ইন আবশ্যক।
              </p>
            </div>
            <button
              onClick={loginWithGoogle}
              className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs sm:text-sm font-semibold hover:bg-[#0B6B50] transition inline-flex items-center gap-2 shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.signInWithGoogle}</span>
            </button>
          </div>
        )}

        {/* Profile Edit Drawer */}
        {isEditingProfile && user && (
          <form onSubmit={handleSaveProfile} className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">পূর্ণ নাম:</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">মোবাইল নম্বর:</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#064E3B] text-white font-semibold hover:bg-[#0B6B50]"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveAccountTab('submissions')}
          className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeAccountTab === 'submissions'
              ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.mySubmissions} ({mySubmissions.length})
        </button>

        <button
          onClick={() => setActiveAccountTab('favorites')}
          className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeAccountTab === 'favorites'
              ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          পছন্দের মাহফিল ({myFavorites.length})
        </button>

        <button
          onClick={() => setActiveAccountTab('settings')}
          className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeAccountTab === 'settings'
              ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          সেটিংস ও থিম
        </button>
      </div>

      {/* TAB 1: MY SUBMISSIONS */}
      {activeAccountTab === 'submissions' && (
        <div className="space-y-3">
          {mySubmissions.length > 0 ? (
            mySubmissions.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.posterUrl || '/logo.png'}
                      alt={m.title}
                      className="w-14 h-16 rounded-xl object-cover border border-[#D4AF37]/30"
                    />
                    <div>
                      {/* Status indicator */}
                      {m.status === 'pending' && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                          <Clock className="w-3 h-3" />
                          <span>{t.statusPending}</span>
                        </span>
                      )}
                      {m.status === 'approved' && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.statusApproved}</span>
                        </span>
                      )}
                      {m.status === 'rejected' && (
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                          <XCircle className="w-3 h-3" />
                          <span>{t.statusRejected}</span>
                        </span>
                      )}

                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {formatMahfilDate(m.startDate, true)} · {m.upazila}, {m.district}
                      </p>
                    </div>
                  </div>

                  {/* Actions for pending submissions */}
                  {m.status === 'pending' && (
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি এই পেন্ডিং পোস্টটি মুছে ফেলতে চান?')) {
                          deletePendingMahfil(m.id);
                        }
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl transition"
                      title="পেন্ডিং পোস্ট মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Rejection reason display */}
                {m.status === 'rejected' && m.rejectionReason && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs text-rose-700 dark:text-rose-300">
                    <strong>বাতিলের কারণ:</strong> {m.rejectionReason}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <p className="text-xs">{t.noSubmissions}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FAVORITES */}
      {activeAccountTab === 'favorites' && (
        <div className="space-y-3">
          {myFavorites.length > 0 ? (
            myFavorites.map((m) => (
              <div
                key={m.id}
                onClick={() => openMahfilDetailModal(m)}
                className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#064E3B]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.posterUrl || '/logo.png'}
                    alt={m.title}
                    className="w-12 h-14 rounded-xl object-cover border border-[#D4AF37]/30"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {formatMahfilDate(m.startDate, true)} · {m.district}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#182620] rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <Heart className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs">কোনো মাহফিল প্রিয় তালিকায় যুক্ত করা নেই।</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SETTINGS & THEMES */}
      {activeAccountTab === 'settings' && (
        <div className="space-y-4">
          {/* Theme Settings */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 uppercase">
              <Palette className="w-4 h-4 text-[#064E3B] dark:text-[#D4AF37]" />
              <span>{t.settingsTheme}</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                  theme === 'light'
                    ? 'border-[#064E3B] bg-emerald-50 text-[#064E3B]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                {t.themeLight}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                  theme === 'dark'
                    ? 'border-[#D4AF37] bg-slate-900 text-[#D4AF37]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                {t.themeDark}
              </button>
              <button
                onClick={() => setTheme('theme-blue')}
                className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                  theme === 'theme-blue'
                    ? 'border-blue-500 bg-blue-950 text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                {t.themeBlue}
              </button>
            </div>
          </div>

          {/* Language Settings */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#182620] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 uppercase">
              <Globe className="w-4 h-4 text-[#064E3B] dark:text-[#D4AF37]" />
              <span>{t.settingsLang}</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setLanguage('bn')}
                className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                  language === 'bn'
                    ? 'border-[#064E3B] bg-emerald-50 dark:bg-emerald-950 text-[#064E3B] dark:text-[#D4AF37]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                বাংলা (ডিফল্ট)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                  language === 'en'
                    ? 'border-[#064E3B] bg-emerald-50 dark:bg-emerald-950 text-[#064E3B] dark:text-[#D4AF37]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Admin Management Section - only accessible by authorized administrators */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>অ্যাডমিন নিয়ন্ত্রণ কেন্দ্র</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  কেবলমাত্র অনুমোদিত প্রশাসকগণের জন্য
                </p>
              </div>

              <button
                onClick={toggleAdminPreview}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                  isAdmin
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200'
                }`}
              >
                {isAdmin ? 'অ্যাডমিন মোড সক্রিয়' : 'অ্যাডমিন সুইচ'}
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => setShowAdminModal(true)}
                className="w-full py-2.5 rounded-xl bg-[#064E3B] text-[#D4AF37] font-bold text-xs hover:bg-[#0B6B50] transition flex items-center justify-center gap-1.5"
              >
                <span>অ্যাডমিন অনুমোদন প্যানেল খুলুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin Approval Modal */}
      <AdminApprovalModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </div>
  );
};
