import PageHeader from "@/components/page-header";
import SideNavigation from "@/containers/side-navigation";

export default function JournalsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNavigation />
      <div className="w-full ml-[200px] px-10 py-4 h-screen">
        <PageHeader>Journals</PageHeader>
        <div className="h-[80%] overflow-y-scroll">{children}</div>
      </div>
    </>
  );
}
