import { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  BookOpen, 
  Users, 
  ChevronRight,
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// Mock Prayer Times (In a real app, fetch from an API)
const PRAYER_TIMES = {
  Subuh: "04:45",
  Terbit: "06:02",
  Dzuhur: "12:05",
  Ashar: "15:15",
  Maghrib: "18:08",
  Isya: "19:17"
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2D2D] font-sans">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <BookOpen size={20} />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight",
              scrolled ? "text-emerald-900" : "text-white drop-shadow-md"
            )}>
              Masjid Al-Ikhlas
            </span>
          </div>

          {/* Desktop Menu */}
          <div className={cn(
            "hidden md:flex items-center gap-8 font-medium",
            scrolled ? "text-emerald-900" : "text-white"
          )}>
            <a href="#beranda" className="hover:text-emerald-500 transition-colors">Beranda</a>
            <a href="#jadwal" className="hover:text-emerald-500 transition-colors">Jadwal Sholat</a>
            <a href="#kegiatan" className="hover:text-emerald-500 transition-colors">Kegiatan</a>
            <a href="#tentang" className="hover:text-emerald-500 transition-colors">Tentang Kami</a>
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
              Infaq & Sedekah
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-emerald-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? "text-emerald-900" : "text-white"} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold text-emerald-900">
              <a href="#beranda" onClick={() => setIsMenuOpen(false)}>Beranda</a>
              <a href="#jadwal" onClick={() => setIsMenuOpen(false)}>Jadwal Sholat</a>
              <a href="#kegiatan" onClick={() => setIsMenuOpen(false)}>Kegiatan</a>
              <a href="#tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
              <button className="bg-emerald-600 text-white py-4 rounded-xl mt-4">
                Infaq & Sedekah
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="beranda" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2000&auto=format&fit=crop" 
            alt="Mosque Interior" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-emerald-600/30 backdrop-blur-md border border-emerald-400/30 text-emerald-100 rounded-full text-sm font-medium mb-6">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Pusat Ibadah & <br />
              <span className="text-emerald-400 italic font-serif">Pemberdayaan Umat</span>
            </h1>
            <p className="text-xl text-emerald-50/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Selamat datang di Masjid Al-Ikhlas. Tempat yang menyejukkan hati, mempererat ukhuwah, dan menebar manfaat bagi sesama.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#jadwal" className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl flex items-center justify-center gap-2">
                <Clock size={20} /> Jadwal Sholat
              </a>
              <a href="#tentang" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Kenali Kami <ChevronRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Prayer Times Preview */}
        <div className="absolute bottom-12 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 grid grid-cols-6 gap-4 text-white shadow-2xl">
              {Object.entries(PRAYER_TIMES).map(([name, time]) => (
                <div key={name} className="text-center group cursor-default">
                  <p className="text-xs uppercase tracking-widest text-emerald-200/70 mb-1 font-bold">{name}</p>
                  <p className="text-2xl font-mono font-bold group-hover:text-emerald-400 transition-colors">{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times Section (Mobile & Detailed) */}
      <section id="jadwal" className="py-24 px-6 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Jadwal Sholat Hari Ini</h2>
              <p className="text-emerald-200/80 flex items-center gap-2">
                <Calendar size={18} /> Senin, 23 Maret 2026 | 4 Ramadhan 1447 H
              </p>
            </div>
            <div className="bg-emerald-800/50 px-6 py-3 rounded-2xl border border-emerald-700 flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-emerald-300 uppercase font-bold">Waktu Berikutnya</p>
                <p className="text-xl font-bold">Ashar - 15:15</p>
              </div>
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <Clock size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(PRAYER_TIMES).map(([name, time]) => (
              <motion.div 
                key={name}
                whileHover={{ y: -5 }}
                className={cn(
                  "p-6 rounded-3xl border transition-all duration-300",
                  name === "Ashar" 
                    ? "bg-emerald-600 border-emerald-400 shadow-lg shadow-emerald-900/50" 
                    : "bg-emerald-800/30 border-emerald-700/50 hover:bg-emerald-800/50"
                )}
              >
                <p className="text-sm font-medium text-emerald-200 mb-2">{name}</p>
                <p className="text-3xl font-bold font-mono tracking-tight">{time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="kegiatan" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Kegiatan & Program</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Masjid Al-Ikhlas aktif menyelenggarakan berbagai kegiatan keagamaan dan sosial untuk seluruh lapisan masyarakat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Kajian Rutin",
                desc: "Kajian kitab kuning dan tafsir Al-Qur'an setiap ba'da Maghrib.",
                icon: <BookOpen className="text-emerald-600" size={32} />,
                image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "TPQ Anak",
                desc: "Pendidikan Al-Qur'an untuk anak-anak usia dini hingga remaja.",
                icon: <Users className="text-emerald-600" size={32} />,
                image: "https://images.unsplash.com/photo-1523050335456-adaba834597c?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "Santunan Sosial",
                desc: "Penyaluran bantuan untuk yatim piatu dan dhuafa di lingkungan sekitar.",
                icon: <Heart className="text-emerald-600" size={32} />,
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-2xl shadow-lg">
                    {item.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  <button className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Selengkapnya <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Banner */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-emerald-600 rounded-[3rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Mari Berinfaq untuk Kemakmuran Masjid</h2>
              <p className="text-emerald-100 text-lg mb-8">
                "Siapa yang membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga." (HR. Muslim)
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30">
                  <p className="text-xs text-emerald-200 uppercase font-bold mb-1">Bank Syariah Indonesia</p>
                  <p className="text-xl font-mono font-bold">7123 4567 89</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30">
                  <p className="text-xs text-emerald-200 uppercase font-bold mb-1">Atas Nama</p>
                  <p className="text-xl font-bold">Masjid Al-Ikhlas</p>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <button className="bg-white text-emerald-700 px-10 py-5 rounded-full font-black text-xl hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">
                Donasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About & Contact */}
      <section id="tentang" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Tentang Kami</span>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-8 leading-tight">Oase Spiritual di Tengah Kota</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Masjid Al-Ikhlas didirikan pada tahun 1995 dengan visi menjadi pusat peradaban Islam yang inklusif dan moderat. Kami percaya bahwa masjid bukan sekadar tempat sholat, melainkan jantung kehidupan sosial masyarakat.
              </p>
              <p>
                Dengan arsitektur yang menggabungkan nilai tradisional dan modern, kami menyediakan fasilitas yang nyaman untuk beribadah, belajar, dan berdiskusi bagi seluruh umat Muslim.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-emerald-600 mb-1">2.5k+</p>
                <p className="text-gray-500 font-medium">Jamaah Aktif</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-600 mb-1">15+</p>
                <p className="text-gray-500 font-medium">Program Mingguan</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] -rotate-3" />
            <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-8">Hubungi Kami</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900">Alamat</p>
                    <p className="text-gray-500">Jl. Raya Kebahagiaan No. 123, Jakarta Selatan, 12345</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900">Telepon</p>
                    <p className="text-gray-500">(021) 1234 5678</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900">Email</p>
                    <p className="text-gray-500">info@masjidalikhlas.org</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-top border-gray-100 flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
              <BookOpen size={16} />
            </div>
            <span className="text-lg font-bold text-emerald-900">Masjid Al-Ikhlas</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            © 2026 Masjid Al-Ikhlas. Seluruh Hak Cipta Dilindungi.
          </p>
          
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-emerald-600">Kebijakan Privasi</a>
            <a href="#" className="hover:text-emerald-600">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
