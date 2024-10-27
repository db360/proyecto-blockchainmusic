import React, { RefObject } from 'react';
import { Song } from "resources/ts/types/index.ts";
import { useRef, useState } from "react";
import { AudioPlayerContext } from './AudioPlayerContext.tsx';
import H5AudioPlayer from 'react-h5-audio-player';

export const AudioPlayerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [urlPlay, setURLPlay] = useState("");
    const [playingSongId, setPlayingSongId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [titleSongPlaying, setTitleSongPlaying] = useState("");
    const playerRef: RefObject<H5AudioPlayer> = useRef(null);

    const handlePlayPause = (song: Song) => {
        setTitleSongPlaying(song.title);
        if (playingSongId === song.id && playerRef.current) {
            isPlaying ? playerRef.current.audio.pause() : playerRef.current.audio.play();
            setIsPlaying(!isPlaying);
        } else {
            setURLPlay(song.song_signed_url);
            setPlayingSongId(song.id);
            setIsPlaying(true);
            setTimeout(() => playerRef.current?.audio.play(), 0);
        }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
        setIsPlaying(false);
        setPlayingSongId(null);
        // Lógica de incrementar conteo
    };

    return (
        <AudioPlayerContext.Provider
            value={{
                urlPlay,
                playingSongId,
                isPlaying,
                titleSongPlaying,
                playerRef,
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
    );
};
