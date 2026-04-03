import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Home, LogOut, ClipboardList, User } from "lucide-react";

const LabLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Dashboard", path: "/lab/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Pending Requests", path: "/lab/pending-request", icon: <ClipboardList size={18} /> },
    { name: "All Reports", path: "/lab/reports", icon: <FileText size={18} /> },
    { name: "Profile", path: "/lab/userprofile", icon: <User size={18} /> }, // ✅ Added Profile
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside
        className="fixed top-4 left-4 w-[220px] bg-black text-white 
                   flex flex-col justify-between p-6 rounded-xl h-[calc(100vh-32px)]
                   shadow-xl border border-red-600"
      >

        {/* Header */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-wide text-red-500">LAB PANEL</h2>
          </div>

          {/* Menu */}
          <ul className="space-y-3 text-[15px]">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                      ${isActive
                        ? "bg-red-600 text-white shadow-lg scale-[1.03]"
                        : "hover:bg-red-600 hover:text-white text-gray-300"
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white 
                     rounded-lg hover:bg-red-700 transition shadow-md
                     flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 ml-[250px] mt-4 rounded-xl shadow-sm">
        <Outlet />
      </main>
    </div>
  );
};

export default LabLayout;
