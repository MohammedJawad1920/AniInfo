import { useState } from "react";
import { signOut } from "firebase/auth";
import { UserIcon, ArrowRightIcon, HeartIcon } from "@heroicons/react/24/solid";
import { auth } from "../config/firbaseConfig";
import Link from "next/link";

export default function Profile({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The user is now logged out.
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center rounded-full text-sm font-semibold p-1 text-black bg-amber-400"
        onClick={toggleDropdown}
      >
        <UserIcon className="w-5 md:w-6 " />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-5 w-60 md:w-72 lg:w-80 origin-top-right text-sm rounded-md bg-prussianBlueDarkest shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-4 px-6 space-y-2 text-white">
            <h3 className="text-amber-400">{user?.displayName}</h3>
            <p>{user?.email}</p>
            <Link
              href={"/anime/watchlist"}
              className="flex items-center bg-prussianBlueAccent p-1 text-xs rounded max-w-fit gap-1"
            >
              <p>Watch List</p>
              <div>
                <HeartIcon className="w-5 text-red-500" />
              </div>
            </Link>
            <div className="flex justify-end ">
              <div
                className="flex gap-1 bg-amber-400 cursor-pointer py-1 px-2 font-bold text-xs rounded text-black"
                onClick={handleLogout}
              >
                <p className="rounded ">Logout</p>
                <div className="grid place-content-center">
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
