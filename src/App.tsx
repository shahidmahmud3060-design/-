/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { MahfilDetailModal } from './components/MahfilDetailModal';
import { PhoneOtpModal } from './components/PhoneOtpModal';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { NewMahfilPage } from './pages/NewMahfilPage';
import { SpeakersPage } from './pages/SpeakersPage';
import { SearchPage } from './pages/SearchPage';
import { AccountPage } from './pages/AccountPage';
import { PosterStudio } from './components/PosterStudio';
import { TRANSLATIONS } from './data/translations';
import { WifiOff } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, activeModalMahfil, closeMahfilDetailModal, language } = useApp();
  const t = TRANSLATIONS[language];

  // Online / offline detector
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] dark:bg-[#101A16] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Offline banner if disconnected */}
      {!isOnline && (
        <div className="sticky top-0 z-50 bg-amber-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-center gap-2 shadow-md">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offlineNotice}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'new-post' && <NewMahfilPage />}
        {activeTab === 'speakers' && <SpeakersPage />}
        {activeTab === 'search' && <SearchPage />}
        {activeTab === 'poster-studio' && <PosterStudio />}
        {activeTab === 'account' && <AccountPage />}
      </main>

      {/* Mobile-first 5-Item Bottom Navigation Bar */}
      <Navbar />

      {/* Global Mahfil Detail Modal */}
      {activeModalMahfil && (
        <MahfilDetailModal
          mahfil={activeModalMahfil}
          onClose={closeMahfilDetailModal}
        />
      )}

      {/* Global Phone OTP Modal */}
      <PhoneOtpModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
