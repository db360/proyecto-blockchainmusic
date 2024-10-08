import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ user, albums }) {

        // Función para formatear la fecha a formato español
        const formatFecha = (fecha) => {
            const date = new Date(fecha);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Albums
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-3 gap-2">
                            {albums && albums.length > 0 ? (
                                albums.map((album) => (
                                    <div key={album.id} className="cursor-pointer group relative flex flex-col dark:bg-gray-600 bg-white shadow-sm border border-gray-400 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
                                        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                            <img
                                                className="-translate-y-8 transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-150"
                                                src={album.cover_image}
                                                alt="investment-seed-round"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h6 className="mb-2 dark:text-white text-xl font-semibold h-14">
                                               {album.title}
                                            </h6>
                                            <h6 className="mb-2 dark:text-gray-300 text-lg font-semibold h-14">
                                               {formatFecha(album.release_date)}
                                            </h6>
                                            <p className="dark:text-gray-300 leading-normal font-light truncate h-10">
                                                {album.description}
                                            </p>
                                        </div>
                                        <div className="px-4 pb-4 pt-0 mt-2">
                                            <Link
                                                href={route('dashboard.showAlbum', album.id)}
                                                key={album.id}
                                                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                View Album
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No albums found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
