// Golf Pinta — refined booking app (compact, fits-on-screen variant)
const { useState } = React;

const T = {
  ink:        '#0B1322',
  inkSoft:    '#101A2E',
  card:       '#FFFFFF',
  cream:      '#F6F2E9',
  creamDeep:  '#EDE6D5',
  champagne:  '#C5A35A',
  champagneSoft: '#D9BC78',
  champagneTint: 'rgba(197,163,90,0.10)',
  text:       '#0B1322',
  textMuted:  '#6E7689',
  textOnInk:  '#FFFFFF',
  textOnInkMuted: 'rgba(255,255,255,0.55)',
  hair:       'rgba(11,19,34,0.08)',
  hairGold:   'rgba(197,163,90,0.28)',
};

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const SANS  = "'Manrope', -apple-system, system-ui, sans-serif";

// ─── Tiny SVG primitives ────────────────────────────────────────
const Dot = ({ size = 4, color = T.champagne }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: size,
    background: color, verticalAlign: 'middle',
  }}/>
);

const IconPin = ({ size = 20, color, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z"
      stroke={color} strokeWidth="1.5" fill={fill || 'none'} strokeLinejoin="round"/>
    <circle cx="12" cy="9.5" r="2.25" fill={color === fill ? '#fff' : color} stroke="none"/>
  </svg>
);

const IconCalendar = ({ size = 20, color, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={color} strokeWidth="1.5" fill={fill || 'none'}/>
    <path d="M3.5 10h17" stroke={color} strokeWidth="1.5"/>
    <path d="M8 3.5v3M16 3.5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    {fill && fill !== 'none' && (
      <g fill={color === fill ? '#fff' : color}>
        <rect x="6.5" y="12.5" width="2" height="2" rx="0.4"/>
        <rect x="11" y="12.5" width="2" height="2" rx="0.4"/>
        <rect x="15.5" y="12.5" width="2" height="2" rx="0.4"/>
        <rect x="6.5" y="16" width="2" height="2" rx="0.4"/>
        <rect x="11" y="16" width="2" height="2" rx="0.4"/>
      </g>
    )}
  </svg>
);

const IconUser = ({ size = 20, color, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8.5" r="3.5" stroke={color} strokeWidth="1.5" fill={fill || 'none'}/>
    <path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" stroke={color} strokeWidth="1.5" fill={fill || 'none'} strokeLinecap="round"/>
  </svg>
);

const IconArrow = ({ size = 12, color = T.champagne }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Mark = ({ size = 12, color = T.champagne }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5l1.6 3.2 3.5.5-2.5 2.5.6 3.5L8 9.6 4.8 11.2l.6-3.5L2.9 5.2l3.5-.5L8 1.5Z"
      stroke={color} strokeWidth="1" fill="none" strokeLinejoin="round"/>
  </svg>
);

// ─── Wordmark ───────────────────────────────────────────────────
function Wordmark({ color = T.champagne, size = 9.5 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      fontFamily: SANS, fontWeight: 600, fontSize: size,
      letterSpacing: '0.32em', textTransform: 'uppercase',
      color,
    }}>
      <span style={{
        width: 17, height: 17, borderRadius: 9,
        border: `1px solid ${color}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF, fontStyle: 'italic', fontSize: 11,
        letterSpacing: 0, paddingRight: 1, paddingBottom: 1,
      }}>P</span>
      <span>Golf&nbsp;·&nbsp;Pinta</span>
    </div>
  );
}

// ─── Hero (compact) ─────────────────────────────────────────────
function Hero({ eyebrow, title, subtitle }) {
  return (
    <div style={{
      position: 'relative',
      background: `linear-gradient(180deg, ${T.ink} 0%, ${T.inkSoft} 100%)`,
      padding: '18px 22px 20px',
      color: T.textOnInk,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -100, right: -130, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,163,90,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: SANS, fontSize: 9, fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: T.champagne, marginBottom: 7,
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <span style={{ width: 14, height: 1, background: T.champagne, opacity: 0.6 }}/>
          {eyebrow}
        </div>

        <h1 style={{
          fontFamily: SERIF, fontWeight: 400,
          fontSize: 30, lineHeight: 1.04, letterSpacing: '-0.015em',
          margin: '0 0 6px',
          color: T.textOnInk,
        }}>
          {title}
        </h1>

        <p style={{
          fontFamily: SANS, fontSize: 12, lineHeight: 1.42,
          color: T.textOnInkMuted, margin: 0, maxWidth: 300,
          fontWeight: 400,
        }}>
          {subtitle}
        </p>
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${T.champagne}, transparent)`,
        opacity: 0.35,
      }}/>
    </div>
  );
}

// ─── Academy card (compact) ─────────────────────────────────────
function AcademyCard({ initial, name, city, signature }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: T.card,
        borderRadius: 14,
        padding: '12px 13px 11px',
        boxShadow: hover
          ? '0 10px 24px rgba(11,19,34,0.10), 0 2px 6px rgba(11,19,34,0.05)'
          : '0 1px 2px rgba(11,19,34,0.04), 0 6px 16px rgba(11,19,34,0.04)',
        border: `1px solid ${T.hair}`,
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer', transition: 'all 220ms cubic-bezier(.2,.7,.3,1)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 13, right: 13, height: 2,
        background: T.champagne, opacity: hover ? 0.9 : 0,
        transition: 'opacity 220ms',
      }}/>

      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: `linear-gradient(160deg, ${T.ink}, ${T.inkSoft})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10,
        position: 'relative',
        boxShadow: `inset 0 0 0 1px ${T.hairGold}`,
      }}>
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic',
          fontSize: 20, fontWeight: 400,
          color: T.champagne, lineHeight: 1, paddingBottom: 2,
        }}>{initial}</span>
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 3, height: 3, borderRadius: 3,
          background: T.champagne, opacity: 0.5,
        }}/>
      </div>

      <div style={{
        fontFamily: SERIF, fontSize: 17, lineHeight: 1.1,
        color: T.text, fontWeight: 400, letterSpacing: '-0.01em',
        marginBottom: 3,
      }}>{name}</div>

      <div style={{
        fontFamily: SANS, fontSize: 9, fontWeight: 600,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: T.champagne, marginBottom: 8,
      }}>{city}</div>

      <div style={{ height: 1, background: T.hair, marginBottom: 7 }}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: SANS, fontSize: 9.5, color: T.textMuted, fontWeight: 500,
        }}>{signature}</span>
        <IconArrow size={11} color={T.champagne}/>
      </div>
    </div>
  );
}

// ─── Réserver screen ────────────────────────────────────────────
function ReserverScreen() {
  const academies = [
    { initial: 'M', name: 'Montgomerie',  city: 'Marrakech',  signature: 'Colin Montgomerie' },
    { initial: 'M', name: 'Montgomerie',  city: 'Rabat',      signature: 'Colin Montgomerie' },
    { initial: 'T', name: 'Tony Jacklin', city: 'Casablanca', signature: 'Tony Jacklin' },
    { initial: 'T', name: 'Tony Jacklin', city: 'Marrakech',  signature: 'Tony Jacklin' },
  ];

  return (
    <div>
      <Hero
        eyebrow="Bienvenue"
        title="Choisissez votre académie."
        subtitle="Quatre signatures, quatre terrains. Réservez avec un maître du jeu."
      />

      <div style={{ padding: '14px 16px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10, padding: '0 2px',
        }}>
          <div style={{
            fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: T.text,
          }}>Académies <span style={{ color: T.champagne }}>· 04</span></div>
          <div style={{
            fontFamily: SANS, fontSize: 10.5, color: T.textMuted, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            Maroc <Dot size={3} color={T.champagne}/>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {academies.map((a, i) => <AcademyCard key={i} {...a}/>)}
        </div>

        <div style={{
          marginTop: 10, padding: '9px 12px',
          background: T.champagneTint,
          border: `1px solid ${T.hairGold}`,
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 12, flexShrink: 0,
            background: T.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mark size={10} color={T.champagne}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: T.text, lineHeight: 1.15 }}>
              Membre Pinta Club
            </div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: T.textMuted, marginTop: 1, lineHeight: 1.3 }}>
              Accès prioritaire aux créneaux du week-end.
            </div>
          </div>
          <IconArrow size={11} color={T.text}/>
        </div>
      </div>
    </div>
  );
}

// ─── Field ──────────────────────────────────────────────────────
function Field({ label, placeholder, value, onChange, mono = false }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: SANS, fontSize: 9, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: T.textMuted, marginBottom: 5,
      }}>{label}</label>
      <div style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 10,
        border: `1px solid ${focus ? T.champagne : T.hair}`,
        boxShadow: focus
          ? `0 0 0 3px ${T.champagneTint}, 0 1px 2px rgba(11,19,34,0.02)`
          : '0 1px 2px rgba(11,19,34,0.02)',
        transition: 'all 160ms',
      }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', boxSizing: 'border-box',
            border: 'none', outline: 'none', background: 'transparent',
            padding: '10px 13px',
            fontFamily: mono ? "'JetBrains Mono', 'SF Mono', ui-monospace, monospace" : SANS,
            fontSize: mono ? 11.5 : 13, color: T.text,
            letterSpacing: mono ? '0.04em' : 0,
            fontWeight: 500,
          }}
        />
      </div>
    </div>
  );
}

// ─── Réservations screen ────────────────────────────────────────
function ReservationsScreen() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Hero
        eyebrow="Réservations"
        title="Retrouvez votre réservation."
        subtitle="Saisissez l'identifiant reçu par e-mail pour consulter votre session."
      />

      <div style={{ padding: '14px 16px 12px' }}>
        <div style={{
          background: T.card,
          borderRadius: 16,
          padding: '14px 14px 14px',
          border: `1px solid ${T.hair}`,
          boxShadow: '0 1px 2px rgba(11,19,34,0.03), 0 10px 24px rgba(11,19,34,0.05)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 60, height: 60,
            background: `linear-gradient(135deg, ${T.champagneTint} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}/>

          <div style={{
            fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: T.text, marginBottom: 3,
            display: 'flex', alignItems: 'center', gap: 7,
            position: 'relative',
          }}>
            <Dot size={4} color={T.champagne}/> Recherche
          </div>
          <div style={{
            fontFamily: SERIF, fontSize: 19, color: T.text,
            fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.01em',
            marginBottom: 12, position: 'relative',
          }}>Identifiez votre session</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Field
              label="Identifiant de réservation"
              placeholder="XXXXXXXX-XXXX-XXXX-XXXX"
              value={id}
              onChange={setId}
              mono
            />
            <Field
              label="Adresse e-mail"
              placeholder="vous@domaine.com"
              value={email}
              onChange={setEmail}
            />

            <button style={{
              marginTop: 2,
              border: 'none', cursor: 'pointer',
              padding: '12px 18px',
              borderRadius: 10,
              background: `linear-gradient(180deg, ${T.ink}, ${T.inkSoft})`,
              color: T.champagne,
              fontFamily: SANS, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              boxShadow: `inset 0 0 0 1px ${T.hairGold}, 0 4px 10px rgba(11,19,34,0.15)`,
              transition: 'transform 120ms',
            }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.985)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Rechercher
              <IconArrow size={12} color={T.champagne}/>
            </button>
          </div>
        </div>

        <div style={{
          marginTop: 10,
          padding: '0 6px',
          fontFamily: SANS, fontSize: 10.5, color: T.textMuted, lineHeight: 1.5,
          textAlign: 'center',
        }}>
          Vous n'avez pas reçu votre identifiant ?{' '}
          <a href="#" style={{ color: T.text, fontWeight: 600, textDecoration: 'none', borderBottom: `1px solid ${T.champagne}`, paddingBottom: 1 }}>
            Renvoyer par e-mail
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Profil screen ──────────────────────────────────────────────
function ProfilScreen() {
  return (
    <div>
      <Hero
        eyebrow="Profil"
        title="Votre compte."
        subtitle="Préférences, carte de membre et historique de vos sessions."
      />
      <div style={{ padding: '14px 16px' }}>
        {[
          ['Informations personnelles', 'Nom, e-mail, téléphone'],
          ['Carte de membre',           'Pinta Club · Argent'],
          ['Historique des sessions',   '12 réservations'],
          ['Préférences',               'Notifications, langue'],
        ].map(([title, sub], i) => (
          <div key={i} style={{
            background: T.card,
            border: `1px solid ${T.hair}`,
            borderRadius: 12,
            padding: '11px 14px',
            marginBottom: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: T.text, lineHeight: 1.2 }}>{title}</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: T.textMuted, marginTop: 2 }}>{sub}</div>
            </div>
            <IconArrow size={11} color={T.champagne}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Top bar ────────────────────────────────────────────────────
function TopBar({ title }) {
  return (
    <div style={{
      paddingTop: 48, paddingBottom: 8,
      background: T.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      paddingLeft: 22, paddingRight: 22,
    }}>
      <Wordmark/>
      <span style={{
        fontFamily: SERIF, fontStyle: 'italic',
        fontSize: 17, color: T.champagne, fontWeight: 400,
        letterSpacing: '0.01em',
      }}>{title}</span>
    </div>
  );
}

// ─── Tab bar ────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { key: 'reserver',     label: 'Réserver',     Icon: IconPin },
    { key: 'reservations', label: 'Réservations', Icon: IconCalendar },
    { key: 'profil',       label: 'Profil',       Icon: IconUser },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: T.ink,
      paddingTop: 8, paddingBottom: 26,
      borderTop: `1px solid rgba(255,255,255,0.06)`,
      zIndex: 30,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent 20%, ${T.champagne} 50%, transparent 80%)`,
        opacity: 0.35,
      }}/>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        {tabs.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '3px 10px',
                position: 'relative',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)',
                  width: 42, height: 32, borderRadius: 10,
                  background: T.champagneTint,
                  border: `1px solid ${T.hairGold}`,
                }}/>
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Icon
                  size={19}
                  color={isActive ? T.champagne : 'rgba(255,255,255,0.45)'}
                  fill={isActive ? T.champagne : 'none'}
                />
              </div>
              <span style={{
                position: 'relative', zIndex: 1,
                fontFamily: SANS, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: isActive ? T.champagne : 'rgba(255,255,255,0.45)',
              }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Phone shell ────────────────────────────────────────────────
function PhoneShell({ initial = 'reserver' }) {
  const [tab, setTab] = useState(initial);

  const titles = {
    reserver: 'Réserver',
    reservations: 'Mes Réservations',
    profil: 'Profil',
  };

  return (
    <IOSDevice dark={true} width={390} height={844}>
      <div style={{
        height: '100%',
        background: T.cream,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <TopBar title={titles[tab]}/>

        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 70 }}>
          {tab === 'reserver'     && <ReserverScreen/>}
          {tab === 'reservations' && <ReservationsScreen/>}
          {tab === 'profil'       && <ProfilScreen/>}
        </div>

        <TabBar active={tab} onChange={setTab}/>
      </div>
    </IOSDevice>
  );
}

function App() {
  return (
    <div className="stage">
      <div className="frame-wrap">
        <PhoneShell initial="reserver"/>
        <div className="caption">Réserver — choix de l'académie</div>
      </div>
      <div className="frame-wrap">
        <PhoneShell initial="reservations"/>
        <div className="caption">Réservations — recherche</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
