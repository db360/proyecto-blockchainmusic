import { createContext } from 'react';
    import { AudioPlayerContextType, defaultContextValue } from 'resources/ts/types/contexts/audioPlayerContext';



// Crea el contexto
export const AudioPlayerContext = createContext<AudioPlayerContextType>(defaultContextValue);
