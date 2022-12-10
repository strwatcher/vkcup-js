import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/layout/layout";
import { Folders } from "./containers/folders";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <Folders />
      <div>Hello</div>
    </Layout>
  </React.StrictMode>
);
