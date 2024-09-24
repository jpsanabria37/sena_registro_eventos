import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Events({ auth, events }) {
    return (
        <AuthenticatedLayout
            user={auth.user} // Pasamos el usuario autenticado
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Eventos</h2>}
        >
            <div className="py-12">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Eventos para {auth.user.name}</h1> {/* Mostramos el nombre del usuario */}
                    {/* Mostrar botón "Crear Evento" solo si el usuario es admin */}
                    {auth.user.role === 'admin' && (
                        <Link
                            href={route('events.create')}
                            className="mb-4 inline-block bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700"
                        >
                            Crear Evento
                        </Link>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className="bg-white shadow-lg rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
                                    <p className="text-gray-600">{event.start_date} al {event.end_date}</p>
                                    <Link
                                        href={route('events.show', event.id)}
                                        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
                                    >
                                        Ver detalles
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay eventos disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
