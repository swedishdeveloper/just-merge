const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full absolute top-0 left-0 z-1 bg-darkGreen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <h1 className="text-xl text-softWhite mt-10">Generating pull requests...</h1>
    </div>
  );
};

export default Loading;
