import { createContext, useRef, useState } from "react";

export const AudioPlayerContext = createContext();

export function AudioPlayerProvider({children}) {

    const [urlPlay, setURLPlay] = useState("");
    const [playingSongId, setPlayingSongId] = useState(null); // ID de la canción actual
    const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducción
    const [titleSongPlaying, settitleSongPlaying] = useState(""); // Estado de reproducción
    const playerRef = useRef(null); // Referencia al reproductor

     // Manejar reproducción de una canción
    const handlePlayPause = (song) => {
        settitleSongPlaying(song.title)
        if (playingSongId === song.id) {
            if (isPlaying) {
                playerRef.current.audio.current.pause(); // Pausar la canción
            } else {
                playerRef.current.audio.current.play(); // Reproducir la canción
            }
            setIsPlaying(!isPlaying); // Alternar el estado de reproducción
        } else {
            setURLPlay(song.signed_url); // Cambiar la URL
            setPlayingSongId(song.id); // Establecer la nueva canción actual
            setIsPlaying(true); // Iniciar la reproducción
            setTimeout(() => playerRef.current.audio.current.play(), 0); // Forzar que reproduzca la nueva canción
        }
    };

    // Función que se ejecuta cuando el audio empieza a reproducirse
    const handlePlay = () => {
        console.log("Reproduciendo...");
        setIsPlaying(true);
    };

    // Función que se ejecuta cuando el audio se pausa
    const handlePause = () => {
        console.log("Pausado...");
        setIsPlaying(false);
    };

    // Función que se ejecuta cuando el audio termina
    const handleEnded = () => {
        console.log("Terminado!");
        setIsPlaying(false);
    };

    return (
        <AudioPlayerContext.Provider
            value={{
                urlPlay,
                playingSongId,
                isPlaying,
                playerRef,
                titleSongPlaying,
                setURLPlay,
                setPlayingSongId,
                setIsPlaying,
                handlePlayPause,
                handlePlay,
                handlePause,
                handleEnded,
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    )
}