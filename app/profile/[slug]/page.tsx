"use client";

import BackButtonClient from "@/components/back-button-client";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/context/user-context";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

// function getData(id: string) {
//   const response = axiosInstance
//     .get(`/admin/${id}`, {})
//     .then((response) => {
//       let result = response;
//       return result;
//     })
//     .catch((error) => {
//       console.log("Error", error);
//     });

//   return response;
// }

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  const { user } = useUser();

  usePublicRouteRedirect();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[60%] h-max bg-white rounded-lg shadow-md shadow-zinc-100 p-10 relative">
        <BackButtonClient
          variant="outline"
          className="absolute left-0 -top-16"
        />
        <div className="flex justify-between">
          <h2 className="text-primary text-3xl font-semibold">
            Profile Details
          </h2>
          <Button className="px-6">Edit</Button>
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          <div>
            <p className="text-xl">
              Name:{" "}
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xl">
              Email: <span className="font-semibold">{user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
