"use client";
import {
  format,
  subWeeks,
  addWeeks,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  isBefore,
} from "date-fns";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import CalendarBig from "../CalendarFullScreen/page";
import useWindowSize from "../Hooks/UseWindowsSize";
import { ScrollShadow } from "@nextui-org/react";

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
      <div className="flex justify-center my-4 font-semibold text-base">
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
            className={'flex flex-col justify-center items-center cursor-pointer w-full h-10 '}
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className={`flex flex-col px-2 justify-center items-center font-inter font-semibold text-sm 
              ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-3xl px-3 py-2' : ''} 
              ${isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? 'text-blue-500' : ''}`}
            >
              {formattedDate}
            </div>
            {isBefore(day, new Date()) ? (
              <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 "></div>
            ) : <div className="w-1 h-1 bg-white rounded-full mt-1 "></div> }
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(<div className="flex justify-around mt-4" key={day.toString()}>{days}</div>);
      days = [];
    }

    return (
      <div className="flex justify-around pb-2 border-b border-gray-200">
        <div className="flex justify-center items-center cursor-pointer mt-3" onClick={() => changeWeekHandle("prev")}>
          <FaChevronLeft className="mr-2 " />
        </div>
        <div className="w-full">{rows}</div>
        <div className="flex justify-center items-center cursor-pointer mt-3" onClick={() => changeWeekHandle("next")}>
          <FaChevronRight className="ml-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      {width !== undefined && width < 1024 ? (
        <div className="flex flex-grow">
          <div className="flex flex-col w-full flex-grow justify-between px-4 relative">
            {renderHeader()}
            <div className="flex justify-between items-center border border-gray-200 rounded-2xl bg-slate-200 mb-2.5">
              <Link href="/" className="w-1/2 border border-gray-200 py-1.5 px-4 rounded-2xl text-center font-semibold text-xs bg-white">
                Week
              </Link>
              <Link href="/calendarMonth" className="w-1/2 py-1.5 px-4 rounded-2xl text-center font-semibold text-xs">
                Month
              </Link>
            </div>
            <div className="flex-1 border-b border-gray-200">
              {renderDays()}
              {renderCells()}
              <ScrollShadow hideScrollBar className="w-full h-96">
                <div className="flex flex-col mx-2 ">
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
              </ScrollShadow>
            </div>
            <div className="flex justify-center items-center border-t border-gray-200 w-full absolute bottom-0 left-0 bg-white">
              <Button className="h-12 my-3 w-11/12 max-w-96 bg-black text-white rounded-lg">Select payment method</Button>
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
