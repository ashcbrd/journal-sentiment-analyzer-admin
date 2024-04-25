export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="w-full h-full flex justify-center items-center py-20">
        {children}
      </div>
    </div>
  );
}
