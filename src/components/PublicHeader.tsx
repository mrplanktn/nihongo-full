import { Link, useLocation } from "react-router-dom";
import { APP_NAME } from "@/lib/constants";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const levels = [
  { path: "/n5", label: "N5", color: "text-emerald-600" },
  { path: "/n4", label: "N4", color: "text-blue-600" },
  { path: "/n3", label: "N3", color: "text-violet-600" },
  { path: "/n2", label: "N2", color: "text-amber-600" },
  { path: "/n1", label: "N1", color: "text-rose-600" },
];

export function PublicHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="size-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">語</span>
            </div>
            <span className="hidden sm:inline font-bold">{APP_NAME}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {levels.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === l.path
                    ? `${l.color} bg-muted`
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-wrap gap-2">
            {levels.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === l.path
                    ? `${l.color} bg-muted`
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
