import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        document_type: '',
        document_number: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <form
            onSubmit={submit}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 space-y-6"
        >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registro SENA</h2>

            {/* Campo Nombre */}
            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 font-semibold mb-1">
                    Nombre Completo
                </label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            {/* Campo Email */}
            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
                    Correo
                </label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={`border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            {/* Campo Tipo de Documento */}
            <div className="flex flex-col">
                <label htmlFor="document_type" className="text-gray-700 font-semibold mb-1">
                    Tipo de Documento
                </label>
                <select
                    name="document_type"
                    value={data.document_type}
                    onChange={(e) => setData('document_type', e.target.value)}
                    className={`border ${
                        errors.document_type ? 'border-red-500' : 'border-gray-300'
                    } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                >
                    <option value="">Seleccione</option>
                    <option value="cedula">Cédula de Ciudadanía</option>
                    <option value="tarjeta">Tarjeta de Identidad</option>
                </select>
                {errors.document_type && <div className="text-red-500 text-sm mt-1">{errors.document_type}</div>}
            </div>

            {/* Campo Número de Documento */}
            <div className="flex flex-col">
                <label htmlFor="document_number" className="text-gray-700 font-semibold mb-1">
                    Número de Documento
                </label>
                <input
                    type="text"
                    name="document_number"
                    value={data.document_number}
                    onChange={(e) => setData('document_number', e.target.value)}
                    className={`border ${
                        errors.document_number ? 'border-red-500' : 'border-gray-300'
                    } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                />
                {errors.document_number && <div className="text-red-500 text-sm mt-1">{errors.document_number}</div>}
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-semibold mb-1">
                    Contraseña
                </label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className={`border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md p-2 focus:ring focus:ring-indigo-200`}
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="flex flex-col">
                <label htmlFor="password_confirmation" className="text-gray-700 font-semibold mb-1">
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200"
                />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-200"
            >
                {processing ? 'Procesando...' : 'Registrarse'}
            </button>
        </form>
    );
}
