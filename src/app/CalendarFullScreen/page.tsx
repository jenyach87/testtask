"use client";
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isSameYear } from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { Button } from '@nextui-org/react';
import { Image } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

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
              className="flex justify-center items-center cursor-pointer w-full h-12"
              key={day.toISOString()}
              onClick={() => onDateClick(cloneDay)}
            >
              <div
                className={`flex justify-center items-center w-8 h-8 rounded-full ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''
                  } ${isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? 'border-2 border-blue-200 bg-blue-200 text-blue-500' : ''}`}
              >
                <span className="font-inter font-semibold text-sm">
                  {formattedDate}
                </span>
              </div>
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
    <div className="max-w-1088 mx-auto flex">
      <div className="max-w-528 w-full flex flex-col border-2 border-gray-200 rounded-3xl relative">
        <div className='h-40 px-8 py-8'>
          <span className="font-inter text-2xl font-semibold tracking-tight text-left text-gray-800">Select date and time</span>
          <div className="flex justify-start items-center my-4 cursor-pointer">
            <FaChevronLeft className="mr-2 border-2 border-gray-200 rounded-full w-7 h-7 p-1 text-customGray" />
            <span>Back</span>
          </div>
          {renderHeader()}
          
        </div>
        <div className='w-full'>
          {renderDays()}
          {renderCells()}
          <div className="flex flex-wrap">
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center border-2 border-gray-200 rounded-xl px-3 py-3">
                <div className="flex justify-center items-center">
                  <input type="radio" className="rounded-full h-4 w-4 mr-1" />
                  <span>11:00 - 12:00</span>
                </div>
                <span>€80</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full items-center border-t border-gray-200 bg-white sticky bottom-0 left-0 z-40">
          <Button className="w-[480px] h-12 mt-4 mb-4 max-w-96 bg-black text-white rounded-lg">Choose timeslot</Button>
        </div>
      </div>
      <div className="max-w-528 h-fit flex flex-col border-2 border-gray-200 rounded-3xl ml-0 md:ml-4 p-8 pt-8 pb-8">
        <h1 className="font-semibold text-2xl">Your booking</h1>
        <div className="flex my-4">
          <Image src="/Profile.jpg" alt="Profile" />
          <div className="flex flex-col ml-4">
            <span className="font-semibold text-lg">Anouschka Gonzalez</span>
            <span className="font-normal text-sm text-gray-900">Voedingsdeskundige</span>
          </div>
        </div>
        <div className="mt-1">
          <h1 className="font-semibold text-2xl">Intakegesprek</h1>
          <p className="font-normal text-base text-customGray">
            Ervaar je dagelijks onrust en stress? Slaap je slecht en loop je wellicht tegen overspannenheid aan? Grote kans dat er ook...
          </p>
        </div>
        <div className="my-4 cursor-pointer flex items-center justify-center border-2 border-gray-200 rounded-full w-10 h-10">
          <FaPlus className="text-sm text-gray-700" />
        </div>
        <div className="px-3 py-3 border-2 border-gray-200 rounded-xl">
          <div className="flex flex-col mb-2 border-b-2 border-gray-200">
            <div className="flex justify-between text-customGray">
              <span>Datum</span>
              <span>19 April 2024 om 10:00</span>
            </div>
            <div className="flex justify-between text-customGray">
              <span>Duur</span>
              <span>60 min</span>
            </div>
            <div className="flex justify-between text-customGray">
              <span>Participants</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-customGray">
              <span>Service fee</span>
              <span>€80</span>
            </div>
          </div>
          <div className="flex justify-between text-zinc-950 mt-2">
            <h1>Total</h1>
            <span>€80</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarBig;
