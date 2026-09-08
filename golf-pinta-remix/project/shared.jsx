// Golf Pinta — shared design system, icons, layout shell

const { useState, useEffect, useMemo, useRef } = React;

// ─── Design tokens ──────────────────────────────────────────────
const GP = {
  ink: '#0B1322',
  inkSoft: '#101A2E',
  inkSofter: '#1A2440',
  card: '#FFFFFF',
  cream: '#F6F2E9',
  creamDeep: '#EDE6D5',
  champagne: '#C5A35A',
  champagneSoft: '#D9BC78',
  champagneDeep: '#A88742',
  champagneTint: 'rgba(197,163,90,0.10)',
  champagneTint2: 'rgba(197,163,90,0.18)',
  text: '#0B1322',
  textMuted: '#6E7689',
  textOnInk: '#FFFFFF',
  textOnInkMuted: 'rgba(255,255,255,0.55)',
  textOnInkDim: 'rgba(255,255,255,0.32)',
  hair: 'rgba(11,19,34,0.08)',
  hairStrong: 'rgba(11,19,34,0.14)',
  hairGold: 'rgba(197,163,90,0.28)',
  hairGoldStrong: 'rgba(197,163,90,0.45)',
  hairOnInk: 'rgba(255,255,255,0.08)',
  red: '#C25A4A',
  green: '#5A8A6A'
};

// Fonts are CSS vars so the Tweaks panel can swap them at runtime.
const SERIF = "var(--gp-serif)";
const SANS = "var(--gp-sans)";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

// ─── SVG icons ──────────────────────────────────────────────────
const Icon = {
  home: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  pin: ({ s = 18, c = 'currentColor', fill }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z" stroke={c} strokeWidth="1.5" fill={fill || 'none'} strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" fill={fill ? '#fff' : c} stroke="none" />
    </svg>,

  calendar: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M3.5 10h17" stroke={c} strokeWidth="1.5" />
      <path d="M8 3.5v3M16 3.5v3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  user: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.5" stroke={c} strokeWidth="1.5" />
      <path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  users: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3" stroke={c} strokeWidth="1.5" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M16 19c0-2 1-3.5 2.5-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  settings: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  logout: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7a2 2 0 002-2v-3M9 12h12m0 0l-4-4m4 4l-4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  search: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke={c} strokeWidth="1.5" />
      <path d="M15.5 15.5L20 20" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  bell: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 16h12l-1-3v-3a5 5 0 00-10 0v3l-1 3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  plus: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>,

  arrow: ({ s = 14, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  chevR: ({ s = 14, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  chevL: ({ s = 14, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  check: ({ s = 14, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5L13 4.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  clock: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  mail: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  phone: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 4h3l2 5-2 1a10 10 0 005 5l1-2 5 2v3a2 2 0 01-2 2A14 14 0 014 6a2 2 0 012-2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  filter: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 5h18l-7 9v5l-4 1v-6L3 5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  more: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.5" fill={c} /><circle cx="12" cy="12" r="1.5" fill={c} /><circle cx="19" cy="12" r="1.5" fill={c} />
    </svg>,

  trophy: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7 4h10v5a5 5 0 01-10 0V4z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3M9 20h6M12 14v6" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,

  flag: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 3v18M5 4h11l-2 4 2 4H5" stroke={c} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>,

  trend: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 17l5-5 4 4 8-8M14 8h6v6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  edit: ({ s = 16, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14 4l6 6-10 10H4v-6L14 4z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>,

  qr: ({ s = 18, c = 'currentColor' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" stroke={c} strokeWidth="1.5" />
    </svg>

};

// Pinta star/mark
const PintaMark = ({ s = 14, c = GP.champagne }) =>
<svg width={s} height={s} viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5l1.6 3.2 3.5.5-2.5 2.5.6 3.5L8 9.6 4.8 11.2l.6-3.5L2.9 5.2l3.5-.5L8 1.5Z"
  stroke={c} strokeWidth="1" fill="none" strokeLinejoin="round" />
  </svg>;


// ─── Wordmark (brand) ───────────────────────────────────────────
function Wordmark({ color = GP.champagne, size = 11, large = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: large ? 10 : 8,
      fontFamily: SANS, fontWeight: 600, fontSize: size,
      letterSpacing: '0.32em', textTransform: 'uppercase',
      color
    }}>
      <span style={{
        width: large ? 26 : 20, height: large ? 26 : 20, borderRadius: 13,
        border: `1px solid ${color}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF, fontStyle: 'italic', fontSize: large ? 17 : 13,
        letterSpacing: 0, paddingRight: 1, paddingBottom: 1,
        flexShrink: 0
      }}>P</span>
      <span>Golf&nbsp;·&nbsp;Pinta</span>
    </div>);

}

// ─── Eyebrow label (uppercase with leading dash) ────────────────
function Eyebrow({ children, color = GP.champagne, dash = true, dot = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
      letterSpacing: '0.26em', textTransform: 'uppercase',
      color
    }}>
      {dash && <span style={{ width: 18, height: 1, background: color, opacity: 0.6, fontFamily: "system-ui" }} />}
      {dot && <span style={{ width: 4, height: 4, borderRadius: 4, background: color }} />}
      {children}
    </div>);

}

// ─── Page wrapper ───────────────────────────────────────────────
function Page({ eyebrow, title, subtitle, actions, children, dense = false }) {
  return (
    <div style={{
      padding: dense ? '24px 40px 40px' : '32px 48px 48px',
      maxWidth: 1400, margin: '0 auto', width: '100%'
    }}>
      <header style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 28, gap: 32, flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          {eyebrow && <div style={{ marginBottom: 12 }}><Eyebrow>{eyebrow}</Eyebrow></div>}
          <h1 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: 44, lineHeight: 1.02, letterSpacing: '-0.015em',
            margin: 0, color: GP.text
          }}>{title}</h1>
          {subtitle &&
          <p style={{
            fontFamily: SANS, fontSize: 14.5, lineHeight: 1.5,
            color: GP.textMuted, margin: '10px 0 0', maxWidth: 580
          }}>{subtitle}</p>
          }
        </div>
        {actions && <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{actions}</div>}
      </header>

      {/* gold hairline divider */}
      <div style={{
        height: 1, marginBottom: 28,
        background: `linear-gradient(90deg, ${GP.hairGoldStrong} 0%, ${GP.hair} 30%, transparent 100%)`
      }} />

      {children}
    </div>);

}

// ─── Buttons ────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', onClick, type, disabled, icon, iconRight }) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 11.5 },
    md: { padding: '11px 18px', fontSize: 12.5 },
    lg: { padding: '14px 22px', fontSize: 13 }
  };
  const variants = {
    primary: {
      background: `linear-gradient(180deg, ${GP.ink}, ${GP.inkSoft})`,
      color: GP.champagne,
      boxShadow: `inset 0 0 0 1px ${GP.hairGold}, 0 4px 12px rgba(11,19,34,0.12)`
    },
    gold: {
      background: `linear-gradient(180deg, ${GP.champagneSoft}, ${GP.champagne})`,
      color: GP.ink,
      boxShadow: `inset 0 0 0 1px ${GP.champagneDeep}, 0 4px 12px rgba(197,163,90,0.25)`
    },
    ghost: {
      background: 'transparent',
      color: GP.text,
      boxShadow: `inset 0 0 0 1px ${GP.hairStrong}`
    },
    ghostOnInk: {
      background: 'transparent',
      color: GP.textOnInk,
      boxShadow: `inset 0 0 0 1px ${GP.hairOnInk}`
    },
    danger: {
      background: 'transparent',
      color: GP.red,
      boxShadow: `inset 0 0 0 1px rgba(194,90,74,0.35)`
    }
  };
  return (
    <button
      type={type || 'button'} disabled={disabled} onClick={onClick}
      style={{
        ...sizes[size], ...variants[variant],
        border: 'none', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        borderRadius: 10,
        fontFamily: SANS, fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'transform 120ms, filter 120ms',
        whiteSpace: 'nowrap'
      }}
      onMouseDown={(e) => {if (!disabled) e.currentTarget.style.transform = 'scale(0.985)';}}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      
      {icon}
      {children}
      {iconRight}
    </button>);

}

// ─── Card ───────────────────────────────────────────────────────
function Card({ children, padded = true, style = {}, dark = false }) {
  return (
    <div style={{
      background: dark ? GP.ink : GP.card,
      border: `1px solid ${dark ? GP.hairOnInk : GP.hair}`,
      borderRadius: 16,
      padding: padded ? 22 : 0,
      boxShadow: dark ?
      '0 1px 2px rgba(0,0,0,0.1), 0 10px 28px rgba(11,19,34,0.12)' :
      '0 1px 2px rgba(11,19,34,0.03), 0 8px 24px rgba(11,19,34,0.04)',
      ...style
    }}>{children}</div>);

}

// ─── Field (input) ──────────────────────────────────────────────
function Field({ label, placeholder, value, onChange, mono, type = 'text', icon, hint }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      {label &&
      <label style={{
        display: 'block',
        fontFamily: SANS, fontSize: 10, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: GP.textMuted, marginBottom: 7
      }}>{label}</label>
      }
      <div style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 10,
        border: `1px solid ${focus ? GP.champagne : GP.hair}`,
        boxShadow: focus ?
        `0 0 0 3px ${GP.champagneTint}, 0 1px 2px rgba(11,19,34,0.02)` :
        '0 1px 2px rgba(11,19,34,0.02)',
        transition: 'all 160ms',
        display: 'flex', alignItems: 'center'
      }}>
        {icon && <div style={{ paddingLeft: 14, color: GP.textMuted, display: 'flex' }}>{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, width: '100%',
            border: 'none', outline: 'none', background: 'transparent',
            padding: icon ? '12px 14px 12px 10px' : '12px 14px',
            fontFamily: mono ? MONO : SANS,
            fontSize: mono ? 12.5 : 14, color: GP.text,
            letterSpacing: mono ? '0.04em' : 0,
            fontWeight: 500
          }} />
        
      </div>
      {hint &&
      <div style={{
        fontFamily: SANS, fontSize: 11, color: GP.textMuted, marginTop: 6
      }}>{hint}</div>
      }
    </div>);

}

// ─── Status pill ────────────────────────────────────────────────
function Pill({ tone = 'neutral', children }) {
  const tones = {
    neutral: { bg: GP.hair, fg: GP.text, dot: GP.textMuted },
    gold: { bg: GP.champagneTint, fg: GP.champagneDeep, dot: GP.champagne },
    green: { bg: 'rgba(90,138,106,0.10)', fg: GP.green, dot: GP.green },
    red: { bg: 'rgba(194,90,74,0.10)', fg: GP.red, dot: GP.red },
    ink: { bg: GP.ink, fg: GP.champagne, dot: GP.champagne }
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 100,
      background: t.bg, color: t.fg,
      fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase'
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 5, background: t.dot }} />
      {children}
    </span>);

}

// ─── Sidebar nav ────────────────────────────────────────────────
function Sidebar({ role, route, onNavigate, onLogout, user }) {
  const customerNav = [
  { key: 'home', label: 'Tableau de bord', icon: 'home' },
  { key: 'academies', label: 'Académies', icon: 'pin' },
  { key: 'booking', label: 'Réserver', icon: 'plus' },
  { key: 'reservations', label: 'Mes Réservations', icon: 'calendar' }];

  const customerNav2 = [
  { key: 'profile', label: 'Profil', icon: 'user' },
  { key: 'settings', label: 'Paramètres', icon: 'settings' }];

  const coachNav = [
  { key: 'coach.home', label: 'Tableau de bord', icon: 'home' },
  { key: 'coach.schedule', label: 'Calendrier', icon: 'calendar' },
  { key: 'coach.students', label: 'Élèves', icon: 'users' },
  { key: 'coach.academy', label: 'Académie', icon: 'flag' }];

  const coachNav2 = [
  { key: 'profile', label: 'Profil', icon: 'user' },
  { key: 'settings', label: 'Paramètres', icon: 'settings' }];


  const nav = role === 'coach' ? coachNav : customerNav;
  const nav2 = role === 'coach' ? coachNav2 : customerNav2;

  return (
    <aside style={{
      width: 248, flexShrink: 0,
      background: GP.ink,
      borderRight: `1px solid ${GP.hairOnInk}`,
      display: 'flex', flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* gold radial accent */}
      <div style={{
        position: 'absolute', top: -120, left: -100, width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,163,90,0.10) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      {/* brand block */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: `1px solid ${GP.hairOnInk}`,
        position: 'relative'
      }}>
        <Wordmark color={GP.champagne} />
        <div style={{
          marginTop: 14,
          fontFamily: SERIF, fontStyle: 'italic',
          fontSize: 14, color: GP.textOnInkMuted
        }}>
          Académies signature
        </div>
        {/* gold hairline */}
        <div style={{
          position: 'absolute', bottom: -1, left: 24, right: 24, height: 1,
          background: `linear-gradient(90deg, transparent, ${GP.champagne}, transparent)`,
          opacity: 0.4
        }} />
      </div>

      {/* role indicator */}
      <div style={{ padding: '18px 24px 8px', position: 'relative' }}>
        <Eyebrow color={GP.textOnInkDim}>
          {role === 'coach' ? 'Espace Coach' : 'Espace Client'}
        </Eyebrow>
      </div>

      {/* primary nav */}
      <nav style={{ padding: '4px 16px 12px', position: 'relative' }}>
        {nav.map((item) => <NavItem key={item.key} {...item} active={route === item.key} onClick={() => onNavigate(item.key)} />)}
      </nav>

      <div style={{ flex: 1 }} />

      {/* secondary nav */}
      <nav style={{ padding: '8px 16px', position: 'relative', borderTop: `1px solid ${GP.hairOnInk}` }}>
        {nav2.map((item) => <NavItem key={item.key} {...item} active={route === item.key} onClick={() => onNavigate(item.key)} />)}
      </nav>

      {/* user block */}
      <div style={{
        padding: '16px 20px 22px',
        borderTop: `1px solid ${GP.hairOnInk}`,
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'relative'
      }}>
        <Avatar name={user.name} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: GP.textOnInk,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{user.name}</div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: GP.textOnInkDim, marginTop: 1 }}>
            {role === 'coach' ? 'Coach certifié' : 'Pinta Club · ' + user.tier}
          </div>
        </div>
        <button onClick={onLogout} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: GP.textOnInkDim, padding: 6, display: 'flex'
        }} title="Déconnexion">
          <Icon.logout s={16} />
        </button>
      </div>
    </aside>);

}

function NavItem({ icon, label, active, onClick }) {
  const I = Icon[icon];
  return (
    <button onClick={onClick} style={{
      width: '100%',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 12px',
      background: active ? GP.champagneTint2 : 'transparent',
      border: 'none',
      borderRadius: 10,
      cursor: 'pointer',
      color: active ? GP.champagne : 'rgba(255,255,255,0.65)',
      fontFamily: SANS, fontSize: 12.5, fontWeight: 500,
      textAlign: 'left',
      letterSpacing: '0.01em',
      marginBottom: 2,
      position: 'relative',
      transition: 'all 160ms'
    }}
    onMouseEnter={(e) => {if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';}}
    onMouseLeave={(e) => {if (!active) e.currentTarget.style.background = 'transparent';}}>
      
      {active &&
      <span style={{
        position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
        width: 3, height: 18, background: GP.champagne, borderRadius: 3
      }} />
      }
      <I s={17} c={active ? GP.champagne : 'rgba(255,255,255,0.5)'} />
      <span>{label}</span>
    </button>);

}

// ─── Avatar ─────────────────────────────────────────────────────
function Avatar({ name, size = 40, tone = 'dark' }) {
  const initials = (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: tone === 'dark' ?
      `linear-gradient(160deg, ${GP.inkSoft}, ${GP.inkSofter})` :
      `linear-gradient(160deg, ${GP.champagne}, ${GP.champagneDeep})`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: tone === 'dark' ? GP.champagne : GP.ink,
      fontFamily: SERIF, fontStyle: 'italic',
      fontSize: size * 0.42, fontWeight: 400,
      flexShrink: 0,
      boxShadow: `inset 0 0 0 1px ${GP.hairGold}`
    }}>{initials}</div>);

}

// ─── Topbar (in-page header) ────────────────────────────────────
function Topbar({ search = true, right }) {
  return (
    <div style={{
      height: 64, flexShrink: 0,
      background: GP.cream,
      borderBottom: `1px solid ${GP.hair}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {search &&
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff', border: `1px solid ${GP.hair}`,
          borderRadius: 10, padding: '8px 14px',
          width: 320
        }}>
            <Icon.search s={16} c={GP.textMuted} />
            <input
            placeholder="Rechercher académies, coachs, sessions…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: SANS, fontSize: 13, color: GP.text
            }} />
          
            <span style={{
            fontFamily: MONO, fontSize: 10, color: GP.textMuted,
            border: `1px solid ${GP.hair}`, borderRadius: 4, padding: '1px 5px'
          }}>⌘K</span>
          </div>
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {right}
        <button style={{
          width: 36, height: 36, borderRadius: 10,
          background: '#fff', border: `1px solid ${GP.hair}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative'
        }}>
          <Icon.bell s={17} c={GP.text} />
          <span style={{
            position: 'absolute', top: 7, right: 8,
            width: 7, height: 7, borderRadius: 7, background: GP.champagne,
            boxShadow: '0 0 0 2px #fff'
          }} />
        </button>
      </div>
    </div>);

}

// ─── Stat card ──────────────────────────────────────────────────
function Stat({ label, value, sub, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div style={{
      background: dark ? GP.ink : GP.card,
      border: `1px solid ${dark ? GP.hairOnInk : GP.hair}`,
      borderRadius: 16,
      padding: '20px 22px',
      position: 'relative', overflow: 'hidden'
    }}>
      {dark &&
      <div style={{
        position: 'absolute', top: -60, right: -80, width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,163,90,0.16) 0%, transparent 60%)'
      }} />
      }
      <div style={{
        position: 'relative',
        fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: dark ? GP.textOnInkMuted : GP.textMuted,
        marginBottom: 10
      }}>{label}</div>
      <div style={{
        position: 'relative',
        fontFamily: SERIF, fontSize: 38, lineHeight: 1, letterSpacing: '-0.015em',
        color: dark ? GP.champagne : GP.text,
        marginBottom: 6
      }}>{value}</div>
      {sub &&
      <div style={{
        position: 'relative',
        fontFamily: SANS, fontSize: 12, color: dark ? GP.textOnInkMuted : GP.textMuted
      }}>{sub}</div>
      }
    </div>);

}

// ─── Monogram (academy tile) ────────────────────────────────────
function Monogram({ initial, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.25,
      background: `linear-gradient(160deg, ${GP.ink}, ${GP.inkSoft})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      boxShadow: `inset 0 0 0 1px ${GP.hairGold}`,
      flexShrink: 0
    }}>
      <span style={{
        fontFamily: SERIF, fontStyle: 'italic',
        fontSize: size * 0.6, fontWeight: 400,
        color: GP.champagne, lineHeight: 1, paddingBottom: 2
      }}>{initial}</span>
      <span style={{
        position: 'absolute', top: size * 0.12, right: size * 0.12,
        width: 3, height: 3, borderRadius: 3,
        background: GP.champagne, opacity: 0.5
      }} />
    </div>);

}

// ─── Mock data ──────────────────────────────────────────────────
const ACADEMIES = [
{ id: 'mont-mar', initial: 'M', name: 'Montgomerie', city: 'Marrakech', signature: 'Colin Montgomerie', holes: 18, par: 72, coaches: 6, established: 2008 },
{ id: 'mont-rab', initial: 'M', name: 'Montgomerie', city: 'Rabat', signature: 'Colin Montgomerie', holes: 18, par: 72, coaches: 5, established: 2014 },
{ id: 'tony-cas', initial: 'T', name: 'Tony Jacklin', city: 'Casablanca', signature: 'Tony Jacklin', holes: 9, par: 36, coaches: 4, established: 2017 },
{ id: 'tony-mar', initial: 'T', name: 'Tony Jacklin', city: 'Marrakech', signature: 'Tony Jacklin', holes: 18, par: 71, coaches: 7, established: 2011 }];


const COACHES = [
{ id: 'c1', name: 'Karim El Hassan', speciality: 'Putting, jeu court', rating: 4.9, lessons: 412, academy: 'mont-mar', priceHour: 480 },
{ id: 'c2', name: 'Yasmine Bouziane', speciality: 'Swing, débutants', rating: 4.8, lessons: 287, academy: 'mont-mar', priceHour: 420 },
{ id: 'c3', name: 'Reda Belkacem', speciality: 'Compétition', rating: 5.0, lessons: 198, academy: 'mont-mar', priceHour: 560 },
{ id: 'c4', name: 'Nadia Cherkaoui', speciality: 'Jeunes & juniors', rating: 4.7, lessons: 156, academy: 'mont-mar', priceHour: 360 }];


const RESERVATIONS = [
{ id: 'PNT-7421-8C', academy: 'mont-mar', coach: 'c1', date: '2026-05-22', time: '10:30', duration: 60, price: 480, status: 'confirmed' },
{ id: 'PNT-7398-2A', academy: 'mont-mar', coach: 'c3', date: '2026-05-28', time: '14:00', duration: 90, price: 840, status: 'confirmed' },
{ id: 'PNT-7301-5F', academy: 'tony-mar', coach: 'c2', date: '2026-05-09', time: '09:00', duration: 60, price: 420, status: 'completed' },
{ id: 'PNT-7287-1B', academy: 'mont-rab', coach: 'c4', date: '2026-05-02', time: '16:30', duration: 60, price: 360, status: 'completed' },
{ id: 'PNT-7150-9D', academy: 'mont-mar', coach: 'c1', date: '2026-04-18', time: '11:00', duration: 60, price: 480, status: 'cancelled' }];


const lookupAcademy = (id) => ACADEMIES.find((a) => a.id === id);
const lookupCoach = (id) => COACHES.find((c) => c.id === id);

const formatDate = (iso, opts = {}) => {
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const months2 = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const days2 = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const d = new Date(iso + 'T00:00:00');
  const M = opts.long ? months2 : months;
  const D = opts.long ? days2 : days;
  if (opts.dayOnly) return d.getDate();
  return `${D[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}`;
};

// Export
Object.assign(window, {
  GP, SERIF, SANS, MONO,
  Icon, PintaMark, Wordmark, Eyebrow,
  Page, Btn, Card, Field, Pill,
  Sidebar, Topbar, Avatar, Stat, Monogram,
  ACADEMIES, COACHES, RESERVATIONS,
  lookupAcademy, lookupCoach, formatDate
});