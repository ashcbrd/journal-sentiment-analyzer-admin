import SideNavigation from "@/containers/side-navigation";

export default function JournalPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full px-10 py-10">{children}</div>
    </>
  );
}
