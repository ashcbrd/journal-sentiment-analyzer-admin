const Spinner = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-2 animate-pulse">
        <div className="w-20 h-20 rounded-full border-[10px] border-dotted border-black animate-spin transition-animate duration-1500" />
        <p className="text-xl">{label}</p>
      </div>
    </div>
  );
};

export default Spinner;
