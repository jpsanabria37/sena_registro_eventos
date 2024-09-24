import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create({ event }) {
    const { data, setData, post, processing, errors } = useForm({
        event_day: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('event.days.store', event.id));
    };

    return (
        <div>
            <h1>Agregar Día al Evento: {event.name}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="event_day">Fecha del día del evento:</label>
                <input
                    type="date"
                    name="event_day"
                    value={data.event_day}
                    onChange={(e) => setData('event_day', e.target.value)}
                    required
                />
                {errors.event_day && <div>{errors.event_day}</div>}

                <button type="submit" disabled={processing}>Agregar Día</button>
            </form>
        </div>
    );
}
