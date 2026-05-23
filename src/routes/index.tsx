import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-apartment.jpg";
import apt1 from "@/assets/apt-1.jpg";
import apt2 from "@/assets/apt-2.jpg";
import apt3 from "@/assets/apt-3.jpg";
import {
  Search,
  MapPin,
  CalendarDays,
  BedDouble,
  ShieldCheck,
  Sparkles,
  Building2,
  Heart,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const locations = [
  { name: "Jakarta Selatan", from: "Rp 4 jt", count: "1.240 unit" },
  { name: "Jakarta Pusat", from: "Rp 5 jt", count: "890 unit" },
  { name: "Jakarta Barat", from: "Rp 3 jt", count: "1.020 unit" },
  { name: "Tangerang", from: "Rp 2,5 jt", count: "760 unit" },
  { name: "Bekasi", from: "Rp 2 jt", count: "540 unit" },
];

const apartments = [
  {
    img: apt1,
    tag: "Populer",
    name: "Veranda Residence",
    address: "Jl. TB Simatupang No. 88, Jakarta Selatan",
    rating: 4.7,
    reviews: 120,
    specs: ["2 KT", "1 KM", "65 m²", "Semi Furnished"],
    chips: ["Kolam Renang", "Gym", "Keamanan 24 Jam", "Parkir"],
    price: "Rp 6.500.000",
  },
  {
    img: apt2,
    tag: "Baru",
    name: "The Kensington Suites",
    address: "Jl. Rasuna Said No. 2, Jakarta Selatan",
    rating: 4.8,
    reviews: 90,
    specs: ["2 KT", "1 KM", "72 m²", "Furnished"],
    chips: ["Rooftop", "Gym", "Parkir"],
    price: "Rp 7.120.000",
  },
  {
    img: apt3,
    tag: "Hemat",
    name: "The Belltown Apartment",
    address: "Jl. Mega Kuningan Barat No. 3, Jakarta Selatan",
    rating: 4.5,
    reviews: 71,
    specs: ["1 KM", "1 KM", "75 m²", "Semi Furnished"],
    chips: ["Kolam Renang", "Gym", "Parkir"],
    price: "Rp 8.100.000",
  },
];

const stats = [
  { value: "10.000+", label: "Unit Apartemen" },
  { value: "98%", label: "Penghuni Puas" },
  { value: "5.000+", label: "Review Positif" },
  { value: "24/7", label: "Layanan Bantuan" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <Building2 className="h-5 w-5" />
      </div>
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        Apa<span className="text-primary">murahbanget</span>
      </span>
    </Link>
  );
}

function Nav() {
  const items = ["Cari Apartemen", "Sewa Jangka Panjang", "Panduan", "Tentang Kami"];
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((i) => (
            <a
              key={i}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary sm:inline-flex">
            Masuk
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90">
            Daftar
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchBar() {
  const fieldClass =
    "flex flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-secondary/60 border-r border-border last:border-r-0";
  const labelClass = "text-[11px] font-medium uppercase tracking-wide text-muted-foreground";
  const valueClass = "text-sm font-medium text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-card md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        <button className={fieldClass}>
          <span className={labelClass}>
            <MapPin className="mr-1 inline h-3 w-3" /> Lokasi
          </span>
          <span className={valueClass}>Jakarta Selatan</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <CalendarDays className="mr-1 inline h-3 w-3" /> Check-in
          </span>
          <span className={valueClass}>12 Jun 2026</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <CalendarDays className="mr-1 inline h-3 w-3" /> Check-out
          </span>
          <span className={valueClass}>19 Jun 2026</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <BedDouble className="mr-1 inline h-3 w-3" /> Tipe Unit
          </span>
          <span className={valueClass}>Semua Tipe</span>
        </button>
        <div className="col-span-2 p-2 md:col-span-1">
          <button className="inline-flex h-full w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90">
            <Search className="h-4 w-4" />
            Cari Apartemen
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-10">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroImg}
            alt="Interior apartemen modern dengan pemandangan kota Jakarta"
            width={1920}
            height={1080}
            className="h-[560px] w-full object-cover md:h-[620px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 md:px-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Lebih dari 10.000 unit terverifikasi
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
                Sewa Apartemen
                <br />
                Jadi Lebih Mudah.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
                Temukan apartemen ideal di lokasi terbaik dengan harga paling pas untukmu.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-4 md:-mt-20">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Lokasi Populer
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mulai pencarian dari kota dan kawasan paling diminati.
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {locations.map((l) => (
          <a
            key={l.name}
            href="#"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="pt-12">
              <h3 className="text-base font-semibold text-foreground">{l.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{l.count}</p>
              <p className="mt-4 text-sm font-medium text-primary">Mulai {l.from}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Dipercaya oleh ribuan penghuni
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-border pl-5 first:border-l-0 first:pl-0 md:border-l">
              <div className="text-3xl font-semibold tracking-tight text-foreground tabular-nums md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Apartments() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Rekomendasi untukmu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Unit pilihan dari pemilik terverifikasi.
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {apartments.map((a) => (
          <article
            key={a.name}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={a.img}
                alt={a.name}
                width={800}
                height={600}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                {a.tag}
              </span>
              <button
                aria-label="Simpan"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur transition-colors hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{a.address}</p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  <Star className="h-3 w-3 fill-current text-primary" />
                  {a.rating} <span className="text-muted-foreground">({a.reviews})</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {a.specs.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <div className="text-lg font-semibold text-foreground tabular-nums">
                    {a.price}
                  </div>
                  <div className="text-xs text-muted-foreground">/bulan</div>
                </div>
                <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  Lihat Detail <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const points = [
    "Pilihan unit terlengkap dengan filter spesifik",
    "Harga terbaik & transparan tanpa biaya tersembunyi",
    "Proses sewa mudah, booking dalam hitungan menit",
    "Layanan pelanggan 24/7 untuk setiap kebutuhanmu",
  ];
  return (
    <section className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Mengapa Apamurahbanget
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Pengalaman sewa apartemen
            <br />
            yang dirancang untukmu.
          </h2>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Dari pencarian hingga booking, semuanya dirancang untuk memberikan pengalaman
            terbaik dalam menyewa apartemen di Indonesia.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
              Mulai Cari <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Pelajari Lebih
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={apt2} alt="" loading="lazy" className="h-56 w-full object-cover" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-3xl font-semibold tabular-nums text-foreground">4,9</div>
              <div className="mt-1 flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Rating rata-rata dari 5.000+ ulasan penghuni terverifikasi.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-10">
            <div className="rounded-2xl border border-border bg-card p-5">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">Diverifikasi 100%</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap unit dan pemilik melewati proses verifikasi ketat.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={apt3} alt="" loading="lazy" className="h-56 w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Apamurahbanget",
      links: ["Tentang Kami", "Karier", "Pers", "Kontak"],
    },
    {
      title: "Layanan",
      links: ["Cari Apartemen", "Sewa Jangka Panjang", "Untuk Pemilik", "Panduan"],
    },
    {
      title: "Bantuan",
      links: ["Pusat Bantuan", "Kebijakan Privasi", "Syarat & Ketentuan", "FAQ"],
    },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Temukan rumah terbaik untukmu hari ini.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Apamurahbanget. Semua hak dilindungi.</span>
          <span>Dibuat dengan teliti di Jakarta.</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Locations />
      <Stats />
      <Apartments />
      <Experience />
      <Footer />
    </main>
  );
}
