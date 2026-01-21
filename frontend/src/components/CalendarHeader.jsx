import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { addDays, format, isSameDay, isAfter } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getDaysToShow = () => {
  if (typeof window === "undefined") return 7;
  return window.innerWidth >= 768 ? 7 : 5;
};

const DAYS_TO_SHOW = getDaysToShow();
const CENTER_INDEX = Math.floor(DAYS_TO_SHOW / 2);

const CalendarHeader = ({ selectedDate, setSelectedDate }) => {
  const normalizedDate =
    selectedDate instanceof Date
      ? selectedDate
      : selectedDate
        ? new Date(selectedDate)
        : new Date();

  const today = newDate();

  // startDate কে directly normalizedDate থেকে calculate করুন
  const startDate = addDays(normalizedDate, -CENTER_INDEX);

  const containerRef = useRef(null);
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const prevNormalizedDate = useRef(normalizedDate);

  // days array directly calculate করুন
  const days = Array.from({ length: DAYS_TO_SHOW }, (_, i) =>
    addDays(startDate, i),
  );

  // Check if a date is in the future - useMemo দিয়ে stable রাখুন
  const isFutureDate = (date) => {
    return isAfter(date, today);
  };

  // Check if date is selectable
  const isDateSelectable = (date) => {
    return !isFutureDate(date) || isSameDay(date, today);
  };

  // handleScroll function কে completely stable রাখুন
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isManualScroll.current) return;

    isManualScroll.current = true;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container || !setSelectedDate) {
        isManualScroll.current = false;
        return;
      }

      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const itemWidth = 72;

      const centerPosition = scrollLeft + containerWidth / 2;
      const itemIndex = Math.round(centerPosition / itemWidth);

      if (itemIndex >= 0 && itemIndex < DAYS_TO_SHOW) {
        const clickedDate = addDays(startDate, itemIndex);
        const currentDate = normalizedDate;

        // Only update if date is different AND is selectable
        if (
          !isSameDay(clickedDate, currentDate) &&
          isDateSelectable(clickedDate)
        ) {
          setSelectedDate(clickedDate);
        }
      }

      isManualScroll.current = false;
    }, 150);
  }, [normalizedDate, setSelectedDate, startDate]); // startDate add করুন

  // Scroll to center when date changes
  useEffect(() => {
    if (isManualScroll.current || !containerRef.current) return;

    // Only scroll if date actually changed
    if (isSameDay(prevNormalizedDate.current, normalizedDate)) {
      return;
    }

    prevNormalizedDate.current = normalizedDate;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const itemWidth = 72;

      const scrollPosition =
        CENTER_INDEX * itemWidth - containerWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [normalizedDate]);

  const handleDateClick = useCallback(
    (date) => {
      if (!isDateSelectable(date) || !setSelectedDate) {
        return;
      }

      isManualScroll.current = true;
      if (!isSameDay(date, normalizedDate)) {
        setSelectedDate(date);
      }

      // Reset manual scroll flag after a delay
      setTimeout(() => {
        isManualScroll.current = false;
      }, 200);
    },
    [normalizedDate, setSelectedDate],
  );

  const handlePrev = useCallback(() => {
    if (!setSelectedDate) return;

    isManualScroll.current = true;
    const prevDate = addDays(normalizedDate, -1);
    if (isDateSelectable(prevDate)) {
      setSelectedDate(prevDate);
    }

    setTimeout(() => {
      isManualScroll.current = false;
    }, 200);
  }, [normalizedDate, setSelectedDate]);

  const handleNext = useCallback(() => {
    if (!setSelectedDate) return;

    isManualScroll.current = true;
    const nextDate = addDays(normalizedDate, 1);
    if (isDateSelectable(nextDate)) {
      setSelectedDate(nextDate);
    }

    setTimeout(() => {
      isManualScroll.current = false;
    }, 200);
  }, [normalizedDate, setSelectedDate]);

  const handleToday = useCallback(() => {
    if (!setSelectedDate) return;

    isManualScroll.current = true;
    if (!isSameDay(today, normalizedDate)) {
      setSelectedDate(today);
    }

    setTimeout(() => {
      isManualScroll.current = false;
    }, 200);
  }, [normalizedDate, setSelectedDate, today]);

  // Initial scroll on mount - শুধু একবার
  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const itemWidth = 72;

      const scrollPosition =
        CENTER_INDEX * itemWidth - containerWidth / 2 + itemWidth / 2;

      container.scrollLeft = scrollPosition;
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="bg-white hidden rounded-lg lg:rounded-2xl border shadow-sm px-4 py-4 grid grid-cols-2 lg:flex flex-col  lg:flex-row gap-4 items-center justify-center lg:justify-between">
        {/* Month */}
        <h2 className="text-[17px] lg:text-lg font-semibold text-gray-800 whitespace-nowrap col-span-1 order-1">
          {format(normalizedDate, "MMMM yyyy")}
        </h2>

        {/* Dates - Scrollbar hidden */}
        <div className="relative flex-1 max-w-2xl mx-auto col-span-2 order-3 lg:order-2 ">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide px-1 p-2 cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "smooth" }}
          >
            {days.map((date) => {
              const isActive = isSameDay(date, normalizedDate);
              const isToday = isSameDay(date, today);
              const isSelectable = isDateSelectable(date);
              const isFuture = isFutureDate(date);

              return (
                <motion.button
                  key={date.toISOString()}
                  whileTap={isSelectable ? { scale: 0.95 } : {}}
                  onClick={() => handleDateClick(date)}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className={`flex-shrink-0 w-6 sm:w-8 md:w-10 h-16 md:h-18 rounded-2xl flex flex-col items-center justify-center text-sm transition-all duration-300 relative
                  ${
                    isActive
                      ? "bg-gradient-to-tl from-violet-800 to-[#5777F6] text-white shadow-lg"
                      : !isSelectable
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                  } ${isToday && !isActive ? "border border-purple-300" : ""}`}
                  disabled={!isSelectable}
                  title={!isSelectable ? "Future dates cannot be selected" : ""}
                >
                  <span
                    className={`font-medium text-[14px] ${
                      isActive ? "font-semibold" : ""
                    } ${!isSelectable ? "opacity-50" : ""}`}
                  >
                    {format(date, "dd")}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isActive ? "opacity-90" : "opacity-70"
                    } ${!isSelectable ? "opacity-50" : ""}`}
                  >
                    {format(date, "EE")}
                  </span>
                  {isToday && !isActive && (
                    <div className="absolute bottom-2 w-1 h-1 rounded-full bg-purple-500" />
                  )}
                  {isFuture && (
                    <div className="absolute top-1 right-1 w-2 h-2">
                      <svg
                        className="w-full h-full text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 justify-end col-span-1 order-2 lg:order-3">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleToday}
            className="px-4 py-2 text-[17px] rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
          >
            Today
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            disabled={!isDateSelectable(addDays(normalizedDate, 1))}
            title={
              !isDateSelectable(addDays(normalizedDate, 1))
                ? "Cannot select future dates"
                : ""
            }
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Controller */}
      <div className=" flex lg:hidden flex-col items-center justify-center bg-white  space-y-4 py-1 rounded-xl border border-gray-100">
        {/* Month */}
        <div className=" flex flex-row items-center justify-between w-full border-b p-2">
          <h2 className="text-[17px] lg:text-lg font-semibold text-gray-800 whitespace-nowrap col-span-1 order-1">
            {format(normalizedDate, "MMMM yyyy")}
          </h2>
          {/* Controls */}
          <div className="flex items-center gap-2 justify-end col-span-1 order-2 lg:order-3">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleToday}
              className="px-4 py-2 text-[17px] rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              Today
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              disabled={!isDateSelectable(addDays(normalizedDate, 1))}
              title={
                !isDateSelectable(addDays(normalizedDate, 1))
                  ? "Cannot select future dates"
                  : ""
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        {/* Dates - Scrollbar hidden */}
        <div className="relative flex-1 max-w-2xl mx-auto col-span-2 order-3 lg:order-2 ">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide px-1 p-2 cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "smooth" }}
          >
            {days.map((date) => {
              const isActive = isSameDay(date, normalizedDate);
              const isToday = isSameDay(date, today);
              const isSelectable = isDateSelectable(date);
              const isFuture = isFutureDate(date);

              return (
                <motion.button
                  key={date.toISOString()}
                  whileTap={isSelectable ? { scale: 0.95 } : {}}
                  onClick={() => handleDateClick(date)}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className={`flex-shrink-0 w-8 sm:w-8 md:w-10 h-14 md:h-18 rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-300 relative
                  ${
                    isActive
                      ? "bg-gradient-to-tl from-violet-800 to-[#5777F6] text-white shadow-lg"
                      : !isSelectable
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                  } ${isToday && !isActive ? "border border-purple-300" : ""}`}
                  disabled={!isSelectable}
                  title={!isSelectable ? "Future dates cannot be selected" : ""}
                >
                  <span
                    className={`font-medium text-[14px] ${
                      isActive ? "font-semibold" : ""
                    } ${!isSelectable ? "opacity-50" : ""}`}
                  >
                    {format(date, "dd")}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isActive ? "opacity-90" : "opacity-70"
                    } ${!isSelectable ? "opacity-50" : ""}`}
                  >
                    {format(date, "EE")}
                  </span>
                  {isToday && !isActive && (
                    <div className="absolute bottom-2 w-1 h-1 rounded-full bg-purple-500" />
                  )}
                  {isFuture && (
                    <div className="absolute top-1 right-1 w-2 h-2">
                      <svg
                        className="w-full h-full text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for new Date
const newDate = () => new Date();

export default CalendarHeader;
