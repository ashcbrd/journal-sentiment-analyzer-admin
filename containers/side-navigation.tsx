"use client";

import { HiMiniUserGroup } from "react-icons/hi2";
import { IoIosJournal } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { usePathname } from "next/navigation";

import navliks from "../data/navlinks.json";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileAvatar from "@/components/profile-avatar";
import { useUser } from "@/context/user-context";

const icons = [
  <HiMiniUserGroup key="userGroupIcon" size={30} />,
  <IoIosJournal key="journalIcon" size={30} />,
  <AiFillMessage key="chatIcon" size={30} />,
];

const SideNavigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="h-screen z-[999] w-[120px] p-4 fixed">
      <div className="h-full flex flex-col items-center justify-between p-4 bg-white shadow-lg shadow-gray-200 rounded-lg">
        <div className="flex flex-col gap-y-4">
          {navliks.data.map((item, index) => {
            const isActive = pathname.includes(item.url);
            return (
              <Link
                href={item.url}
                key={index}
                className={`rounded-lg h-16 w-16 flex items-center justify-center ${
                  isActive ? "bg-primary text-white" : ""
                }`}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{icons[index]}</TooltipTrigger>
                    <TooltipContent align="start">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            );
          })}
        </div>
        <ProfileAvatar user={user} />
      </div>
    </nav>
  );
};

export default SideNavigation;
