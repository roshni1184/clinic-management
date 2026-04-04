import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
  BookOpen,
  Home,
  FileText
} from "lucide-react";


const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Dashboard", path: "/user/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Appointments", path: "/user/my-appointments", icon: <CalendarDays size={18} /> },
    { name: "Book Appointment", path: "/book-appointment", icon: <BookOpen size={18} /> },
    { name: "Lab Reports", path: "/user/userlabreport", icon: <FileText size={18} /> },
    { name: "Profile", path: "/user/profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <aside
        className="fixed top-[20px] left-[10px] w-[240px] bg-black text-white flex flex-col justify-between
                   p-5 rounded-lg h-[calc(100vh-40px)] shadow-lg"
      >
        {/* Logo */}
        <div>
          <div className="flex items-center mb-8">
            <h2 className="text-[22px] font-extrabold tracking-wider text-red-500">Patient Portal</h2>
          </div>

          {/* Sidebar Links */}
          <ul className="space-y-2 text-[15px] font-medium">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                      ${isActive
                        ? "bg-red-600 text-white shadow-lg"
                        : "hover:bg-red-500/20 hover:text-red-500"
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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center text-sm"
        >
          <LogOut size={16} className="inline-block mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 mt-[30px] ml-[260px] rounded-lg min-h-screen shadow-inner">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
