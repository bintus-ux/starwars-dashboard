import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 lg:ml-[19.5vw]">
          {children}
        </main>
      </div>
    </div>
  );
}
