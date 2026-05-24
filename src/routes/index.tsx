import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-villa-batu.jpg";
import villa2 from "@/assets/villa-2.jpg";
import villa3 from "@/assets/villa-3.jpg";
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  ShieldCheck,
  Sparkles,
  Palmtree,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Mountain,
  MessageCircle,
  Instagram,
  Music2,
  Phone,
  Search,
} from "lucide-react";
import { WA_NUMBER, WA_DISPLAY, IG_URL, TIKTOK_URL, waLink } from "@/lib/whatsapp";
import { getFeaturedVillas, PRICE_MIN, PRICE_MAX } from "@/data/villas";
import type { Area } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";

const DEFAULT_SEARCH = {
  q: "",
  area: [] as Area[],
  category: [],
  amenity: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  guests: 1,
  sort: "recommended" as const,
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Apamurahbanget — Sewa Villa Terbaik di Batu Malang" },
      {
        name: "description",
        content:
          "Temukan villa terbaik di Batu untuk liburan Anda. Properti terseleksi, harga jujur, pesan cepat lewat WhatsApp.",
      },
    ],
  }),
});

const areas = [
  { name: "Songgoriti" as Area, from: "Rp 850 rb", desc: "Villa kolam pribadi" },
  { name: "Batu Kota" as Area, from: "Rp 1,1 jt", desc: "Dekat pusat kota" },
  { name: "Bumiaji" as Area, from: "Rp 1,7 jt", desc: "View pegunungan" },
  { name: "Pujon" as Area, from: "Rp 950 rb", desc: "Sejuk & tenang" },
  { name: "Coban Rondo" as Area, from: "Rp 1,4 jt", desc: "Dekat wisata" },
];

const stats = [
  { value: "120+", label: "Villa Pilihan" },
  { value: "98%", label: "Tamu Puas" },
  { value: "5.000+", label: "Tamu Menginap" },
  { value: "24/7", label: "Respons Cepat" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <Palmtree className="h-5 w-5" />
      </div>
      <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-foreground">
        Apa<span className="text-primary">murahbanget</span>
      </span>
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const waHref = waLink("Halo Apamurahbanget, saya mau tanya ketersediaan villa di Batu.");
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/villas"
            search={DEFAULT_SEARCH}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            Semua Villa
          </Link>
          <a
            href="#areas"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            Area
          </a>
          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            Tentang
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            Kontak
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="h-4 w-4" /> Hubungi Kami
          </a>
          <button
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/50 bg-background animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col">
              <Link
                to="/villas"
                search={DEFAULT_SEARCH}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-foreground transition-colors hover:text-primary"
              >
                Semua Villa
              </Link>
              <a
                href="#areas"
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-foreground hover:text-primary"
              >
                Area
              </a>
              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-foreground hover:text-primary"
              >
                Tentang
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-foreground hover:text-primary"
              >
                Kontak
              </a>
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Hubungi via WhatsApp
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  <Music2 className="h-4 w-4" /> TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroCTA() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/villas", search: { ...DEFAULT_SEARCH, q } });
      }}
      className="rounded-2xl border border-border/60 bg-card/95 p-2.5 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-3"
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari villa atau area..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <Search className="h-4 w-4" />
          <span>Cari</span>
        </button>
      </div>
    </form>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroImg}
            alt="Villa mewah di Batu Malang dengan kolam infinity menghadap perbukitan saat matahari terbenam"
            width={1920}
            height={1080}
            className="h-[400px] w-full object-cover sm:h-[520px] md:h-[600px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/35 sm:to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-start sm:inset-0 sm:items-center">
            <div className="max-w-2xl px-5 pt-10 sm:px-8 sm:pt-0 md:px-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm animate-fade-in">
                <Sparkles className="h-3.5 w-3.5" /> 120+ villa pilihan di Batu
              </span>
              <h1 className="mt-3 font-serif text-[2rem] leading-[1.1] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-[3.25rem] animate-fade-up">
                Temukan Villa Impian
                <br className="hidden sm:block" /> untuk Liburanmu di Batu.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base md:text-lg animate-fade-up delay-200">
                Properti terseleksi, harga jujur, pesan langsung.
              </p>
            </div>
          </div>
          {/* Search bar overlaid at bottom of hero on mobile */}
          <div className="absolute bottom-0 inset-x-0 px-3 pb-3 sm:hidden animate-fade-up delay-300">
            <HeroCTA />
          </div>
        </div>

        {/* Search bar below hero on desktop */}
        <div className="hidden sm:block relative z-10 mx-auto max-w-xl px-4 pt-5 animate-fade-up delay-300">
          <HeroCTA />
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="areas" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Jelajahi Area di Batu
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            Dari pegunungan hingga pusat kota — pilih suasana liburanmu.
          </p>
        </div>
        <Link
          to="/villas"
          search={DEFAULT_SEARCH}
          className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
        {areas.map((l, i) => (
          <Link
            key={l.name}
            to="/villas"
            search={{ ...DEFAULT_SEARCH, area: [l.name] }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-sky)] hover:border-primary/20 sm:p-6"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-foreground sm:text-base">{l.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{l.desc}</p>
              <p className="mt-3 text-sm font-medium text-primary">Mulai {l.from}</p>
            </div>
            <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="rounded-3xl bg-[var(--surface)] p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-2.5 text-sm text-muted-foreground">
          <ShieldCheck className="h-4.5 w-4.5 text-accent" />
          <span>Dipercaya ribuan tamu setiap bulannya</span>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Villas() {
  const featured = getFeaturedVillas(3);
  return (
    <section id="villas" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 scroll-mt-20">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Villa Rekomendasi Kami
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Properti terseleksi dari host tepercaya di Batu.
          </p>
        </div>
        <Link
          to="/villas"
          search={DEFAULT_SEARCH}
          className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
        {featured.map((v) => (
          <VillaCard key={v.slug} villa={v} />
        ))}
      </div>
      <div className="mt-8 flex justify-center sm:hidden">
        <Link
          to="/villas"
          search={DEFAULT_SEARCH}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Lihat Semua Villa <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Experience() {
  const points = [
    "Villa pilihan di Batu, sudah kami seleksi langsung",
    "Harga jujur — tanpa biaya tersembunyi",
    "Pesan cepat lewat WhatsApp, balasan menit-menitan",
    "Tim bantuan siap 24/7 selama liburanmu",
  ];
  return (
    <section id="about" className="border-t border-border/50 bg-[var(--surface)] scroll-mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Mountain className="h-3.5 w-3.5" /> Mengapa Apamurahbanget
          </span>
          <h2 className="mt-5 font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
            Liburan tenang di Batu,
            <br className="hidden sm:block" /> villa yang bisa diandalkan.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Dari memilih villa sampai check-in, semuanya kami bantu biar liburanmu jadi pengalaman
            yang tak terlupakan.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink("Halo, saya mau konsultasi villa di Batu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </a>
            <a
              href="#villas"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary"
            >
              Lihat Villa
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={villa2}
                alt="Interior villa nyaman di Batu"
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
              />
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
              <div className="font-serif text-3xl text-foreground">4,9</div>
              <div className="mt-1 flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Rata-rata dari ribuan ulasan tamu.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-8 sm:pt-10">
            <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">Diverifikasi 100%</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap villa kami seleksi langsung sebelum tayang.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={villa3}
                alt="Villa dengan pemandangan gunung di Batu"
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const waHref = waLink("Halo Apamurahbanget, saya ingin pesan villa di Batu.");
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary/8 via-[var(--surface)] to-accent/8 p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-medium text-primary">
                <MessageCircle className="h-3.5 w-3.5" /> Booking Langsung
              </span>
              <h2 className="mt-5 font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Pesan villa lewat WhatsApp — mudah dan cepat.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tim kami bantu cek ketersediaan, kirim foto detail, dan proses booking dari awal
                sampai check-in.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat di WhatsApp
                </a>
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" />
                  {WA_DISPLAY}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs text-muted-foreground">Ikuti kami:</span>
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Instagram className="h-4 w-4" /> @apamurahbanget_
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Music2 className="h-4 w-4" /> @apamurahbanget_
                </a>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                {
                  icon: BedDouble,
                  label: "Berbagai tipe villa",
                  desc: "Mulai 2 KT sampai 5+ KT untuk rombongan.",
                },
                {
                  icon: Bath,
                  label: "Fasilitas lengkap",
                  desc: "Kolam pribadi, BBQ, karaoke, dan view gunung.",
                },
                {
                  icon: Users,
                  label: "Cocok keluarga & grup",
                  desc: "Pilihan villa untuk 4 hingga 20 tamu.",
                },
              ].map((f) => (
                <li
                  key={f.label}
                  className="flex items-start gap-3.5 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{f.label}</div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sewa villa di Batu jadi mudah — properti terseleksi, pesan lewat WhatsApp.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={waLink("Halo Apamurahbanget!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Jelajahi</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#villas"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Villa di Batu
                </a>
              </li>
              <li>
                <a
                  href="#areas"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Area Populer
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Hubungi Kami</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:+${WA_NUMBER}`} className="transition-colors hover:text-primary">
                  {WA_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a
                  href={waLink("Halo Apamurahbanget!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp 24/7
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kota Batu, Jawa Timur</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row">
          <span>&copy; 2026 Apamurahbanget. Semua hak dilindungi.</span>
          <span>Dibuat dengan teliti untuk liburanmu di Batu.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Halo Apamurahbanget, saya mau tanya villa di Batu.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Apamurahbanget"
      className="fixed bottom-20 right-4 z-50 hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/25 sm:bottom-6 sm:right-6 lg:inline-flex"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Locations />
      <Stats />
      <Villas />
      <Experience />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
