"use client";

import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DEFAULT_HOURS = 5;
const STORAGE_KEY = "hajaty_timer_target_ms";

function getTargetTimestamp(targetDate?: Date): number {
  if (targetDate) return targetDate.getTime();

  if (typeof window === "undefined") {
    return Date.now() + DEFAULT_HOURS * 60 * 60 * 1000;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      // If valid and still in the future, reuse it
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage errors
  }

  // Otherwise initialize a fresh 5-hour target
  const freshTarget = Date.now() + DEFAULT_HOURS * 60 * 60 * 1000;
  try {
    localStorage.setItem(STORAGE_KEY, freshTarget.toString());
  } catch {
    // Ignore storage errors
  }
  return freshTarget;
}

function getRemaining(targetTimestamp: number): TimeRemaining {
  let diffMs = targetTimestamp - Date.now();

  // If expired, renew to a new 5-hour cycle
  if (diffMs <= 0) {
    const renewed = Date.now() + DEFAULT_HOURS * 60 * 60 * 1000;
    try {
      localStorage.setItem(STORAGE_KEY, renewed.toString());
    } catch {
      // Ignore storage errors
    }
    diffMs = renewed - Date.now();
  }

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex h-18 sm:h-24 lg:h-26 flex-1 min-w-0 max-w-[72px] sm:max-w-[84px] flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] px-1">
      <span className="text-xl sm:text-2xl font-bold leading-none text-black tabular-nums">
        {formatted}
      </span>

      <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-gray-400 truncate max-w-full">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate,
}: {
  targetDate?: Date;
}) {
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: DEFAULT_HOURS,
    minutes: 0,
    seconds: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let currentTarget = getTargetTimestamp(targetDate);
    setTime(getRemaining(currentTarget));

    const interval = setInterval(() => {
      if (currentTarget - Date.now() <= 0) {
        currentTarget = Date.now() + DEFAULT_HOURS * 60 * 60 * 1000;
        try {
          localStorage.setItem(STORAGE_KEY, currentTarget.toString());
        } catch {
          // Ignore
        }
      }
      setTime(getRemaining(currentTarget));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-start gap-2.5 font-sans" dir="rtl">
      <p className="text-base sm:text-lg font-bold text-black">
        الوقت المتبقي للخصم
      </p>

      {/* استخدام [direction:ltr] داخل عناصر الحاوية يضمن عدم قيام المتصفح بعكس ترتيب DOM وترتيبها يدوياً من اليمين لليسام */}
      <div
        className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2.5 w-full max-w-sm [direction:ltr]"
        role="timer"
        aria-live="off"
      >
        <TimeBox value={time.days} label="أيام" />

        <span className="-mt-2 sm:-mt-3 text-base sm:text-xl font-bold text-black shrink-0">:</span>

        <TimeBox value={time.hours} label="ساعات" />

        <span className="-mt-2 sm:-mt-3 text-base sm:text-xl font-bold text-black shrink-0">:</span>

        <TimeBox value={time.minutes} label="دقائق" />

        <span className="-mt-2 sm:-mt-3 text-base sm:text-xl font-bold text-black shrink-0">:</span>

        <TimeBox value={time.seconds} label="ثواني" />
      </div>
    </div>
  );
}