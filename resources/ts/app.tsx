import "../css/app.css";
import "./bootstrap.ts";

import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { AudioPlayerContextProvider } from "@/contexts/AudioPlayerContextProvider.tsx";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({
        el,
        App,
        props,
    }: {
        el: HTMLElement;
        App: React.ComponentType<any>;
        props: any;
    }) {
        const root = createRoot(el);

        root.render(
            <AudioPlayerContextProvider>
                <App {...props} />
            </AudioPlayerContextProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
