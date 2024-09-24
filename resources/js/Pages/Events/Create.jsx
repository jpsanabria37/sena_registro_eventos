import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create({ centers }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        center_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.store'));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Crear Evento</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nombre del Evento */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">
                        Nombre del Evento:
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className={`border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                    )}
                </div>

                {/* Campo Descripción */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">
                        Descripción:
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={`border ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </span>
                    )}
                </div>

                {/* Campo Fecha de Inicio */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">
                        Fecha de Inicio:
                    </label>
                    <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        required
                        className={`border ${
                            errors.start_date ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                    />
                    {errors.start_date && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.start_date}
                        </span>
                    )}
                </div>

                {/* Campo Fecha de Fin */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">
                        Fecha de Fin:
                    </label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        required
                        className={`border ${
                            errors.end_date ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                    />
                    {errors.end_date && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.end_date}
                        </span>
                    )}
                </div>

                {/* Campo Seleccionar Centro */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">
                        Centro:
                    </label>
                    <select
                        value={data.center_id}
                        onChange={(e) => setData('center_id', e.target.value)}
                        required
                        className={`border ${
                            errors.center_id ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                    >
                        <option value="">Selecciona un Centro</option>
                        {centers.map((center) => (
                            <option key={center.id} value={center.id}>
                                {center.name}
                            </option>
                        ))}
                    </select>
                    {errors.center_id && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.center_id}
                        </span>
                    )}
                </div>

                {/* Botón de Enviar */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-200"
                >
                    {processing ? 'Procesando...' : 'Crear Evento'}
                </button>
            </form>
        </div>
    );
}
