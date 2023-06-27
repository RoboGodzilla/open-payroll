import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import ColillaTable from "./ColillaTable";

const Colilla = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ height: "75vh" }}>
        <ColillaTable />
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Colilla;
