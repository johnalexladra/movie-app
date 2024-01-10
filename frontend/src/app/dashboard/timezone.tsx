"use client";
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Session } from 'inspector';

const getTimeOfDay = (time: any) => {
  const hour = time.hour();
  if (hour >= 5 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

export default function Grettings(user: { name: string}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const localTime = moment().tz('Asia/Manila'); // Set your desired timezone
    const timeOfDay = getTimeOfDay(localTime);

    setCurrentTime(`Hi! ${user.name}, Good ${timeOfDay}!`);
  }, [user.name]);

  return (
    <>
      <h2 className="text-3xl font-bold m-8">{currentTime}</h2>
    </>
    );
};