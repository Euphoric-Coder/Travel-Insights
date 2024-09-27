'use client';
import React, { useState, useEffect } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
  const [error, setError] = useState<boolean>(false); // State to handle error visibility

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

  const validateForm = () => {
    if (!country || !startDate || !endDate) {
      setError(true); // Show error alert
      setTimeout(() => {
        setError(false); // Automatically hide error after 3 seconds
      }, 3000);
      return false;
    }
    setError(false); // Hide error alert if fields are valid
    return true;
  };

  const addTrip = () => {
    if (!validateForm()) return; // Stop submission if validation fails

    const tripId = crypto.randomUUID();
    tripsCollection.doc(tripId).insert({
      id: tripId,
      country,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : null,
      notes: [],
    });

    // Reset form after adding the trip
    setCountry('');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="max-w-8xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-xl mb-7 border border-gray-300 transform transition duration-500 hover:scale-95">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Plan Your Next Trip
      </h3>

      {/* Error Alert */}
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
              className="w-full justify-between bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition-transform duration-300 ease-in-out"
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
                <CommandEmpty className="px-4 py-2 text-sm text-gray-500">
                  No country found.
                </CommandEmpty>
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

        {/* Date picker for start date */}
        <Popover
          open={startDatePickerOpen}
          onOpenChange={setStartDatePickerOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition-transform duration-300 ease-in-out',
                !startDate && 'text-gray-500',
              )}
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
                'w-full justify-start text-left font-normal bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 hover:shadow-xl transition-transform duration-300 ease-in-out',
                !endDate && 'text-gray-500',
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
              {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-2xl rounded-lg">
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
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-100 hover:shadow-2xl active:scale-95 active:bg-gradient-to-r active:from-indigo-700 active:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Add Trip
        </Button>
      </div>
    </div>
  );
};

export default AddTrip;
