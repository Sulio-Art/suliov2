import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", link: "/user/123/dashboard" },
    { name: "Artwork Management", link: "/user/123/artwork-management" },
    { name: "Settings", link: "/settings" },
    { name: "Profile", link: "/profile" },
    { name: "Logout", link: "/logout" },
  ];
  return (
    <>
      <div className="max-w-[270px] w-full bg-gradient-to-b from-[#293056] to-black h-screen lg:flex flex-col overflow-y-auto  hidden shadow-xl">
        <div className="flex flex-col items-center py-6">
          <h1 className="text-white text-2xl font-bold mb-4">Sulio AI</h1>
          <ul className="w-full">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <a
                  href={item.link}
                  className="text-white hover:text-[#2823FF] transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto mb-6">
            <p className="text-gray-400 text-sm">© 2023 Sulio AI</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
