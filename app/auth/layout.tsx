export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex items-center justify-between">
      <div className="w-1/2 h-full flex justify-center items-center">
        {children}
      </div>
      <div
        style={{
          backgroundImage: "url('/images/bg/auth_bg.webp')",
          backgroundSize: "cover",
        }}
        className="w-1/2 bg-black h-full"
      />
    </div>
  );
}
