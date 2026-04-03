import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut
} from "lucide-react";

const DoctorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ⭐ REMOVED HOME FROM MENU
  const menuItems = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Appointments", path: "/doctor/appointments", icon: <CalendarDays size={18} /> },
    { name: "Profile", path: "/doctor/profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex bg-white min-h-screen">

      {/* Sidebar */}
      <aside
        className="fixed top-5 left-5 w-[220px] bg-black text-white flex flex-col justify-between 
                   p-6 rounded-xl h-[calc(100vh-40px)] shadow-xl"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-xl font-bold tracking-wide text-white">
              Doctor Panel
            </h2>
          </div>

          {/* Menu */}
          <ul className="space-y-3 text-[15px] font-medium">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
                      ${
                        isActive
                          ? "bg-red-600 text-white shadow-md"
                          : "hover:bg-white hover:text-black"
                      }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 ml-[250px] mt-5 rounded-xl shadow-inner">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
