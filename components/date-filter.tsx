"use client";

import { Calendar } from "@/components/ui/calendar";
import { PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon, ArrowRightLeft } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const DateFilter = () => {
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  return (
    <div className="flex gap-x-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              dateFilter.startDate && "text-muted-foreground"
            )}
          >
            {dateFilter.startDate ? (
              format(dateFilter.startDate, "PPP")
            ) : (
              <span>From date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFilter.startDate!}
            onSelect={(date) =>
              setDateFilter({ ...dateFilter, startDate: date })
            }
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <ArrowRightLeft />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              dateFilter.startDate && "text-muted-foreground"
            )}
          >
            {dateFilter.endDate ? (
              format(dateFilter.endDate, "PPP")
            ) : (
              <span>To date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFilter.endDate!}
            onSelect={(date) => setDateFilter({ ...dateFilter, endDate: date })}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button>Filter Date</Button>
    </div>
  );
};

export default DateFilter;
