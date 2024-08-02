"use client";

import { useState, useEffect } from "react";

const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const getCurrentDate = (): string => {
    const days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today: Date = new Date();
    const dayName: string = days[today.getDay()];
    const monthName: string = months[today.getMonth()];
    const day: number = today.getDate();
    const year: number = today.getFullYear();

    return `${dayName}, ${monthName} ${day}, ${year}`;
  };

  useEffect(() => {
    setCurrentTime(getCurrentDate());
  }, []);

  return (
    <div className="text-zinc-500 text-sm" id="current-time">
      {currentTime}
    </div>
  );
};

export default CurrentTime;
