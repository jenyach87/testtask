"use client";
import {
  format,
  subWeeks,
  addWeeks,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
} from "date-fns";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import CalendarBig from "../CalendarFullScreen/page";
import useWindowSize from "../Hooks/UseWindowsSize";
import { Checkbox } from "@nextui-org/checkbox";

const Calendar: React.FC = () => {
  const { width } = useWindowSize();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const changeWeekHandle = (btnType: any) => {
    if (btnType === "prev") {
      const newDate = subWeeks(currentMonth, 1);
      setCurrentMonth(newDate);
    }
    if (btnType === "next") {
      const newDate = addWeeks(currentMonth, 1);
      setCurrentMonth(newDate);
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM";
    return (
      <div className="flex justify-center mb-2.5 font-semibold text-base">
        <span>{format(currentMonth, dateFormat)}</span>
      </div>
    );
  };

  const renderDays = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayName = format(addDays(startDate, i), 'EEE').slice(0, -1);
      days.push(
        <div className="flex justify-center font-inter font-semibold text-xs text-gray-500" key={i}>
          {dayName}
        </div>
      );
    }
    return <div className="flex justify-around border-b border-gray-200">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <div
            className={`flex justify-center items-center cursor-pointer w-full h-10 ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-3xl' : ''}`}
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className={`flex justify-center font-inter font-semibold text-sm ${isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? 'border-2 border-blue-500 text-blue-500' : ''}`}>{formattedDate}</div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(<div className="flex justify-around mt-4" key={day.toString()}>{days}</div>);
      days = [];
    }

    return (
      <div className="flex justify-around pb-2 border-b border-gray-200">
        <div className="flex justify-center items-center cursor-pointer mt-2" onClick={() => changeWeekHandle("prev")}>
          <FaChevronLeft className="mr-2" />
        </div>
        <div className="w-full">{rows}</div>
        <div className="flex justify-center items-center cursor-pointer mt-2" onClick={() => changeWeekHandle("next")}>
          <FaChevronRight className="ml-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      {width !== undefined && width < 1024 ? (
        <div className="flex flex-grow">
          <div className="flex flex-col w-full flex-grow justify-between p-4">
            {renderHeader()}
            <div className="flex justify-between items-center border border-gray-200 rounded-2xl bg-slate-200 mb-2.5">
              <Link href="/" className="w-1/2 border border-gray-200 py-1.5 px-4 rounded-2xl text-center font-semibold text-xs bg-white">
                Week
              </Link>
              <Link href="/calendarMonth" className="w-1/2 py-1.5 px-4 rounded-2xl text-center font-semibold text-xs">
                Month
              </Link>
            </div>
            <div className="flex-1 border-b border-gray-200 overflow-y-auto">
              {renderDays()}
              {renderCells()}
            </div>
            <div className="flex justify-center items-center border-t border-gray-200 w-full mt-auto">
              <Button className="h-12 w-11/12 bg-black text-white rounded-lg mt-4 mb-4">Select payment method</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-grow">
          <CalendarBig />
        </div>
      )}
    </div>
  );
};

export default Calendar;
