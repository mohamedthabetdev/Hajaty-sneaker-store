"use client";

import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemaining(targetDate?: Date): TimeRemaining {
  const now = new Date();

  const target =
    targetDate ||
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    );

  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

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
  return (
    <div className="flex h-24 w-20 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] sm:h-26 sm:w-22">
      <span className="text-2xl font-bold leading-none text-black tabular-nums">
        {value}
      </span>

      <span className="mt-2 text-xs font-medium text-gray-400">
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
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTime(getRemaining(targetDate));

    const interval = setInterval(() => {
      setTime(getRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-start gap-3 font-sans" dir="rtl">
      <p className="text-lg font-bold text-black">
        الوقت المتبقي للخصم
      </p>

      {/* استخدام [direction:ltr] داخل عناصر الحاوية يضمن عدم قيام المتصفح بعكس ترتيب DOM وترتيبها يدوياً من اليمين لليسام */}
      <div
        className="flex items-center gap-2 sm:gap-3 [direction:ltr]"
        role="timer"
        aria-live="off"
      >
        <TimeBox value={time.days} label="أيام" />

        <span className="-mt-3 text-xl font-bold text-black">:</span>

        <TimeBox value={time.hours} label="ساعات" />

        <span className="-mt-3 text-xl font-bold text-black">:</span>

        <TimeBox value={time.minutes} label="دقائق" />

        <span className="-mt-3 text-xl font-bold text-black">:</span>

        <TimeBox value={time.seconds} label="ثواني" />
      </div>
    </div>
  );
}