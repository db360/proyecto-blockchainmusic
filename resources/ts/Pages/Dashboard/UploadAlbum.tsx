import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UploadForm from "@/Components/UploadForm";


export default function UploadAlbum() {

    return (
    <AuthenticatedLayout>
        <UploadForm />
    </AuthenticatedLayout>

    )
}