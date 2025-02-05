const Loader = () => {
  return (
    <div className="h-screen w-screen bg-white dark:bg-black loading">
      <div className="flex h-screen  items-center justify-center ">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
