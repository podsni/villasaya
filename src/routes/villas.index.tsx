import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Palmtree,
  MessageCircle,
} from "lucide-react";
import {
  AREAS,
  CATEGORIES,
  AMENITIES,
  PRICE_MIN,
  PRICE_MAX,
  filterVillas,
} from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";
import { VillaFilters, type FilterValues } from "@/components/VillaFilters";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const sortSchema = z.enum(["recommended", "price-asc", "price-desc", "rating"]);

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  area: fallback(z.array(z.enum(AREAS)), []).default([]),
  category: fallback(z.array(z.enum(CATEGORIES)), []).default([]),
  amenity: fallback(z.array(z.enum(AMENITIES)), []).default([]),
  minPrice: fallback(z.number().int(), PRICE_MIN).default(PRICE_MIN),
  maxPrice: fallback(z.number().int(), PRICE_MAX).default(PRICE_MAX),
  guests: fallback(z.number().int().min(1).max(20), 1).default(1),
  sort: fallback(sortSchema, "recommended").default("recommended"),
});

export const Route = createFileRoute("/villas/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Daftar Villa di Batu — Apamurahbanget" },
      {
        name: "description",
        content:
          "Cari villa di Batu sesuai area, harga, dan fasilitas. Pesan langsung lewat WhatsApp.",
      },
      { property: "og:title", content: "Daftar Villa di Batu — Apamurahbanget" },
      {
        property: "og:description",
        content: "Jelajahi semua villa di Batu dengan filter dan pencarian cepat.",
      },
    ],
  }),
  component: VillasList,
});

function VillasList() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [qInput, setQInput] = useState(search.q);

  const values: FilterValues = {
    areas: search.area,
    categories: search.category,
    amenities: search.amenity,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    guests: search.guests,
    sort: search.sort,
  };

  const results = useMemo(
    () =>
      filterVillas({
        q: search.q,
        areas: search.area,
        categories: search.category,
        amenities: search.amenity,
        minPrice: search.minPrice,
        maxPrice: search.maxPrice,
        guests: search.guests,
        sort: search.sort,
      }),
    [search],
  );

  const activeCount =
    search.area.length +
    search.category.length +
    search.amenity.length +
    (search.minPrice !== PRICE_MIN ? 1 : 0) +
    (search.maxPrice !== PRICE_MAX ? 1 : 0) +
    (search.guests !== 1 ? 1 : 0);

  const handleFilterChange = (next: Partial<FilterValues>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...(next.areas !== undefined && { area: next.areas as never }),
        ...(next.categories !== undefined && { category: next.categories as never }),
        ...(next.amenities !== undefined && { amenity: next.amenities as never }),
        ...(next.minPrice !== undefined && { minPrice: next.minPrice }),
        ...(next.maxPrice !== undefined && { maxPrice: next.maxPrice }),
        ...(next.guests !== undefined && { guests: next.guests }),
        ...(next.sort !== undefined && { sort: next.sort }),
      }),
      replace: true,
    });
  };

  const handleReset = () => {
    navigate({
      search: {
        q: "",
        area: [],
        category: [],
        amenity: [],
        minPrice: PRICE_MIN,
        maxPrice: PRICE_MAX,
        guests: 1,
        sort: "recommended",
      },
      replace: true,
    });
    setQInput("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <Palmtree className="h-5 w-5" />
            </div>
            <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline sm:text-[17px]">
              Apa<span className="text-primary">murahbanget</span>
            </span>
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: (prev) => ({ ...prev, q: qInput }), replace: true });
            }}
            className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-[var(--shadow-soft)] sm:max-w-md"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              type="search"
              placeholder="Cari villa, area, fasilitas…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {qInput && (
              <button
                type="button"
                onClick={() => {
                  setQInput("");
                  navigate({ search: (prev) => ({ ...prev, q: "" }), replace: true });
                }}
                className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                aria-label="Bersihkan"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke beranda
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Villa di Batu
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {results.length} villa ditemukan{search.q && ` untuk "${search.q}"`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </button>
            <select
              value={search.sort}
              onChange={(e) =>
                navigate({
                  search: (prev) => ({ ...prev, sort: e.target.value as never }),
                  replace: true,
                })
              }
              className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="recommended">Rekomendasi</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Termahal</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5">
              <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
            </div>
          </aside>

          <section>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  Tidak ada villa yang cocok
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coba ubah filter, atau chat tim kami untuk rekomendasi.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={handleReset}
                    className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Reset Filter
                  </button>
                  <WhatsAppButton
                    message="Halo, saya butuh bantuan cari villa di Batu sesuai preferensi saya."
                    label="Konsultasi WA"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {results.map((v) => (
                  <VillaCard key={v.slug} villa={v} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">Filter Villa</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Tutup"
                className="grid h-9 w-9 place-items-center rounded-md text-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
            </div>
            <div className="border-t border-border p-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Lihat {results.length} Villa
              </button>
            </div>
          </div>
        </div>
      )}

      <a
        href="https://wa.me/6281336664592?text=Halo%20Apamurahbanget%2C%20saya%20mau%20tanya%20villa%20di%20Batu."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat WhatsApp</span>
      </a>
    </main>
  );
}