import PageHeader from "@/components/page-header";
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
        <div className="border rounded-xl bg-white px-10 h-full pb-6 overflow-hidden">
          <PageHeader>Dashboard</PageHeader>
          <div className="h-[80%] px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
