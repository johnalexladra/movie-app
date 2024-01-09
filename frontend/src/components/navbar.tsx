"use client";

import {
  PiHouse,
  PiHouseFill,
  PiFilmStrip,
  PiFilmStripFill,
  PiTelevision,
  PiTelevisionFill,
  PiMagnifyingGlass,
  PiMagnifyingGlassFill,
  PiSignIn,
  PiSignOut,
} from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setIsUserLoggedIn(session ? true : false);
  }, [session]);

  const LINKS = [
    {
      name: isUserLoggedIn ? "Dashboard" : "Home",
      href: isUserLoggedIn ? "/dashboard" : "/",
      icon: isUserLoggedIn ? <PiHouseFill className="w-6 h-6" /> : <PiHouse className="w-6 h-6" />,
      iconActive: isUserLoggedIn ? <PiHouseFill className="w-6 h-6 text-blue-500" /> : <PiHouse className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Movies",
      href: "/movie",
      icon: <PiFilmStrip className="w-6 h-6" />,
      iconActive: <PiFilmStripFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "TV Shows",
      href: "/tv",
      icon: <PiTelevision className="w-6 h-6" />,
      iconActive: <PiTelevisionFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Search",
      href: "/search",
      icon: <PiMagnifyingGlass className="w-6 h-6" />,
      iconActive: <PiMagnifyingGlassFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: isUserLoggedIn ? "Sign Out" : "Sign In",
      href: isUserLoggedIn ? "/api/auth/signout" : "/signin",
      icon: isUserLoggedIn ? <PiSignOut className="w-6 h-6" /> : <PiSignIn className="w-6 h-6"/>,
      iconActive: isUserLoggedIn ? <PiSignOut className="w-6 h-6 text-blue-500" /> : <PiSignIn className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <nav className="flex items-center justify-evenly h-full lg:flex-col lg:justify-start sm:flex-row lg:items-start">
      {LINKS.map((link, index) => (
        <Link
          key={link.name}
          href={link.href}
          className={`h-full w-full inline-flex items-center justify-center lg:h-24 ${index === LINKS.length - 1 ? 'lg:absolute lg:bottom-6' : ''}`}
        >
          <span className="sr-only">{link.name}</span>
          {pathname === link.href ? link.iconActive : link.icon}
        </Link>
      ))}
    </nav>
  )
}
