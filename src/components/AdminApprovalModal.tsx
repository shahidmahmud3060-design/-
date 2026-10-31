import React, { useState } from 'react';
import {
  X,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Trash2,
  FileText,
  AlertTriangle,
  Eye,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { formatMahfilDate } from '../utils/bengali';

interface AdminApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({ isOpen, onClose }) => {
  const {
    mahfils,
    speakers,
    deletionRequests,
    auditLogs,
    adminApproveMahfil,
    adminRejectMahfil,
    adminApproveSpeaker,
    adminRejectSpeaker,
    deletePendingMahfil,
    language,
  } = useApp();
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'posts' | 'speakers' | 'deletions' | 'audit'>('posts');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  if (!isOpen) return null;

  const pendingMahfils = mahfils.filter((m) => m.status === 'pending');
  const pendingSpeakers = speakers.filter((s) => s.status === 'pending');

  const handleConfirmRejectMahfil = (id: string) => {
    adminRejectMahfil(id, rejectReason || 'তথ্য বা পোস্টারের সত্যতা নিশ্চিত করা যায়নি।');
    setRejectingId(null);
    setRejectReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white dark:bg-[#182620] rounded-3xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-[#064E3B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.adminApprovalPanel}</span>
                <span className="text-[10px] bg-[#D4AF37] text-slate-950 font-bold px-2 py-0.5 rounded">
                  ADMIN ONLY
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                পোস্ট, বক্তা ও আবেদন যাচাইকরণ ডেক্স
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'posts'
                ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            অপেক্ষমাণ মাহফিল ({pendingMahfils.length})
          </button>

          <button
            onClick={() => setActiveTab('speakers')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'speakers'
                ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            প্রস্তাবিত বক্তা ({pendingSpeakers.length})
          </button>

          <button
            onClick={() => setActiveTab('deletions')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'deletions'
                ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            মুছে ফেলার আবেদন ({deletionRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-[#064E3B] text-[#064E3B] dark:border-[#D4AF37] dark:text-[#D4AF37]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            অডিট লগ ({auditLogs.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: PENDING MAHFILS */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {pendingMahfils.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500/60 mb-2" />
                  <p className="text-sm font-semibold">কোনো মাহফিল পোস্ট অনুমোদন অপেক্ষমাণ নেই।</p>
                  <p className="text-xs text-slate-500 mt-1">নতুন কোনো ইউজার পোস্ট জমা দিলে এখানে প্রদর্শিত হবে।</p>
                </div>
              ) : (
                pendingMahfils.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.posterUrl || '/logo.png'}
                          alt={m.title}
                          className="w-14 h-18 rounded-xl object-cover border border-amber-300/40 shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                            অপেক্ষমাণ পোস্ট
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {formatMahfilDate(m.startDate, true)} · {m.upazila}, {m.district}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            প্রধান বক্তা: {m.principalSpeaker.nameBn}
                          </p>
                        </div>
                      </div>

                      {/* Organizer info */}
                      <div className="text-xs text-slate-500 text-left sm:text-right">
                        <span>জমা দিয়েছেন: {m.submittedByUserName}</span>
                        <br />
                        <span>যোগাযোগ: {m.organizerPhone}</span>
                      </div>
                    </div>

                    {/* Reject reason input */}
                    {rejectingId === m.id ? (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl space-y-2 border border-rose-200">
                        <label className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
                          বাতিলের কারণ উল্লেখ করুন:
                        </label>
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="পোস্টার অস্পষ্ট / অনুমতিপত্র নেই / ভুল তারিখ..."
                          className="w-full text-xs p-2 rounded-lg border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setRejectingId(null)}
                            className="px-3 py-1 text-xs text-slate-500"
                          >
                            বাতিল
                          </button>
                          <button
                            type="button"
                            onClick={() => handleConfirmRejectMahfil(m.id)}
                            className="px-3.5 py-1 text-xs bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700"
                          >
                            বাতিল নিশ্চিত করুন
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setRejectingId(m.id)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition flex items-center gap-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>{t.reject}</span>
                        </button>
                        <button
                          onClick={() => adminApproveMahfil(m.id)}
                          className="px-4 py-1.5 text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#0B6B50] rounded-xl shadow-xs transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          <span>{t.approve}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: PENDING SPEAKERS */}
          {activeTab === 'speakers' && (
            <div className="space-y-3">
              {pendingSpeakers.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <UserCheck className="w-10 h-10 mx-auto text-emerald-500/60 mb-2" />
                  <p className="text-sm font-semibold">কোনো বক্তার প্রস্তাবনা অপেক্ষমাণ নেই।</p>
                </div>
              ) : (
                pendingSpeakers.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-semibold">
                        নতুন প্রস্তাব
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                        {sp.nameBn} ({sp.nameEn})
                      </h4>
                      <p className="text-xs text-slate-500">জেলা: {sp.district} · {sp.country}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{sp.biographyBn}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adminRejectSpeaker(sp.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        {t.reject}
                      </button>
                      <button
                        onClick={() => adminApproveSpeaker(sp.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#0B6B50] rounded-xl flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.approve}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: DELETION REQUESTS */}
          {activeTab === 'deletions' && (
            <div className="space-y-3">
              {deletionRequests.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Trash2 className="w-10 h-10 mx-auto text-slate-400/60 mb-2" />
                  <p className="text-sm font-semibold">মুছে ফেলার কোনো আবেদন জমা নেই।</p>
                </div>
              ) : (
                deletionRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {req.mahfilTitle}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        আবেদনকারী: {req.requestedByUserName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-rose-50/50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-100">
                      <strong>আবেদনের কারণ:</strong> {req.reason}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="font-mono font-bold text-[#064E3B] dark:text-[#D4AF37]">
                      {log.action}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{log.details}</p>
                    <span className="text-[10px] text-slate-400">অ্যাডমিন: {log.adminEmail}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
