"use client";

import { usePathname } from "next/navigation";

import navliks from "../data/navlinks.json";
import Link from "next/link";

const SideNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="h-screen z-[999] min-w-[240px] p-4 fixed">
      <div className="h-full bg-white shadow-lg shadow-gray-200 rounded-lg">
        <div className="flex flex-col gap-y-4 p-4">
          {navliks.data.map((item, index) => {
            const isActive = pathname.includes(item.url);
            return (
              <Link
                href={item.url}
                key={index}
                className={`rounded-md py-2 px-4 ${
                  isActive ? "bg-primary text-white" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
