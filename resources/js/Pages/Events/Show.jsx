
import React, { useState } from 'react';

import { Link } from '@inertiajs/react';

export default function Show({ auth, event, eventDays }) {
    // Estado para llevar control de los días asistidos
    const [attendance, setAttendance] = useState(
        eventDays.reduce((acc, day) => {
            acc[day.id] = false; // Inicialmente, ningún día está confirmado
            return acc;
        }, {})
    );

    const [allAttended, setAllAttended] = useState(false); // Controla si todos los días han sido confirmados

    const handleFileChange = async (eventDayId, event) => {
        const file = event.target.files[0];

        if (file) {
            // Lógica de validación del QR (aquí simulamos con un timeout, pero en la vida real, llamarías al backend para validar el QR)
            setTimeout(() => {
                // Simulamos la validación exitosa del QR
                setAttendance((prevState) => ({
                    ...prevState,
                    [eventDayId]: true, // Marcar como confirmado
                }));

                // Verificar si todos los días han sido asistidos
                checkIfAllAttended();
            }, 1000); // Simula un proceso de validación de 1 segundo
        }
    };

    const checkIfAllAttended = () => {
        // Verifica si todos los días han sido confirmados
        const allDaysConfirmed = Object.values(attendance).every((isConfirmed) => isConfirmed === true);
        setAllAttended(allDaysConfirmed); // Habilitar o deshabilitar el botón de certificado
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{event.name}</h1>
            <p className="text-gray-600">{event.description}</p>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Días del Evento</h2>

                {eventDays.map((day) => (
                    <div key={day.id} className="mb-6 bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Fecha: {day.event_day}</h3>

                        {/* Mostrar QR para los administradores */}
                        {auth.user.role === 'admin' && (
                            <div className="mt-4">
                                <h4 className="text-gray-700 font-semibold">Código QR:</h4>
                                <img src={`data:image/png;base64,${day.qr_code}`} alt={`QR Code para el día ${day.event_day}`} className="mt-2" />
                            </div>
                        )}

                        {/* Mostrar checkbox para confirmar asistencia solo a los usuarios normales */}
                        {auth.user.role === 'user' && (
                            <div>

                                {/* Checkbox de asistencia */}
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-green-600"
                                        checked={attendance[day.id]} // Marcado si ya asistió
                                        readOnly // El checkbox es de solo lectura, se marcará automáticamente
                                    />
                                    <span className="ml-2 text-gray-700">
                                Confirmar asistencia para el día {day.event_day}
                            </span>
                                </label>

                                {/* Cargar la foto del QR para validación */}
                                <div className="mt-4">
                                    <label className="block text-gray-700">Cargar foto del QR</label>
                                    <input
                                        type="file"
                                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(day.id, e)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Botón para descargar certificado si ha asistido a todos los días */}
                {auth.user.role === 'user' && (
                    <div className="mt-6">
                        <a
                            href={route('attendance.downloadCertificate', event.id)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
                        >
                            Descargar Certificado
                        </a>
                    </div>
                )}

                <Link href={route('events.index')} className="mt-4 inline-block text-blue-600 hover:underline">
                    Volver a los eventos
                </Link>
            </div>
        </div>
    );
}
