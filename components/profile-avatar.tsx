import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface IProfileData {
  _id: string;
  imgSrc: string;
  firstName: string;
  lastName: string;
}

interface IProfile {
  profile: IProfileData;
}

const ProfileAvatar: React.FC<IProfile> = ({ profile }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={profile.imgSrc} alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="z-[9999]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/profile/${profile._id}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;
