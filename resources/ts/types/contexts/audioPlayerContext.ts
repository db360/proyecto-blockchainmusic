import H5AudioPlayer from "react-h5-audio-player";
import { Song } from "../index.js";

export interface AudioPlayerContextType  {
    urlPlay: string;
    playingSongId: number | null;
    isPlaying: boolean;
    titleSongPlaying: string;
    playerRef: React.RefObject<H5AudioPlayer>;
    setURLPlay: (url: string) => void;
    setPlayingSongId: (id: number | null) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    handlePlayPause: (song: Song) => void;
    handlePlay: () => void;
    handlePause: () => void | undefined;
    handleEnded: () => void;
}

// Create default context value
export const defaultContextValue: AudioPlayerContextType = {
    urlPlay: '',
    playingSongId: null,
    isPlaying: false,
    titleSongPlaying: '',
    playerRef: { current: null },
    setURLPlay: () => {},
    setPlayingSongId: () => {},
    setIsPlaying: () => {},
    handlePlayPause: () => {},
    handlePlay: () => {},
    handlePause: () => {},
    handleEnded: () => {},
};