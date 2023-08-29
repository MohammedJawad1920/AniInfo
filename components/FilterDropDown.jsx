"use client";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function FilterDropDown({
  title,
  filterItems,
  setVariable,
  variable,
  isOpen,
  toggleDropdown,
}) {
  const [dropdownTitle, setDropdownTitle] = useState("");
  return (
    <div className="relative">
      <h2>{title}</h2>
      <div
        onClick={toggleDropdown}
        className="dropdown-btn"
      >
        <div
          className={`${
            variable ? "text-amber-300" : "text-white"
          } text-xs md:text-sm`}
        >
          {dropdownTitle && variable ? dropdownTitle : "Any"}
        </div>
        {variable ? (
          <XMarkIcon
            onClick={() => {
              setVariable(undefined);
            }}
            className="w-4 h-4"
          />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 max-h-36 overflow-auto bg-prussianBlueAccent rounded-md shadow-lg z-10 text-xs customScroll">
          {filterItems.map((item, index) => {
            const editedTitle = item?.title
              ? item.title.replace("_", " ")
              : null;
            return (
              <h3
                key={index}
                className="block px-4 py-2 text-white hover:bg-slate-500 hover:text-white"
                onClick={() => {
                  setVariable(item.query ? item.query : item);
                  setDropdownTitle(item.title ? editedTitle : item);
                  toggleDropdown();
                }}
              >
                {item.title ? editedTitle : item}
              </h3>
            );
          })}
        </div>
      )}
    </div>
  );
}
