"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

type SearchControlsProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  ageFilter: string;
  setAgeFilter: (age: string) => void;
  ageRanges: string[];
};

export function SearchControls({ searchTerm, setSearchTerm, ageFilter, setAgeFilter, ageRanges }: SearchControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by location, description, clothing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={ageFilter} onValueChange={setAgeFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by age range" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="">All Ages</SelectItem>
          {ageRanges.map((age) => (
            <SelectItem key={age} value={age}>{age}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
