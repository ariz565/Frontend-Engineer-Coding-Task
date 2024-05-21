import { Link, useLocation } from "react-router-dom";

// Define the menu items for the sidebar
const menuItems = [
  {
    id: 1,
    name: "Contacts",
    link: "/contacts",
  },
  {
    id: 2,
    name: "Charts and Maps",
    link: "/",
  },
];

// Define the Sidebar component
const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="lg:w-[250px] w-full bg-grayLight lg:h-screen h-[56px] flex lg:flex-col flex-row justify-center items-center gap-10">
      {menuItems.map((item: any) => (
        <Link key={item?.id} to={item?.link}>
          <p
            className={`lg:text-lg font-medium cursor-pointer uppercase tracking-widest lg:w-[140px] ${
              pathname === item?.link ? "text-indigo-500" : ""
            }`}
          >
            {item?.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
