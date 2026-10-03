import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PlayerBar from "./PlayerBar";

interface MainLayoutProps { children: ReactNode; }

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-24">
          <Header />
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}
