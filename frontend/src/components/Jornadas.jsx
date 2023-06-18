import React from "react";
import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import JornadasTable from "./JornadasTable";

const Jornadas = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <JornadasTable />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Jornadas;
