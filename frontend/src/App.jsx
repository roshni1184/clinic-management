import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Procedure from "./pages/Procedure";
import ProcedureDetails from "./pages/procederDetails";
import Looseteeth from "./pages/Looseteeth";
import Rootcanal from "./pages/Rootcanal";
import Toothextraction from "./pages/Toothextraction";
import Impactooth from "./pages/Impactooth";
import Artificialteeth from "./pages/Artificialteeth";
import Teethalignment from "./pages/Teethalignment";
import Ultrasonic_cleaning from "./pages/Ultrasonic_cleaning";
import LaserFilling from "./pages/LaserFilling";
import TMDOMDTreatment from "./pages/TMDOMDTreatment";
import Childtreatment from "./pages/Childtreatment";
import XRay from "./pages/XRay";
import Ultrasound from "./pages/Ultrasound";
import DentalBleach from "./pages/DentalBleach";
import MouthulcerTeat from "./pages/MouthulcerTeat";
import AdminLogin from "./pages/AdminLogin";

// User Pages
import UserDashboard from "./pages/User/UserDashboard";
import UserLayout from "./pages/User/UserLayout";
import UserProfile from "./pages/User/UserProfile";
import MyAppointments from "./pages/User/MyAppointments";
import BookAppointment from "./pages/User/BookAppointment";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorLayout from "./pages/Doctor/DoctorLayout";
import DoctorAppointments from "./pages/Doctor/DoctorAppointment";
import DoctorUserDetails from "./pages/Doctor/DoctoUserDetails";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorUsers from "./pages/Doctor/DoctorUsers";
import DoctorAppointmentDetails from "./pages/Doctor/DoctorAppointmentDetails";
import DoctorPatientNotes from "./pages/Doctor/DoctorPatientNotes";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDoctors from "./pages/Admin/AdminDoctors";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminAppointments from "./pages/Admin/AdminAppointments";
import AdminUserDetails from "./pages/Admin/AdminUserDetails";
import DoctorRegistration from "./pages/Admin/DoctorRegistration";
import AdminBlog from "./pages/Admin/AdminBlog";
import AdminAppointmentDetails from "./pages/Admin/AdminAppointmentDetails";
import AdminDoctorDetails from "./pages/Admin/AdminDoctorDetails";
import AdminProfile from "./pages/Admin/AdminProfile";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import UserAppointmentDetails from "./pages/User/UserAppointmentDetails";
import SendLabTest from "./pages/Doctor/SendLabTest";
import LabLayout from "./pages/Lab/LabLayout";
import LabDashboard from "./pages/Lab/LabDashboard";
import AllReports from "./pages/Lab/AllReports";
import LabRegister from "./pages/Admin/LabRegister";
import LabPendingReports from "./pages/Lab/LabPendinReports";
import UserLabReports from "./pages/User/UserLabReports";
import AdminLabReports from "./pages/Admin/AdminLabReports";
import AdminLabUsers from "./pages/Admin/AdminLabUsers";
import AdminLabUserDetail from "./pages/Admin/AdminLabUserDetail";
import AdminSignup from "./pages/Admin/AdminSignUp";
import LabUserProfile from "./pages/Lab/LabUserProfile";
import StaffList from "./pages/Admin/StaffList";
import EmployeeRegister from "./pages/Admin/EmployeeRegister";
import EditEmployee from "./pages/Admin/EditEmployee";
import ViewEmployee from "./pages/Admin/ViewEmployee";
import AdminTestimonials from "./pages/Admin/AdminTestimonials";
import AdminGalleryUpload from "./pages/Admin/AdminGalleryUpload";




// Hide Navbar + Footer for admin/user/doctor
const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/doctor") ||
    location.pathname.startsWith("/lab");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

// ✅ PROTECTED ROUTE
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/procedure" element={<Procedure />} />
          <Route path="/procedure/:name" element={<ProcedureDetails />} />
          <Route path="/looseteeth" element={<Looseteeth />} />
          <Route path="/Rootcanal" element={<Rootcanal />} />
          <Route path="/Toothextraction" element={<Toothextraction />} />
          <Route path="/Impactooth" element={<Impactooth />} />
          <Route path="/Artificialteeth" element={<Artificialteeth />} />
          <Route path="/Teethalignment" element={<Teethalignment />} />
          <Route path="/Ultrasonic_cleaning" element={<Ultrasonic_cleaning />} />
          <Route path="/LaserFilling" element={<LaserFilling />} />
          <Route path="/TMDOMDTreatment" element={<TMDOMDTreatment />} />
          <Route path="/Childtreatment" element={<Childtreatment />} />
          <Route path="/XRay" element={<XRay />} />
          <Route path="/Ultrasound" element={<Ultrasound />} />
          <Route path="/DentalBleach" element={<DentalBleach />} />
          <Route path="/MouthulcerTeat" element={<MouthulcerTeat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          

          {/* USER ROUTES - PROTECTED */}
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="appointment/:id" element={<UserAppointmentDetails />} />
            <Route path="userlabreport" element={<UserLabReports />} />
          
          </Route>



          
          {/* BOOK APPOINTMENT  */}
          <Route
            path="/book-appointment"
            element={
            
                <BookAppointment />
            
            }
          />

          {/* DOCTOR ROUTES */}
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <DoctorLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="users" element={<DoctorUsers />} />
            <Route path="user/:id" element={<DoctorUserDetails />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="appointment/:id" element={<DoctorAppointmentDetails />} />
            <Route path="doctor-patient-notes" element={<DoctorPatientNotes />} />

          </Route>
          <Route path="/doctor/send-lab/:id" element={<SendLabTest />} />


          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="doctor/:id" element={<AdminDoctorDetails />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="blogs" element={<AdminBlog />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="user/:id" element={<AdminUserDetails />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="appointment/:id" element={<AdminAppointmentDetails />} />
            <Route path="doctors/register" element={<DoctorRegistration />} />
            <Route path="lab/register" element={<LabRegister />} />
            <Route path="lab/reports" element={<AdminLabReports />} />
            <Route path="lab/users" element={<AdminLabUsers />} />
            <Route path="/admin/lab/user/:id" element={<AdminLabUserDetail />} />

            {/* ⭐ NEW STAFF ROUTES */}
            <Route path="employee/register" element={<EmployeeRegister />} />
            <Route path="employee/list" element={<StaffList />} />
            <Route path="employee/:id" element={<ViewEmployee/>} />
            <Route path="employee/edit/:id" element={<EditEmployee />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials/>} /> 
            <Route path="/admin/gallery" element={<AdminGalleryUpload/>} />





          </Route>
          <Route path="/lab"
            element={<LabLayout />}  >
            <Route path="dashboard" element={<LabDashboard />} />
            <Route path="reports" element={<AllReports />} />
            <Route path="pending-request" element={<LabPendingReports />} />
            <Route path="userprofile" element={<LabUserProfile />} />

          </Route>

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
