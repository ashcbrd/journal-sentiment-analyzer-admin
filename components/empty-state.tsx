const EmptyState = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-max w-max">{children}</div>
    </div>
  );
};

export default EmptyState;
