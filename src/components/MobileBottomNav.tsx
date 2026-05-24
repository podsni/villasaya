import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, CalendarCheck } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

type Item = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  href?: string;
  match: (path: string) => boolean;
};

const items: Item[] = [
  { key: "home", label: "Beranda", icon: Home, to: "/", match: (p) => p === "/" },
  {
    key: "search",
    label: "Cari",
    icon: Search,
    to: "/villas",
    match: (p) => p.startsWith("/villas"),
  },
  {
    key: "fav",
    label: "Favorit",
    icon: Heart,
    to: "/villas",
    match: () => false,
  },
  {
    key: "book",
    label: "Booking",
    icon: CalendarCheck,
    href: waLink("Halo Apamurahbanget, saya mau booking villa di Batu."),
    match: () => false,
  },
];

export function MobileBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map((it) => {
          const active = it.match(path);
          const Icon = it.icon;
          const content = (
            <>
              <span
                className={
                  "grid h-9 w-14 place-items-center rounded-full transition-colors " +
                  (active ? "bg-secondary text-primary" : "text-foreground")
                }
              >
                <Icon className="h-5 w-5" />
              </span>
              <span
                className={
                  "mt-0.5 text-[11px] " +
                  (active ? "font-semibold text-primary" : "text-muted-foreground")
                }
              >
                {it.label}
              </span>
            </>
          );

          return (
            <li key={it.key} className="flex">
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full flex-col items-center justify-center py-1"
                >
                  {content}
                </a>
              ) : (
                <Link
                  to={it.to!}
                  className="flex w-full flex-col items-center justify-center py-1"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}