import React from "react";
import { Layout } from "./components/layouts/layout";
import { Letters } from "./containers/letters";
import { Sidebar } from "./containers/sidebar";
import "./global.css";

export const App: React.FC = () => {
  return (
    <Layout>
      <Sidebar />
      <Letters />
    </Layout>
  );
};
