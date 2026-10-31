// Utility functions for Bengali numbers, dates, times, and day calculations

const EN_TO_BN_NUMBERS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const BN_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BN_WEEKDAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const EN_WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (digit) => EN_TO_BN_NUMBERS[digit] || digit);
}

export function formatMahfilDate(dateStr: string, isBengali: boolean = true): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const weekday = d.getDay();

    if (isBengali) {
      return `${toBengaliNumber(day)} ${BN_MONTHS[month]} ${toBengaliNumber(year)}, ${BN_WEEKDAYS[weekday]}`;
    } else {
      return `${day} ${EN_MONTHS[month]} ${year}, ${EN_WEEKDAYS[weekday]}`;
    }
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string, isBengali: boolean = true): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const month = d.getMonth();
    if (isBengali) {
      return `${toBengaliNumber(day)} ${BN_MONTHS[month]}`;
    }
    return `${day} ${EN_MONTHS[month]}`;
  } catch {
    return dateStr;
  }
}

export function calculateMahfilDuration(startDateStr: string, endDateStr: string, isBengali: boolean = true): {
  days: number;
  durationText: string;
  startWeekday: string;
  yearText: string;
} {
  if (!startDateStr) {
    return {
      days: 1,
      durationText: isBengali ? '১ দিন' : '1 Day',
      startWeekday: '',
      yearText: '',
    };
  }

  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : start;

  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const startDayIndex = start.getDay();
  const year = start.getFullYear();

  const startWeekday = isBengali ? BN_WEEKDAYS[startDayIndex] : EN_WEEKDAYS[startDayIndex];
  const yearText = isBengali ? toBengaliNumber(year) : String(year);
  const durationText = isBengali
    ? `${toBengaliNumber(diffDays)} দিন ব্যাপী`
    : `${diffDays} Day${diffDays > 1 ? 's' : ''}`;

  return {
    days: diffDays,
    durationText,
    startWeekday,
    yearText,
  };
}

export function formatTimeSlot(startTime: string, endTime: string, isBengali: boolean = true): string {
  if (!startTime) return '';
  if (isBengali) {
    return `${toBengaliNumber(startTime)} হতে ${endTime ? toBengaliNumber(endTime) : 'সমাপ্তি পর্যন্ত'}`;
  }
  return `${startTime} to ${endTime || 'conclusion'}`;
}
