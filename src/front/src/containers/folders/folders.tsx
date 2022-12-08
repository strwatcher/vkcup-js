import React from "react";
import { CompleteFolder } from "shared";
import { Folder } from "../../components/folder";

type FoldersState = {
  count: number;
  data: Array<CompleteFolder>;
};

export const Folders: React.FC = () => {
  const baseUrl = React.useMemo(() => "http://localhost:3000/", []);
  const theme = React.useMemo<"dark" | "light">(() => "light", []);
  const [folders, setFolders] = React.useState<FoldersState>();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseUrl + "folders");
      const json = await response.json();
      setFolders(json as FoldersState);
    };

    fetchData();
  }, []);

  return (
    <>
      {folders?.data.map((folder) => {
        const icon = theme === "dark" ? folder.iconLight : folder.icon;
        return (
          <Folder
            icon={baseUrl + icon}
            folder={folder.folder}
            theme={theme}
            active={false}
          />
        );
      })}
    </>
  );
};
