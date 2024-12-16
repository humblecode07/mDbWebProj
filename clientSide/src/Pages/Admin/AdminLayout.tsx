import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Admin/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminLayout = () => {
  console.log("AdminLayout rendered");
  return (
    <>
      <Header />
      <div className="admin-layout--container">
        <div className="content">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout
