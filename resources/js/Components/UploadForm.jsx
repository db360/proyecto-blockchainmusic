import { useForm } from "@inertiajs/react";

export default function UploadForm() {
    const { data, setData, post} = useForm({
        file: null
    });

    const handleChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('albums.upload'));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} required />
            <button type="submit">Upload</button>
        </form>
    )
}