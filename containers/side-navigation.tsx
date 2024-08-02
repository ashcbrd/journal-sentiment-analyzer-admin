"use client";

import { RiDashboardFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoIosJournal } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import navliks from "../data/navlinks.json";
import Link from "next/link";
import ProfileAvatar from "@/components/profile-avatar";
import { useUser } from "@/context/user-context";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const icons = [
  <RiDashboardFill key="dashboardIcon" size={22} />,
  <HiMiniUserGroup key="userGroupIcon" size={22} />,
  <IoIosJournal key="journalIcon" size={22} />,
  <MdEmojiEmotions key="emotionIcon" size={22} />,
  <AiFillMessage key="chatIcon" size={22} />,
];

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sideNavIsOpen") === "true";
    }
    return false;
  });

  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    localStorage.setItem("sideNavIsOpen", isOpen);
  }, [isOpen]);

  return (
    <nav
      className={`h-screen z-[999] transition-all ${
        isOpen ? "w-[300px]" : "w-[112px]"
      } p-4`}
    >
      <div className="h-full flex flex-col items-center gap-y-10 p-4 rounded-lg">
        <button
          className={`${
            isOpen ? "ml-auto" : "mx-auto"
          } px-2 py-1 rounded-md border -mb-6 border-gray-400/30 shadow shadow-gray-200/50`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft
            size={20}
            className={`transition-all text-gray-500 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
        <ProfileAvatar isOpen={isOpen} />
        <Separator />
        <div className="flex flex-col gap-y-4 w-full">
          {navliks.data.map((item, index) => {
            const isActive = pathname.includes(item.url);
            return (
              <Link
                href={item.url}
                key={index}
                className={`text-sm rounded-xl h-12 flex items-center px-3 w-full ${
                  isActive
                    ? "border shadow shadow-gray-300/50 bg-white"
                    : "hover:bg-zinc-200"
                }`}
              >
                <div className="text-zinc-800">{icons[index]}</div>
                <p
                  className={`ml-4 text-md overflow-hidden transition-all ${
                    isOpen ? "w-[80px]" : "w-0"
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
