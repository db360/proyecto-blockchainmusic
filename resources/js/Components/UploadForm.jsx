import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import InputError from "./InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import DeleteIcon from "./icons/DeleteIcon";

export default function UploadForm() {
    const { data, setData, post, processing, errors } = useForm({
        album_title: "",
        files: [], // Agregamos un campo para los archivos
        titles: [],
    });

    const handleFilesChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convierte FileList en array
        data.titles.push(data.title);
        data.title = "";

        if (selectedFiles.length + data.files.length > 10) {
            alert("No puedes agregar más de 10 archivos.");
            return;
        }

        setData("files", [...data.files, ...selectedFiles]); // Agrega archivos al array
        e.target.value = ""; // Limpia el input de archivos
    };

    // Eliminar un archivo de la lista
    const handleRemoveFile = (index) => {
        const updatedFiles = data.files.filter((_, i) => i !== index);
        data.titles.pop();
        setData("files", updatedFiles); // Actualiza el estado con los archivos restantes
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear un objeto FormData para enviar archivos
        const formData = new FormData();

        data.files.forEach((file, index) => {
            formData.append("files[]", file); // Añadir los archivos al FormData
            formData.append(`titles[]`, data.titles[index]);
            formData.append(`album_title`, album_title);

        });

        // Enviar como PUT utilizando _method
        formData.append("_method", "PUT"); // Esto indicará al servidor que se trate como una solicitud PUT

        post(route("albums.upload"), formData, {
            forceFormData: true, // Forzar el uso de FormData
        });
    };

    return (
        <GuestLayout noLogo title={"Nuevo Album"} mt5 w80>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="album_title" value="Título del album" />
                    <TextInput
                        id="album_title"
                        type="text"
                        name="album_title"
                        value={data.album_title || ""}
                        className="mt-1 block w-full"
                        autoComplete="album_title"
                        isFocused={true}
                        onChange={(e) => setData("album_title", e.target.value)}

                    />
                    <InputError message={errors.album_title} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="title" value="Título de la canción" />
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title || ""}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        type="file"
                        name="files[]"
                        multiple
                        id="files"
                        onChange={handleFilesChange}
                        className="mt-1 w-full inline-flex  file:items-center rounded-md border file:border-transparent bg-gray-800 file:px-4 file:py-2 file:text-xs text-xs dis font-semibold uppercase text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-300 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 hover:cursor-pointer hover:dark:text-black"
                        accept="audio/*" // Solo permite archivos de audio
                    />

                    <InputError message={errors.files} className="mt-2" />
                </div>
                <div className="relative overflow-x-auto">
                    {/* Lista de archivos seleccionados */}
                    {data.files.length > 0 && (
                        <table className="mt-4 w-full items-center gap-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-gray-300">
                                    <th scope="col" className="px-6">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Archivo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Titulo
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right"
                                    >
                                        Borrar
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.files.map((file, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 w-5">
                                            {index + 1}.
                                        </td>
                                        <td className="px-6 py-4 w-10">
                                            {file.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.titles[index]}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveFile(index)
                                                }
                                                className="ml-auto"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    Upload
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
