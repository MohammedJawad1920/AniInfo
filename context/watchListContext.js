"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "../config/firbaseConfig";
import { useAuth } from "../hooks/useAuth";

const WatchlistContext = createContext();

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState({
    current: [],
    planning: [],
    completed: [],
    dropped: [],
    paused: [],
  });

  const user = useAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;

    const fetchWatchlist = async () => {
      const userWatchlistRef = doc(firestore, "watchlists", userId);

      try {
        const docSnap = await getDoc(userWatchlistRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWatchlist(data);
        }
      } catch (error) {
        console.error("Error fetching user watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [userId, watchlist]);

  const addToWatchlist = async (anime, category) => {
    if (!userId) return;

    // Ensure that watchlist[category] is an array or initialize it as an empty array
    const updatedCategory = Array.isArray(watchlist[category])
      ? watchlist[category]
      : [];

    // Update local state
    setWatchlist((prevWatchlist) => ({
      ...prevWatchlist,
      [category]: [...updatedCategory, anime],
    }));

    // Update Firestore document
    const userWatchlistRef = doc(firestore, "watchlists", userId);

    try {
      await setDoc(
        userWatchlistRef,
        {
          [category]: arrayUnion(anime),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user watchlist:", error);
    }
  };

  const removeFromWatchlist = async (anime, category) => {
    if (!userId) return;

    // Update Firestore document
    const userWatchlistRef = doc(firestore, "watchlists", userId);

    try {
      await setDoc(
        userWatchlistRef,
        {
          [category]: arrayRemove(anime), // Use arrayRemove to remove the anime from the Firestore array
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user watchlist:", error);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isAuthenticated,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
