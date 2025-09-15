const SideBar = ({
  route,
  set_route,
}: {
  route: string;
  set_route: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleRouteChange = (new_route: string) => {
    set_route(new_route);
  };
  return (
    <div className="flex md:flex-col flex-row md:w-[300px] items-center md:justify-start justify-between w-full pt-4 px-2">
      <div><h2 className="font-bold text-2xl text-center">Helper</h2></div>
      <div className="flex md:flex-col  flex-row  md:gap-4 gap-4 px-4 md:mt-4 mt-0">
        <p
          onClick={() => handleRouteChange("email")}
          className={`text-lg md:px-8 px-0 py-1 rounded cursor-pointer ${
            route === "email" &&
            "bg-white md:bg-blue-100 text-blue-400 md:text-black"
          }`}
        >
          Mailer
        </p>
        <p
          onClick={() => handleRouteChange("cover_letter")}
          className={`text-lg md:px-4 px-0 py-1 rounded cursor-pointer ${
            route === "cover_letter" &&
            "bg-white md:bg-blue-100 text-blue-400 md:text-black"
          }`}
        >
          Cover Letter
        </p>
      </div>
    </div>
  );
};

export default SideBar;
