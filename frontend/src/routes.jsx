import Dashboard from "./layouts/dashboard";

// @mui icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";

//
import HomeIcon from "@mui/icons-material/Home";
import Trabajadores from "./components/Trabajadores/Trabajadores";
import Jornadas from "./components/Jornadas/Jornadas";
import Colilla from "./components/Colilla/Colilla";
import Planilla from "./components/Planilla";
import Formulario from "./components/Formulario";
import Grupos from "./components/Grupos/Grupos";

const routes = [
  {
    type: "collapse",
    name: "Inicio",
    key: "inicio",
    icon: <HomeIcon />,
    route: "/inicio",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Trabajadores",
    key: "trabajadores",
    icon: <PeopleAltIcon />,
    route: "/trabajadores",
    component: <Trabajadores />,
  },
  {
    type: "collapse",
    name: "Grupos",
    key: "grupos",
    icon: <GroupsIcon />,
    route: "/grupos",
    component: <Grupos />,
  },
  // {
  //   type: "collapse",
  //   name: "Formulario",
  //   key: "formulario",
  //   icon: <ArticleIcon />,
  //   route: "/formulario",
  //   component: <Formulario />,
  // },
  {
    type: "collapse",
    name: "Jornadas",
    key: "jornadas",
    icon: <WorkIcon />,
    route: "/jornadas",
    component: <Jornadas />,
  },
  {
    type: "collapse",
    name: "Colilla",
    key: "colilla",
    icon: <AssignmentIcon />,
    route: "/colilla",
    component: <Colilla />,
  },
  // {
  //   type: "collapse",
  //   name: "Planilla",
  //   key: "planilla",
  //   icon: <RequestPageIcon />,
  //   route: "/planilla",
  //   component: <Planilla />,
  // },

  // {
  //   route: "/jijija",
  //   component: <p>jijija</p>,
  // },
];

export default routes;
