import React from "react";

export const Folders: React.FC = () => {
  const [folders, setFolders] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/folders");
      const json = await response.json();
      console.log(json);
    };

    fetchData();
  }, []);

  return <></>;
};
