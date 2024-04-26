import BackButtonClient from "@/components/back-button-client";
import response from "../../../data/profile.json";

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  const profile = response.data;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[60%] h-[500px] bg-white rounded-lg">
        <h3 className="text-3xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h3>
      </div>
    </div>
  );
};

export default ProfilePage;
