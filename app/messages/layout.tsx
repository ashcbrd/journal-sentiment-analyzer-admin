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
      <div className="ml-[100px] px-10 py-4 h-screen">
        <PageHeader>Messages</PageHeader>
        <div>{children}</div>
      </div>
    </>
  );
}
