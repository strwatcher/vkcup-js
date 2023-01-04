import { useStore } from "effector-react";
import React from "react";
import { Header } from "./components/elements/header";
import { Layout } from "./components/layouts/layout";
import { Letter } from "./containers/letter";
import { $currentLetter, letterClosed } from "./containers/letter/model";
import { Letters } from "./containers/letters";
import { Sidebar } from "./containers/sidebar";
import "./global.css";
import { useTheme } from "./hooks/use-theme";
import { genUrl } from "./services/api/model";

export const App: React.FC = () => {
    const { size, resources } = useTheme();

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
                    logo={genUrl(logo)}
                    needBack={!!stores.letter}
                    backIcon={genUrl(resources.arrowBack)}
                    goBack={letterClosed}
                />
            }>
            <Sidebar />
            {!!stores.letter ? <Letter /> : <Letters />}
        </Layout>
    );
};
