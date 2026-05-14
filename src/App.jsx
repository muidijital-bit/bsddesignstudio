import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PROJECTS, CATEGORIES, SOCIALS, HERO_SLIDES } from './data';
import './index.css';


function Nav({ active, onJump, onOpenRefs, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { id: 'projects', label: 'Projeler' },
    { id: 'references', label: 'Referanslar', modal: true },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' },
  ];
  const handle = (it) => {
    setMenuOpen(false);
    if (it.modal) { onOpenRefs(); } else { onJump(it.id); }
  };
  return (
    <>
      <header className={'nav ' + (scrolled ? 'scrolled' : '')}>
        <div className="brand" onClick={() => { setMenuOpen(false); onJump('home'); }}>
          <img src="/logo.png" alt="BSD Design Studio" className="brand-logo" />
        </div>
        <nav className="links">
          {items.map(it => (
            <a key={it.id} href={'#' + it.id} className={active === it.id ? 'active' : ''}
               onClick={(e) => { e.preventDefault(); handle(it); }}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="meta">
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menü">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </header>
      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu">
            {items.map(it => (
              <a key={it.id} href={'#' + it.id} className={active === it.id ? 'active' : ''}
                 onClick={(e) => { e.preventDefault(); handle(it); }}>
                {it.label}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="sec-vert-title" aria-label={title}>
      <span>{title}</span>
    </div>
  );
}

function Hero({ onJump }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero snap-sec">
      {HERO_SLIDES.map((s, idx) => (
        <div key={idx} className={'slide' + (idx === i ? ' active' : '')}>
          <div className="pic" style={{ backgroundImage: `url("${s.img}")` }}></div>
        </div>
      ))}
      <div className="veil"></div>
      <div className="swiss-grid"></div>
      <div className="dots">
        {HERO_SLIDES.map((_, idx) => (
          <button key={idx} className={idx === i ? 'active' : ''} onClick={() => setI(idx)}></button>
        ))}
      </div>
      <div className="hero-center">
        <h1>BSD DESIGN STUDIO</h1>
        <p className="hero-sub">Mimari tasarım, iç mekân uygulama ve proje üretiminde bütüncül çözümler.</p>
      </div>
      <div className="scroll-down" onClick={() => onJump('projects')}>
        <svg className="scroll-arrow" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 12l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}

function Featured({ openProject }) {
  const [f, setF] = useState('Reklam');
  const list = useMemo(() => f ? PROJECTS.filter(p => p.cat === f) : PROJECTS, [f]);
  return (
    <section id="projects" className="featured snap-sec">
      <SectionTitle title="Projeler" />
      <div className="filters">
        {CATEGORIES.map(c => (
          <button key={c} className={'chip' + (f === c ? ' on' : '')} onClick={() => setF(f === c ? null : c)}>{c}</button>
        ))}
        <span className="count">{list.length} / {PROJECTS.length}</span>
      </div>
      <div className="masonry">
        {list.map((p) => (
          <article key={p.id} className="card" onClick={() => openProject(p.id)}>
            <div className="pic" style={{ backgroundImage: `url("${p.img}")` }}></div>
            <div className="card-top">
              <span className="card-no">{p.no}</span>
              <span className="card-cat">{p.cat}</span>
            </div>
            <div className="card-info">
              <div className="card-title-row">
                <h3>{p.title} <span className="it">{p.titleIt}</span></h3>
              </div>
              <div className="card-meta-row">
                <span className="card-status">{p.status}</span>
                <span className="card-year">{p.year}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const ABOUT_ITEMS = [
  { no: '01', text: 'BSD Design Studio olarak mimari tasarım, iç mekân konsepti, uygulama takibi ve mekan kimliği geliştirme süreçlerini tek merkezden yönetiyoruz.' },
  { no: '02', text: 'Her projede malzeme, ışık, oran ve detay kararlarını markanın veya yaşam alanının karakterine göre ele alıyoruz.' },
  { no: '03', text: 'Proje başlangıcından teslim aşamasına kadar çizim, tasarım, uygulama ve kontrol süreçlerini disiplinli bir akışla sürdürüyoruz.' },
  { no: '04', text: 'Amacımız yalnızca iyi görünen alanlar değil; kullanımı güçlü, kimliği net ve uzun ömürlü mekânlar üretmek.' },
];

function About() {
  return (
    <section id="about" className="about snap-sec">
      <div className="about-bg" />
      <div className="about-overlay" />
      <SectionTitle title="Hakkımızda" />
      <div className="about-content">
        <p className="about-quote">
          "Tasarımı yalnızca estetik değil; mekânın ruhunu, işlevini ve kullanıcı deneyimini aynı çizgide buluşturan bir üretim dili olarak görüyoruz."
        </p>
        <div className="about-items">
          {ABOUT_ITEMS.map((item) => (
            <div key={item.no} className="about-item">
              <span className="about-item-no">{item.no}</span>
              <p className="about-item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REF_CARDS = [
  { no: '01', title: 'Villa Projeleri', desc: 'Özel konut, villa ve yaşam alanı tasarımları.' },
  { no: '02', title: 'Ticari Mekânlar', desc: 'Showroom, ofis, mağaza ve kurumsal iç mekân çözümleri.' },
  { no: '03', title: 'Uygulama Takibi', desc: 'Malzeme, üretim ve saha koordinasyonu süreçleri.' },
];

function References() {
  return (
    <section id="references" className="references snap-sec">
      <SectionTitle title="Referanslar" />
      <div className="ref-row">
        {REF_CARDS.map((c) => (
          <div key={c.no} className="ref-card">
            <span className="ref-card-no">{c.no}</span>
            <h3 className="ref-card-title">{c.title}</h3>
            <p className="ref-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ onJump }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', scope: 'Reklam · Tabela', budget: '', msg: '' });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contact" className="contact snap-sec">
      <div className="contact-bg" />
      <div className="contact-overlay" />
      <SectionTitle title="İletişim" />
      <div className="contact-inner">
        <div className="contact-left">
          <div className="c-blocks">
            <div className="c-blk">
              <div className="c-k">Adres</div>
              <div className="c-v">Çalca OSB Mh. 2.Cd. No:2/O2<br/>Merkez / <span className="it">Kütahya</span></div>
            </div>
            <div className="c-blk">
              <div className="c-k">İletişim</div>
              <div className="c-v">info@bsddesignstudio.com<br/>+90 274 000 00 00</div>
            </div>
            <div className="c-blk">
              <div className="c-k">Çalışma Saatleri</div>
              <div className="c-v">Pzt — Cmt · 09:00 – 18:00</div>
            </div>
          </div>
          <div className="c-socials">
            {SOCIALS.map(s => <a key={s.lbl} href={s.url}>{s.lbl}</a>)}
          </div>
        </div>
        <div className="contact-right">
          {sent ? (
            <div className="c-sent">
              <span className="c-eyebrow" style={{ color: 'var(--gold)' }}>— Teşekkürler</span>
              <h3 className="c-sent-title">Mesaj <span className="it">iletildi.</span></h3>
              <p>{form.name || 'BSD dostu'}, en kısa sürede dönüş yapacağız.</p>
              <button className="btn ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', scope: 'Reklam · Tabela', budget: '', msg: '' }); }}>
                Yeni mesaj <span className="ar">→</span>
              </button>
            </div>
          ) : (
            <form className="c-form" onSubmit={submit}>
              <div className="c-row2">
                <div className="c-field"><label>Ad Soyad</label><input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Adınız" /></div>
                <div className="c-field"><label>E-posta</label><input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="e@posta.com" /></div>
              </div>
              <div className="c-row2">
                <div className="c-field">
                  <label>Hizmet</label>
                  <select value={form.scope} onChange={e=>setForm({...form, scope: e.target.value})}>
                    <option>Reklam · Tabela</option>
                    <option>LED Tabela</option>
                    <option>İç Mimarlık</option>
                    <option>Mobilya Tasarım · Üretim</option>
                  </select>
                </div>
                <div className="c-field">
                  <label>Bütçe</label>
                  <select value={form.budget} onChange={e=>setForm({...form, budget: e.target.value})}>
                    <option value="">Seçiniz</option>
                    <option>&lt; 50.000 ₺</option>
                    <option>50.000 — 200.000 ₺</option>
                    <option>200.000 — 500.000 ₺</option>
                    <option>500.000 ₺ +</option>
                  </select>
                </div>
              </div>
              <div className="c-field">
                <label>Projeniz</label>
                <textarea value={form.msg} onChange={e=>setForm({...form, msg: e.target.value})} placeholder="Kısa bilgi, konum ve beklentileriniz..." rows="3"></textarea>
              </div>
              <button className="c-submit" type="submit">Mesajı Gönder <span>→</span></button>
            </form>
          )}
        </div>
      </div>
      <div className="contact-footer">
        <button className="back-to-top" onClick={() => onJump('home')}>Yukarı Çık ↑</button>
        <a href="https://muimedya.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Created by muimedya.com</a>
      </div>
    </section>
  );
}


function ProjectDetail({ id, onClose, openProject }) {
  const p = PROJECTS.find(x => x.id === id);
  const idx = PROJECTS.findIndex(x => x.id === id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const images = [p?.img, ...(p?.gallery || [])].filter(Boolean);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') openProject(next.id);
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [onClose, next]);

  if (!p) return null;
  return (
    <div className="pv">
      <div className="pv-bar">
        <div className="pv-info">
          <span className="pv-no">{p.no}</span>
          <span className="pv-title">{p.title} <span className="it">{p.titleIt}</span></span>
          <span className="pv-meta">{p.cat} · {p.year} · {p.where}</span>
        </div>
        <div className="pv-actions">
          <button className="pv-next" onClick={() => openProject(next.id)}>Sonraki →</button>
          <button className="pv-close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="pv-strip">
        {images.map((img, i) => (
          <div key={i} className="pv-slide" style={{ backgroundImage: `url("${img}")` }} />
        ))}
      </div>
    </div>
  );
}


function KvkkBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('kvkk_ok'));
  if (!visible) return null;
  return (
    <div className="kvkk-banner">
      <div className="kvkk-text">
        Bu site çerez kullanmaktadır.{' '}
        <a href="#contact" className="kvkk-link">KVKK</a>
      </div>
      <div className="kvkk-actions">
        <button className="kvkk-btn accept" onClick={() => { localStorage.setItem('kvkk_ok','1'); setVisible(false); }}>Kabul Et</button>
        <button className="kvkk-btn reject" onClick={() => setVisible(false)}>Reddet</button>
      </div>
    </div>
  );
}

const SECTIONS = ['home', 'projects', 'about', 'references', 'contact'];

export default function App() {
  const [active, setActive] = useState('home');
  const [openId, setOpenId] = useState(null);
  const curIdx = useRef(0);
  const busy = useRef(false);
  const scrollWrapRef = useRef(null);

  const goTo = useCallback((idx) => {
    idx = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    const el = document.getElementById(SECTIONS[idx]);
    const wrap = scrollWrapRef.current;
    if (!el || !wrap) return;
    curIdx.current = idx;
    setActive(SECTIONS[idx]);
    wrap.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    busy.current = true;
    setTimeout(() => { busy.current = false; }, 900);
  }, []);

  const onJump = useCallback((id) => {
    const idx = SECTIONS.indexOf(id);
    if (idx !== -1) goTo(idx);
  }, [goTo]);

  useEffect(() => {
    const onWheel = (e) => {
      if (busy.current || openId) return;
      e.preventDefault();
      busy.current = true;
      setTimeout(() => { busy.current = false; }, 900);
      goTo(curIdx.current + (e.deltaY > 0 ? 1 : -1));
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (busy.current || openId) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      busy.current = true;
      setTimeout(() => { busy.current = false; }, 900);
      goTo(curIdx.current + (diff > 0 ? 1 : -1));
    };

    const onKey = (e) => {
      if (openId) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(curIdx.current + 1); }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(curIdx.current - 1); }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, [goTo, openId]);

  return (
    <>
      <Nav active={active} onJump={onJump} onOpenRefs={() => onJump('references')} scrolled={active !== 'home'} />
      <div id="scroll-wrap" ref={scrollWrapRef}>
        <Hero onJump={onJump} />
        <Featured openProject={setOpenId} />
        <About />
        <References />
        <Contact onJump={onJump} />
      </div>
      <KvkkBanner />
      {openId && <ProjectDetail id={openId} onClose={() => setOpenId(null)} openProject={setOpenId} />}
    </>
  );
}
