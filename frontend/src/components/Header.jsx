import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LOGO from "../assets/logo.png"
import DefaultLogo from "../assets/default.png"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))?.data



    const logout = () => {
        localStorage.removeItem('user')
        navigate("/")
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="container mx-auto">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                                <Link href={'/'} className="flex flex-shrink-0 items-center">
                                    <img
                                        className="w-20"
                                        src={LOGO}
                                        alt="Your Company"
                                    />
                                </Link>
                                <div className="hidden md:ml-6 md:flex md:items-center">
                                    <div className="flex space-x-4">
                                        <Link
                                            href="/"
                                            className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                        >
                                            Dashboard
                                        </Link>

                                        {!user &&
                                            <Link
                                                to="/login"
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                            >
                                                Login
                                            </Link>
                                        }

                                        {/* SearchBar */}
                                        <Search />

                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">


                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user?.pic ? user?.pic : DefaultLogo}
                                                alt={user?.name}
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/admin/orders"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        All Orders
                                                    </Link>
                                                )}
                                            </Menu.Item> */}
                                            {user && <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logout}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <Link
                                    href={"/"}
                                    type="button"
                                    className="ml-1 md:flex hidden flex-col bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <i className="text-gray-400 capitalize">{user ? user?.name : ""}</i>
                                    <i className="text-gray-400 text-xs">{user ? user?.email : ""}</i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* {navigation.map((item) => ( */}
                            <Link
                                href="/me"
                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                            >
                                Dashboard
                            </Link>

                            {!user &&
                                <Link
                                    href="/me"
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                >
                                    Login
                                </Link>
                            }
                            {/* ))} */}
                        </div>
                    </Disclosure.Panel>
                    <div className="md:hidden block">
                        {/* <Search /> */}
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default Header;