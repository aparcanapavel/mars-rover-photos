'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'

// component should render a circular profile image on mobile. Clicking this image opens a dropdown menu with links to the homepage, pavelaparcana.com, github.com, and linkedin.com.
export default function Header({ isMobile }: { isMobile: boolean }) {
  // const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="header cardItem flex row justify-between items-center max-lg:py-2">
      <h1 className="text-xl font-medium">Mars RoverGram</h1>
      {isMobile && (
        <Menu as="div" className="relative md:inline-block lg:hidden text-left leading-none">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center rounded-md bg-white
              text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <Image
                placeholder="blur"
                blurDataURL={'/headshot_1_1.jpg'}
                src={'/headshot_1_1.jpg'}
                alt="Pavel"
                width={40}
                height={40}
                className="rounded-full border-solid border-2 border-mainBG"
              />
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
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-cardBG shadow-2xl">
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
    </div>
  );
}