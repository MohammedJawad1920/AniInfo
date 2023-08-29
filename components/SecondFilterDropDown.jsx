import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function SecondFilterDropDown({
  title,
  filterItems,
  greater,
  setGreater,
  lesser,
  setLesser,
  isOpen,
  toggleDropdown,
}) {
  return (
    <div className="relative">
      <h2>{title}</h2>
      <div
        onClick={toggleDropdown}
        className="dropdown-btn"
      >
        <div
          className={`text-xs md:text-sm ${
            lesser || greater ? "text-amber-300" : "text-white"
          }`}
        >
          {lesser
            ? `${greater} - ${lesser}`
            : greater
            ? `More than ${greater}`
            : "Any"}
        </div>
        {lesser || greater ? (
          <XMarkIcon
            className="w-4 h-4"
            onClick={() => {
              setGreater(undefined);
              setLesser(undefined);
            }}
          />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 max-h-64 overflow-auto bg-prussianBlueAccent rounded-md shadow-lg z-10 text-xs customScroll">
          {filterItems.map((item, index) => (
            <h3
              key={index}
              className="block px-4 py-2 text-white hover:bg-slate-500 hover:text-white whitespace-nowrap"
              onClick={() => {
                setGreater(item.greater);
                setLesser(item.lesser);
                toggleDropdown();
              }}
            >
              {item.lesser
                ? `${item.greater} - ${item.lesser}`
                : `More than ${item.greater}`}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
}
