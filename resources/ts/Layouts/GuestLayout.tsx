import ApplicationLogo from "@/Components/ApplicationLogo";
import { GuestProps } from "@/types/props/LayoutProps";
import { Link } from "@inertiajs/react";

export default function Guest({ children, noLogo, title, mt5, w80}:GuestProps) {
    return (
        <div className={`${mt5 ? "mt-10" : "min-h-screen"} flex flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900`}>
            {noLogo && title ? (
                <h1 className="dark:text-gray-300">{title}</h1>
            ) : (
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 fill-current text-gray-500"/>
                    </Link>
                </div>
            )}

            <div className={`${w80 ? "w-2/3" : "sm:max-w-md"} mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md  sm:rounded-lg dark:bg-gray-800`}>
                {children}
            </div>
        </div>
    );
}
