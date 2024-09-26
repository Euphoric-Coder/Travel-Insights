'use client';
import React, { useState, useEffect } from 'react';
import { useCollection } from '@squidcloud/react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { Trip } from '../types';
import { cn } from '@/lib/utils'; // Helper function to conditionally join classNames
import { format } from 'date-fns';

const AddTrip: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [startDatePickerOpen, setStartDatePickerOpen] =
    useState<boolean>(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState<boolean>(false);

  const tripsCollection = useCollection<Trip>('trips');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        const countryNames = data.map((country: any) => ({
          value: country.name.common.toLowerCase(),
          label: country.name.common,
        }));
        setCountries(countryNames);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTrip = () => {
    const tripId = crypto.randomUUID();
    tripsCollection.doc(tripId).insert({
      id: tripId,
      country,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      notes: [],
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mb-7">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add Trip
      </h3>
      <div className="space-y-4">
        {/* Combobox for selecting a country */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {country
                ? countries.find((item) => item.value === country)?.label
                : 'Select Country...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setCountry(
                          currentValue === country ? '' : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          country === item.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Date picker for start date */}
        <Popover
          open={startDatePickerOpen}
          onOpenChange={setStartDatePickerOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !startDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, 'PPP')
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date);
                setStartDatePickerOpen(false); // Close after selecting a date
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Date picker for end date */}
        <Popover open={endDatePickerOpen} onOpenChange={setEndDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !endDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                setEndDate(date);
                setEndDatePickerOpen(false); // Close after selecting a date
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Button to add the trip */}
        <Button
          onClick={addTrip}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Add Trip
        </Button>
      </div>
    </div>
  );
};

export default AddTrip;
