// components/ui/SearchInput.jsx

import React from "react";
import { Input } from "@/components/ui/input";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search by name...",
}) => {
  return (
    <div className="w-full mb-4">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchInput;
