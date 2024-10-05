
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function DbConnection({code}) {

    return (
        <GuestLayout>
        <div>
            <Head title="Error de Conexión" />
            <h1 className="text-red-500 text-center">Error {code} de Conexión a la Base de Datos </h1>
            <p className="text-gray-300 text-center">No podemos conectar a la base de datos en este momento. Por favor, intenta nuevamente más tarde.</p>
        </div>
        </GuestLayout>
    );
};

