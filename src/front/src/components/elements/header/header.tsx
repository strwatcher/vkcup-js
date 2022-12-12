import React from "react";

export type HeaderProps = {
  logo: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = (props) => {
  return <div className={""}>{props.logo}</div>;
};
