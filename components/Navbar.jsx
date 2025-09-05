"use client"
import React from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {

  const { isSeller, router } = useAppContext();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg border border-gray-200",
                  userButtonPopoverActionButton: "hover:bg-gray-50",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
            <span className="text-sm text-gray-700">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </Link>
        )}
        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image className="w-4 h-4" src={assets.cart_icon} alt="cart icon" />
        </Link>
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-6 h-6",
                  userButtonPopoverCard: "shadow-lg border border-gray-200",
                  userButtonPopoverActionButton: "hover:bg-gray-50",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
            <span className="text-xs text-gray-700">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </Link>
        )}
        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image className="w-4 h-4" src={assets.cart_icon} alt="cart icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;