import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap, Battery, ShieldCheck, BookOpen, Globe, Leaf, Search, Filter,
  Check, ArrowRight, Mail, MapPin, Sun, Home, Users, RefreshCw,
  BarChart3, Tag, Clock, Star, ChevronDown, Menu, X, Eye, Wrench,
  Gauge, Send, Info, TrendingUp, Phone, FileText, Thermometer,
  CircleDot, ChevronRight, ExternalLink, Recycle, Award, Heart,
  Target, Lightbulb, GraduationCap
} from "lucide-react";

// ─── Scroll Reveal ───
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Data ───
const BATTERIES = [
  { id: 1, name: "Tesla Model 3 LR Module", brand: "Tesla", type: "NMC 2170", capacity: "13.5 kWh", soh: 87, cycles: 412, year: 2020, price: 1850, status: "Verified", useCase: "Home Storage", inspected: true },
  { id: 2, name: "Nissan Leaf Gen2 Pack", brand: "Nissan", type: "NMC Pouch", capacity: "40 kWh", soh: 78, cycles: 680, year: 2019, price: 3200, status: "Verified", useCase: "Solar System", inspected: true },
  { id: 3, name: "BMW i3 Module Set", brand: "BMW", type: "NMC Prismatic", capacity: "8.8 kWh", soh: 82, cycles: 520, year: 2021, price: 1200, status: "Inspected", useCase: "Backup Power", inspected: true },
  { id: 4, name: "Hyundai Kona Cell Pack", brand: "Hyundai", type: "NMC Pouch", capacity: "64 kWh", soh: 91, cycles: 290, year: 2022, price: 5400, status: "Verified", useCase: "Industrial", inspected: true },
  { id: 5, name: "Chevrolet Bolt Module", brand: "Chevrolet", type: "NMC Pouch", capacity: "8.0 kWh", soh: 74, cycles: 750, year: 2018, price: 900, status: "Inspected", useCase: "DIY Project", inspected: false },
  { id: 6, name: "VW ID.4 Module Pack", brand: "Volkswagen", type: "NMC Prismatic", capacity: "12.0 kWh", soh: 89, cycles: 350, year: 2022, price: 1650, status: "Verified", useCase: "Home Storage", inspected: true },
  { id: 7, name: "BYD Blade Cell Array", brand: "BYD", type: "LFP Blade", capacity: "10.5 kWh", soh: 93, cycles: 200, year: 2023, price: 1400, status: "Verified", useCase: "Solar System", inspected: true },
  { id: 8, name: "Renault Zoe Module", brand: "Renault", type: "NMC Pouch", capacity: "22 kWh", soh: 71, cycles: 820, year: 2017, price: 1800, status: "Inspected", useCase: "Backup Power", inspected: false },
];

const ARTICLES = [
  { id: 1, title: "Apa itu Second-Life Battery?", cat: "Dasar", read: "4 min", summary: "Baterai second-life adalah baterai EV yang sudah tidak optimal untuk kendaraan (biasanya SoH di bawah 80%), tetapi masih memiliki kapasitas yang cukup untuk aplikasi stasioner seperti penyimpanan energi rumah, sistem tenaga surya, dan backup power.", content: "Ketika baterai kendaraan listrik mencapai State of Health (SoH) sekitar 70-80%, performanya sudah tidak lagi optimal untuk penggunaan di kendaraan yang membutuhkan daya dan densitas energi tinggi. Namun, baterai tersebut masih menyimpan kapasitas signifikan yang bisa dimanfaatkan untuk aplikasi yang lebih ringan.\n\nSecond-life battery memanfaatkan sisa kapasitas ini untuk aplikasi stasioner: penyimpanan energi rumah tangga, sistem backup, integrasi dengan panel surya, atau kebutuhan industri kecil. Proses ini melibatkan pengujian ulang, regrading, dan kadang repacking modul baterai agar sesuai dengan kebutuhan baru.\n\nBaterai lithium-ion yang digunakan dalam kendaraan listrik umumnya memiliki kapasitas awal antara 24 kWh hingga 100 kWh. Ketika SoH turun ke 70-80%, baterai masih menyimpan energi yang cukup besar. Sebagai contoh, baterai 60 kWh dengan SoH 75% masih memiliki kapasitas efektif 45 kWh — lebih dari cukup untuk kebutuhan rumah tangga selama beberapa hari.\n\nMenurut studi dari National Renewable Energy Laboratory (NREL), baterai EV second-life bisa bertahan 5-10 tahun tambahan dalam aplikasi stasioner, tergantung kondisi awal dan pola penggunaan. Ini bukan hanya menghemat biaya bagi konsumen, tetapi juga mengurangi limbah elektronik dan memperpanjang siklus hidup material baterai yang berharga seperti litium, kobalt, dan nikel." },
  { id: 2, title: "Perbedaan Reuse, Second-Life, dan Recycling", cat: "Dasar", read: "4 min", summary: "Tiga konsep penting dalam ekonomi sirkular baterai: reuse (penggunaan langsung kembali), second-life (repurposing untuk aplikasi berbeda), dan recycling (pemulihan material mentah). Ketiganya saling melengkapi dalam hierarki pengelolaan baterai bekas.", content: "Reuse berarti menggunakan baterai kembali untuk tujuan yang sama — misalnya memindahkan baterai dari satu EV ke EV lain, atau mengganti modul yang rusak dalam sebuah pack. Ini hanya cocok jika kondisi baterai masih sangat baik (SoH > 85%) dan kompatibel dengan kendaraan tujuan.\n\nSecond-life mengacu pada repurposing baterai untuk aplikasi berbeda yang membutuhkan performa lebih rendah. Contohnya: baterai EV yang SoH-nya 75% dipasang sebagai energy storage di rumah. Aplikasi stasioner tidak memerlukan power density setinggi kendaraan, sehingga baterai dengan kapasitas menurun masih sangat berguna.\n\nRecycling adalah proses akhir di mana material baterai (litium, kobalt, nikel, mangan) diekstrak melalui proses hidrometalurgi atau pirometalurgi dan dimurnikan untuk digunakan kembali dalam produksi baterai baru. Proses ini memerlukan fasilitas khusus dan biaya operasional yang tinggi, namun penting untuk memulihkan material kritis.\n\nUrutan ideal dalam hierarki ekonomi sirkular: Reuse, Second-Life, lalu Recycle. Dengan memaksimalkan tahap reuse dan second-life, kita mengurangi kebutuhan recycling prematur, memperpanjang nilai ekonomi baterai, dan meminimalkan dampak lingkungan dari proses ekstraksi material baru." },
  { id: 3, title: "Mengenal SoH, SoC, Cycle Count, dan Kapasitas Baterai", cat: "Teknologi", read: "5 min", summary: "Parameter teknis kunci yang menentukan kondisi dan kelayakan baterai: State of Health (SoH), State of Charge (SoC), jumlah siklus (cycle count), dan kapasitas tersisa. Memahami parameter ini penting untuk evaluasi baterai bekas.", content: "State of Health (SoH) adalah indikator utama kondisi baterai, dinyatakan dalam persentase dari kapasitas asli. SoH 80% berarti baterai masih menyimpan 80% dari kapasitas saat baru. SoH dipengaruhi oleh calendar aging (penuaan alami seiring waktu) dan cyclic aging (penuaan akibat penggunaan). Ini parameter terpenting dalam evaluasi second-life battery.\n\nState of Charge (SoC) menunjukkan berapa persen energi yang tersisa pada saat pengukuran — seperti indikator bensin pada kendaraan konvensional. SoC bervariasi setiap waktu tergantung penggunaan, sedangkan SoH menurun secara gradual dan tidak dapat dikembalikan.\n\nCycle count menghitung berapa kali baterai telah melalui siklus charge-discharge penuh (0-100%). Satu siklus penuh bisa terdiri dari beberapa siklus parsial. Baterai NMC (Nickel Manganese Cobalt) umumnya bertahan 1.000-2.000 siklus penuh, sedangkan LFP (Lithium Iron Phosphate) bisa mencapai 3.000-5.000 siklus. Semakin rendah cycle count relatif terhadap batas usia kimianya, semakin banyak sisa umur.\n\nKapasitas tersisa (dalam kWh) adalah jumlah energi yang benar-benar bisa disimpan, dihitung dari kapasitas nominal asli dikalikan SoH. Baterai 60 kWh dengan SoH 75% masih menyimpan sekitar 45 kWh — lebih dari cukup untuk banyak aplikasi stasioner seperti home storage atau backup power." },
  { id: 4, title: "Kapan Baterai EV Masih Layak Digunakan Kembali?", cat: "Keamanan", read: "4 min", summary: "Tidak semua baterai bekas layak untuk second-life. Faktor seperti SoH minimum, kondisi fisik, riwayat kerusakan, dan keseragaman sel menentukan apakah baterai aman dan ekonomis untuk direpurpose.", content: "Baterai dianggap layak second-life jika memenuhi beberapa kriteria utama: SoH masih di atas 65-70%, tidak ada kerusakan fisik pada casing atau sel, tidak pernah mengalami thermal event (overheat atau kebakaran), dan sel-sel di dalamnya masih relatif seragam kapasitasnya (cell imbalance kurang dari 5%).\n\nBaterai yang mengalami deep discharge berulang (SoC di bawah 10% secara rutin), terkena air atau kelembapan berlebih, atau memiliki cell imbalance signifikan mungkin tidak aman untuk direpurpose. Inspeksi profesional menggunakan peralatan seperti battery analyzer dan thermal imaging sangat penting untuk mendeteksi masalah ini.\n\nSecara ekonomi, baterai dengan SoH di bawah 60% biasanya lebih cocok untuk recycling karena biaya repurposing (pengujian, sertifikasi, BMS baru, packaging) tidak sebanding dengan sisa umur pakainya. Baterai dengan SoH 70-80% berada di sweet spot untuk second-life application.\n\nFaktor lain yang penting dalam evaluasi kelayakan: ketersediaan Battery Management System (BMS) yang kompatibel dengan konfigurasi baru, dokumentasi riwayat penggunaan dari pemilik sebelumnya, kemudahan disassembly modul dari pack asli, dan ketersediaan suku cadang atau konektor yang diperlukan." },
  { id: 5, title: "Risiko dan Tantangan Baterai Bekas", cat: "Keamanan", read: "5 min", summary: "Baterai bekas memiliki risiko yang perlu dipahami: degradasi tidak merata, potensi thermal runaway, kesulitan diagnostik, dan keterbatasan garansi. Transparansi informasi dan inspeksi profesional adalah kunci mitigasi.", content: "Risiko utama baterai bekas meliputi beberapa aspek teknis yang perlu dipahami. Pertama, degradasi sel yang tidak merata (cell imbalance) bisa menyebabkan overcharge pada sel yang lebih lemah, meningkatkan risiko kerusakan. Kedua, potensi thermal runaway — reaksi berantai eksotermik yang bisa menyebabkan kebakaran — meningkat jika BMS (Battery Management System) tidak berfungsi optimal.\n\nTantangan lainnya termasuk: kurangnya standarisasi format dan konektor antar produsen yang menyulitkan repurposing, variasi kualitas yang signifikan antar batch produksi, kesulitan dalam melakukan pengujian non-destruktif yang komprehensif, dan masih minimnya regulasi khusus untuk pasar second-life battery di banyak negara.\n\nAkses terhadap data historis penggunaan juga menjadi kendala besar. Tanpa mengetahui bagaimana baterai digunakan sebelumnya (apakah sering di-fast charge, terpapar suhu ekstrem, atau pernah mengalami deep discharge), sulit untuk memprediksi sisa umur pakainya secara akurat.\n\nMitigasi risiko memerlukan pendekatan sistematis: inspeksi profesional dengan peralatan diagnostik yang tepat seperti impedance spectroscopy, pengujian individual setiap sel atau modul untuk mendeteksi outlier, penggunaan BMS yang sesuai dengan konfigurasi baru, serta edukasi pengguna tentang batasan dan perawatan yang benar. Platform seperti RE-VOLT hadir untuk menjembatani gap informasi ini — memastikan setiap baterai yang ditawarkan sudah melalui verifikasi dan dilengkapi data kondisi yang transparan." },
  { id: 6, title: "Use Case Terbaik untuk Second-Life Battery", cat: "Use Case", read: "5 min", summary: "Second-life battery cocok untuk berbagai aplikasi: penyimpanan energi rumah tangga, sistem backup (UPS), integrasi dengan panel surya, penyimpanan energi skala komunitas, dan kebutuhan off-grid.", content: "Penyimpanan energi rumah tangga adalah use case paling populer untuk baterai second-life. Baterai 10-15 kWh dengan SoH 75% bisa menyuplai kebutuhan listrik rata-rata rumah tangga Indonesia selama 8-12 jam, menjadikannya ideal sebagai backup saat terjadi pemadaman listrik PLN. Biaya baterai second-life bisa 40-60% lebih murah dibanding baterai baru dengan kapasitas setara.\n\nIntegrasi dengan panel surya (solar photovoltaic) memungkinkan rumah tangga menyimpan kelebihan energi yang dihasilkan di siang hari untuk digunakan malam hari, meningkatkan self-consumption rate hingga 70-80%. Baterai second-life dengan SoH 70%+ sangat cocok karena cycle rate harian yang relatif rendah (satu siklus per hari).\n\nSistem backup (UPS) untuk perangkat kritis — server kecil, peralatan medis rumah, atau sistem keamanan — memerlukan baterai dengan reliabilitas tinggi (SoH > 80%) dan cycle count rendah. Keuntungannya adalah kapasitas yang jauh lebih besar dibanding UPS konvensional berbasis lead-acid.\n\nAplikasi industri kecil dan menengah meliputi penyimpanan energi untuk workshop, penerangan area kerja, pengisian daya forklift atau peralatan, hingga peak shaving untuk mengurangi biaya listrik pada jam puncak. Baterai dengan kapasitas besar (40+ kWh) meski SoH sedang (65-75%) masih sangat berguna untuk aplikasi ini.\n\nProyek off-grid di daerah terpencil yang belum terjangkau jaringan listrik juga bisa memanfaatkan baterai second-life yang dipasangkan dengan panel surya atau turbin angin kecil, memberikan akses listrik yang lebih terjangkau dibanding solusi diesel generator." },
];

const FAQ_DATA = [
  { q: "Apa itu second-life battery?", a: "Second-life battery adalah baterai kendaraan listrik yang sudah tidak optimal untuk kendaraan (SoH < 80%) tetapi masih memiliki kapasitas yang cukup untuk aplikasi stasioner seperti penyimpanan energi rumah, sistem tenaga surya, dan backup power." },
  { q: "Apakah baterai bekas aman digunakan?", a: "Ya, selama melalui proses inspeksi dan verifikasi yang benar. Setiap baterai di RE-VOLT telah diuji kondisi fisik, kapasitas, dan keselamatan oleh profesional sebelum ditawarkan." },
  { q: "Berapa lama baterai second-life bisa bertahan?", a: "Tergantung kondisi awal dan pola penggunaan, umumnya 5-10 tahun tambahan untuk aplikasi stasioner." },
  { q: "Bagaimana cara mengetahui kondisi baterai?", a: "Gunakan fitur Battery Checker kami untuk mengevaluasi kelayakan baterai berdasarkan SoH, cycle count, umur, dan jenis penggunaan sebelumnya." },
  { q: "Apakah RE-VOLT menjual baterai langsung?", a: "RE-VOLT adalah platform marketplace terkurasi. Kami menghubungkan pembeli dengan penjual terverifikasi." },
  { q: "Apa yang membedakan RE-VOLT dari marketplace biasa?", a: "RE-VOLT fokus pada verifikasi, transparansi data teknis, dan edukasi. Setiap baterai memiliki data SoH, cycle count, dan hasil inspeksi yang jelas." },
];

// ─── Animated Counter ───
function AnimCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── SoH Ring ───
function SoHRing({ value, size = 52 }) {
  const color = value >= 85 ? "var(--primary-container)" : value >= 70 ? "var(--accent-blue)" : value >= 60 ? "var(--accent-amber)" : "var(--error)";
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-container-high)" strokeWidth="4" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" fill="var(--on-surface)" fontSize={size * 0.22} fontWeight="700" style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>{value}%</text>
    </svg>
  );
}

// ─── GlowBar ───
function GlowBar({ value, max = 100, height = 6 }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value >= 85 ? "var(--primary-fixed-dim)" : value >= 70 ? "var(--accent-blue)" : "var(--accent-amber)";
  return (
    <div style={{ width: "100%", height, borderRadius: height, background: "var(--surface-container-high)", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: height, background: color, boxShadow: `0 0 8px ${color}44`, transition: "width 1s ease" }} />
    </div>
  );
}

// ─── 3D Battery Visual (Hero) ───
function HeroBatteryVisual() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 520, height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer glow rings */}
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(0,223,129,0.08)", animation: "pulse-glow 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(0,223,129,0.12)" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,223,129,0.06) 0%, transparent 70%)" }} />

      {/* Main battery container - glassmorphic */}
      <div style={{
        position: "relative", width: 260, height: 340, borderRadius: 32,
        background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(247,249,252,0.6) 100%)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 60px rgba(0,109,60,0.12), 0 2px 20px rgba(25,28,30,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        border: "1px solid rgba(255,255,255,0.6)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24,
        zIndex: 2
      }}>
        {/* Battery terminal */}
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 60, height: 12, borderRadius: "6px 6px 0 0", background: "linear-gradient(135deg, var(--primary-container), var(--primary))", boxShadow: "0 -2px 12px rgba(0,223,129,0.3)" }} />

        {/* Circuit board pattern */}
        <div style={{ width: "100%", flex: 1, borderRadius: 20, background: "linear-gradient(180deg, rgba(0,109,60,0.05) 0%, rgba(0,223,129,0.03) 100%)", border: "1px solid rgba(0,223,129,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 20, position: "relative", overflow: "hidden" }}>
          {/* Grid lines */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(rgba(0,109,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,109,60,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          {/* Leaf icon */}
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,223,129,0.3)", zIndex: 1 }}>
            <Leaf size={28} color="#fff" />
          </div>

          {/* Battery bars */}
          <div style={{ display: "flex", gap: 6, zIndex: 1 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: 28, height: 8 + i * 6, borderRadius: 4, background: i <= 3 ? "linear-gradient(135deg, var(--primary-container), var(--primary))" : "var(--surface-container-high)", boxShadow: i <= 3 ? "0 0 8px rgba(0,223,129,0.2)" : "none", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>

        {/* Status indicators */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary-container)", boxShadow: "0 0 8px rgba(0,223,129,0.5)", animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface-variant)", fontFamily: "var(--font-ui)" }}>Active &middot; 87% SoH</span>
        </div>
      </div>

      {/* Floating badges */}
      <div style={{
        position: "absolute", top: 60, right: 20, padding: "10px 16px", borderRadius: 16,
        background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow)",
        display: "flex", alignItems: "center", gap: 8, animation: "float 3s ease-in-out infinite", zIndex: 3
      }}>
        <Zap size={16} color="var(--primary)" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>EV Ready</span>
      </div>

      <div style={{
        position: "absolute", bottom: 80, left: 10, padding: "10px 16px", borderRadius: 16,
        background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow)",
        display: "flex", alignItems: "center", gap: 8, animation: "float 3.5s ease-in-out infinite 0.5s", zIndex: 3
      }}>
        <RefreshCw size={16} color="var(--primary)" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>Circular</span>
      </div>

      <div style={{
        position: "absolute", top: 180, left: -10, padding: "10px 16px", borderRadius: 16,
        background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow)",
        display: "flex", alignItems: "center", gap: 8, animation: "float 4s ease-in-out infinite 1s", zIndex: 3
      }}>
        <ShieldCheck size={16} color="var(--accent-blue)" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>Verified</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [detailBattery, setDetailBattery] = useState(null);
  const [detailArticle, setDetailArticle] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [account, setAccount] = useState(() => {
    try { const a = localStorage.getItem("revolt_account"); return a ? JSON.parse(a) : null; } catch { return null; }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useCallback((p, data) => {
    if (p === "battery-detail") setDetailBattery(data);
    else if (p === "article-detail") setDetailArticle(data);
    setPage(p);
    setMobileMenu(false);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "konten", label: "Content" },
    { id: "marketplace", label: "Marketplace" },
    { id: "checker", label: "Battery Checker" },
    { id: "impact", label: "Impact" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ─── NAV ─── */}
      <nav className="glass" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(247,249,252,0.85)" : "rgba(247,249,252,0.6)",
        boxShadow: scrolled ? "0 1px 20px rgba(25,28,30,0.06)" : "none",
        transition: "all 0.3s ease"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => navigate("home")}>
            <span style={{ fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 24, letterSpacing: -1, color: "var(--on-surface)" }}>
              RE<span style={{ color: "var(--primary)" }}>-</span>VOLT
            </span>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
            {navItems.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)} style={{
                padding: "8px 16px", background: "transparent", border: "none",
                borderRadius: "var(--radius-full)",
                color: page === n.id ? "var(--primary)" : "var(--on-surface-variant)",
                fontSize: 14, fontWeight: page === n.id ? 600 : 500, cursor: "pointer",
                transition: "all 0.2s", fontFamily: "inherit"
              }}>
                {n.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="desktop-nav">
            <button onClick={() => setShowAccountModal(true)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
              background: account ? "rgba(0,223,129,0.08)" : "var(--surface-container-lowest)", border: "none",
              borderRadius: "var(--radius-full)", cursor: "pointer", boxShadow: "var(--shadow-sm)",
              fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "var(--on-surface)"
            }}>
              <Globe size={16} />
              <ChevronDown size={14} />
              <span style={{ color: "var(--on-surface-muted)", margin: "0 4px" }}>/</span>
              {account ? account.name.split(" ")[0] : "Account"}
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="mobile-menu-btn" style={{
            display: "none", background: "none", border: "none", color: "var(--on-surface)",
            cursor: "pointer", padding: 8, borderRadius: "var(--radius-sm)",
            alignItems: "center", justifyContent: "center"
          }}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="glass" style={{
            position: "absolute", top: 72, left: 0, right: 0,
            background: "rgba(247,249,252,0.95)", padding: "12px 24px 24px",
            boxShadow: "0 8px 32px rgba(25,28,30,0.08)"
          }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "14px 16px",
                background: page === n.id ? "rgba(0,223,129,0.06)" : "transparent",
                border: "none", borderRadius: "var(--radius-sm)",
                color: page === n.id ? "var(--primary)" : "var(--on-surface-variant)",
                fontSize: 15, fontWeight: page === n.id ? 600 : 500, cursor: "pointer",
                fontFamily: "inherit", marginBottom: 2
              }}>
                {n.label}
              </button>
            ))}
            <div className="glow-line" style={{ margin: "8px 0" }} />
            <button onClick={() => { setMobileMenu(false); setShowAccountModal(true); }} style={{
              display: "flex", width: "100%", alignItems: "center", gap: 10, padding: "14px 16px",
              background: "transparent", border: "none", borderRadius: "var(--radius-sm)",
              color: "var(--on-surface-variant)", fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit"
            }}>
              <Users size={18} /> {account ? account.name : "Daftar / Account"}
            </button>
          </div>
        )}
      </nav>

      <div style={{ paddingTop: 72 }}>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "konten" && <KontenPage navigate={navigate} />}
        {page === "marketplace" && <MarketplacePage navigate={navigate} />}
        {page === "checker" && <CheckerPage />}
        {page === "impact" && <ImpactPage />}
        {page === "contact" && <ContactPage />}
        {page === "battery-detail" && <BatteryDetailPage battery={detailBattery} navigate={navigate} />}
        {page === "article-detail" && <ArticleDetailPage article={detailArticle} navigate={navigate} />}
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "var(--surface-container-low)", padding: "80px 0 36px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 22, letterSpacing: -1 }}>RE<span style={{ color: "var(--primary)" }}>-</span>VOLT</span>
              </div>
              <p style={{ color: "var(--on-surface-muted)", fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                Platform terkurasi untuk edukasi, verifikasi, dan marketplace baterai EV second-life. Mendukung ekonomi sirkular yang lebih baik.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--on-surface-muted)", marginBottom: 20 }}>Platform</h4>
              {[{ l: "Marketplace", p: "marketplace" }, { l: "Battery Checker", p: "checker" }, { l: "Impact Dashboard", p: "impact" }, { l: "Konten Edukasi", p: "konten" }].map(t => (
                <p key={t.l} onClick={() => navigate(t.p)} style={{ color: "var(--on-surface-variant)", fontSize: 14, marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t.l}</p>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--on-surface-muted)", marginBottom: 20 }}>Informasi</h4>
              {[{ l: "Tentang Kami", p: "about" }, { l: "FAQ", p: "about" }].map(t => (
                <p key={t.l} onClick={() => navigate(t.p)} style={{ color: "var(--on-surface-variant)", fontSize: 14, marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}>{t.l}</p>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--on-surface-muted)", marginBottom: 20 }}>Kontak</h4>
              <p style={{ color: "var(--on-surface-variant)", fontSize: 14, marginBottom: 12 }}>hello@re-volt.id</p>
              <p style={{ color: "var(--on-surface-variant)", fontSize: 14, marginBottom: 12 }}>+62 815 4641 5808</p>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              </div>
            </div>
          </div>
          <div className="glow-line" style={{ marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "var(--on-surface-muted)", fontSize: 12 }}>&copy; 2026 RE-VOLT. Empowering the Second Life of EV Batteries.</p>
            <p style={{ color: "var(--on-surface-muted)", fontSize: 11 }}>Designed for Web Design Competition</p>
          </div>
        </div>
      </footer>

      {/* ─── ACCOUNT MODAL ─── */}
      {showAccountModal && (
        <AccountModal
          account={account}
          onClose={() => setShowAccountModal(false)}
          onRegister={(data) => { setAccount(data); localStorage.setItem("revolt_account", JSON.stringify(data)); }}
          onLogout={() => { setAccount(null); localStorage.removeItem("revolt_account"); }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// ACCOUNT MODAL
// ═══════════════════════════════════════
function AccountModal({ account, onClose, onRegister, onLogout }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onRegister({ ...form, registeredAt: new Date().toISOString() });
    setSuccess(true);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(25,28,30,0.4)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 440,
        background: "var(--surface-container-lowest)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "clamp(28px, 5vw, 40px)",
        position: "relative",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none",
          color: "var(--on-surface-muted)", cursor: "pointer", padding: 4, borderRadius: "var(--radius-sm)"
        }}>
          <X size={20} />
        </button>

        {account ? (
          /* ── Logged-in view ── */
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", fontSize: 26, fontWeight: 700, color: "#fff",
                fontFamily: "var(--font-display)"
              }}>
                {account.name.charAt(0).toUpperCase()}
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginBottom: 4 }}>
                {account.name}
              </h2>
              <p style={{ fontSize: 14, color: "var(--on-surface-muted)" }}>{account.email}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Nama", value: account.name, icon: <Users size={16} /> },
                { label: "Email", value: account.email, icon: <Mail size={16} /> },
                account.phone && { label: "Telepon", value: account.phone, icon: <Phone size={16} /> },
                account.location && { label: "Lokasi", value: account.location, icon: <MapPin size={16} /> },
              ].filter(Boolean).map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: "var(--radius-sm)", background: "var(--surface-container-low)"
                }}>
                  <span style={{ color: "var(--primary)", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { onLogout(); onClose(); }} style={{
              width: "100%", padding: "12px 24px", borderRadius: "var(--radius-full)",
              background: "var(--surface-container-high)", border: "none",
              color: "var(--error)", fontWeight: 600, fontSize: 14,
              cursor: "pointer", fontFamily: "inherit"
            }}>
              Keluar dari Akun
            </button>
          </div>
        ) : success ? (
          /* ── Success view ── */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: "rgba(0,223,129,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Check size={32} color="var(--primary)" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginBottom: 8 }}>
              Pendaftaran Berhasil!
            </h2>
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7, marginBottom: 24 }}>
              Selamat datang di RE-VOLT. Akun Anda telah terdaftar.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Mulai Eksplorasi <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* ── Register form ── */
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>
                Daftar <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Akun</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--on-surface-variant)" }}>
                Bergabung dengan komunitas RE-VOLT untuk akses penuh ke marketplace dan fitur lainnya.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Nama Lengkap *
                </label>
                <input className="input-field" placeholder="Masukkan nama lengkap" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={errors.name ? { boxShadow: "0 0 0 2px var(--error)" } : {}}
                />
                {errors.name && <p style={{ fontSize: 12, color: "var(--error)", marginTop: 4 }}>{errors.name}</p>}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Email *
                </label>
                <input className="input-field" type="email" placeholder="email@example.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={errors.email ? { boxShadow: "0 0 0 2px var(--error)" } : {}}
                />
                {errors.email && <p style={{ fontSize: 12, color: "var(--error)", marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  No. Telepon
                </label>
                <input className="input-field" type="tel" placeholder="+62 812 3456 7890" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Lokasi
                </label>
                <select className="input-field" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ cursor: "pointer" }}>
                  <option value="">Pilih kota</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Medan">Medan</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Makassar">Makassar</option>
                  <option value="Yogyakarta">Yogyakarta</option>
                  <option value="Denpasar">Denpasar</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <button className="btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                Daftar Sekarang <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════
function HomePage({ navigate }) {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 75% 30%, rgba(0,223,129,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,119,182,0.03) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", width: "100%" }}>
            <Reveal>
              <div style={{ paddingRight: "5%" }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 28, color: "var(--on-surface)" }}>
                  <span>Setiap </span><span style={{ fontStyle: "italic", color: "var(--primary)" }}>Baterai</span><br />
                  <span>Layak </span><span style={{ fontWeight: 700 }}>Hidup </span><span style={{ fontStyle: "italic", color: "var(--primary)" }}>Kedua</span>
                </h1>
                <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "var(--on-surface-variant)", lineHeight: 1.8, maxWidth: 520, marginBottom: 40 }}>
                  RE-VOLT menghubungkan edukasi, verifikasi, dan marketplace untuk baterai EV bekas yang masih layak pakai. Transparansi kondisi. Kepercayaan pengguna. Ekonomi sirkular.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <button className="btn-primary" onClick={() => navigate("marketplace")}>Explore Batteries <ArrowRight size={16} /></button>
                  <button className="btn-secondary" onClick={() => navigate("konten")}>Learn Second Life</button>
                  <button className="btn-secondary" onClick={() => navigate("checker")}>Check Battery Value</button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="left">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-visual">
                <HeroBatteryVisual />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── INNOVATE & SDGs ── */}
      <section className="section" style={{ background: "var(--surface-container-low)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>INNOVATE</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16 }}>
                Inovasi untuk <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Masa Depan</span> Berkelanjutan
              </h2>
              <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 640, margin: "16px auto 0", lineHeight: 1.8 }}>
                RE-VOLT menghadirkan pendekatan baru dalam mengelola baterai EV bekas melalui teknologi, transparansi, dan edukasi — mendukung ekonomi sirkular dan pembangunan berkelanjutan.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-responsive-3">
            {[
              { icon: <Lightbulb size={24} />, title: "Impel Novelty", desc: "Mendorong inovasi baru dalam pengelolaan limbah baterai EV melalui platform digital terkurasi yang menghubungkan edukasi, verifikasi, dan marketplace.", color: "var(--primary)" },
              { icon: <Target size={24} />, title: "SDG 7 & 12", desc: "Mendukung Energi Bersih (SDG 7) dengan memperpanjang umur baterai, dan Konsumsi Bertanggung Jawab (SDG 12) melalui ekonomi sirkular.", color: "var(--accent-blue)" },
              { icon: <Leaf size={24} />, title: "SDG 13: Aksi Iklim", desc: "Mengurangi emisi karbon dengan mencegah pembuangan prematur baterai dan mengurangi kebutuhan produksi baterai baru dari material mentah.", color: "var(--primary)" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="card" style={{ padding: 36, height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "var(--surface-container-low)", display: "flex", alignItems: "center", justifyContent: "center", color: item.color, marginBottom: 24 }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ color: "var(--on-surface-variant)", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Tiga Pilar Utama</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16 }}>
                Edukasi. Verifikasi. <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Marketplace.</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-responsive-3">
            {[
              { icon: <BookOpen size={28} />, title: "Edukasi Mendalam", desc: "Konten komprehensif tentang second-life battery, parameter teknis, keamanan, dan use case terbaik. Dipahami semua kalangan.", color: "var(--primary)" },
              { icon: <ShieldCheck size={28} />, title: "Verifikasi Transparan", desc: "Setiap baterai melalui inspeksi profesional. Data SoH, cycle count, dan kondisi fisik tersedia secara transparan.", color: "var(--accent-blue)" },
              { icon: <Tag size={28} />, title: "Marketplace Terkurasi", desc: "Bukan pasar liar. Semua listing terverifikasi, dilengkapi rekomendasi use case dan estimasi kelayakan.", color: "var(--accent-amber)" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="card" style={{ padding: 36, position: "relative", overflow: "hidden", height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "var(--surface-container-low)", display: "flex", alignItems: "center", justifyContent: "center", color: item.color, marginBottom: 24 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ color: "var(--on-surface-variant)", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Batteries ── */}
      <section className="section" style={{ background: "var(--surface-container-low)" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Marketplace</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16 }}>
                  Baterai <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Terverifikasi</span>
                </h2>
              </div>
              <button className="btn-secondary" onClick={() => navigate("marketplace")} style={{ fontSize: 13 }}>View All <ArrowRight size={14} /></button>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {BATTERIES.slice(0, 4).map((b, i) => (
              <Reveal key={b.id} delay={i * 0.1}>
                <div className="card" style={{ padding: 28, cursor: "pointer" }} onClick={() => navigate("battery-detail", b)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{b.brand}</p>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, lineHeight: 1.3 }}>{b.name}</h4>
                    </div>
                    <SoHRing value={b.soh} size={48} />
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 13, color: "var(--on-surface-variant)" }}>
                    <span>{b.capacity}</span><span>{b.cycles} cycles</span><span>{b.year}</span>
                  </div>
                  <GlowBar value={b.soh} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--primary)" }}>${b.price.toLocaleString()}</span>
                    <span className="tag" style={{ fontSize: 10 }}>{b.status}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Impact</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16 }}>
                Dampak <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Nyata</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="grid-responsive-4">
            {[
              { value: 125000, suffix: "+", label: "Baterai Tersirkulasi", icon: <Recycle size={24} /> },
              { value: 45, suffix: " GWh", label: "Energi Diselamatkan", icon: <Zap size={24} /> },
              { value: 12500, suffix: " ton", label: "CO2 Direduksi", icon: <Leaf size={24} /> },
              { value: 8400, suffix: "+", label: "Pengguna Aktif", icon: <Users size={24} /> },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{ padding: 32, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,223,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", margin: "0 auto 16px" }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, color: "var(--on-surface)", marginBottom: 4 }}><AnimCounter end={s.value} suffix={s.suffix} /></div>
                  <p style={{ fontSize: 13, color: "var(--on-surface-muted)" }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: "var(--surface-container-low)" }}>
        <div className="container">
          <Reveal>
            <div style={{
              borderRadius: "var(--radius-lg)", padding: "clamp(40px, 6vw, 80px)",
              background: "linear-gradient(135deg, var(--primary) 0%, #004d2a 100%)",
              textAlign: "center", position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%, rgba(0,223,129,0.15), transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16 }}>
                  Siap Memberi Hidup <span style={{ fontStyle: "italic" }}>Kedua?</span>
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
                  Mulai eksplorasi baterai EV second-life yang sudah terverifikasi dan siap digunakan.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  <button onClick={() => navigate("marketplace")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "#fff", color: "var(--primary)", border: "none", borderRadius: "var(--radius-full)", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-ui)" }}>
                    Explore Marketplace <ArrowRight size={16} />
                  </button>
                  <button onClick={() => navigate("konten")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-full)", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-ui)" }}>
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════
function AboutPage({ navigate }) {
  return (
    <>
      {/* Hero About */}
      <section style={{ padding: "var(--space-8) 0 var(--space-10)", background: "var(--surface-container-low)" }}>
        <div className="container">
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Tentang Kami</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 24, lineHeight: 1.1 }}>
                Membangun <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Masa Depan</span> Energi Sirkular
              </h1>
              <p style={{ fontSize: 16, color: "var(--on-surface-variant)", lineHeight: 1.9, marginBottom: 24 }}>
                RE-VOLT lahir dari kesadaran bahwa jutaan baterai kendaraan listrik akan memasuki fase "pensiun" dari kendaraan dalam dekade mendatang. Baterai-baterai ini, meski tidak lagi optimal untuk kendaraan, masih menyimpan kapasitas energi yang signifikan untuk aplikasi stasioner.
              </p>
              <p style={{ fontSize: 16, color: "var(--on-surface-variant)", lineHeight: 1.9 }}>
                Kami membangun platform terkurasi yang menghubungkan tiga elemen kunci: edukasi untuk meningkatkan pemahaman masyarakat, verifikasi untuk memastikan keamanan dan kualitas, serta marketplace untuk memfasilitasi transaksi yang transparan.
              </p>
            </div>
            {/* Stats column */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { value: "125K+", label: "Baterai Tersirkulasi", icon: <Recycle size={22} /> },
                { value: "45 GWh", label: "Energi Diselamatkan", icon: <Zap size={22} /> },
                { value: "12.5K", label: "Ton CO2 Direduksi", icon: <Leaf size={22} /> },
                { value: "8.4K+", label: "Pengguna Aktif", icon: <Users size={22} /> },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(0,223,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", margin: "0 auto 12px" }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--on-surface)", marginBottom: 4 }}>{s.value}</div>
                  <p style={{ fontSize: 12, color: "var(--on-surface-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi, Misi, Nilai */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Apa yang Kami <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Percaya</span>
            </h2>
          </div>
          <div className="grid-responsive-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: <Eye size={28} />, title: "Visi", desc: "Menjadi platform referensi utama untuk ekonomi sirkular baterai EV di Asia Tenggara, memimpin transisi menuju pengelolaan energi yang lebih berkelanjutan dan bertanggung jawab." },
              { icon: <Heart size={28} />, title: "Misi", desc: "Mengedukasi masyarakat tentang potensi baterai second-life, memverifikasi setiap baterai dengan standar profesional, dan memfasilitasi marketplace yang transparan dan terpercaya." },
              { icon: <Award size={28} />, title: "Nilai", desc: "Transparansi data teknis, keamanan pengguna sebagai prioritas utama, keberlanjutan lingkungan dalam setiap keputusan, dan aksesibilitas informasi untuk semua kalangan masyarakat." },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: 36, display: "flex", flexDirection: "column" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(0,223,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", marginBottom: 24 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: 14, lineHeight: 1.8, flex: 1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagaimana RE-VOLT Bekerja */}
      <section className="section" style={{ background: "var(--surface-container-low)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Proses</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16 }}>
              Bagaimana RE-VOLT <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Bekerja</span>
            </h2>
          </div>
          <div className="grid-responsive-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { step: "01", title: "Pengumpulan Data", desc: "Baterai EV bekas dikumpulkan datanya: merek, tipe kimia, umur, riwayat penggunaan, dan kondisi fisik awal.", icon: <FileText size={24} /> },
              { step: "02", title: "Inspeksi & Pengujian", desc: "Tim profesional mengukur SoH, cycle count, cell balance, dan melakukan stress test untuk memastikan keamanan.", icon: <ShieldCheck size={24} /> },
              { step: "03", title: "Grading & Sertifikasi", desc: "Baterai dinilai kelayakannya (Grade A-D) dan diberikan sertifikat kondisi lengkap dengan rekomendasi use case.", icon: <Award size={24} /> },
              { step: "04", title: "Listing & Transaksi", desc: "Baterai yang lolos verifikasi ditampilkan di marketplace dengan data transparan, siap dibeli pengguna.", icon: <Tag size={24} /> },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "var(--surface-container-lowest)", boxShadow: "var(--shadow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", margin: "0 auto 20px" }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: 1 }}>{item.step}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, margin: "8px 0 10px" }}>{item.title}</h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Pertanyaan <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Umum</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ_DATA.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit",
        fontSize: 15, fontWeight: 600, color: "var(--on-surface)", textAlign: "left"
      }}>
        {faq.q}
        <ChevronDown size={18} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease", flexShrink: 0, marginLeft: 16, color: "var(--on-surface-muted)" }} />
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px", color: "var(--on-surface-variant)", fontSize: 14, lineHeight: 1.8 }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// KONTEN / CONTENT PAGE
// ═══════════════════════════════════════
function KontenPage({ navigate }) {
  const [activeCat, setActiveCat] = useState("Semua");
  const cats = ["Semua", ...new Set(ARTICLES.map(a => a.cat))];
  const filtered = activeCat === "Semua" ? ARTICLES : ARTICLES.filter(a => a.cat === activeCat);

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Edukasi</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16 }}>
            Konten <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Edukasi</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 560 }}>
            Pahami dunia second-life battery dari dasar hingga mendalam.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding: "8px 20px", borderRadius: "var(--radius-full)", border: "none",
              background: activeCat === c ? "var(--primary)" : "var(--surface-container-lowest)",
              color: activeCat === c ? "#fff" : "var(--on-surface-variant)",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              boxShadow: activeCat === c ? "0 4px 16px rgba(0,109,60,0.25)" : "var(--shadow-sm)",
              transition: "all 0.25s"
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map(a => (
            <div key={a.id} className="card" style={{ padding: 32, cursor: "pointer", display: "flex", flexDirection: "column" }} onClick={() => navigate("article-detail", a)}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <span className="tag" style={{ fontSize: 10 }}>{a.cat}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--on-surface-muted)" }}>
                  <Clock size={12} /> {a.read}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginBottom: 12, lineHeight: 1.3 }}>{a.title}</h3>
              <p style={{ color: "var(--on-surface-variant)", fontSize: 14, lineHeight: 1.7, flex: 1 }}>{a.summary.slice(0, 150)}...</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: "var(--primary)", fontSize: 13, fontWeight: 600 }}>
                Baca Selengkapnya <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// MARKETPLACE PAGE
// ═══════════════════════════════════════
function MarketplacePage({ navigate }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("soh");
  const [filterBrand, setFilterBrand] = useState("All");
  const [minSoh, setMinSoh] = useState(60);
  const [maxPrice, setMaxPrice] = useState(6000);

  const brands = ["All", ...new Set(BATTERIES.map(b => b.brand))];
  let filtered = BATTERIES.filter(b =>
    (filterBrand === "All" || b.brand === filterBrand) &&
    (b.name.toLowerCase().includes(search.toLowerCase()) || b.brand.toLowerCase().includes(search.toLowerCase())) &&
    b.soh >= minSoh &&
    b.price <= maxPrice
  );
  if (sortBy === "soh") filtered.sort((a, b) => b.soh - a.soh);
  else if (sortBy === "price") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "year") filtered.sort((a, b) => b.year - a.year);

  const sliderTrack = (value, min, max) => {
    const pct = ((value - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, var(--primary-container) 0%, var(--primary-container) ${pct}%, var(--surface-container-high) ${pct}%, var(--surface-container-high) 100%)` };
  };

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Marketplace</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16 }}>
            Baterai <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Second-Life</span>
          </h1>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--on-surface-muted)" }} />
            <input className="input-field" placeholder="Cari baterai..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field" style={{ width: "auto", minWidth: 160, cursor: "pointer" }}>
            <option value="soh">Urutkan: SoH Tertinggi</option>
            <option value="price">Urutkan: Harga Terendah</option>
            <option value="year">Urutkan: Terbaru</option>
          </select>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {brands.map(b => (
              <button key={b} onClick={() => setFilterBrand(b)} style={{
                padding: "8px 16px", borderRadius: "var(--radius-full)", border: "none",
                background: filterBrand === b ? "var(--primary)" : "var(--surface-container-lowest)",
                color: filterBrand === b ? "#fff" : "var(--on-surface-variant)",
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                boxShadow: filterBrand === b ? "0 2px 12px rgba(0,109,60,0.2)" : "var(--shadow-sm)"
              }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Slider Filters */}
        <div className="card" style={{ padding: "20px 28px", marginBottom: 32, boxShadow: "var(--shadow-sm)", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 240px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>Min. SoH</label>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{minSoh}%</span>
            </div>
            <input type="range" min={50} max={95} value={minSoh} onChange={e => setMinSoh(Number(e.target.value))}
              style={{ width: "100%", height: 6, borderRadius: 3, appearance: "none", WebkitAppearance: "none", cursor: "pointer", outline: "none", ...sliderTrack(minSoh, 50, 95) }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "var(--on-surface-muted)" }}>50%</span>
              <span style={{ fontSize: 11, color: "var(--on-surface-muted)" }}>95%</span>
            </div>
          </div>
          <div style={{ flex: "1 1 240px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>Maks. Harga</label>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>${maxPrice.toLocaleString()}</span>
            </div>
            <input type="range" min={500} max={6000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", height: 6, borderRadius: 3, appearance: "none", WebkitAppearance: "none", cursor: "pointer", outline: "none", ...sliderTrack(maxPrice, 500, 6000) }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "var(--on-surface-muted)" }}>$500</span>
              <span style={{ fontSize: 11, color: "var(--on-surface-muted)" }}>$6,000</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--on-surface-muted)" }}>
            {filtered.length} baterai ditemukan
          </div>
        </div>

        {/* Results */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filtered.map(b => (
            <div key={b.id} className="card" style={{ padding: 28, cursor: "pointer" }} onClick={() => navigate("battery-detail", b)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{b.brand}</p>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, lineHeight: 1.3 }}>{b.name}</h4>
                </div>
                <SoHRing value={b.soh} size={48} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16, fontSize: 13 }}>
                <span style={{ color: "var(--on-surface-muted)" }}>Capacity: <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>{b.capacity}</span></span>
                <span style={{ color: "var(--on-surface-muted)" }}>Cycles: <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>{b.cycles}</span></span>
                <span style={{ color: "var(--on-surface-muted)" }}>Type: <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>{b.type}</span></span>
                <span style={{ color: "var(--on-surface-muted)" }}>Year: <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>{b.year}</span></span>
              </div>
              <GlowBar value={b.soh} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--primary)" }}>${b.price.toLocaleString()}</span>
                <span className="tag" style={{ fontSize: 10 }}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "var(--on-surface-muted)" }}>
            <Search size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16 }}>Tidak ada baterai ditemukan.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BATTERY DETAIL PAGE
// ═══════════════════════════════════════
function BatteryDetailPage({ battery: b, navigate }) {
  if (!b) return null;
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <button onClick={() => navigate("marketplace")} style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: "var(--on-surface-variant)", fontSize: 14, cursor: "pointer", marginBottom: 32, fontFamily: "inherit"
        }}>
          <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Kembali ke Marketplace
        </button>

        <div className="card" style={{ padding: "clamp(24px, 4vw, 48px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>{b.brand} &middot; {b.year}</p>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em" }}>{b.name}</h1>
            </div>
            <SoHRing value={b.soh} size={72} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginBottom: 32 }}>
            {[
              { label: "Capacity", value: b.capacity, icon: <Battery size={18} /> },
              { label: "SoH", value: `${b.soh}%`, icon: <Gauge size={18} /> },
              { label: "Cycle Count", value: b.cycles.toLocaleString(), icon: <RefreshCw size={18} /> },
              { label: "Type", value: b.type, icon: <Info size={18} /> },
              { label: "Use Case", value: b.useCase, icon: <Home size={18} /> },
              { label: "Status", value: b.status, icon: <ShieldCheck size={18} /> },
            ].map((d, i) => (
              <div key={i} style={{ padding: 20, borderRadius: "var(--radius-md)", background: "var(--surface-container-low)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "var(--on-surface-muted)" }}>
                  {d.icon}
                  <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.label}</span>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--on-surface)" }}>{d.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, color: "var(--on-surface-muted)" }}>Harga</span>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, color: "var(--primary)" }}>${b.price.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-primary">Hubungi Penjual <Send size={16} /></button>
              <button className="btn-secondary">Simpan <Heart size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// ARTICLE DETAIL PAGE
// ═══════════════════════════════════════
function ArticleDetailPage({ article: a, navigate }) {
  if (!a) return null;
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 740 }}>
        <button onClick={() => navigate("konten")} style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: "var(--on-surface-variant)", fontSize: 14, cursor: "pointer", marginBottom: 32, fontFamily: "inherit"
        }}>
          <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Kembali ke Konten
        </button>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <span className="tag">{a.cat}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--on-surface-muted)" }}>
              <Clock size={14} /> {a.read}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>
            {a.title}
          </h1>
          <p style={{ fontSize: 17, color: "var(--on-surface-variant)", lineHeight: 1.8, fontStyle: "italic", borderLeft: "3px solid var(--primary-container)", paddingLeft: 20 }}>
            {a.summary}
          </p>
        </div>

        <div style={{ fontSize: 16, color: "var(--on-surface)", lineHeight: 2 }}>
          {a.content.split("\n\n").map((p, i) => (
            <p key={i} style={{ marginBottom: 24 }}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BATTERY CHECKER PAGE
// ═══════════════════════════════════════
function CheckerPage() {
  const [soh, setSoh] = useState("");
  const [cycles, setCycles] = useState("");
  const [age, setAge] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("NMC");
  const [result, setResult] = useState(null);

  const checkBattery = () => {
    const s = parseFloat(soh), c = parseInt(cycles), a = parseFloat(age), cap = parseFloat(capacity);
    if (isNaN(s) || isNaN(c) || isNaN(a)) return;

    // Max cycle life by chemistry
    const maxCycles = type === "LFP" ? 4000 : type === "NCA" ? 1500 : 2000;
    // Calendar life expectancy (years)
    const maxCalendarLife = type === "LFP" ? 15 : 12;

    // SoH score (40 pts) — primary indicator
    const sohScore = s >= 80 ? 40 : s >= 70 ? 32 : s >= 65 ? 22 : s >= 60 ? 12 : 5;

    // Remaining cycle life (25 pts) — how many cycles left vs max
    const cycleRatio = Math.max(0, 1 - (c / maxCycles));
    const cycleScore = Math.round(cycleRatio * 25);

    // Calendar aging (20 pts) — degradation accelerates with age
    const ageRatio = Math.max(0, 1 - (a / maxCalendarLife));
    const ageScore = Math.round(ageRatio * 20);

    // Chemistry bonus (15 pts) — LFP is inherently safer & longer-lived
    const chemScore = type === "LFP" ? 15 : type === "NMC" ? 10 : 8;

    const score = Math.min(100, sohScore + cycleScore + ageScore + chemScore);
    const grade = score >= 80 ? "A" : score >= 65 ? "B" : score >= 50 ? "C" : "D";

    // Estimated remaining life for stationary use (~1 cycle/day)
    const remainingCycles = Math.max(0, maxCycles - c);
    const estYears = Math.min(Math.round(remainingCycles / 365), Math.round((maxCalendarLife - a) * 0.8));
    const estYearsDisplay = Math.max(0, estYears);

    // Remaining usable capacity
    const usableCapacity = !isNaN(cap) && cap > 0 ? (cap * s / 100).toFixed(1) : null;

    // Use case recommendation based on SoH
    let useCase, recommendation;
    if (score >= 80) {
      useCase = "Home Storage / Solar Integration";
      recommendation = `Baterai dalam kondisi sangat baik. Dengan SoH ${s}% dan ${c} siklus dari maksimum ~${maxCycles.toLocaleString()} siklus (${type}), baterai ini sangat layak untuk aplikasi second-life. Cocok untuk penyimpanan energi rumah tangga atau integrasi panel surya.`;
    } else if (score >= 65) {
      useCase = "Backup Power / UPS";
      recommendation = `Baterai masih layak untuk second-life dengan catatan. SoH ${s}% menunjukkan degradasi moderat. Direkomendasikan untuk aplikasi backup power atau UPS yang tidak memerlukan cycling harian. Estimasi sisa umur: ~${estYearsDisplay} tahun untuk penggunaan stasioner.`;
    } else if (score >= 50) {
      useCase = "Aplikasi Ringan / DIY Project";
      recommendation = `Baterai memerlukan inspeksi profesional lebih lanjut. Dengan ${c} siklus dan umur ${a} tahun, kapasitas tersisa mungkin cukup untuk aplikasi ringan seperti penerangan atau proyek DIY. Perhatikan cell balance sebelum digunakan.`;
    } else {
      useCase = "Recycling Direkomendasikan";
      recommendation = `Baterai lebih cocok untuk recycling. Kombinasi SoH ${s}%, ${c} siklus, dan umur ${a} tahun menunjukkan degradasi lanjut. Biaya repurposing kemungkinan tidak sebanding dengan sisa kapasitas. Material berharga (litium, kobalt, nikel) dapat dipulihkan melalui proses recycling.`;
    }

    setResult({ score, grade, recommendation, useCase, estYears: estYearsDisplay, usableCapacity, soh: s, cycles: c, age: a, maxCycles, remainingCycles });
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Battery Checker</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16 }}>
            Cek Kelayakan <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Baterai</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 520, margin: "0 auto" }}>
            Estimasi kelayakan baterai EV bekas untuk second-life berdasarkan SoH, siklus, umur, dan tipe kimia.
          </p>
        </div>

        <div className="card" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
          <div className="grid-responsive-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>State of Health (%)</label>
              <input className="input-field" type="number" min="0" max="100" placeholder="e.g. 78" value={soh} onChange={e => setSoh(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Cycle Count</label>
              <input className="input-field" type="number" min="0" placeholder="e.g. 500" value={cycles} onChange={e => setCycles(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Umur Baterai (tahun)</label>
              <input className="input-field" type="number" min="0" step="0.5" placeholder="e.g. 3" value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Tipe Kimia</label>
              <select className="input-field" value={type} onChange={e => setType(e.target.value)} style={{ cursor: "pointer" }}>
                <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                <option value="NCA">NCA (Nickel Cobalt Aluminum)</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Kapasitas Asli (kWh) — opsional</label>
            <input className="input-field" type="number" min="0" placeholder="e.g. 60" value={capacity} onChange={e => setCapacity(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={checkBattery} style={{ width: "100%", justifyContent: "center" }}>
            Evaluasi Baterai <ArrowRight size={16} />
          </button>
        </div>

        {result && (
          <div className="card" style={{ padding: "clamp(24px, 4vw, 40px)", marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", marginBottom: 4 }}>Skor Kelayakan</p>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "var(--primary)" }}>{result.score}</span>
                <span style={{ fontSize: 20, color: "var(--on-surface-muted)" }}>/100</span>
              </div>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: result.grade === "A" ? "rgba(0,223,129,0.1)" : result.grade === "B" ? "rgba(0,119,182,0.1)" : result.grade === "C" ? "rgba(217,119,6,0.1)" : "rgba(186,26,26,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700,
                color: result.grade === "A" ? "var(--primary)" : result.grade === "B" ? "var(--accent-blue)" : result.grade === "C" ? "var(--accent-amber)" : "var(--error)"
              }}>
                {result.grade}
              </div>
            </div>
            <GlowBar value={result.score} height={8} />

            {/* Detail metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, margin: "24px 0" }}>
              <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "var(--surface-container-low)", textAlign: "center" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", marginBottom: 4 }}>Sisa Siklus</p>
                <span style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)" }}>~{result.remainingCycles.toLocaleString()}</span>
              </div>
              <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "var(--surface-container-low)", textAlign: "center" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", marginBottom: 4 }}>Est. Sisa Umur</p>
                <span style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)" }}>~{result.estYears} tahun</span>
              </div>
              {result.usableCapacity && (
                <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "var(--surface-container-low)", textAlign: "center" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", marginBottom: 4 }}>Kapasitas Efektif</p>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)" }}>{result.usableCapacity} kWh</span>
                </div>
              )}
              <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "var(--surface-container-low)", textAlign: "center" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-muted)", textTransform: "uppercase", marginBottom: 4 }}>Rekomendasi</p>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{result.useCase}</span>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.8 }}>{result.recommendation}</p>
            <p style={{ fontSize: 12, color: "var(--on-surface-muted)", marginTop: 16, fontStyle: "italic" }}>
              * Estimasi berdasarkan data umum degradasi baterai {type}. Hasil aktual dapat berbeda tergantung kondisi penggunaan, suhu operasi, dan faktor lainnya. Inspeksi profesional tetap direkomendasikan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// IMPACT PAGE
// ═══════════════════════════════════════
function ImpactPage() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 640, margin: "0 auto 56px" }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Impact Dashboard</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16 }}>
            Dampak <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Positif</span> Kami
          </h1>
          <p style={{ fontSize: 16, color: "var(--on-surface-variant)" }}>
            Setiap baterai yang mendapat hidup kedua berkontribusi pada lingkungan yang lebih baik.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 56 }}>
          {[
            { value: 125000, suffix: "+", label: "Baterai Tersirkulasi", desc: "Total baterai yang telah diverifikasi dan disirkulasi melalui platform", icon: <Recycle size={28} />, color: "var(--primary)" },
            { value: 45, suffix: " GWh", label: "Energi Diselamatkan", desc: "Total kapasitas energi yang berhasil dipertahankan dari limbah", icon: <Zap size={28} />, color: "var(--accent-blue)" },
            { value: 12500, suffix: " ton", label: "CO2 Direduksi", desc: "Estimasi pengurangan emisi karbon dari program second-life", icon: <Leaf size={28} />, color: "var(--primary)" },
            { value: 8400, suffix: "+", label: "Pengguna Aktif", desc: "Komunitas yang terus berkembang di seluruh Indonesia", icon: <Users size={28} />, color: "var(--accent-amber)" },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 20 }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, color: "var(--on-surface)", marginBottom: 4 }}>
                <AnimCounter end={s.value} suffix={s.suffix} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--on-surface)" }}>{s.label}</h3>
              <p style={{ fontSize: 13, color: "var(--on-surface-muted)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 32, textAlign: "center" }}>
            Milestone <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Kami</span>
          </h2>
          {[
            { year: "2023", title: "Platform Diluncurkan", desc: "RE-VOLT resmi beroperasi dengan fitur marketplace dan battery checker." },
            { year: "2024", title: "10.000 Baterai Terverifikasi", desc: "Milestone pertama tercapai dengan ribuan baterai tersertifikasi." },
            { year: "2025", title: "Ekspansi Regional", desc: "Memperluas layanan ke seluruh pulau Jawa dan Bali." },
            { year: "2026", title: "125.000 Baterai", desc: "Target ekonomi sirkular tercapai, menjadi platform terbesar di Asia Tenggara." },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary-container)", boxShadow: "0 0 8px rgba(0,223,129,0.3)" }} />
                {i < 3 && <div style={{ width: 2, flex: 1, background: "var(--surface-container-high)", marginTop: 8 }} />}
              </div>
              <div style={{ paddingBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", letterSpacing: 1 }}>{m.year}</span>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, marginTop: 4, marginBottom: 4 }}>{m.title}</h4>
                <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Contact</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16 }}>
            Hubungi <span style={{ fontStyle: "italic", color: "var(--primary)" }}>Kami</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 480, margin: "0 auto" }}>
            Punya pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda.
          </p>
        </div>

        <div className="grid-responsive-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Form */}
          <div className="card" style={{ padding: "clamp(24px, 4vw, 36px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(0,223,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Check size={32} color="var(--primary)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginBottom: 8 }}>Terkirim!</h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: 14 }}>Terima kasih atas masukannya!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Nama</label>
                  <input className="input-field" placeholder="Nama lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Email</label>
                  <input className="input-field" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Subjek</label>
                  <input className="input-field" placeholder="Topik pesan" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--on-surface-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Pesan</label>
                  <textarea className="input-field" rows={5} placeholder="Tulis pesan Anda..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <button className="btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                  Kirim Pesan <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@re-volt.id" },
              { icon: <Phone size={20} />, label: "Telepon", value: "+62 815 4641 5808" },
              { icon: <MapPin size={20} />, label: "Lokasi", value: "Jakarta, Indonesia" },
              { icon: <Clock size={20} />, label: "Jam Operasional", value: "Senin - Jumat, 09:00 - 17:00 WIB" },
            ].map((c, i) => (
              <div key={i} className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "var(--shadow-sm)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--surface-container-low)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{c.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--on-surface)" }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
