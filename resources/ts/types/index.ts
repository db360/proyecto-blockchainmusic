
// Album related types
export interface Album {
    id: number;
    user_id: number;
    title: string;
    cover_image: string;
    description: string;
    release_date: string;
    price: number;
    created_at?: string;
    updated_at?: string;
    user?: User;
    songs?: Song[];
    purchases?: Purchase[];
}


// resources/js/types/models/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'artist';  // Union type for specific roles
    profile_picture?: string;

}

export interface Song {
    id: number;
    album_id: number;
    title: string;
    duration: number;
    file_path: string;
    song_signed_url: string;
}

export interface Songs {
    songs: Song[];
}

export interface Purchase {
    id: number;
    album_id: number;
    user_id: number;
    price: number;
    purchase_date: string;
}

// Form data types
export interface CreateAlbumData {
    user_id: number;
    title: string;
    cover_image: string;
    description: string;
    release_date: string;
    price: number;
}

export interface UpdateAlbumData extends Partial<CreateAlbumData> {
    
}

// Page Props types
export interface AlbumPageProps {
    album: Album;
}

export interface AlbumsPageProps {
    albums: Album[];
}

