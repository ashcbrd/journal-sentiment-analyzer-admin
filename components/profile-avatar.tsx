import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/context/user-context";

const ProfileAvatar = ({ isOpen }: { isOpen?: boolean }) => {
  const { logout } = useUser();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-y-4 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center w-full ">
          <div className="flex items-center gap-x-2">
            <Avatar
              style={{ marginLeft: "4px" }}
              className="bg-zinc-500 border-2 border-zinc-200 flex items-center justify-center rounded-lg"
            >
              <p className="uppercase font-semibold text-white">
                {user?.firstName[0]}
              </p>
            </Avatar>
            <div
              className={`text-start overflow-hidden transition-all truncate ${
                isOpen ? "w-full" : "w-0"
              }`}
            >
              <p className="">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          {isOpen && (
            <ChevronsUpDown className="ml-6 text-zinc-500" size={16} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="z-[9999]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/profile/${user?._id}`}>Profile </Link>
          </DropdownMenuItem>
          <Dialog>
            <DialogTrigger className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Logout
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
              </DialogHeader>
              <Button onClick={logout} className="ml-auto">
                Log Out
              </Button>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;
