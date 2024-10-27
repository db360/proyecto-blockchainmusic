export interface UploadFormData {
    album_title: string;
    files: File[];
    titles: string[];
    image: File | null;
    title: string;
}