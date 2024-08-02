import PageHeader from "@/components/page-header";
import SideNavigation from "@/containers/side-navigation";

export default function StudentsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideNavigation />
      <div className="w-full h-screen py-6 pr-10">
        <div className="border rounded-xl bg-white px-10 pb-10 h-full">
          <PageHeader>Students</PageHeader>
          <div className="h-[80%] overflow-y-scroll p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
