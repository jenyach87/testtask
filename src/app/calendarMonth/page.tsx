"use client";
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isSameYear } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import CalendarBig from '../CalendarFullScreen/page';
import useWindowSize from "../Hooks/UseWindowsSize";

const CalendarFull = () => {
  const { width } = useWindowSize();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    if (!(isSameMonth(currentMonth, new Date()) && isSameYear(currentMonth, new Date()))) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const onDateClick = (day: React.SetStateAction<Date>) => {
    setSelectedDate(day);
  };

  const customContent = (
    <div className="w-full flex justify-between items-center border border-gray-200 rounded-2xl bg-slate-200 mb-2.5">
      <Link href='/' className="w-1/2 py-1.5 px-4 text-center font-semibold text-xs ">Week</Link>
      <Link href='/calendarMonth' className="w-1/2 py-1.5 px-4 text-center font-semibold text-xs border bg-white rounded-2xl ">Month</Link>
    </div>
  );

  const renderHeader = () => {
    const isCurrentMonth = isSameMonth(currentMonth, new Date()) && isSameYear(currentMonth, new Date());
    return (
      <div className="flex flex-col items-center w-full">
        <div className="flex w-full justify-between items-center mb-2.5">
          <FaChevronLeft
            onClick={prevMonth}
            className={`mr-2 h-4 cursor-pointer ${isCurrentMonth ? 'text-gray-400 pointer-events-none' : ''}`}
          />
          <span className='font-semibold text-base'>{format(currentMonth, 'MMMM')}</span>
          <FaChevronRight onClick={nextMonth} className="ml-2 h-4 cursor-pointer" />
        </div>
        {customContent}
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="w-full text-center py-1.5 font-inter font-semibold text-xs text-gray-500" key={i}>
          {format(addDays(startDate, i), 'eeeeee')}
        </div>
      );
    }
    return <div className="flex justify-between w-full border-b border-gray-200">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        if (isSameMonth(day, monthStart)) {
          days.push(
            <div
              className={`w-full py-1.5 text-center cursor-pointer rounded-lg ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-3xl' : ''}`}
              key={day.toISOString()}
              onClick={() => onDateClick(cloneDay)}
            >
              <span className="block">{formattedDate}</span>
            </div>
          );
        } else {
          days.push(
            <div className="w-full py-1.5 text-center cursor-pointer rounded-lg invisible" key={day.toISOString()}>
              <span className="block">{formattedDate}</span>
            </div>
          );
        }
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex justify-between w-full" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="w-full border-b border-gray-200">{rows}</div>;
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      {width !== undefined && width < 1024 ? (
        <div className="flex flex-grow">
          <div className="flex flex-col w-full flex-grow justify-between p-4 lg:hidden">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            <div className="flex justify-center items-center border-t border-gray-200 w-full mt-auto">
              <Button className="h-12 w-11/12 bg-black text-white rounded-lg mt-4 mb-4">Select payment method</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow">
          <div className="hidden lg:flex lg:flex-grow">
            <CalendarBig />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarFull;

