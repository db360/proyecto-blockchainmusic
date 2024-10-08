import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head} from "@inertiajs/react";

export default function ShowAlbum({album, user, songs }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {album.title}
                </h2>
            }
        >
            <Head title={album.title} />
            {console.log(songs)}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex w-full">
                                <div>
                                 <img className="w-60" src={album.cover_image} alt="" />
                                </div>
                                <div className="flex flex-col w-full ml-3">
                                    <span className="text-gray-300">Album</span>
                                    <h3 className="text-5xl">{album.title}</h3>
                                    <div className="mt-5 flex items-center">
                                    <img className="w-10 h-10 rounded-full" src={user.profile_picture} alt="" />
                                    <p className="text-gray-300 ml-2">{user.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
