'use client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import React, { useState, useEffect } from 'react';
import { useCollection } from '@squidcloud/react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { Trip } from '../types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const [error, setError] = useState<boolean>(false);

  const tripsCollection = useCollection<Trip>('trips');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.ok && response.json())
      .then((data) => {
        const countryNames = data.map((country: any) => ({
          value: country.name.common.toLowerCase(),
          label: country.name.common,
        }));
        setCountries(countryNames);
      })
      .catch((error) => console.error(error));
  }, []);

  const validateForm = () => {
    if (!country || !startDate || !endDate) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return false;
    }
    setError(false);
    return true;
  };

  const addTrip = () => {
    if (!validateForm()) return;
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
    <div className="max-w-8xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-xl mb-7 border border-gray-300 transition duration-500 hover:scale-95">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Plan Your Next Trip
      </h3>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please fill out all the required fields.
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-6">
        {/* Combobox for selecting a country */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-gray-100 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition duration-300"
            >
              {country
                ? countries.find((item) => item.value === country)?.label
                : 'Select Country...'}
              <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 text-gray-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white shadow-2xl rounded-lg">
            <Command>
              <CommandInput
                placeholder="Search country..."
                className="px-4 py-3 border-b"
              />
              <CommandList className="max-h-60 overflow-y-auto px-2 py-2">
                {countries.length === 0 && (
                  <CommandEmpty>No country found.</CommandEmpty>
                )}
                <CommandGroup>
                  {countries.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      className="hover:bg-indigo-100 rounded-md px-2 py-1.5 transition duration-150"
                      onSelect={(currentValue) => {
                        setCountry(
                          currentValue === country ? '' : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-5 w-5 text-indigo-500',
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

        {/* Date pickers */}
        <Popover
          open={startDatePickerOpen}
          onOpenChange={setStartDatePickerOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition-transform duration-300"
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
              {startDate ? (
                format(startDate, 'PPP')
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-2xl rounded-lg">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => setStartDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover open={endDatePickerOpen} onOpenChange={setEndDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition-transform duration-300"
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
              {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-2xl rounded-lg">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => setEndDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={addTrip}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg transition-transform duration-300 hover:shadow-2xl hover:scale-100 active:scale-95 focus:ring-4 focus:ring-indigo-300"
        >
          Add Trip
        </Button>
      </div>
    </div>
  );
};

export default AddTrip;
