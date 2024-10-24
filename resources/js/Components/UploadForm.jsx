import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

import { MdOutlineDeleteForever } from "react-icons/md";

export default function UploadForm() {
    const { data, setData, post, processing, errors, progress, setError } = useForm({
        album_title: "",
        files: [],
        titles: [],
        image: null,
    });

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentAlbumTitle, setCurrentAlbumTitle] = useState("");
    const [imagePreview, setImagePreview] = useState(null); // Estado para manejar la previsualización de la imagen

    // Método para manejar el cambio de archivos de audio
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convierte FileList en array

        // Solo permite agregar archivos si el título está lleno
        if (currentTitle.trim() === "") {
            setError('files', 'Por favor, ingrese un título antes de agregar un archivo.');
            return
        }

        // Solo permite agregar archivos si el título está lleno
        if (data.files.length > 10) {
            alert("Máximo 10 canciones");
            return;
        }

        // Asegúrate de que los archivos existan antes de agregarlos al estado
        if (selectedFiles.length > 0) {
            setData((prevData) => ({
                ...prevData,
                files: [...prevData.files, ...selectedFiles], // Crea un nuevo array con los archivos anteriores y los nuevos
                titles: [...prevData.titles, currentTitle], // Agrega el título correspondiente
            }));

            setCurrentTitle("");
            e.target.value = ""; // Limpia el input de archivos

            console.log("Archivos agregados:", [
                ...data.files,
                ...selectedFiles,
            ]);
        } else {
            alert("No se seleccionó ningún archivo.");
        }

    };

    // Método para manejar el cambio de títulos de canciones
    const handleTitleChange = (e) => {
        setError('title', null); // Resetea el título actual
        setCurrentTitle(e.target.value); // Actualizar el título del archivo actual
    };

    const handleAlbumTitleChange = (e) => {
        setError('album_title', null); // Resetea el título actual
        setCurrentAlbumTitle(e.target.value); // Actualizar el título del archivo actual

    }

    // Método para manejar el cambio de imagen
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setData("image", selectedImage);
            setImagePreview(URL.createObjectURL(selectedImage)); // Previsualiza la imagen
            setError('image', null); // Resetea el título actual

        }

    };

    // Método para eliminar la imagen seleccionada
    const handleRemoveImage = () => {
        setData("image", null);
        setImagePreview(null); // Remover la previsualización
    };

    // Método para eliminar una canción (archivo + título)
    const handleRemoveFile = (index) => {
        const newFiles = data.files.filter((_, i) => i !== index);
        const newTitles = data.titles.filter((_, i) => i !== index);

        // Actualiza el estado usando setData
        setData({
            ...data,
            files: newFiles,
            titles: newTitles,
        });

        console.log(data);
    };
    // Método para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("albums.upload"), {
            forceFormData: true, // Inertia convierte automáticamente a FormData si hay archivos
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-4 w-10/12 m-auto"
        >
            <div className="w-full">
                <InputLabel htmlFor="album_title" value="Título del album" />
                <TextInput
                    className="mt-1 block w-full"
                    id="album_title"
                    name="album_title"
                    type="text"
                    value={currentAlbumTitle}
                    onChange={handleAlbumTitleChange}
                    isFocused={true}
                />
                <InputError message={errors.album_title} className="mt-2" />
            </div>

            <div className="flex mt-2">
                <div className="w-full h-80">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 ">
                        Imagen
                    </p>
                    {imagePreview ? (
                        <div className="relative mt-2 transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-72 m-auto object-contain"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-4 w-3/4 m-auto  transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                    <InputError
                        message={errors.image}
                        className="text-center mt-2"
                    />
                </div>
            </div>

            <div className="mt-2">
                <InputLabel
                    htmlFor="title"
                    value="Título de la canción"
                    className="mt-2"
                />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={currentTitle}
                    className="mt-1 block w-full"
                    autoComplete="title"
                    isFocused={true}
                    onChange={handleTitleChange}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-2">
                <TextInput
                    type="file"
                    name="files[]"
                    multiple
                    id="files"
                    onChange={handleFileChange}
                    className="mt-1 w-full inline-flex file:items-center rounded-md border file:border-transparent bg-gray-800 file:px-4 file:py-2 file:text-xs text-xs dis font-semibold uppercase text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-300 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 hover:cursor-pointer hover:dark:text-black"
                    accept="audio/*"
                />
                <InputError message={errors.files} className="mt-2" />
            </div>

            <div className="relative overflow-x-auto">
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
                                    Título
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
                                            <MdOutlineDeleteForever className="w-12 text-2xl hover:text-red-500 hover:text-3xl transition-all" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}

            <PrimaryButton className="mt-2" disabled={processing}>
                Upload
            </PrimaryButton>
        </form>
    );
}
