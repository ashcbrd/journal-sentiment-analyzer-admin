import BackgroundPattern from "@/components/background-pattern";

export default function ProfilePageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="relative z-10">{children}</div>
      <BackgroundPattern />
    </div>
  );
}
