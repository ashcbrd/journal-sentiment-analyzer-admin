import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import SideNavigation from "@/containers/side-navigation";

export default function JournalsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideNavigation />
      <div className="h-screen py-6 pr-10 w-full">
        <div className="border rounded-xl bg-white  h-full overflow-hidden">
          <div className="h-[80%]  pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
