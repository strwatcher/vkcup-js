import React from "react";
import { Header } from "./components/elements/header";
import { Layout } from "./components/layouts/layout";
import { Letters } from "./containers/letters";
import { Sidebar } from "./containers/sidebar";
import "./global.css";
import { useTheme } from "./hooks/use-theme";
import { genUrl } from "./services/api/model";

export const App: React.FC = () => {
  const { size, resources } = useTheme();

  const logo = React.useMemo(() => {
    return size === "big" ? resources.logo : resources.compactLogo;
  }, [resources, size]);

  return (
    <Layout head={<Header logo={<img src={genUrl(logo)} />} />}>
      <Sidebar />
      <Letters />
    </Layout>
  );
};
