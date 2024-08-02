import PageHeader from "@/components/page-header";
import Search from "@/components/search";
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
      <div className="w-full h-screen py-6 pr-10">
        <div className="border rounded-xl bg-white px-10 pb-28 h-full overflow-hidden">
          <PageHeader>Journals</PageHeader>
          <div className="px-4">
            <Search placeholder="Search Journal..." />
            <Separator className="mt-4" />
          </div>
          <div className="h-[80%] overflow-y-scroll px-4 pb-4 mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
