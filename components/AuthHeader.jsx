import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '/images/logo1.png';
import Link from 'next/link';
import { FaTimes, FaBars } from 'react-icons/fa';

export const AuthHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    setIsUserSignedIn(!!token);
  }, []);

  return (
    <header className="py-4">
      <div className="app-container flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="SportsFusion Brand Logo" className="" />
        </Link>
        <button className="text-2xl md:hidden" onClick={() => setIsOpen(true)}>
          {' '}
          <FaBars />
        </button>
        {isUserSignedIn && (
          <nav className="hidden md:block">
            <ul className="flex gap-6 hover:[&>li_a]:text-app-sky">
            <li>
                <Link href='/freetip'>Freetip</Link>
              </li>
              <li>
                <Link href="/premiumtip">Premium</Link>
              </li>
              <li>
                <Link href="/series">series</Link>
              </li>
              <li>
                  <Link href='/addfreetip'>Add Freetip</Link>
                </li>
                <li>
                  <Link href='/addpremium'>Add Premiumtip</Link>
                </li>
                <li>
                  <Link href='/addseries'>Add series</Link>
                </li>
            </ul>
          </nav>
        )}
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 overflow-y-auto bg-[#00070d] z-10`}>
        <div className="app-container min-h-full flex flex-col">
          <header className="flex items-center justify-between py-5">
            <h2 className="text-app-orange text-2xl">Menu</h2>
            <button className="text-3xl" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </header>
          {isUserSignedIn && (
            <nav className="mb-8">
              <ul className="[&>li]:mb-4 hover:[&>li_a]:text-app-sky">
              <li>
                <Link href='/freetip'>Freetip</Link>
              </li>
                <li>
                  <Link href="/premiumtip">Premium</Link>
                </li>
                <li>
                  <Link href='/addfreetip'>Add Freetip</Link>
                </li>
                <li>
                  <Link href='/addpremium'>Add Premiumtip</Link>
                </li>
              </ul>
            </nav>
          )}
          <p className="mt-auto text-center mb-4">@SportsFusion</p>
        </div>
      </div>
    </header>
  );
};
