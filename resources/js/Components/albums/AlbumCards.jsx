import { Link } from "@inertiajs/react";

export default function AlbumsCards({albums}) {

    console.log(albums);

    // Función para convertir gs:// en la URL pública de Firebase Storage
    const convertGsToHttp = (path) => {
        const bucket = "blockchain-music-138d8.appspot.com"; // Cambia esto por tu bucket si es necesario
        const encodedFilePath = encodeURIComponent(path); // Esto codifica los '/' como '%2F'
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedFilePath}?alt=media`;
    };

    return (
        albums && albums.length > 0 ? (
            albums.map((album) => (
                <div
                    key={album.id}
                    className="cursor-pointer group relative flex flex-col dark:bg-gray-600 bg-white shadow-sm border border-gray-400 rounded-md w-80 hover:shadow-lg transition-shadow duration-300"
                >
                                 <Link
                            href={route(
                                "dashboard.showAlbum",
                                album.id
                            )}
                            key={album.id}
                            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                    <div className="relative h-40 m-2.5 overflow-hidden text-white rounded-md">
                        <img
                            className="-translate-y-8 transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-150"
                            src={convertGsToHttp(album.cover_image)}
                            alt="investment-seed-round"
                        />
                    </div>
                    <div className="p-2 flex flex-col text-left ">

                        <h6 className=" dark:text-white text-xl font-semibold h-10 truncate">
                            {album.title}
                        </h6>

                        <p className="dark:text-gray-300 leading-normal font-light truncate h-10">
                            {album.description}
                        </p>
                    </div>

                        </Link>
                </div>
            ))
        ) : (
            <p>No albums found.</p>
        )
    )
}