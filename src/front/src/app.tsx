import { useGate, useStore } from "effector-react";
import React from "react";
import { Header } from "./components/elements/header";
import { Layout } from "./components/layouts/layout";
import { Letter } from "./containers/letter";
import { $currentLetter, letterClosed } from "./containers/letter/model";
import { Letters } from "./containers/letters";
import { Sidebar } from "./containers/sidebar";
import { $resources } from "@/features/theme";
import "./global.css";
import { $screenSize, ScreenSizeGate } from "./shared/lib/screen-size";

export const App: React.FC = () => {
    useGate(ScreenSizeGate);
    const resources = useStore($resources);
    const size = useStore($screenSize);

    const stores = {
        letter: useStore($currentLetter),
    };

    const logo = React.useMemo(() => {
        return size === "big" ? resources.logo : resources.compactLogo;
    }, [resources, size]);

    return (
        <Layout
            head={
                <Header
                    logo={logo}
                    needBack={!!stores.letter}
                    backIcon={resources.arrowBack}
                    goBack={letterClosed}
                />
            }>
            <Sidebar />
            {stores.letter ? <Letter /> : <Letters />}
        </Layout>
    );
};
