import { IoLogOut } from "react-icons/io5";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { User, useUser } from "@/context/user-context";

interface IProfile {
  user: User;
}

const ProfileAvatar: React.FC<IProfile> = ({ user }) => {
  const { logout } = useUser();

  return (
    <div className="flex flex-col items-center gap-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={""} alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="z-[9999]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/profile/${user._id}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog>
        <DialogTrigger>
          <IoLogOut size={30} className="text-primary" />
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
    </div>
  );
};

export default ProfileAvatar;
