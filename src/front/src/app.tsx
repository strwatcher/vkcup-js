import { useStore } from "effector-react";
import React from "react";
import { Layout } from "./components/layouts/layout";
import { Letter } from "./components/letter";
import { $letters } from "./containers/letters/model";
import { Sidebar } from "./containers/sidebar";
import "./global.css";

export const App: React.FC = () => {
  const letters = useStore($letters);
  return (
    <Layout>
      <Sidebar />
      <div>
        {letters.data.map((letter) => (
          <Letter {...letter} />
        ))}
      </div>
    </Layout>
  );
};
