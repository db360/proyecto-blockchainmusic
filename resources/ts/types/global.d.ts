import { User } from './models/user';

interface Window {
    axios: typeof import('axios').default;
}


export interface PageProps {
    auth: {
        user: User;
    };
    // Otras propiedades en `props` si las tienes
}


// Sobrescribimos el tipo de Inertia Page Props para que use nuestro tipo personalizado
declare module '@inertiajs/react' {
    interface InertiaPageProps extends PageProps {}
}