import { useState, useEffect, useMemo } from 'react';
import { PROJECTS, CATEGORIES, PILLARS, CLIENTS, SOCIALS, HERO_SLIDES } from './data';
import './index.css';

function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    const move = (e) => {
      document.body.classList.add('has-cursor');
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    const leave = () => document.body.classList.remove('has-cursor');
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave); };
  }, []);
  return <div className="cursor-glow" />;
}

function LightToggle({ mode, onChange }) {
  return (
    <button className={'light-toggle' + (mode === 'white' ? ' white' : '')} onClick={() => onChange(mode === 'day' ? 'white' : 'day')} title={mode === 'day' ? 'Beyaz ışığa geç' : 'Gün ışığına geç'}>
      {/* ışık simgesi */}
      <svg className="lt-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="10" y1="1.5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="10" y1="16.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="1.5" y1="10" x2="3.5" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16.5" y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="4.1" y1="4.1" x2="5.5" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="14.5" y1="14.5" x2="15.9" y2="15.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="15.9" y1="4.1" x2="14.5" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="5.5" y1="14.5" x2="4.1" y2="15.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
      <span className="lt-labels">
        <span className={'lt-opt' + (mode === 'day' ? ' on' : '')}>Gün Işığı</span>
        <span className="lt-div">|</span>
        <span className={'lt-opt' + (mode === 'white' ? ' on' : '')}>Beyaz</span>
      </span>
    </button>
  );
}

function Nav({ active, onJump, scrolled, lightMode, setLightMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'projects', label: 'Projeler' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'references', label: 'Referanslar' },
    { id: 'portfolio', label: 'Portfolyo' },
  ];
  const jump = (id) => { setMenuOpen(false); onJump(id); };
  return (
    <>
      <header className={'nav ' + (scrolled ? 'scrolled' : '')}>
        <div className="brand" onClick={() => jump('home')}>
          <img src="/logo.png" alt="BSD Design Studio" className="brand-logo" />
        </div>
        <nav className="links">
          {items.map(it => (
            <a key={it.id} href={'#' + it.id} className={active === it.id ? 'active' : ''}
               onClick={(e) => { e.preventDefault(); jump(it.id); }}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="meta">
          <LightToggle mode={lightMode} onChange={setLightMode} />
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menü">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          {items.map(it => (
            <a key={it.id} href={'#' + it.id} className={active === it.id ? 'active' : ''}
               onClick={(e) => { e.preventDefault(); jump(it.id); }}>
              {it.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); jump('contact'); }} className="mob-cta">İletişime Geç →</a>
          <div className="mob-light"><LightToggle mode={lightMode} onChange={setLightMode} /></div>
        </div>
      )}
    </>
  );
}

function Divider() {
  return <div className="bsd-divider" />;
}

function Hero({ onJump }) {
  const [i, setI] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const progress = Math.min(scrollY / 600, 1);

  return (
    <section id="home" className="hero">
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
      <div className="hero-center" style={{ opacity: 1 - progress * 1.4 }}>
        <h1>
          Tasarım, <span className="it">ışık</span> ve mekan.
        </h1>
      </div>
      <div className="scroll-down" style={{ opacity: 1 - progress * 2 }} onClick={() => onJump('projects')}>
        <div className="scroll-down-mouse">
          <div className="scroll-down-wheel"></div>
        </div>
        <span>Aşağı Kaydır</span>
      </div>
    </section>
  );
}

function Featured({ openProject }) {
  const [f, setF] = useState('Reklam');
  const list = useMemo(() => f ? PROJECTS.filter(p => p.cat === f) : PROJECTS, [f]);
  return (
    <section id="projects" className="featured" style={{ paddingTop: 0 }}>
      <div className="section" style={{ padding: 'clamp(80px, 12vw, 140px) 0 40px' }}>
        <div className="filters">
          {CATEGORIES.map(c => (
            <button key={c} className={'chip' + (f === c ? ' on' : '')} onClick={() => setF(f === c ? null : c)}>{c}</button>
          ))}
          <span className="count">{list.length} / {PROJECTS.length} işler</span>
        </div>
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

function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-left">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>— Hakkımızda · 003</span>
          <img src="/logo.png" alt="BSD Design Studio" className="about-logo" />
          <div className="about-rule"></div>
          <p className="about-lead">
            Kütahya merkezli bir tasarım ve üretim stüdyosuyuz. 2014'ten bu yana markaları görünür kılıyor, mekanları değere dönüştürüyoruz.
          </p>
          <p className="about-body">
            İç & dış mekan reklamcılık, iç mimarlık ve mobilya tasarım-üretim alanlarında bütünleşik hizmet sunuyoruz. Tasarımdan üretime, montajdan teslimata her adımı kendi bünyemizde yönetiyor; aracısız ve eksiksiz sonuç taahhüt ediyoruz.
          </p>
          <div className="about-tags">
            {['Reklam & Tabela', 'LED Sistemleri', 'İç Mimarlık', 'Mobilya Üretim'].map(t => (
              <span key={t} className="about-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="about-right">
          <div className="about-img"></div>
          <div className="about-stats">
            <div className="about-stat">
              <div className="n">120<span className="plus">+</span></div>
              <div className="lbl">Tamamlanan Proje</div>
            </div>
            <div className="about-stat">
              <div className="n">10<span className="plus">+</span></div>
              <div className="lbl">Yıllık Deneyim</div>
            </div>
            <div className="about-stat">
              <div className="n">47</div>
              <div className="lbl">Marka Referansı</div>
            </div>
            <div className="about-stat">
              <div className="n">3</div>
              <div className="lbl">Hizmet Alanı</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="studio">
      <div className="abstract" aria-hidden="true">
        <svg viewBox="0 0 320 320">
          <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(246,244,239,0.06)"/>
          <line x1="0" y1="160" x2="320" y2="160" stroke="rgba(246,244,239,0.06)"/>
          <line x1="0" y1="280" x2="320" y2="280" stroke="rgba(246,244,239,0.06)"/>
          <line x1="40" y1="0" x2="40" y2="320" stroke="rgba(246,244,239,0.06)"/>
          <line x1="160" y1="0" x2="160" y2="320" stroke="rgba(246,244,239,0.06)"/>
          <line x1="280" y1="0" x2="280" y2="320" stroke="rgba(246,244,239,0.06)"/>
          <rect x="60" y="60" width="120" height="180" fill="none" stroke="rgba(200,164,107,0.55)" strokeWidth="0.6"/>
          <rect x="120" y="100" width="160" height="140" fill="none" stroke="rgba(246,244,239,0.25)" strokeWidth="0.6"/>
          <circle cx="180" cy="170" r="46" fill="none" stroke="rgba(200,164,107,0.4)" strokeWidth="0.6"/>
        </svg>
      </div>
      <div className="grid">
        <div className="left">
          <span className="eyebrow">— Stüdyo · 003</span>
          <h3 className="big">
            Markanızı <span className="it">görünür</span> kılıyor,<br/>
            mekanlarınızı <span className="it">değerli</span> yapıyoruz.
          </h3>
          <div className="gold-rule"></div>
          <p>BSD Design Studio; iç & dış mekan reklamcılık, iç mimarlık ve mobilya tasarım-üretim alanlarında bütünleşik hizmet sunan Kütahya merkezli bir stüdyodur.</p>
          <p>Tasarım aşamasından üretime, montajdan teslimata her adımı kendi bünyesinde yönetir; aracısız ve eksiksiz sonuç taahhüt eder.</p>
        </div>
        <div className="right">
          <div className="pillars">
            {PILLARS.map(p => (
              <div key={p.no} className="p">
                <span className="no">— {p.no}</span>
                <h4>{p.title} <span className="it">{p.it}</span></h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="stats">
            <div><div className="n">120<span className="plus">+</span></div><div className="lbl">Proje</div></div>
            <div><div className="n">10<span className="plus">+</span></div><div className="lbl">Yıl</div></div>
            <div><div className="n">3</div><div className="lbl">Hizmet</div></div>
            <div><div className="n">47</div><div className="lbl">Marka</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section id="references" className="marquee-section">
      <div className="head">
        <h3>Güven duyduğumuz <span className="it">markalar.</span></h3>
        <div className="right">
          Kütahya ve çevre illerde KOBİ'lerden kurumsal yapılara, perakendeden sanayi tesislerine geniş bir yelpazede hizmet verdik.
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="logo">
              <span className="dot"></span>
              <span>{c}</span>
              <span className="sm">EST.</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio({ openProject }) {
  return (
    <section id="portfolio" className="portfolio">
      <div className="head">
        <div>
          <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>— Portfolyo · 004</div>
          <h2>Tüm <span className="it">portfolyo.</span></h2>
        </div>
        <div className="right">
          Tüm işlerimizden seçme kareler. Her biri, bir marka kimliği, mekan dönüşümü ya da üretim hikâyesinin belgesidir.
        </div>
      </div>
      <div className="portfolio-grid">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className="slide-card" onClick={() => openProject(p.id)}>
            <div className="pic" style={{ backgroundImage: `url("${p.img}")` }}>
              <div></div>
            </div>
            <div className="topmeta">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span className="r">{p.cat}</span>
            </div>
            <div className="corners"></div>
            <div className="info">
              <h3>{p.title} <span className="it">{p.titleIt}</span></h3>
              <div className="meta">{p.year} · {p.where}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTA({ onJump }) {
  return (
    <section className="cta">
      <span className="eyebrow">— Birlikte çalışalım · 005</span>
      <h2 className="tight">
        Projenizi<br/>
        <span className="it">birlikte</span> yapalım.
      </h2>
      <p className="sub">Tabela, reklam, iç mimarlık veya mobilya için teklif almak istiyorsanız bizi arayın. Genellikle aynı gün dönüş yapıyoruz.</p>
      <div className="row">
        <button className="btn-big" onClick={() => onJump('contact')}>Bizimle İletişime Geçin <span className="ar">→</span></button>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', scope: 'Reklam · Tabela', budget: '', msg: '' });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">

        {/* Sol — başlık + bilgiler */}
        <div className="contact-left">
          <div className="c-eyebrow">— İletişim · 006</div>
          <h2 className="c-title">İletişime<br/><span className="it">geçin.</span></h2>
          <div className="c-divider"></div>
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

        {/* Sağ — form */}
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
                <textarea value={form.msg} onChange={e=>setForm({...form, msg: e.target.value})} placeholder="Kısa bilgi, konum, boyut ve beklentileriniz..." rows="3"></textarea>
              </div>
              <button className="c-submit" type="submit">Mesajı Gönder <span>→</span></button>
              <span className="c-kvkk">Bilgiler stüdyo dışına çıkmaz · KVKK uyumludur</span>
            </form>
          )}
        </div>

      </div>

      {/* Harita — full genişlik */}
      <div className="c-map">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(246,244,239,0.05)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="cglow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(200,164,107,0.10)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="220" fill="url(#cgrid)"/>
          <rect width="1200" height="220" fill="url(#cglow)"/>
          <path d="M0 110 Q300 90 600 110 T1200 100" stroke="rgba(246,244,239,0.10)" strokeWidth="1" fill="none"/>
          <path d="M0 155 Q400 170 700 148 T1200 160" stroke="rgba(246,244,239,0.06)" strokeWidth="0.8" fill="none"/>
          <path d="M0 58 Q350 48 600 65 T1200 55" stroke="rgba(246,244,239,0.06)" strokeWidth="0.8" fill="none"/>
          <path d="M580 0 Q590 65 600 110 T608 220" stroke="rgba(246,244,239,0.07)" strokeWidth="0.8" fill="none"/>
          <path d="M320 0 Q328 55 325 110 T328 220" stroke="rgba(246,244,239,0.04)" strokeWidth="0.6" fill="none"/>
          <path d="M860 0 Q862 65 858 110 T862 220" stroke="rgba(246,244,239,0.04)" strokeWidth="0.6" fill="none"/>
          <path d="M0 85 Q260 70 500 95 T900 88 T1200 92" stroke="rgba(200,164,107,0.30)" strokeWidth="1.2" fill="none"/>
          <text x="24" y="206" fill="rgba(246,244,239,0.18)" fontFamily="JetBrains Mono,monospace" fontSize="9" letterSpacing="2.5">KÜTAHYA · ÇALCA OSB · 39°25′N 29°58′E</text>
        </svg>
        <div className="c-pin">
          <div className="c-pin-ring r1"></div>
          <div className="c-pin-ring r2"></div>
          <div className="c-pin-ring r3"></div>
          <div className="c-pin-dot"></div>
        </div>
        <div className="c-pin-label">— BSD Design Studio</div>
      </div>

    </section>
  );
}

function ProjectDetail({ id, onClose, openProject }) {
  const p = PROJECTS.find(x => x.id === id);
  const idx = PROJECTS.findIndex(x => x.id === id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  if (!p) return null;
  return (
    <>
      <div className="pd-overlay" onClick={onClose}></div>
      <aside className="pd">
        <div className="head">
          <span className="mono" style={{ color: 'var(--gold)' }}>— {p.no} / {p.cat} / {p.year}</span>
          <button className="close" onClick={onClose}>Kapat <span className="x">×</span></button>
        </div>
        <div className="hero-img" style={{ backgroundImage: `url("${p.img}")` }}>
          <div className="grad"></div>
          <div className="ovr">
            <div className="l">{p.where}</div>
            <div className="r">{p.status}</div>
          </div>
        </div>
        <div className="body">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>— Project · {p.no}</span>
          <h1>{p.title} <span className="it">{p.titleIt}</span></h1>
          <div className="specs">
            <div><div className="k">Konum</div><div className="v">{p.where}</div></div>
            <div><div className="k">Yıl</div><div className="v">{p.year}</div></div>
            <div><div className="k">Alan</div><div className="v">{p.area}</div></div>
            <div><div className="k">Durum</div><div className="v">{p.status}</div></div>
          </div>
          <p className="lede"><span className="it">{p.summary}</span></p>
          <p>Proje; tasarım, üretim ve uygulama aşamalarıyla BSD ekibi tarafından anahtar teslim olarak tamamlandı.</p>
          <p>Rol: <span style={{ color: 'var(--ink)' }}>{p.role}</span></p>
          <div className="gallery">
            {(p.gallery || []).map((g, i) => (
              <div key={i} className={'g' + (i === 0 ? ' tall' : '')} style={{ backgroundImage: `url("${g}")` }}></div>
            ))}
          </div>
          <div className="nextrow">
            <button className="btn ghost" onClick={onClose}>← Tüm projeler</button>
            <button className="btn gold" onClick={() => openProject(next.id)}>Sonraki: {next.title} <span className="ar">→</span></button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Footer({ onJump }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/logo.png" alt="BSD Design Studio" className="footer-logo" />
      </div>
      <div>
        <h5>Menü</h5>
        <ul>
          <li onClick={() => onJump('home')}>Anasayfa</li>
          <li onClick={() => onJump('projects')}>Projeler</li>
          <li onClick={() => onJump('references')}>Referanslar</li>
          <li onClick={() => onJump('portfolio')}>Portfolyo</li>
          <li onClick={() => onJump('contact')}>İletişim</li>
        </ul>
      </div>
      <div>
        <h5>Stüdyo</h5>
        <ul>
          <li>Çalca OSB Mh. 2.Cd. No:2/O2<br/>Merkez / Kütahya</li>
          <li>info@bsddesignstudio.com</li>
          <li>+90 274 000 00 00</li>
        </ul>
      </div>
      <div className="footer-bot">
        <span>© BSD Design Studio · 2014 — 2026</span>
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Yukarı Çık ↑
        </button>
        <a href="https://muimedya.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Created by muimedya.com</a>
      </div>
    </footer>
  );
}

function KvkkBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('kvkk_ok'));
  if (!visible) return null;
  return (
    <div className="kvkk-banner">
      <div className="kvkk-text">
        <strong>Çerez Politikası</strong> — Bu site deneyimi iyileştirmek amacıyla çerez kullanmaktadır.
        Siteyi kullanmaya devam ederek{' '}
        <a href="#contact" className="kvkk-link">KVKK kapsamındaki çerez politikamızı</a> kabul etmiş sayılırsınız.
      </div>
      <div className="kvkk-actions">
        <button className="kvkk-btn accept" onClick={() => { localStorage.setItem('kvkk_ok','1'); setVisible(false); }}>Kabul Et</button>
        <button className="kvkk-btn reject" onClick={() => setVisible(false)}>Reddet</button>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [openId, setOpenId] = useState(null);
  const [lightMode, setLightMode] = useState('day');

  useEffect(() => {
    const root = document.documentElement;
    if (lightMode === 'white') {
      root.setAttribute('data-light', 'white');
    } else {
      root.removeAttribute('data-light');
    }
  }, [lightMode]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['home', 'projects', 'about', 'references', 'portfolio', 'contact'];
      let cur = 'home';
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) cur = s;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <CursorGlow />
      <Nav active={active} onJump={onJump} scrolled={scrolled} lightMode={lightMode} setLightMode={setLightMode} />
      <Hero onJump={onJump} />
      <Divider />
      <div className="sf"><Featured openProject={setOpenId} /></div>
      <Divider />
      <div className="sf"><About /></div>
      <Divider />
      <div className="sf"><Studio /></div>
      <Divider />
      <div className="sf"><References /></div>
      <Divider />
      <div className="sf"><Portfolio openProject={setOpenId} /></div>
      <Divider />
      <div className="sf"><CTA onJump={onJump} /></div>
      <Divider />
      <div className="sf"><Contact /></div>
      <Divider />
      <Footer onJump={onJump} />
      <KvkkBanner />
      {openId && <ProjectDetail id={openId} onClose={() => setOpenId(null)} openProject={setOpenId} />}
    </>
  );
}
