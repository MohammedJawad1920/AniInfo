"use client"

import { useState } from "react";
import {ChevronDownIcon} from "@heroicons/react/24/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')  
}

export default function FilterDropDown({title, filterItems, greater, setGreater, lesser, setLesser}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
     setIsOpen(!isOpen);
    };
  return (
    <div className="relative">
        <h2>{title}</h2>
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-between gap-3 px-2 py-2 md:w-36 bg-slate-700 text-white text-sm rounded-md shadow-md focus:outline-none mt-2"
        >
            <div>
            { lesser ? `${greater} - ${lesser}` : greater ? `${greater} - more` : "Any"}
            </div>
             <ChevronDownIcon className="w-4 h-4"/>
        </div>
        {isOpen && (
        <div className="absolute  mt-2 py-2 max-h-64 overflow-auto bg-slate-700 rounded-md shadow-lg z-10 text-xs filterScroll">
         {filterItems.map((item, index) => {
            return (
            <h3 
                key={index}
                className="block px-4 py-2 text-white hover:bg-slate-500 hover:text-white whitespace-nowrap"
                onClick={() => {
                 setGreater(item.greater)
                 setLesser(item.lesser)
                 setIsOpen(false)
                }}    
            >
                 {item.lesser ? `${item.greater} - ${item.lesser}` : `Greater than ${item.greater}`}
            </h3    >
            )
         })}
            
         </div>
    )}
  </div>
  )
}
