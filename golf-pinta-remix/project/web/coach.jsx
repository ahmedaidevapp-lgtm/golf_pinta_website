// Golf Pinta — Coach screens

const { useState: useStateCoach } = React;

// Mock data for coach view
const COACH_STUDENTS = [
  { id: 's1', name: 'Ahmed E.',          sessions: 12, level: 'Intermédiaire', next: '2026-05-22', tone: 'gold' },
  { id: 's2', name: 'Leïla Bennani',     sessions: 8,  level: 'Débutante',     next: '2026-05-19', tone: 'gold' },
  { id: 's3', name: 'Omar Fassi',        sessions: 24, level: 'Avancé',        next: '2026-05-21', tone: 'gold' },
  { id: 's4', name: 'Sophia El Idrissi', sessions: 3,  level: 'Débutante',     next: '2026-05-25', tone: 'gold' },
  { id: 's5', name: 'Mehdi Lahlou',      sessions: 18, level: 'Compétition',   next: '2026-05-20', tone: 'gold' },
  { id: 's6', name: 'Inès Benkirane',    sessions: 6,  level: 'Intermédiaire', next: '2026-05-24', tone: 'gold' },
];

const COACH_TODAY = [
  { time: '09:00', name: 'Leïla Bennani', duration: 60, type: 'Putting' },
  { time: '10:30', name: 'Ahmed E.', duration: 60, type: 'Swing complet' },
  { time: '14:00', name: 'Mehdi Lahlou', duration: 90, type: 'Compétition' },
  { time: '16:00', name: 'Sophia El Idrissi', duration: 60, type: 'Débutant' },
];

// ─── Coach dashboard ────────────────────────────────────────────
function CoachHome({ user, onNavigate }) {
  return (
    <Page
      eyebrow={`Bonjour, ${user.name.split(' ')[0]}`}
      title="Quatre sessions aujourd'hui."
      subtitle="Tableau de bord, sessions du jour et indicateurs de performance."
      actions={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="ghost" icon={<Icon.calendar s={14}/>} onClick={() => onNavigate('coach.schedule')}>Calendrier</Btn>
          <Btn variant="gold" icon={<Icon.plus s={14}/>}>Ajouter un créneau</Btn>
        </div>
      }
    >
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        <Stat label="Cette semaine" value="14" sub="sessions programmées" tone="dark"/>
        <Stat label="Élèves actifs" value="42" sub="+ 3 ce mois-ci"/>
        <Stat label="Note moyenne" value="4.9" sub="sur 287 retours"/>
        <Stat label="Revenus estimés" value="58.4k" sub="MAD · cette saison"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22 }}>
        {/* Today's sessions */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <Eyebrow>Aujourd'hui</Eyebrow>
              <h3 style={{
                fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em',
                margin: '10px 0 0', lineHeight: 1.15,
              }}>Lundi 18 mai</h3>
            </div>
            <Pill tone="gold">{COACH_TODAY.length} sessions</Pill>
          </div>

          <div style={{ position: 'relative' }}>
            {COACH_TODAY.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 0', borderBottom: i === COACH_TODAY.length - 1 ? 'none' : `1px solid ${GP.hair}`,
                position: 'relative',
              }}>
                {/* time */}
                <div style={{
                  width: 64, textAlign: 'right',
                  fontFamily: SERIF, fontSize: 20, color: GP.text, lineHeight: 1,
                }}>
                  {s.time}
                  <div style={{
                    fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: GP.textMuted, marginTop: 4,
                  }}>{s.duration} min</div>
                </div>
                {/* divider dot */}
                <div style={{
                  width: 8, height: 8, borderRadius: 8,
                  background: GP.champagne, flexShrink: 0,
                  boxShadow: `0 0 0 3px ${GP.champagneTint}`,
                }}/>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={s.name} size={36}/>
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text, lineHeight: 1.15 }}>{s.name}</div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted, marginTop: 3 }}>{s.type}</div>
                  </div>
                </div>
                <Btn variant="ghost" size="sm">Détails</Btn>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance chart */}
        <Card>
          <div style={{ marginBottom: 16 }}>
            <Eyebrow>Activité hebdomadaire</Eyebrow>
            <h3 style={{
              fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em',
              margin: '10px 0 0', lineHeight: 1.15,
            }}>Sessions par jour</h3>
          </div>
          <SimpleChart data={[3, 5, 2, 6, 4, 7, 3]} labels={['L','M','M','J','V','S','D']}/>

          <div style={{ height: 1, background: GP.hair, margin: '20px 0' }}/>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px',
            background: GP.champagneTint, border: `1px solid ${GP.hairGold}`,
            borderRadius: 10,
          }}>
            <Icon.trend s={18} c={GP.champagneDeep}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, color: GP.text, lineHeight: 1.2 }}>
                +18% vs semaine dernière
              </div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: GP.textMuted, marginTop: 2, lineHeight: 1.3 }}>
                Pic de réservations samedi.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent students */}
      <Card style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Eyebrow>Élèves récents</Eyebrow>
            <h3 style={{
              fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em',
              margin: '10px 0 0', lineHeight: 1.15,
            }}>Vos derniers contacts</h3>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('coach.students'); }} style={{
            fontFamily: SANS, fontSize: 11.5, color: GP.text, fontWeight: 600,
            textDecoration: 'none', borderBottom: `1px solid ${GP.champagne}`,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Tous les élèves</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {COACH_STUDENTS.slice(0, 3).map(s => (
            <div key={s.id} style={{
              padding: 16,
              background: GP.cream, border: `1px solid ${GP.hair}`, borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <Avatar name={s.name} size={44} tone="gold"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text, lineHeight: 1.15 }}>{s.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11.5, color: GP.textMuted, marginTop: 3 }}>
                  {s.sessions} sessions · {s.level}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}

// Simple bar chart
function SimpleChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 6, height: 130,
        padding: '0 4px',
      }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <div style={{
                width: '100%',
                height: `${(v / max) * 100}%`,
                background: i === data.length - 2
                  ? `linear-gradient(180deg, ${GP.champagneSoft}, ${GP.champagne})`
                  : `linear-gradient(180deg, ${GP.inkSofter}, ${GP.ink})`,
                borderRadius: '6px 6px 2px 2px',
                position: 'relative',
              }}>
                {i === data.length - 2 && (
                  <div style={{
                    position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                    fontFamily: SERIF, fontStyle: 'italic',
                    fontSize: 14, color: GP.champagneDeep,
                  }}>{v}</div>
                )}
              </div>
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
              color: GP.textMuted, textTransform: 'uppercase',
            }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Coach schedule (calendar/agenda) ───────────────────────────
function CoachSchedule({ onNavigate }) {
  const days = ['Lundi 18 mai', 'Mardi 19 mai', 'Mercredi 20 mai', 'Jeudi 21 mai', 'Vendredi 22 mai'];
  const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  // Bookings per (day, hour) — sparse
  const events = {
    '0-09:00': { student: 'Leïla Bennani', type: 'Putting' },
    '0-10:30': { student: 'Ahmed E.', type: 'Swing', span: 1 },
    '0-14:00': { student: 'Mehdi Lahlou', type: 'Compétition', span: 2 },
    '0-16:00': { student: 'Sophia El Idrissi', type: 'Débutant' },
    '1-10:00': { student: 'Omar Fassi', type: 'Avancé' },
    '1-15:00': { student: 'Inès Benkirane', type: 'Putting' },
    '2-09:00': { student: 'Ahmed E.', type: 'Suivi mensuel' },
    '2-11:00': { student: 'Leïla Bennani', type: 'Jeu court' },
    '2-14:00': { student: 'Sophia El Idrissi', type: 'Débutant' },
    '3-10:00': { student: 'Mehdi Lahlou', type: 'Compétition', span: 2 },
    '3-15:00': { student: 'Omar Fassi', type: 'Avancé' },
    '4-09:00': { student: 'Ahmed E.', type: 'Swing' },
    '4-11:00': { student: 'Inès Benkirane', type: 'Putting' },
    '4-16:00': { student: 'Leïla Bennani', type: 'Bilan' },
  };

  return (
    <Page
      eyebrow="Agenda"
      title="Calendrier de la semaine."
      subtitle="Semaine du 18 au 22 mai 2026 — académie Montgomerie Marrakech."
      actions={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Btn variant="ghost" size="sm" icon={<Icon.chevL s={12}/>}/>
          <span style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: GP.text, padding: '0 12px',
          }}>Sem. 21</span>
          <Btn variant="ghost" size="sm" icon={<Icon.chevR s={12}/>}/>
          <div style={{ width: 1, height: 22, background: GP.hair, margin: '0 6px' }}/>
          <Btn variant="gold" icon={<Icon.plus s={14}/>}>Bloquer un créneau</Btn>
        </div>
      }
    >
      <Card padded={false}>
        {/* day headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)',
          borderBottom: `1px solid ${GP.hair}`,
          background: GP.cream,
        }}>
          <div/>
          {days.map(d => (
            <div key={d} style={{
              padding: '14px 12px', borderLeft: `1px solid ${GP.hair}`,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: SANS, fontSize: 10, fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: GP.textMuted,
              }}>{d.split(' ')[0]}</div>
              <div style={{
                fontFamily: SERIF, fontSize: 20, color: GP.text, lineHeight: 1, marginTop: 4,
              }}>{d.split(' ')[1]} <span style={{ color: GP.textMuted, fontStyle: 'italic' }}>{d.split(' ')[2]}</span></div>
            </div>
          ))}
        </div>

        {/* grid rows */}
        {hours.map(h => (
          <div key={h} style={{
            display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)',
            borderBottom: `1px solid ${GP.hair}`,
            minHeight: 64,
          }}>
            <div style={{
              padding: '12px 14px',
              fontFamily: MONO, fontSize: 11, color: GP.textMuted,
              letterSpacing: '0.04em',
              textAlign: 'right',
            }}>{h}</div>
            {days.map((_, di) => {
              const ev = events[`${di}-${h}`];
              return (
                <div key={di} style={{
                  borderLeft: `1px solid ${GP.hair}`,
                  padding: 6,
                  position: 'relative',
                }}>
                  {ev && (
                    <div style={{
                      background: `linear-gradient(160deg, ${GP.ink}, ${GP.inkSoft})`,
                      color: GP.textOnInk,
                      borderRadius: 8, padding: '8px 10px',
                      border: `1px solid ${GP.hairGold}`,
                      height: '100%',
                      boxShadow: `inset 0 0 0 1px rgba(197,163,90,0.08)`,
                    }}>
                      <div style={{
                        fontFamily: SANS, fontSize: 11, fontWeight: 600, color: GP.champagne,
                      }}>{ev.student}</div>
                      <div style={{
                        fontFamily: SANS, fontSize: 10, color: GP.textOnInkMuted, marginTop: 2,
                      }}>{ev.type}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </Card>

      <div style={{
        marginTop: 18, display: 'flex', gap: 18,
        fontFamily: SANS, fontSize: 11.5, color: GP.textMuted,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 10, borderRadius: 2, background: GP.ink, border: `1px solid ${GP.hairGold}` }}/> Session confirmée
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 10, borderRadius: 2, background: '#fff', border: `1px solid ${GP.hair}` }}/> Disponible
        </span>
      </div>
    </Page>
  );
}

// ─── Coach: Students list ───────────────────────────────────────
function CoachStudents() {
  const [query, setQuery] = useStateCoach('');
  const filtered = COACH_STUDENTS.filter(s =>
    !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.level.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page
      eyebrow="Carnet"
      title="Vos élèves."
      subtitle={`${COACH_STUDENTS.length} élèves actifs. Cliquez sur un nom pour voir son historique.`}
      actions={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="ghost" icon={<Icon.filter s={14}/>}>Filtrer</Btn>
          <Btn variant="gold" icon={<Icon.plus s={14}/>}>Inviter un élève</Btn>
        </div>
      }
    >
      <div style={{ marginBottom: 22 }}>
        <Field
          placeholder="Rechercher par nom ou niveau…"
          value={query} onChange={setQuery}
          icon={<Icon.search s={16}/>}
        />
      </div>

      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 0.6fr',
          padding: '14px 22px',
          borderBottom: `1px solid ${GP.hair}`,
          background: GP.cream,
        }}>
          {['Élève','Niveau','Sessions','Prochaine session',''].map(h => (
            <div key={h} style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: GP.textMuted,
            }}>{h}</div>
          ))}
        </div>
        {filtered.map((s, i) => (
          <div key={s.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 0.6fr',
            padding: '16px 22px', alignItems: 'center',
            borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${GP.hair}`,
            cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.background = GP.cream}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={s.name} size={40} tone="gold"/>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text, lineHeight: 1.15 }}>{s.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: GP.textMuted, marginTop: 2 }}>Membre Pinta Club</div>
              </div>
            </div>
            <div>
              <Pill tone={s.level === 'Avancé' || s.level === 'Compétition' ? 'gold' : s.level === 'Intermédiaire' ? 'green' : 'neutral'}>
                {s.level}
              </Pill>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 18, color: GP.text }}>
              {s.sessions} <span style={{ fontSize: 11, color: GP.textMuted, fontFamily: SANS, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>séances</span>
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 13, color: GP.text, fontWeight: 500 }}>{formatDate(s.next)}</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: GP.textMuted, marginTop: 2 }}>10:30 — Putting</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <button style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: GP.textMuted, padding: 6, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon.mail s={16}/>
              </button>
              <button style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: GP.textMuted, padding: 6, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon.more s={16}/>
              </button>
            </div>
          </div>
        ))}
      </Card>
    </Page>
  );
}

// ─── Coach: Academy management ──────────────────────────────────
function CoachAcademy() {
  return (
    <Page
      eyebrow="Mon académie"
      title={<>Montgomerie<span style={{ fontStyle: 'italic', color: GP.textMuted }}> — Marrakech</span></>}
      subtitle="Gérez vos créneaux, votre présentation et vos tarifs."
      actions={<Btn variant="ghost" icon={<Icon.edit s={13}/>}>Modifier la fiche</Btn>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 22 }}>
        {/* Profile + bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <Avatar name="Karim El Hassan" size={80} tone="gold"/>
              <div style={{ flex: 1 }}>
                <Eyebrow>Coach signature</Eyebrow>
                <h3 style={{
                  fontFamily: SERIF, fontSize: 30, fontWeight: 400, letterSpacing: '-0.015em',
                  margin: '10px 0 6px', lineHeight: 1.1,
                }}>Karim El Hassan</h3>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <Pill tone="gold">PGA Certifié</Pill>
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: GP.champagne }}>★ 4.9</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted }}>· 412 sessions</span>
                </div>
                <p style={{
                  fontFamily: SERIF, fontStyle: 'italic',
                  fontSize: 17, color: GP.text, lineHeight: 1.45,
                  margin: '0 0 10px',
                }}>
                  « Spécialiste du putting et du jeu court, j'accompagne les golfeurs de tout niveau dans la maîtrise des 30 derniers mètres — là où se joue chaque partie. »
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <Eyebrow>Tarifs & disponibilités</Eyebrow>
            <h3 style={{
              fontFamily: SERIF, fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em',
              margin: '10px 0 16px', lineHeight: 1.15,
            }}>Vos formules</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Session découverte',  '1 séance · 60 min',       360, 'Pour les débutants curieux.'],
                ['Session individuelle','1 séance · 60 min',       480, 'Le format de référence.'],
                ['Session perfectionnement','1 séance · 90 min',   720, 'Pour les joueurs confirmés.'],
                ['Forfait progrès',     '5 séances · 60 min',     2100, 'Économie de 300 MAD.'],
              ].map(([k, sub, price, desc], i, arr) => (
                <div key={k} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hair}`,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SERIF, fontSize: 19, color: GP.text, lineHeight: 1.15 }}>{k}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11.5, color: GP.textMuted, marginTop: 3 }}>{sub} — {desc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: SERIF, fontSize: 24, color: GP.text, lineHeight: 1 }}>{price.toLocaleString('fr-FR')}</span>
                    <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: GP.textMuted, marginLeft: 4 }}>MAD</span>
                  </div>
                  <Btn variant="ghost" size="sm" icon={<Icon.edit s={12}/>}/>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card dark padded={false} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '24px 26px', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -100, right: -100, width: 280, height: 280, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(197,163,90,0.18) 0%, transparent 60%)',
              }}/>
              <Eyebrow color={GP.champagne}>Académie</Eyebrow>
              <div style={{
                fontFamily: SERIF, fontSize: 30, color: GP.textOnInk, lineHeight: 1.05,
                marginTop: 12, position: 'relative',
              }}>Montgomerie</div>
              <div style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: GP.champagne, marginTop: 6, position: 'relative',
              }}>Marrakech · Maroc</div>
            </div>
            <div style={{ borderTop: `1px solid ${GP.hairOnInk}` }}>
              {[
                ['Trous',       18],
                ['Par',         72],
                ['Coachs',      6],
                ['Établie en',  2008],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '14px 26px',
                  borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hairOnInk}`,
                }}>
                  <span style={{
                    fontFamily: SANS, fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: GP.textOnInkMuted,
                  }}>{k}</span>
                  <span style={{ fontFamily: SERIF, fontSize: 18, color: GP.textOnInk }}>{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Plage d'ouverture</Eyebrow>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Lundi — Vendredi', '08:00 — 19:00'],
                ['Samedi',           '07:30 — 20:00'],
                ['Dimanche',         '07:30 — 18:00'],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hair}`,
                }}>
                  <div style={{ fontFamily: SANS, fontSize: 12.5, color: GP.text, fontWeight: 500 }}>{k}</div>
                  <div style={{ fontFamily: MONO, fontSize: 12, color: GP.textMuted, letterSpacing: '0.04em' }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { CoachHome, CoachSchedule, CoachStudents, CoachAcademy });
