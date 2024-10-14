import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function RegisterEdit() {
    const { data, setData, post, processing, errors, reset } = useForm({
        role: "",
        password: ""
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register-edit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Select Account Type" />

            <form onSubmit={submit}>
                <div className="">
                    <label className="text-gray-300" htmlFor="role">
                        Elija el tipo de cuenta:
                    </label>
                    <select
                        name="role"
                        id="role"
                        onChange={(e) => setData("role", e.target.value)}
                        value={data.role}
                    >
                        <option value="">Seleccione..</option>
                        <option value="artist">Artista</option>
                        <option value="user">Usuario</option>
                    </select>
                    {errors.role && <div className="text-red-500">{errors.role}</div>} {/* Mostrar errores */}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white text-black py-1 px-2 mt-4"
                    disabled={processing}
                >
                    Continuar
                </button>
            </form>
        </GuestLayout>
    );
}
