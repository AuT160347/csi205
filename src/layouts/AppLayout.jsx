import { Outlet } from "react-router-dom";
import './AppLayout.css'

import Appheader from "../components/Appheader";
import Appnavbar from "../components/Appnavbar";
import Appfooter from "../components/Appfooter";

function AppLayout({ products, carts ,setToken }) {

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center bg-black"
      style={{ padding: "20px" }}
    >
      <div className="">
        <Appheader />
      </div>
      <div className="p-3">
        <Appnavbar products={products} carts={carts} setToken={setToken} />
      </div>
      <div
        className="border border-3 rounded-4 p-3 border-dark p-3 w-100 no-scrollbar"
        style={{
          maxWidth: "900px",
          overflow: "auto",
          maxHeight:"700px",
        }}
      >
        <Outlet />
      </div>
      <div className="p-3">
        <Appfooter />
      </div>

    </div>
  );
};

export default AppLayout;

