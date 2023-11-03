// This component will reacive a list of Options to show in the dashboard
// In our case the childrens will be Link

import { FC } from "react";

type Props = {
  children: React.ReactNode;
};
export const Dashboard: FC<Props> = ({ children }) => {
  return (
    <nav className="p-4 basis-3/12 h-full">
      <p className="text-md font-extralight mb-6">Dashboard</p>
      <menu className="flex flex-col [&>a]:py-2">{children}</menu>
    </nav>
  );
};
