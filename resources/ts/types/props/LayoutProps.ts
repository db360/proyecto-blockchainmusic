import { ReactNode } from 'react';
import { User } from '../index.js';
import { PageProps } from 'vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/types/index.js';

export interface AuthenticatedProps {
    header?: ReactNode;
    children: ReactNode;
}

// resources/js/types/auth.ts


export interface AuthPageProps extends PageProps {
    auth: {
        user: User;
    };
}

export interface GuestProps {
    children: React.ReactNode; // Tipo para los hijos
    noLogo?: boolean; // Si es opcional, usa '?'
    title?: string; // Si es opcional, usa '?'
    mt5?: boolean; // Si es opcional, usa '?'
    w80?: boolean; // Si es opcional, usa '?'
}