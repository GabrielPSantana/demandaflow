import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app-container">      
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}