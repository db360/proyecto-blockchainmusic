import PlayButton from "@/Components/icons/PlayButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function ShowAlbum({ album, user, songs }) {

    const [urlPlay, setURLPlay] = useState("");
    return (
        <AuthenticatedLayout urlPlay={urlPlay}

            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {album.title}
                </h2>
            }
        >
            <Head title={album.title} />
            {/* {console.log(songs)} */}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex w-full">
                                <div>
                                    <img
                                        className="w-60"
                                        src={album.cover_image}
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col w-full ml-3">
                                    <span className="text-gray-300">Album</span>
                                    <h3 className="text-5xl">{album.title}</h3>
                                    <div className="mt-5 flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.profile_picture}
                                            alt=""
                                        />
                                        <p className="text-gray-300 ml-2">
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nº
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th>Duration</th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Play
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songs && songs.length > 0 ? (
                                        songs.map((song) => (
                                            <tr
                                                key={song.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {song.track_number}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {song.title}
                                                </th>

                                                <td className="px-6 py-4">
                                                    {song.duration}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {song.price}
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4"
                                                >

                                                     <button onClick={() => setURLPlay(song.signed_url)}> <PlayButton /></button>
                                                </th>
                                            </tr>
                                        ))
                                    ) : (
                                        <p>No Songs found.</p>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
