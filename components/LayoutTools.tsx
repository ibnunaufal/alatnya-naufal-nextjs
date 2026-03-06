import React from "react";
import HeaderComponent from "./HeaderComponent";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const LayoutTools: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    // mobile layout
    <div className="">
      <div className="sticky top-0 z-50">
        <HeaderComponent title={title} />
      </div>
      <main className="grow">{children}</main>
    </div>
  );
};
