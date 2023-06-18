// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
