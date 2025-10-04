'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const routes = [
    { name: "Mailer", path: "/" },
    { name: "Cover Letter", path: "/cover-letter" },
  ];
  return (
    <div className="flex md:flex-col flex-row md:w-[300px] items-center md:justify-start justify-between w-full pt-4 px-2">
      <div>
        <h2 className="font-bold text-2xl text-center">Helper</h2>
      </div>
      <div className="flex md:flex-col  flex-row  md:gap-4 gap-4 px-4 md:mt-4 mt-0">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className={"text-md font-medium cursor-pointer md:px-8 px-0 py-1" + (pathname === route.path ? " bg-white md:bg-blue-100 text-blue-400 md:text-black rounded " : "")}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
