import React from 'react';
import { useContext, useState } from "react";

import ApplicationLogo from "@/Components/ApplicationLogo.tsx";
import Dropdown from "@/Components/Dropdown.tsx";
import NavLink from "@/Components/NavLink.tsx";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.tsx";
import { Link, usePage } from "@inertiajs/react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";


import { AuthenticatedProps, AuthPageProps } from "../types/props/LayoutProps.ts";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext.tsx";

export default function Authenticated({ header, children }: AuthenticatedProps) {

    const user = usePage<AuthPageProps>().props.auth.user;

    const context = useContext(AudioPlayerContext);

    if (!context) {
        throw new Error('AudioPlayerContext debe usarse dentro de su proveedor');
    }

    const { urlPlay, isPlaying, playerRef, handlePlay, handlePause, handleEnded, titleSongPlaying, handlePlayPause } = context;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (

        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                {user.role === "user" ? (
                                    <NavLink
                                        href={route("explorer")}
                                        active={route().current("explorer")}
                                    >
                                        Explorar
                                    </NavLink>
                                ) : null}

                                {user.role === "artist" ? (<>
                                    <NavLink
                                        href={route("albums.uploadAlbum")}
                                        active={route().current(
                                            "albums.uploadAlbum"
                                        )}
                                    >
                                        Upload
                                    </NavLink>
                                    <NavLink
                                        href={route("artist.historial")}
                                        active={route().current(
                                            "artist.historial"
                                        )}
                                    >
                                        Historial
                                    </NavLink>
                                    </>) : null}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="group inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <img
                                                    className="w-7 h-7 ml-2 rounded-full group-hover:border-2 group-transition duration-150 ease-in-out"
                                                    src={user.profile_picture}
                                                    alt=""
                                                />
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                title='previous'
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <div className="fixed bottom-0 w-full transition-all "> {/*translate-y-28 */}
                <div className="h-6 bg-slate-300">
                    <p className="text-center">{titleSongPlaying}</p>
                </div>
                <AudioPlayer
                    autoPlay={isPlaying} // Hacer autoplay dependiendo del estado
                    src={urlPlay}
                    ref={playerRef} // Usar referencia para controlar el reproductor
                    onPlay={handlePlay} // Para debug o funciones adicionales
                    onPause={handlePause} // Para debug o funciones adicionales
                    onEnded={handleEnded}
                />
            </div>
        </div>
    );
}