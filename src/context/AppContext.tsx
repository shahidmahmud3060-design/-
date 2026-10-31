import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  ThemeMode,
  Mahfil,
  Speaker,
  UserProfile,
  Announcement,
  AuditLog,
  DeletionRequest,
} from '../types';
import { INITIAL_MAHFILS, INITIAL_ANNOUNCEMENTS } from '../data/initialMahfils';
import { INITIAL_SPEAKERS } from '../data/speakersData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  user: UserProfile | null;
  loginWithGoogle: () => void;
  logout: () => void;
  updateUserProfile: (name: string, phone: string) => void;
  verifyUserPhone: (phoneNumber: string) => void;
  mahfils: Mahfil[];
  speakers: Speaker[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
  deletionRequests: DeletionRequest[];
  favorites: string[];
  toggleFavorite: (mahfilId: string) => void;
  isFavorite: (mahfilId: string) => boolean;
  submitMahfil: (mahfilData: Omit<Mahfil, 'id' | 'status' | 'createdAt' | 'submittedByUserId' | 'submittedByUserName'>) => { success: boolean; error?: string };
  updatePendingMahfil: (id: string, updatedData: Partial<Mahfil>) => boolean;
  deletePendingMahfil: (id: string) => boolean;
  requestApprovedMahfilDeletion: (mahfilId: string, reason: string) => boolean;
  adminApproveMahfil: (id: string) => void;
  adminRejectMahfil: (id: string, reason: string) => void;
  suggestSpeaker: (speakerData: Omit<Speaker, 'id' | 'status' | 'isVerified'>) => void;
  updateSpeakerPhoto: (speakerId: string, photoUrl: string) => void;
  adminApproveSpeaker: (id: string) => void;
  adminRejectSpeaker: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedMahfilForPoster: Mahfil | null;
  setSelectedMahfilForPoster: (mahfil: Mahfil | null) => void;
  openMahfilDetailModal: (mahfil: Mahfil) => void;
  activeModalMahfil: Mahfil | null;
  closeMahfilDetailModal: () => void;
  showPhoneOtpModal: boolean;
  setShowPhoneOtpModal: (show: boolean) => void;
  phoneOtpTargetAction?: () => void;
  setPhoneOtpTargetAction: (action?: () => void) => void;
  isAdmin: boolean;
  toggleAdminPreview: () => void;
  searchFilterSpeakerName?: string;
  setSearchFilterSpeakerName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'mahfil_lang_v1',
  THEME: 'mahfil_theme_v1',
  USER: 'mahfil_user_v1',
  MAHFILS: 'mahfil_posts_v1',
  SPEAKERS: 'mahfil_speakers_v1',
  FAVORITES: 'mahfil_favs_v1',
  ANNOUNCEMENTS: 'mahfil_announcements_v1',
  AUDIT_LOGS: 'mahfil_audit_logs_v1',
  DELETION_REQ: 'mahfil_deletion_req_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'en' ? 'en' : 'bn') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.lang = lang;
  };

  // 2. Theme state
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'theme-blue') return saved;
    return 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    
    // Apply class to html tag
    document.documentElement.classList.remove('light', 'dark', 'theme-blue');
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'theme-blue');
    document.documentElement.classList.add(theme);
    document.documentElement.lang = language;
  }, [theme, language]);

  // 3. User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return null;
  });

  const loginWithGoogle = () => {
    // Authenticated Google user session representation
    const googleUser: UserProfile = {
      id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'মুহাম্মদ আব্দুল্লাহ',
      email: 'abdullah.seeker@gmail.com',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      phone: '01712345678',
      isPhoneVerified: false,
      isAdmin: false,
    };
    setUser(googleUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(googleUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const updateUserProfile = (name: string, phone: string) => {
    if (!user) return;
    const phoneChanged = user.phone !== phone;
    const updated: UserProfile = {
      ...user,
      name,
      phone,
      isPhoneVerified: phoneChanged ? false : user.isPhoneVerified,
    };
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  };

  const verifyUserPhone = (phoneNumber: string) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      phone: phoneNumber,
      isPhoneVerified: true,
    };
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  };

  // 4. Mahfils state
  const [mahfils, setMahfils] = useState<Mahfil[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MAHFILS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_MAHFILS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MAHFILS, JSON.stringify(mahfils));
  }, [mahfils]);

  // 5. Speakers state
  const [speakers, setSpeakers] = useState<Speaker[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SPEAKERS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_SPEAKERS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(speakers));
  }, [speakers]);

  // 6. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  const toggleFavorite = (mahfilId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(mahfilId)
        ? prev.filter((id) => id !== mahfilId)
        : [...prev, mahfilId];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (mahfilId: string) => favorites.includes(mahfilId);

  // 7. Announcements
  const [announcements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // 8. Audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      {
        id: 'log_01',
        action: 'APPROVE_MAHFIL',
        targetId: 'mahfil_01',
        targetType: 'mahfil',
        adminEmail: 'admin@mahfilschedule.bd',
        timestamp: new Date().toISOString(),
        details: 'Initial verification approved by admin'
      }
    ];
  });

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
      return updated;
    });
  };

  // 9. Deletion requests
  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DELETION_REQ);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  // Navigation and Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedMahfilForPoster, setSelectedMahfilForPoster] = useState<Mahfil | null>(null);
  const [activeModalMahfil, setActiveModalMahfil] = useState<Mahfil | null>(null);
  const [showPhoneOtpModal, setShowPhoneOtpModal] = useState<boolean>(false);
  const [phoneOtpTargetAction, setPhoneOtpTargetAction] = useState<(() => void) | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [searchFilterSpeakerName, setSearchFilterSpeakerName] = useState<string>('');

  const toggleAdminPreview = () => {
    setIsAdmin((prev) => !prev);
  };

  const openMahfilDetailModal = (mahfil: Mahfil) => {
    setActiveModalMahfil(mahfil);
  };

  const closeMahfilDetailModal = () => {
    setActiveModalMahfil(null);
  };

  // Submissions & Actions
  const submitMahfil = (data: Omit<Mahfil, 'id' | 'status' | 'createdAt' | 'submittedByUserId' | 'submittedByUserName'>): { success: boolean; error?: string } => {
    if (!user) {
      return { success: false, error: 'অনুগ্রহ করে মাহফিল জমা দেওয়ার পূর্বে গুগল একাউন্টে সাইন-ইন করুন।' };
    }
    if (!user.isPhoneVerified) {
      return { success: false, error: 'প্রথম মাহফিল জমা দেওয়ার পূর্বে মোবাইল নম্বর ওয়ান-টাইম পাসওয়ার্ড (OTP) দিয়ে ভেরিফাই করুন।' };
    }
    if (!data.posterUrl) {
      return { success: false, error: 'মাহফিলের পোস্টার ছবি প্রদান করা বাধ্যতামূলক।' };
    }

    const newMahfil: Mahfil = {
      ...data,
      id: 'mahfil_' + Date.now(),
      status: 'pending', // Post approval requirement: All posts start as pending!
      createdAt: new Date().toISOString(),
      submittedByUserId: user.id,
      submittedByUserName: user.name,
      likesCount: 0,
    };

    setMahfils((prev) => [newMahfil, ...prev]);
    return { success: true };
  };

  const updatePendingMahfil = (id: string, updatedData: Partial<Mahfil>): boolean => {
    let success = false;
    setMahfils((prev) =>
      prev.map((m) => {
        if (m.id === id && m.status === 'pending') {
          success = true;
          return { ...m, ...updatedData };
        }
        return m;
      })
    );
    return success;
  };

  const deletePendingMahfil = (id: string): boolean => {
    let success = false;
    setMahfils((prev) => {
      const exists = prev.find((m) => m.id === id && m.status === 'pending');
      if (exists) {
        success = true;
        return prev.filter((m) => m.id !== id);
      }
      return prev;
    });
    return success;
  };

  const requestApprovedMahfilDeletion = (mahfilId: string, reason: string): boolean => {
    if (!user) return false;
    const target = mahfils.find((m) => m.id === mahfilId);
    if (!target) return false;

    const newReq: DeletionRequest = {
      id: 'del_req_' + Date.now(),
      mahfilId,
      mahfilTitle: target.title,
      requestedByUserId: user.id,
      requestedByUserName: user.name,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setDeletionRequests((prev) => {
      const updated = [newReq, ...prev];
      localStorage.setItem(STORAGE_KEYS.DELETION_REQ, JSON.stringify(updated));
      return updated;
    });

    addAuditLog({
      action: 'REQUEST_DELETION',
      targetId: mahfilId,
      targetType: 'mahfil',
      adminEmail: user.email,
      details: `User requested deletion: "${reason}"`,
    });

    return true;
  };

  const adminApproveMahfil = (id: string) => {
    setMahfils((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, status: 'approved', rejectionReason: undefined };
        }
        return m;
      })
    );
    addAuditLog({
      action: 'APPROVE_MAHFIL',
      targetId: id,
      targetType: 'mahfil',
      adminEmail: user?.email || 'admin@mahfilschedule.bd',
      details: 'Mahfil post approved by administrator',
    });
  };

  const adminRejectMahfil = (id: string, reason: string) => {
    setMahfils((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, status: 'rejected', rejectionReason: reason };
        }
        return m;
      })
    );
    addAuditLog({
      action: 'REJECT_MAHFIL',
      targetId: id,
      targetType: 'mahfil',
      adminEmail: user?.email || 'admin@mahfilschedule.bd',
      details: `Mahfil post rejected: ${reason}`,
    });
  };

  const suggestSpeaker = (speakerData: Omit<Speaker, 'id' | 'status' | 'isVerified'>) => {
    const newSpeaker: Speaker = {
      ...speakerData,
      id: 'sp_sugg_' + Date.now(),
      status: 'pending',
      isVerified: false,
    };
    setSpeakers((prev) => [...prev, newSpeaker]);
  };

  const updateSpeakerPhoto = (speakerId: string, photoUrl: string) => {
    setSpeakers((prev) =>
      prev.map((s) => {
        if (s.id === speakerId) {
          return { ...s, photoUrl };
        }
        return s;
      })
    );
    // Also update any mahfils referencing this speaker
    setMahfils((prev) =>
      prev.map((m) => {
        let updated = false;
        let p = m.principalSpeaker;
        let s2 = m.secondSpeaker;
        let s3 = m.thirdSpeaker;
        let sp = m.specialSpeaker;

        if (p.id === speakerId) {
          p = { ...p, photoUrl };
          updated = true;
        }
        if (s2 && s2.id === speakerId) {
          s2 = { ...s2, photoUrl };
          updated = true;
        }
        if (s3 && s3.id === speakerId) {
          s3 = { ...s3, photoUrl };
          updated = true;
        }
        if (sp && sp.id === speakerId) {
          sp = { ...sp, photoUrl };
          updated = true;
        }

        if (updated) {
          return {
            ...m,
            principalSpeaker: p,
            secondSpeaker: s2,
            thirdSpeaker: s3,
            specialSpeaker: sp,
          };
        }
        return m;
      })
    );
  };

  const adminApproveSpeaker = (id: string) => {
    setSpeakers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { ...s, status: 'approved', isVerified: true };
        }
        return s;
      })
    );
    addAuditLog({
      action: 'APPROVE_SPEAKER',
      targetId: id,
      targetType: 'speaker',
      adminEmail: user?.email || 'admin@mahfilschedule.bd',
      details: 'Speaker suggestion approved by administrator',
    });
  };

  const adminRejectSpeaker = (id: string) => {
    setSpeakers((prev) => prev.filter((s) => s.id !== id));
    addAuditLog({
      action: 'REJECT_SPEAKER',
      targetId: id,
      targetType: 'speaker',
      adminEmail: user?.email || 'admin@mahfilschedule.bd',
      details: 'Speaker suggestion rejected by administrator',
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        user,
        loginWithGoogle,
        logout,
        updateUserProfile,
        verifyUserPhone,
        mahfils,
        speakers,
        announcements,
        auditLogs,
        deletionRequests,
        favorites,
        toggleFavorite,
        isFavorite,
        submitMahfil,
        updatePendingMahfil,
        deletePendingMahfil,
        requestApprovedMahfilDeletion,
        adminApproveMahfil,
        adminRejectMahfil,
        suggestSpeaker,
        updateSpeakerPhoto,
        adminApproveSpeaker,
        adminRejectSpeaker,
        activeTab,
        setActiveTab,
        selectedMahfilForPoster,
        setSelectedMahfilForPoster,
        openMahfilDetailModal,
        activeModalMahfil,
        closeMahfilDetailModal,
        showPhoneOtpModal,
        setShowPhoneOtpModal,
        phoneOtpTargetAction,
        setPhoneOtpTargetAction,
        isAdmin,
        toggleAdminPreview,
        searchFilterSpeakerName,
        setSearchFilterSpeakerName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
