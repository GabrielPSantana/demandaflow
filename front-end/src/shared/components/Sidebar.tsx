import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider, Box } from "@mui/material";
import { ChevronLeft, ChevronRight, Logout, Dashboard, Person } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Tarefas", icon: <Dashboard />, to: "/" },
  { name: "Teste", icon: <Person />, to: "/profile" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);

  const drawerWidth = open ? 240 : 60; // pixels

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          width: drawerWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          borderRadius: "0 18px 18px 0",
        },
      }}
    >
      {/* Top Toggle */}
      <Box display="flex" alignItems="center" justifyContent={open ? "flex-end" : "center"} p={1}>
        <IconButton onClick={toggleSidebar}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider />

      {/* Nav Items */}
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.name}
            component={NavLink}
            to={item.to}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&.active": {
                bgcolor: "primary.main",
                color: "white",
                "& svg": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.name} />}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ mt: "auto" }} />

      {/* Logout */}
      <List>
        <ListItemButton sx={{ justifyContent: open ? "initial" : "center", px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
            <Logout />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
