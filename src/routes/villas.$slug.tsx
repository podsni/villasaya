import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Users,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Clock,
  Phone,
  Palmtree,
} from "lucide-react";
import { getVilla, VILLAS, formatIDR } from "@/data/villas";
import type { Villa } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WA_DISPLAY, WA_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/villas/$slug")({
  loader: ({ params }): { villa: Villa } => {
    const villa = getVilla(params.slug);
    if (!villa) throw notFound();
    return { villa };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.villa;
    if (!v) return {};
    return {
      meta: [
        { title: `${v.name} — Sewa Villa di ${v.area}, Batu` },
        {
          name: "description",
          content: `${v.name} di ${v.area}, Batu. ${v.bedrooms} kamar, ${v.guests} tamu, mulai ${formatIDR(v.price)}/malam. Pesan via WhatsApp.`,
        },
        { property: "og:title", content: `${v.name} — Apamurahbanget` },
        { property: "og:description", content: v.description },
        { property: "og:image", content: v.cover },
        { name: "twitter:image", content: v.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-foreground">Villa tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Villa yang kamu cari mungkin sudah tidak tersedia.
        </p>
        <Link
          to="/villas"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Lihat Daftar Villa
        </Link>
      </div>
    </div>
  ),
  component: VillaDetail,
});

function VillaDetail() {
  const { villa } = Route.useLoaderData();
  const similar = VILLAS.filter(
    (v) => v.slug !== villa.slug && v.area === villa.area,
  ).slice(0, 3);
  const waMessage = `Halo Apamurahbanget, saya tertarik booking ${villa.name} di ${villa.area}, Batu. Mohon info ketersediaan & cara pembayaran.`;

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <Palmtree className="h-5 w-5" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground sm:text-[17px]">
              Apa<span className="text-primary">murahbanget</span>
            </span>
          </Link>
          <Link
            to="/villas"
            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Semua Villa
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
          <img
            src={villa.images[0]}
            alt={villa.name}
            className="h-64 w-full object-cover sm:col-span-2 sm:row-span-2 sm:h-full"
          />
          {villa.images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${villa.name} ${i + 2}`}
              loading="lazy"
              className="hidden h-full w-full object-cover sm:block"
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {villa.tag}
                </span>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {villa.name}
                </h1>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {villa.area}, Batu
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1.5 text-sm font-medium text-secondary-foreground">
                <Star className="h-4 w-4 fill-current text-accent" />
                {villa.rating}
                <span className="text-muted-foreground">({villa.reviews} ulasan)</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
              <Spec icon={BedDouble} label={`${villa.bedrooms} Kamar Tidur`} />
              <Spec icon={Bath} label={`${villa.bathrooms} Kamar Mandi`} />
              <Spec icon={Users} label={`${villa.guests} Tamu`} />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Tentang Villa</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {villa.description}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Fasilitas</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {villa.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold text-foreground">Aturan Menginap</h2>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  Check-in mulai 14.00, check-out maksimal 12.00
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                  DP 50% untuk konfirmasi, pelunasan saat check-in
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-primary" />
                  Tamu sesuai kapasitas, biaya tambahan untuk extra bed
                </li>
              </ul>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-foreground tabular-nums">
                  {formatIDR(villa.price)}
                </span>
                <span className="text-sm text-muted-foreground">/ malam</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Harga dapat berubah sesuai musim & ketersediaan.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <WhatsAppButton
                  size="lg"
                  label="Pesan via WhatsApp"
                  message={waMessage}
                  className="w-full"
                />
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" /> {WA_DISPLAY}
                </a>
              </div>
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Villa diverifikasi tim Apamurahbanget
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-accent" /> Respons WhatsApp 24/7
                </p>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-14 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Villa lain di {villa.area}
              </h2>
              <Link
                to="/villas"
                search={{
                  q: "",
                  area: [villa.area],
                  category: [],
                  amenity: [],
                  minPrice: 500_000,
                  maxPrice: 4_000_000,
                  guests: 1,
                  sort: "recommended",
                }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
              {similar.map((v) => (
                <VillaCard key={v.slug} villa={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Spec({ icon: Icon, label }: { icon: typeof BedDouble; label: string }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-xs font-medium text-foreground sm:text-sm">{label}</span>
    </div>
  );
}