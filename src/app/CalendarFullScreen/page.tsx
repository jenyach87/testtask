"use client";
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isSameYear } from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { Button } from '@nextui-org/react';
import { Image } from "@nextui-org/react";
const CalendarBig = () => {
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

  const renderHeader = () => {
    const isCurrentMonth = isSameMonth(currentMonth, new Date()) && isSameYear(currentMonth, new Date());
    return (
      <div className="flex flex-col items-center w-full px-2">
        <div className="flex justify-between items-center w-full mb-2.5">
          <FaChevronLeft
            onClick={prevMonth}
            className={`mr-2 h-4 cursor-pointer ${isCurrentMonth ? 'text-gray-300 pointer-events-none' : ''}`}
          />
          <span className="font-semibold text-base">{format(currentMonth, 'MMMM')}</span>
          <FaChevronRight onClick={nextMonth} className="ml-2 h-4 cursor-pointer" />
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="w-full text-center p-2 font-inter font-semibold text-xs text-gray-400" key={i}>
          {format(addDays(startDate, i), 'EEEEEE')}
        </div>
      );
    }
    return <div className="flex justify-between p-2 border-b border-gray-200">{days}</div>;
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
              className={`p-2 text-center cursor-pointer rounded-full ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''}`}
              key={day.toISOString()}
              onClick={() => onDateClick(cloneDay)}
            >
              <span>{formattedDate}</span>
            </div>
          );
        } else {
          days.push(
            <div className="p-2 text-center cursor-pointer rounded-full invisible" key={day.toISOString()}>
              <span>{formattedDate}</span>
            </div>
          );
        }
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 w-full" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="w-full border-b border-gray-200">{rows}</div>;
  };

  return (
    <div className="max-w-1088 flex flex-grow overflow-auto justify-between my-0 mx-auto">
      <div className="max-w-528 flex flex-grow flex-col justify-between border-2 border-gray-200 rounded-3xl p-8 pb-4">
        <div className="flex flex-col flex-grow">
          <span className="font-inter text-2xl font-semibold tracking-tight text-left text-gray-800">Select date and time</span>
          <div className="flex justify-start items-center my-4 ">
            <FaChevronLeft className="mr-2 border-2 border-gray-200 rounded-full w-7 h-7 p-1 text-customGray" />
            <span>Back</span>
          </div>
          {renderHeader()}
          {renderDays()}
          {renderCells()}

        </div>
        <div className="flex justify-center items-center border-t border-gray-200 w-full">
          <Button className="w-[480px] h-12 mt-4 mb-4 bg-black text-white rounded-lg">Choose timeslot</Button>
        </div>
      </div>
      <div className="max-w-528 flex h-fit flex-col border-2 border-gray-200 rounded-3xl ml-4 p-8 pt-8 pb-8">
        <h1 className='font-semibold text-2xl'>Your booking</h1>
        <div className='flex  my-4'>
          <Image src='/Profile.jpg' alt='Profile' />
          <div className="flex flex-col ml-4">
            <span className='font-semibold text-lg'>Anouschka Gonzalez</span>
            <span className='font-normal text-sm text-gray-900'>Voedingsdeskundige</span>
          </div>
        </div>
        <div className='mt-1'>
          <h1 className='font-semibold text-2xl'>Intakegesprek</h1>
          <p className='font-normal text-base text-customGray'>Ervaar je dagelijks onrust en stress? Slaap je slecht en loop je
            wellicht tegen overspannenheid aan? Grote kans dat er ook...
          </p>
        </div>
        <div className='my-4 cursor-pointer flex items-center justify-center border-2 border-gray-200 rounded-full w-10 h-10'>
          <FaPlus className="text-sm text-gray-700" />
        </div>
        <div className='px-3 py-3 border-2 border-gray-200 rounded-xl'>
          <div className='flex flex-col mb-2 border-b-2 border-gray-200'>
            <div className='flex justify-between text-customGray'>
              <span>Datum</span>
              <span>19 April 2024 om 10:00</span>
            </div>
            <div className='flex justify-between text-customGray'>
              <span>Duur</span>
              <span>60 min</span>
            </div>
            <div className='flex justify-between text-customGray'>
              <span>Participants</span>
              <span>1</span>
            </div>
            <div className='flex justify-between text-customGray'>
              <span>Service fee</span>
              <span>€80</span>
            </div>
          </div>
          <div className='flex justify-between text-zinc-950 mt-2'>
            <h1>Total</h1>
            <span>€80</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarBig;
