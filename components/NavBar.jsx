"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Profile from "./Profile";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useSearchContext } from "../context/searchContext";
import { url } from "../constants/page";
import { ANIMES_SEARCH_QUERY } from "../app/api/apiQuery/page";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useAuthPage } from "../context/authContext";

const NavBar = () => {
  const router = useRouter();
  const { setSearch } = useSearchContext();
  const { loginPage, setLoginPage, registerPage, setRegisterPage } =
    useAuthPage();

  const [isNavBar, setIsNavBar] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const user = useAuth();

  const handleNavBar = () => {
    setIsNavBar(!isNavBar);
  };

  const handleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const response = await axios.post(url, {
          query: ANIMES_SEARCH_QUERY,
          variables: {
            search: searchQuery,
          },
        });
        const responseData = response.data.data.Page;
        setSearchResult(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime data :", error);
        setSearchResult([]);
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <header className="fixed z-50 top-0 right-0 left-0 flex flex-col items-center justify-between shadow-lg  bg-prussianBlueMediumDark w-full h-12 md:h-16  px-3 gap-3">
      <nav className="container lg:relative mx-auto flex  justify-between items-center h-full">
        {/* Left */}
        <div className="flex space-x-3">
          {/* Menu-Icon */}
          <div>
            <Bars3Icon
              className={`${
                isNavBar
                  ? " opacity-0"
                  : "h-6 md:h-8  text-white cursor-pointer"
              } lg:hidden`}
              onClick={handleNavBar}
            />
          </div>

          {/*Logo  */}
          <div
            className={
              isNavBar ? "lg:opacity-100 opacity-0 " : "flex items-center"
            }
          >
            <h2 className=" text-white font-bold text-xl md:text-2xl cursor-pointer">
              Ani<span className=" text-amber-400">info</span>
            </h2>
          </div>
        </div>

        {/* middle */}

        {/* search bar */}
        <div className="hidden md:flex lg:hidden items-center justify-around bg-white h-10 w-[24rem] rounded">
          <form
            className="w-[70%]"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/filter");
              setSearch(searchQuery);
              setIsSearchBarOpen(false);
            }}
          >
            <input
              type="text"
              placeholder="Search Anime"
              className="w-full ml-2 font-bold  outline-none"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
            />
          </form>
          <div>
            <MagnifyingGlassIcon
              className=" h-5 w-5 md:h-7 md:w-7 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                router.push("/filter");
                setSearch(searchQuery);
                setIsSearchBarOpen(false);
              }}
            />
          </div>
          <div
            className=" flex items-center bg-amber-400 text-sm text-black font-bold p-1.5 justify-center rounded"
            onClick={() => setIsSearchBarOpen(false)}
          >
            <Link
              href={"/filter"}
              className="w-full h-full"
            >
              Filter
            </Link>
          </div>
        </div>

        {/* NavContent */}
        <div className="lg:flex items-center h-full hidden">
          <ul className="flex space-x-8 items-center h-full">
            <li className="links">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="links">
              <Link href={"/anime/trending"}>Trending</Link>
            </li>
            <li className="links">
              <Link href={"/anime/top-airing"}>Top Airing</Link>
            </li>
            <li className="links">
              <Link href={"/anime/most-popular"}>Most Popular</Link>
            </li>
            <li className="links">
              <Link href={"/anime/top-ranking"}>Top Ranking</Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className=" flex items-center justify-between space-x-1 h-10">
          <div>
            <MagnifyingGlassIcon
              className="block md:hidden lg:block h-6 md:h-7 text-amber-400 cursor-pointer md:mr-5"
              onClick={handleSearchBar}
            />
          </div>
          <div>
            {!user ? (
              <div className="hidden xs:flex text-sm md:text-[1.1rem] space-x-1">
                <div
                  className=" py-1 px-2 font-bold rounded text-white cursor-pointer"
                  onClick={() => setLoginPage(!loginPage)}
                >
                  Login
                </div>
                <div
                  className="bg-amber-400 py-1 px-2 font-bold rounded hover:bg-amber-300 cursor-pointer"
                  onClick={() => setRegisterPage(true)}
                >
                  Register
                </div>
              </div>
            ) : (
              <Profile
                user={user}
                Lo
              />
            )}
          </div>
        </div>

        {/* Login page */}
        {loginPage && (
          <LoginPage
            setLoginPage={setLoginPage}
            setRegisterPage={setRegisterPage}
            XMarkIcon={XMarkIcon}
          />
        )}
        {/* Register page */}
        {registerPage && (
          <RegisterPage
            setLoginPage={setLoginPage}
            setRegisterPage={setRegisterPage}
            XMarkIcon={XMarkIcon}
          />
        )}

        {/* mobile-navbar */}
        <div
          className={
            isNavBar
              ? " bg-gray-500 bg-opacity-10 backdrop-blur-sm  absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white lg:hidden"
              : "hidden"
          }
          onClick={handleNavBar}
        ></div>
        <div
          className={`absolute top-0 left-0 bottom-0 w-60 xs:w-72 bg-gray-500 bg-opacity-30 h-[100vh] px-3 pt-3 md:pt-4 transition-all duration-500 lg:hidden ${
            isNavBar ? " translate-x-0" : " translate-x-[-100%]"
          }`}
        >
          <div className="flex justify-start gap-5">
            <XMarkIcon
              className="text-white h-6 md:h-8"
              onClick={handleNavBar}
            />
            <div className="flex items-center justify-start w-3/5">
              <h2 className=" text-white font-bold text-xl  cursor-pointer">
                Ani<span className=" text-amber-400">info</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center text-sm md:text-base w-full">
            <ul className="flex flex-col gap-5 mt-8 w-full items-center">
              <li
                onClick={() => {
                  setLoginPage(true);
                  setIsNavBar(false);
                }}
                className="transition-all ease-out  text-slate-900 font-extrabold w-4/5 text-center py-1 rounded hover:scale-110 bg-amber-400"
              >
                <Link href={"#"}>Login</Link>
              </li>
              <li
                onClick={() => {
                  setRegisterPage(true);
                  setIsNavBar(false);
                }}
                className="transition-all ease-out  text-slate-900 font-extrabold w-4/5 text-center py-1 rounded hover:scale-110 bg-amber-400"
              >
                <Link href={"#"}>Register</Link>
              </li>
              <li
                onClick={() => setIsNavBar(false)}
                className="mobile-links"
              >
                <Link href={"/"}>Home</Link>
              </li>
              <li
                onClick={() => setIsNavBar(false)}
                className="mobile-links"
              >
                <Link href={"/anime/trending"}>Trending</Link>
              </li>
              <li
                onClick={() => setIsNavBar(false)}
                className="mobile-links"
              >
                <Link href={"/anime/top-airing"}>Top Airing</Link>
              </li>
              <li
                onClick={() => setIsNavBar(false)}
                className="mobile-links"
              >
                <Link href={"/anime/most-popular"}>Most Popular</Link>
              </li>
              <li
                onClick={() => setIsNavBar(false)}
                className="mobile-links"
              >
                <Link href={"/anime/top-ranking"}>Top Ranking</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* search bar */}
        <div
          className={`${
            !isSearchBarOpen
              ? "hidden"
              : "md:hidden lg:block absolute top-[100%] space-y-3  p-3 left-0 right-0  -z-10"
          }`}
        >
          <div className=" flex justify-end h-8 lg:h-10 md:hidden lg:flex gap-2 w-full">
            <div className="flex justify-center items-center bg-white h-full px-2  rounded-lg ">
              <Link href={"/filter"}>
                <FunnelIcon
                  className="text-slate-700 mx-auto h-full w-4 md:w-5 "
                  title="Filter"
                  onClick={() => setIsSearchBarOpen(false)}
                />
              </Link>
            </div>
            <form
              className="flex items-center bg-transparent h-full w-[80%] md:w-[500px] rounded-lg "
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/filter");
                setSearch(searchQuery);
                setIsSearchBarOpen(false);
              }}
            >
              <input
                type="text"
                placeholder="Search Anime"
                className="w-full h-full rounded-lg text-xs lg:text-base  font-bold p-3 lg:p-3 outline-none"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                value={searchQuery}
              />
            </form>
            <div className="bg-amber-300 px-2   rounded-lg  w-[10%">
              <MagnifyingGlassIcon
                className=" h-full w-4 md:w-5 cursor-pointer "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/filter");
                  setSearch(searchQuery);
                  setIsSearchBarOpen(false);
                }}
              />
            </div>
          </div>
          {/* searchResult */}
          <div className=" flex flex-col md:items-center lg:items-end top-[100px]  ">
            {searchResult?.media?.map((anime, index) => {
              return (
                <Link
                  key={index}
                  href={`/anime/${anime?.id}`}
                  className="relative w-[100%] md:w-[384px] lg:w-[600px]"
                  onClick={() => setIsSearchBarOpen(false)}
                >
                  <div className="absolute inset-0 bg-prussianBlueDarkest opacity-90" />
                  <div className="flex gap-3  border-b border-white p-3">
                    <div className=" h-[50px]   min-w-fit w-[40px] z-10">
                      <Image
                        src={anime?.coverImage?.extraLarge}
                        alt="Anime Image"
                        width={150}
                        height={250}
                        objectFit="cover"
                        className="w-auto h-full rounded  overflow-hidden"
                      />
                    </div>
                    <div className="flex flex-col text-white gap-y-1 z-10 ">
                      <h3 className=" text-xs   md:text-sm lg:text-base font-bold line-clamp-1">
                        {anime?.title?.english || anime?.title?.romaji}
                      </h3>

                      <div className="flex items-center gap-1  text-[10px] md:text-xs lg:text-sm">
                        {anime?.episodes && anime?.format !== "MOVIE" && (
                          <div className="flex items-center gap-1">
                            <div className="bg-blue-800  px-1 py-0.5 text-[10px] rounded">
                              {`EP ${anime?.episodes}`}
                            </div>
                            <div className="dot" />
                          </div>
                        )}

                        <div>{anime?.format}</div>
                        {anime?.duration && (
                          <>
                            <div className="dot" />
                            <div>{anime?.duration}m</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* searchResult on md screen */}
        <div
          className={`${
            !searchQuery
              ? "hidden"
              : "hidden md:block lg:hidden absolute top-[210%] md:top-[110%] lg:top-[210%] space-y-3 p-3   left-0 right-0 md:right-10 lg:right-0  -z-10"
          } `}
        >
          <div className=" flex flex-col md:items-center lg:items-end top-[100px]  ">
            {searchResult?.media?.map((anime, index) => {
              return (
                <Link
                  key={index}
                  href={`/anime/${anime?.id}`}
                  className="relative w-[100%] md:w-[384px] lg:w-[600px]"
                  onClick={() => setIsSearchBarOpen(false)}
                >
                  <div className="absolute inset-0 bg-prussianBlueDarkest opacity-90" />
                  <div className="flex gap-3  border-b border-white p-3">
                    <div className=" h-[50px]   min-w-fit w-[40px] z-10">
                      <Image
                        src={anime?.coverImage?.extraLarge}
                        alt="Anime Image"
                        width={150}
                        height={250}
                        objectFit="cover"
                        className="w-auto h-full rounded  overflow-hidden"
                      />
                    </div>
                    <div className="flex flex-col text-white gap-y-1 z-10 ">
                      <h3 className=" text-xs   md:text-sm lg:text-base font-bold line-clamp-1">
                        {anime?.title?.english || anime?.title?.romaji}
                      </h3>

                      <div className="flex items-center gap-1  text-[10px] md:text-xs lg:text-sm">
                        {anime?.episodes ? (
                          <div className="flex items-center gap-1">
                            <div className="bg-blue-800  px-1 py-0.5 text-[10px] rounded">
                              {`EP ${anime?.episodes}`}
                            </div>
                            <div className="dot" />
                          </div>
                        ) : null}

                        <div>{anime?.format}</div>
                        {anime?.duration && (
                          <>
                            <div className="dot" />
                            <div>{anime?.duration}m</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
