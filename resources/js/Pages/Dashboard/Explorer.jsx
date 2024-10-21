import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlbumsCards from "@/Components/albums/AlbumCards";

export default function Explorer({ albums }) {
    const user = usePage().props.auth.user;
    
    console.log(albums);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Descubre nueva música
                </h2>
            }
        >
            <Head title="Explorer" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-3 gap-2">
                            <AlbumsCards albums={albums.data} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
