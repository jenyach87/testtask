"use client";
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isSameYear, isBefore } from 'date-fns';
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
      <div className="flex flex-col items-center w-full pt-1">
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
              className="flex justify-center items-center cursor-pointer w-full h-12"
              key={day.toISOString()}
              onClick={() => setSelectedDate(cloneDay)}
            >
              <div
                className={`flex justify-center items-center w-8 h-8 rounded-full ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''
                  } ${isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? 'border-2 border-blue-200 bg-blue-200 text-blue-500' : ''}`}
              >
                <div className="flex flex-col items-center font-inter font-semibold text-sm pt-1">
                  {formattedDate}
                  {isBefore(day, new Date()) && (
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          days.push(
            <div className="w-full h-12" key={day.toISOString()}></div>
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
          <div className="flex flex-col w-full flex-grow justify-between px-4 lg:hidden">
            {renderHeader()}
            <div className="overflow-y-auto max-h-48">
              {renderDays()}
            </div>
            <div className="flex flex-col mx-1 overflow-y-scroll max-h-80">
              {renderCells()}
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
              <div className='flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3 mt-2'>
                <div className='flex justify-center items-center'>
                  <input type='radio' className="rounded-full h-4 w-4 mr-1 "></input>
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="flex justify-center items-center border-t border-gray-200 w-full mt-auto">
              <Button className="h-12 w-11/12 max-w-96 bg-black text-white rounded-lg ">Select payment method</Button>
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

