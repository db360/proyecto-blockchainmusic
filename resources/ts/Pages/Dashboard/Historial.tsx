import MetaMaskIcon from "@/Components/icons/MetaMaskIcon";
import Authenticated from "@/Layouts/AuthenticatedLayout.tsx";

import { FaPaypal } from "react-icons/fa";

export default function Historial({ albums }) {

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Historial
                </h2>
            }
        >
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Album
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th className="px-6 py-3">Creation Date</th>
                                <th className="px-6 py-3 text-center">Reproductions</th>
                                <th scope="col" className="px-6 py-3">
                                    Revenue
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center"
                                >
                                    Sells
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.map((album) =>
                                album.songs.map((song) => (
                                    <tr key={song.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{album.title}</td>
                                        <td scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{song.title}</td>
                                        <td scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {new Date(
                                                song.created_at
                                            ).toLocaleString(undefined, {
                                                // Convertir a fecha local
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </td>
                                        <td scope="row"
                                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{song.plays_count}</td>
                                        <td scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">3.50 €</td>
                                        <td className="flex flex-row items-center justify-around px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex gap-2 items-center">
                                            <FaPaypal /> 20 €
                                            </div>
                                            <div  className="flex gap-2 items-center">
                                            <MetaMaskIcon />25 €

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
}
