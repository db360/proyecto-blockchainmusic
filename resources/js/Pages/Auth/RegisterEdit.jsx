import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function RegisterEdit() {
    const { data, setData, post, processing, errors, reset } = useForm({
        role: "",
        password: "",
        password_confirmation: ""
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register-edit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Tipo de Cuenta - Password" />

            <form onSubmit={submit}>
                <div className="">
                    <InputLabel htmlFor="role" value="Tipo de cuenta:"/>
                    <SelectInput
                        name="role"
                        id="role"
                        value={data.role || ""}
                        onChange={(e) => setData('role', e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Seleccione..</option>
                        <option value="artist">Artista</option>
                        <option value="user">Usuario</option>

                    </SelectInput>
                    <InputError message={errors.role} className="mt-2"/>
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password || ""}
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

                <PrimaryButton className="mt-4" disabled={processing} type="submit">
                    Continuar
                </PrimaryButton>

            </form>
        </GuestLayout>
    );
}
