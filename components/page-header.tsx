const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-10 px-4 flex items-center">
      <h2 className="text-primary font-bold text-4xl">{children}</h2>
    </div>
  );
};

export default PageHeader;
