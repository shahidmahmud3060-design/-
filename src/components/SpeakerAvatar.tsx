import React, { useRef } from 'react';
import { Camera, Plus } from 'lucide-react';
import { Speaker } from '../types';
import { useApp } from '../context/AppContext';

interface SpeakerAvatarProps {
  speaker: Speaker;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  allowUpload?: boolean;
  className?: string;
}

export const SpeakerAvatar: React.FC<SpeakerAvatarProps> = ({
  speaker,
  size = 'md',
  allowUpload = false,
  className = '',
}) => {
  const { updateSpeakerPhoto, language } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getInitials = (name: string) => {
    if (!name) return 'ম';
    // Clean common titles
    const clean = name.replace(/^(মাওলানা|শায়খ|মুফতি|ড\.|আল্লামা|পীরজাদা)\s*/i, '').trim();
    return clean.slice(0, 2) || 'ম';
  };

  const initials = getInitials(speaker.nameBn);

  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'bn' ? 'অনুগ্রহ করে ছবির ফাইল নির্বাচন করুন।' : 'Please select an image file.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert(language === 'bn' ? 'ফাইলের আকার ৪ মেগাবাইটের কম হতে হবে।' : 'File size must be under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateSpeakerPhoto(speaker.id, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`relative group shrink-0 ${sizeClasses[size]} ${className}`}>
      {speaker.photoUrl ? (
        <img
          src={speaker.photoUrl}
          alt={speaker.nameBn}
          className="w-full h-full rounded-2xl object-cover border-2 border-[#D4AF37]/60 shadow-xs"
        />
      ) : (
        /* Dignified Islamic Scholar Monogram Crest */
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#0B6B50] to-[#04281E] border-2 border-[#D4AF37]/50 shadow-xs flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Subtle Islamic dome silhouette */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
              <path d="M50 15 C35 35 25 55 25 80 L75 80 C75 55 65 35 50 15 Z" />
            </svg>
          </div>
          <span className="font-bold text-[#D4AF37] tracking-tight relative z-10 leading-none">
            {initials}
          </span>
          <span className="text-[8px] text-emerald-200/80 font-mono tracking-tighter mt-0.5">
            ۞
          </span>
        </div>
      )}

      {/* Upload/Add photo button trigger */}
      {allowUpload && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#064E3B] text-[#D4AF37] border border-[#D4AF37] hover:scale-110 active:scale-95 shadow-md transition cursor-pointer"
            title={speaker.photoUrl ? 'ছবি পরিবর্তন করুন' : 'বক্তার ছবি যুক্ত করুন'}
            aria-label="Upload speaker photo"
          >
            {speaker.photoUrl ? <Camera className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
};
