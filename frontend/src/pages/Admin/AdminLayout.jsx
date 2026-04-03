import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  UserCog,
  User,
  FileSpreadsheet,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ⭐ REMOVED HOME FROM HERE
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Doctors", path: "/admin/doctors", icon: <UserCog size={18} /> },
    { name: "Patients", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Appointments", path: "/admin/appointments", icon: <CalendarDays size={18} /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FileText size={18} /> },
    { name: "Profile", path: "/admin/profile", icon: <User size={18} /> },
    { name: "Admin Signup", path: "/admin/signup", icon: <UserPlus size={18} /> },
     { name: "Testimonials", path: "/admin/testimonials", icon: <FileText size={18} /> },
      { name: "Admin Gallery", path: "/admin/gallery", icon: <FileText size={18} /> },
  
  ];

  // ⭐ EMPLOYEE MANAGEMENT MENU  
  const employeeMenu = [
    { name: "All Employees", path: "/admin/employee/list", icon: <Users size={18} /> },
    { name: "Register Employee", path: "/admin/employee/register", icon: <UserPlus size={18} /> },
  ];

  // ⭐ LAB MENU
  const labMenu = [
    { name: "Lab Users", path: "/admin/lab/users", icon: <Users size={18} /> },
    { name: "Add Lab User", path: "/admin/lab/register", icon: <UserPlus size={18} /> },
    { name: "Lab Reports", path: "/admin/lab/reports", icon: <FileSpreadsheet size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full px-4 py-3 bg-black shadow-md flex items-center justify-between z-[60]">
        <h2 className="text-lg font-bold text-white">Palamu Dental Admin</h2>
        <button onClick={() => setMobileOpen(true)} className="text-white">
          <Menu size={26} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen bg-black shadow-xl transition-all duration-300 
        ${open ? "w-60" : "w-20"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-2 px-4 py-4 mt-2 justify-between">
          <h2
            className={`font-bold text-xl text-white transition-all duration-200 ${
              open ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            Palamu Dental
          </h2>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-white">
            <X size={22} />
          </button>
        </div>

        <ul className="px-3 mt-4 space-y-2 overflow-y-auto h-[75vh] custom-scroll">

          {/* STATIC MENU ITEMS */}
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all duration-200 
                    ${isActive ? "bg-red-600 text-white" : "text-white hover:bg-gray-800"}`}
                >
                  {item.icon}
                  {open && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}

          {/* ⭐ EMPLOYEE DROPDOWN */}
          <li>
            <button
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[15px] font-medium text-white hover:bg-gray-800 transition-all"
              onClick={() => setEmployeeOpen(!employeeOpen)}
            >
              <div className="flex items-center gap-3">
                <Users size={18} />
                {open && <span>Employee Management</span>}
              </div>

              {open && (
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${employeeOpen ? "rotate-180" : "rotate-0"}`}
                />
              )}
            </button>

            <ul
              className={`ml-9 mt-2 space-y-2 transition-all duration-300 overflow-hidden
                ${employeeOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {employeeMenu.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
                        ${isActive ? "bg-red-600 text-white" : "text-white hover:bg-gray-800"}`}
                    >
                      {item.icon}
                      {open && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* ⭐ LAB DROPDOWN */}
          <li>
            <button
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[15px] font-medium text-white hover:bg-gray-800 transition-all"
              onClick={() => setLabOpen(!labOpen)}
            >
              <div className="flex items-center gap-3">
                <UserCog size={18} />
                {open && <span>Lab Management</span>}
              </div>

              {open && (
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${labOpen ? "rotate-180" : "rotate-0"}`}
                />
              )}
            </button>

            {labOpen && (
              <ul className="ml-9 mt-2 space-y-2">
                {labMenu.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={idx}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
                          ${isActive ? "bg-red-600 text-white" : "text-white hover:bg-gray-800"}`}
                      >
                        {item.icon}
                        {open && <span>{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        </ul>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-[90%] mx-auto mb-4 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          {open && <span>Logout</span>}
        </button>

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="hidden md:flex absolute -right-3 top-14 bg-red-600 text-white p-1 rounded-full shadow cursor-pointer"
        >
          {open ? "<" : ">"}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 p-6 mt-14 md:mt-0 transition-all duration-300 bg-white ${
          open ? "md:ml-60" : "md:ml-20"
        } rounded-lg`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
