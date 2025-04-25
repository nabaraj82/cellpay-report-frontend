import {
  FiUsers,
  FiHome,
  FiSettings,
} from "react-icons/fi";
import { SCREEN } from "../constants/screen";
import { privateRoutes } from "../routes/privateRoutes";
import { MODULE } from "../constants/module";

export const NAV_ITEMS = [
  {
    Icon: FiHome, 
    size: 20,
    text: "Dahboard",
    path: "/",
  },
 
  {
    Icon: FiUsers,
    size: 20,
    screenName: SCREEN.USERMANAGEMENT,
    text: "User Management",
    path: "",
    children: [
      {
        text: "Users Setup",
        moduleName: MODULE.USERSETUP,
        path: privateRoutes.userSetup,
      },
      {
        text: "Role Setup",
        moduleName: MODULE.ROLESETUP,
        path: privateRoutes.roleSetup,
      },
    ],
  },
  {
    Icon: FiSettings,
    size: 20,
    screenName: SCREEN.SCREENMODULEPRIVILEGE,
    text: "Screen-Module Setup",
    path: "",
    children: [
      {
        text: "Screen Setup",
        moduleName: MODULE.SCREEN,
        path: privateRoutes.screenSetup,
      },
      {
        text: "Module Setup",
        moduleName: MODULE.MODULE,
        path: privateRoutes.moduleSetup,
      },
      {
        text: "Privilage Setup",
        moduleName: MODULE.PRIVILEGE,
        path: privateRoutes.privilegeSetup,
      },
    ],
  },
];
