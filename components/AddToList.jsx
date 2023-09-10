"use client";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useWatchlist } from "../context/watchListContext";
import { useAuthPage } from "../context/authContext";

const AddToList = ({ anime }) => {
  const { addToWatchlist, removeFromWatchlist, isAuthenticated, watchlist } =
    useWatchlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { setLoginPage } = useAuthPage();

  const watchListAnime = {
    id: anime?.id,
    title: anime?.title?.english || anime?.title?.romaji,
    image: anime?.coverImage?.extraLarge,
  };

  useEffect(() => {
    setIsAdded(
      isAuthenticated &&
        Object.values(watchlist).some((category) =>
          category.some((item) => item.id === watchListAnime.id)
        )
    );
  }, [watchlist, watchListAnime.id, isAuthenticated]);

  const handleAddToCategory = (category) => {
    if (isAuthenticated) {
      addToWatchlist(watchListAnime, category);

      setIsAdded(true);
      setIsOpen(false);
    }
  };

  const handleRemoveFromCategory = () => {
    if (isAuthenticated) {
      Object.keys(watchlist).forEach((category) => {
        if (watchlist[category].some((item) => item.id === watchListAnime.id)) {
          removeFromWatchlist(watchListAnime, category);
        }
      });
      setIsAdded(false);
    }
  };

  return (
    <div className="relative">
      {isAdded ? (
        <button
          onClick={handleRemoveFromCategory}
          className="max-w-[180px] px-2 py-1 bg-white text-black text-xs md:text-sm font-bold rounded-md"
        >
          <XMarkIcon className="w-4 inline" />{" "}
          <p className="inline">Remove From List</p>
        </button>
      ) : (
        <button
          onClick={() => {
            if (!isAuthenticated) {
              setLoginPage(true);
            }
            setIsOpen(!isOpen);
          }}
          className="max-w-[180px] px-2 py-1 bg-white text-black text-xs md:text-sm font-bold rounded-md"
        >
          <PlusIcon className="w-4 inline" />{" "}
          <p className="inline">Add To List</p>
        </button>
      )}
      {isOpen && isAuthenticated && (
        <ul className="absolute  -right-4 mt-2 py-2  overflow-auto bg-gray-300 rounded-md shadow-lg z-10 text-xs">
          <li>
            <button
              className="listItems "
              onClick={() => {
                handleAddToCategory("current");
              }}
            >
              Current
            </button>
          </li>
          <li>
            <button
              className="listItems "
              onClick={() => {
                handleAddToCategory("planning");
              }}
            >
              Planning
            </button>
          </li>
          <li>
            <button
              className="listItems "
              onClick={() => {
                handleAddToCategory("completed");
              }}
            >
              Completed
            </button>
          </li>
          <li>
            <button
              className="listItems "
              onClick={() => {
                handleAddToCategory("dropped");
              }}
            >
              Dropped
            </button>
          </li>
          <li>
            <button
              className="listItems "
              onClick={() => {
                handleAddToCategory("paused");
              }}
            >
              Paused
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AddToList;
