import { Link, useLocation } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="py-8">
      <nav className="flex gap-8">
        <Link
          to="/"
          className={twMerge(
            "w-36 text-lg font-semibold text-gray-500 hover:text-red-600",
            pathname === "/" && "text-red-600",
          )}
        >
          Create Flashcard
        </Link>
        <Link
          to="/show"
          className={twMerge(
            "w-36 text-lg font-semibold text-gray-500 hover:text-red-600",
            pathname === "/show" && "text-red-600",
          )}
        >
          Show Flashcard
        </Link>
      </nav>
      <div className="relative">
        <div className="mt-2 h-1 w-full rounded-full bg-slate-200"></div>
        <div
          className={twMerge(
            "absolute top-0 h-1 w-36 rounded-full bg-red-600",
            pathname === "/" && "left-0",
            pathname === "/show" && "left-[170px]",
          )}
        ></div>
      </div>
    </header>
  );
}
