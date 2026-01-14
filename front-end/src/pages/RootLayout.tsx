import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared/components/Sidebar/Sidebar";

export default function RootLayout() {
 
  return (
    <Sidebar>
        <Outlet />
    </Sidebar>
  );
}
