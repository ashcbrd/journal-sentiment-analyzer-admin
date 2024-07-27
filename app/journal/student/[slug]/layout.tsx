export default function JournalPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full h-screen px-10 py-10">{children}</div>;
}
