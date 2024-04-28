import BackgroundPattern from "@/components/background-pattern";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="w-full h-full flex justify-center items-center py-20 z-10">
        {children}
      </div>
      <BackgroundPattern/>
    </div>
  );
}
