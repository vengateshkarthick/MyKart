import React from 'react';
import { ICalendar } from './type';

function CalendarPicker ({ onSelect, date, label }: ICalendar) {
    const handleChange = (selectedDate:string) => {
     const date = new Date(selectedDate).toISOString().slice(0, 10);
     onSelect(date);
    }
    return (
      <div className="w-auto h-auto flex flex-col gap-2 justify-center items-start">
        <div className="first-letter:uppercase text-sm font-[500]">{label}</div>
        <input
          type="date"
          id="date-calendar"
          className="p-2 font-[Poppins] border text-xs rounded border-neutral-300 cursor-pointer focus:border-2 focus:border-blue-700 focus-within:border-2 focus-within:border-blue-700"
          onChange={e => handleChange(e.target.value)}
          value={date}
        />
      </div>
    )
}

export default CalendarPicker;