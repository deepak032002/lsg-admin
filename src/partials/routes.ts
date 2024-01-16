import { IconType } from "react-icons";
import { HiOutlineHome, HiOutlinePencil, HiOutlineUsers } from "react-icons/hi";
import { TbCloudComputing } from "react-icons/tb";
import { Dashboard, PostCreate, Posts, Users } from "../pages";

interface Child {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

interface RouteWithoutChild {
  path: string;
  icon: IconType;
  name?: string;
  isHaveChild: false;
  element: () => JSX.Element;
  child?: undefined;
}

interface RouteWithChild {
  path: string;
  icon?: IconType;
  name?: string;
  isHaveChild: true;
  element?: undefined;
  child: Child[];
}

type Route = RouteWithoutChild | RouteWithChild;

let routes: Route[] = [
  {
    path: "/dashboard",
    icon: HiOutlineHome,
    name: "Dashboard",
    isHaveChild: false,
    element: Dashboard,
  },

  {
    path: "scrape",
    icon: TbCloudComputing,
    name: "Scrape",
    isHaveChild: false,
    element: Dashboard,
  },

  {
    path: "editorials",
    icon: HiOutlinePencil,
    name: "Editorials",
    isHaveChild: true,
    child: [
      {
        path: "/all",
        name: "All Editorials",
        element: Posts,
      },
      {
        path: "/create",
        name: "Create Post",
        element: PostCreate,
      },
    ],
  },

  {
    path: "users",
    icon: HiOutlineUsers,
    name: "Users",
    isHaveChild: true,
    child: [
      {
        path: "/all",
        name: "All User",
        element: Users,
      },
      {
        path: "/create",
        name: "Create User",
        element: Users,
      },
    ],
  },
];

export default routes;
