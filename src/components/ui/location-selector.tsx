import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CenterProps, SchoolProps } from "@/types/types";
import { centers } from "@/data/center-data";
import { schools } from "@/data/school-data";

// Import JSON data directly

interface LocationSelectorProps {
  disabled?: boolean;
  onCenterChange?: (center: CenterProps | null) => void;
  onSchoolChange?: (school: SchoolProps | null) => void;
  isFormResat?: boolean;
  valueCenter?: { center: string; center_code: string };
  valueSchool?: { school_name: string; school_code: string };
}

const LocationSelector = ({
  disabled,
  onCenterChange,
  onSchoolChange,
  isFormResat,
  valueCenter,
  valueSchool,
}: LocationSelectorProps) => {
  const [selectedCenter, setSelectedCenter] = useState<CenterProps | null>(
    null,
  );
  const [selectedSchool, setSelectedSchool] = useState<SchoolProps | null>(
    null,
  );
  const [openCenterDropdown, setOpenCenterDropdown] = useState(false);
  const [openSchoolDropdown, setOpenSchoolDropdown] = useState(false);

  // Cast imported JSON data to their respective types
  const centersData = centers as CenterProps[];
  const schoolData = schools as SchoolProps[];

  // Filter states for selected Center
  const availableSchools = schoolData.filter(
    (school) => school.center_id === selectedCenter?.id,
  );
  useEffect(() => {
    setSelectedCenter(null);
    setSelectedSchool(null);
  }, [isFormResat]);
  useEffect(() => {
    if (valueCenter) {
      const center = centersData.find(
        (c) => c.code === valueCenter.center_code,
      );
      setSelectedCenter(center || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueCenter]);

  useEffect(() => {
    if (valueSchool) {
      const school = schoolData.find(
        (s) => s.school_code === valueSchool.school_code,
      );
      setSelectedSchool(school || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSchool]);

  // Function to handle Center selection
  const handleCenterSelect = (center: CenterProps | null) => {
    setSelectedCenter(center);
    setSelectedSchool(null); // Reset School when Center changes
    onCenterChange?.(center);
    onSchoolChange?.(null);
  };

  const handleSchoolSelect = (school: SchoolProps | null) => {
    setSelectedSchool(school);
    onSchoolChange?.(school);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Center Selector */}
      <Popover open={openCenterDropdown} onOpenChange={setOpenCenterDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCenterDropdown}
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedCenter ? (
              <div className="flex items-center gap-2">
                <span>{selectedCenter.emoji}</span>
                <span className="whitespace-pre-line">
                  {selectedCenter.name}
                </span>
              </div>
            ) : (
              <span>Select Center...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="p-0"
        >
          <Command>
            <CommandInput placeholder="Search Center..." />
            <CommandList>
              <CommandEmpty>No Center found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[300px]">
                  {centersData.map((center) => (
                    <CommandItem
                      key={center.id}
                      value={center.name}
                      onSelect={() => {
                        handleCenterSelect(center);
                        setOpenCenterDropdown(false);
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span>{center.emoji}</span>
                        <span>{center.name}</span>
                      </div>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          selectedCenter?.id === center.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* School Selector - Only shown if selected Center has Schools */}
      {availableSchools.length > 0 && (
        <Popover open={openSchoolDropdown} onOpenChange={setOpenSchoolDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSchoolDropdown}
              disabled={!selectedCenter}
              className="w-full justify-between"
            >
              {selectedSchool ? (
                <span className="whitespace-pre-line">
                  {selectedSchool.name}
                </span>
              ) : (
                <span>Select School...</span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
            className="p-0"
          >
            <Command>
              <CommandInput placeholder="Search School..." />
              <CommandList>
                <CommandEmpty>No School found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[300px]">
                    {availableSchools.map((school) => (
                      <CommandItem
                        key={school.id}
                        value={school.name}
                        onSelect={() => {
                          handleSchoolSelect(school);
                          setOpenSchoolDropdown(false);
                        }}
                        className="flex cursor-pointer items-center justify-between text-sm"
                      >
                        <span>{school.name}</span>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedSchool?.id === school.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default LocationSelector;
