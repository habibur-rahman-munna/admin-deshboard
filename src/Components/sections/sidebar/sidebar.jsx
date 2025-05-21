"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  BadgePoundSterling,
  ListOrdered,
  User,
  MessageSquareMore,
  InfoIcon,
} from "lucide-react";

import { usePathname } from "next/navigation";

const icon = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  ListOrdered,
  Mail,
  User,
  Bell,
  Info,
  BadgePoundSterling,
  MessageSquareMore,
  InfoIcon
};


const Sidebar = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [SidebarItems, setsidebarItems] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setsidebarItems(data.SidebarItems);
      });
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button
          onClick={() => setisSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full bg-[#2f2f2F] transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} />
        </button>
        
        <nav className="mt-8 flex-grow">
          {SidebarItems.map((item) => {
            const IconComponent = icon[item.icon];
            if (!IconComponent) return null;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                    pathName === item.href ? "bg-[#2f2f2f]" : ""
                  }`}
                >
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap text-white">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
