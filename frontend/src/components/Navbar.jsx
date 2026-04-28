import { BarChart3, Database, FileText, Home, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: Database },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/search", label: "Search", icon: Search },
  { to: "/docs", label: "API Docs", icon: FileText }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
            IN
          </span>
          <div>
            <p className="text-sm font-bold text-ink">All India Villages API</p>
            <p className="text-xs text-slate-500">B2B location intelligence platform</p>
          </div>
        </NavLink>
        <nav className="flex gap-1 overflow-x-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition ${
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={17} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
