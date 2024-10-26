import AlbumsCards from "@/Components/albums/AlbumCards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard({ success, error }) {

    // Accedemos a los datos enviados desde el servidor
    const { albums, auth } = usePage().props;

    const user = auth.user;

    console.log(albums);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user.role === "artist" ? "My Albums" : "Mis Compras"}
                </h2>
            }
        >
            <Head title="Dashboard" />
            {error ? <h1>ERROR: {error}</h1> : null}
            {success ? <h1 className="text-green-500">Archivos subidos correctamente</h1> : null}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-3 gap-2">
                        <AlbumsCards albums={albums}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
