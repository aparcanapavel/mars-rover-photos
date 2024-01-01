'use client';
import React from "react";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'

export default function Header({ isMobile }: { isMobile: boolean }) {
  
  return (
    <header className="header cardItem flex row justify-between items-center max-lg:py-2" data-testid="header">
      <h1 className="text-xl font-medium" id="MarsRoverGram">Mars RoverGram</h1>
      {isMobile && (
        <Menu as="div" className="relative md:inline-block lg:hidden text-left leading-none -m-1 mt-0">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center rounded-md bg-white
              text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              aria-label="Open Options Menu"
            >
              <span className="rounded-full border-solid border-2 border-mainBG bg-black-500 p-1" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items 
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-cardBG shadow-2xl max-sm:max-w-[200px]">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={'/'}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={'https://pavelaparcana.com'}
                      target="_blank"
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Portfolio
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={'https://github.com/aparcanapavel'}
                      target="_blank"
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      GitHub
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={'https://www.linkedin.com/in/pavel-aparcana'}
                      target="_blank"
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      LinkedIn
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </header>
  );
}