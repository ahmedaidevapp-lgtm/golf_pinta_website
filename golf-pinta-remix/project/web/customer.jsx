// Golf Pinta — Customer screens

const { useState: useStateCust, useMemo: useMemoCust } = React;

// ─── Home / Dashboard ───────────────────────────────────────────
function CustomerHome({ user, onNavigate, onOpenReservation }) {
  const nextRes = RESERVATIONS.find(r => r.status === 'confirmed');
  const recent  = RESERVATIONS.filter(r => r.status !== 'cancelled').slice(0, 4);

  return (
    <Page
      eyebrow={`Bonjour, ${user.name.split(' ')[0]}`}
      title="Votre prochaine session vous attend."
      subtitle="Tableau de bord, rendez-vous à venir et accès rapide à la réservation."
      actions={<Btn variant="gold" icon={<Icon.plus s={14}/>} onClick={() => onNavigate('booking')}>Nouvelle session</Btn>}
    >
      {/* Next booking hero */}
      {nextRes && (
        <Card dark padded={false} style={{ marginBottom: 22, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr',
            position: 'relative',
          }}>
            <div style={{ padding: '28px 32px 30px', position: 'relative' }}>
              <Eyebrow color={GP.champagne}>Prochaine session</Eyebrow>
              <div style={{
                fontFamily: SERIF, fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.015em',
                color: GP.textOnInk, margin: '12px 0 4px', fontWeight: 400,
              }}>
                {formatDate(nextRes.date, { long: true })}
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 14, color: GP.textOnInkMuted,
                marginBottom: 22,
              }}>
                {nextRes.time} · {nextRes.duration} min · {lookupAcademy(nextRes.academy).name}, {lookupAcademy(nextRes.academy).city}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
                <Avatar name={lookupCoach(nextRes.coach).name} size={42} tone="gold"/>
                <div>
                  <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.textOnInk, lineHeight: 1.15 }}>
                    {lookupCoach(nextRes.coach).name}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 12, color: GP.textOnInkMuted, marginTop: 2 }}>
                    {lookupCoach(nextRes.coach).speciality}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <Btn variant="gold" onClick={() => onOpenReservation(nextRes.id)} iconRight={<Icon.arrow s={13}/>}>
                  Voir les détails
                </Btn>
                <Btn variant="ghostOnInk">Modifier</Btn>
              </div>
            </div>

            <div style={{
              position: 'relative',
              borderLeft: `1px solid ${GP.hairOnInk}`,
              padding: '28px 28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              gap: 18,
            }}>
              <div>
                <Eyebrow color={GP.textOnInkDim}>Identifiant</Eyebrow>
                <div style={{
                  marginTop: 8,
                  fontFamily: MONO, fontSize: 13, color: GP.textOnInk, letterSpacing: '0.04em',
                }}>{nextRes.id}</div>
              </div>
              <div>
                <Eyebrow color={GP.textOnInkDim}>Tarif</Eyebrow>
                <div style={{
                  marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4,
                }}>
                  <span style={{ fontFamily: SERIF, fontSize: 30, color: GP.champagne }}>
                    {nextRes.price}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: GP.textOnInkMuted, fontWeight: 600, letterSpacing: '0.18em' }}>MAD</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(197,163,90,0.10)',
                border: `1px solid ${GP.hairGold}`,
                borderRadius: 10, padding: '10px 12px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Icon.qr s={20} c={GP.champagne}/>
                <span style={{ fontFamily: SANS, fontSize: 11.5, color: GP.textOnInkMuted, lineHeight: 1.35 }}>
                  Présentez votre QR à l'accueil de l'académie.
                </span>
              </div>
            </div>

            {/* gold radial */}
            <div style={{
              position: 'absolute', top: -120, right: -120, width: 360, height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,163,90,0.18) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}/>
          </div>
        </Card>
      )}

      {/* Stats row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28,
      }}>
        <Stat label="Sessions totales" value="12" sub="depuis février 2024"/>
        <Stat label="Heures sur green" value="18.5" sub="cette saison"/>
        <Stat label="Coach préféré" value="Karim" sub="5 sessions"/>
      </div>

      {/* Two-column: Quick book + Recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 22 }}>
        <Card>
          <Eyebrow>Réserver rapidement</Eyebrow>
          <h3 style={{
            fontFamily: SERIF, fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em',
            margin: '10px 0 16px', lineHeight: 1.15,
          }}>Vos académies favorites</h3>
          {ACADEMIES.slice(0, 4).map(a => (
            <div key={a.id} onClick={() => onNavigate({ key: 'academy', id: a.id })}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 4px', cursor: 'pointer',
                borderBottom: `1px solid ${GP.hair}`,
              }}>
              <Monogram initial={a.initial} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.1, color: GP.text }}>{a.name}</div>
                <div style={{
                  fontFamily: SANS, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: GP.champagne, marginTop: 3,
                }}>{a.city}</div>
              </div>
              <Icon.arrow s={13} c={GP.champagne}/>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <Eyebrow>Activité récente</Eyebrow>
              <h3 style={{
                fontFamily: SERIF, fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em',
                margin: '10px 0 0', lineHeight: 1.15,
              }}>Vos dernières sessions</h3>
            </div>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate('reservations'); }} style={{
              fontFamily: SANS, fontSize: 11.5, color: GP.text, fontWeight: 600,
              textDecoration: 'none', borderBottom: `1px solid ${GP.champagne}`,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Tout voir</a>
          </div>

          {recent.map(r => {
            const a = lookupAcademy(r.academy);
            const c = lookupCoach(r.coach);
            return (
              <div key={r.id} onClick={() => onOpenReservation(r.id)} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '12px 4px', borderBottom: `1px solid ${GP.hair}`, cursor: 'pointer',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: GP.cream, border: `1px solid ${GP.hair}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1, color: GP.text }}>
                    {new Date(r.date + 'T00:00:00').getDate()}
                  </div>
                  <div style={{
                    fontFamily: SANS, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: GP.champagne, marginTop: 2,
                  }}>{['JAN','FÉV','MAR','AVR','MAI','JUI','JUL','AOÛ','SEP','OCT','NOV','DÉC'][new Date(r.date + 'T00:00:00').getMonth()]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SERIF, fontSize: 16, color: GP.text, lineHeight: 1.2 }}>
                    {a.name} <span style={{ color: GP.textMuted, fontStyle: 'italic' }}>· {a.city}</span>
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted, marginTop: 3 }}>
                    {r.time} avec {c.name.split(' ')[0]}
                  </div>
                </div>
                <Pill tone={r.status === 'confirmed' ? 'gold' : r.status === 'completed' ? 'green' : 'red'}>
                  {r.status === 'confirmed' ? 'À venir' : r.status === 'completed' ? 'Terminée' : 'Annulée'}
                </Pill>
              </div>
            );
          })}
        </Card>
      </div>
    </Page>
  );
}

// ─── Academy browser ────────────────────────────────────────────
function AcademiesScreen({ onNavigate }) {
  const [query, setQuery] = useStateCust('');
  const filtered = ACADEMIES.filter(a =>
    !query || (a.name + ' ' + a.city).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page
      eyebrow="Catalogue"
      title="Académies signature."
      subtitle="Quatre terrains, quatre maîtres du jeu. Sélectionnez votre lieu de prédilection."
      actions={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Btn variant="ghost" icon={<Icon.filter s={14}/>}>Filtrer</Btn>
        </div>
      }
    >
      {/* search */}
      <div style={{ marginBottom: 22 }}>
        <Field
          placeholder="Rechercher par nom ou ville…"
          value={query}
          onChange={setQuery}
          icon={<Icon.search s={16}/>}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(a => <AcademyCardLarge key={a.id} academy={a} onClick={() => onNavigate({ key: 'academy', id: a.id })}/>)}
      </div>
    </Page>
  );
}

function AcademyCardLarge({ academy: a, onClick }) {
  const [hover, setHover] = useStateCust(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        background: GP.card,
        border: `1px solid ${GP.hair}`,
        borderRadius: 16,
        padding: 22,
        cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transition: 'all 220ms cubic-bezier(.2,.7,.3,1)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 16px 36px rgba(11,19,34,0.10), 0 2px 6px rgba(11,19,34,0.05)'
          : '0 1px 2px rgba(11,19,34,0.03), 0 8px 22px rgba(11,19,34,0.04)',
      }}>
      {/* top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 22, right: 22, height: 2,
        background: GP.champagne, opacity: hover ? 0.9 : 0,
        transition: 'opacity 220ms',
      }}/>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <Monogram initial={a.initial} size={52}/>
        <Pill tone="gold">{a.holes} trous</Pill>
      </div>

      <div style={{
        fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.015em',
        color: GP.text, lineHeight: 1.05, marginBottom: 4,
      }}>{a.name}</div>
      <div style={{
        fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: GP.champagne, marginBottom: 18,
      }}>{a.city} · Maroc</div>

      <div style={{ height: 1, background: GP.hair, marginBottom: 14 }}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          ['Signature', a.signature.split(' ')[0]],
          ['Par', a.par],
          ['Coachs', a.coaches],
        ].map(([l, v]) => (
          <div key={l}>
            <div style={{
              fontFamily: SANS, fontSize: 9, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: GP.textMuted, marginBottom: 4,
            }}>{l}</div>
            <div style={{
              fontFamily: SERIF, fontSize: 17, color: GP.text, lineHeight: 1.1,
            }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Academy detail ─────────────────────────────────────────────
function AcademyDetail({ id, onNavigate, onBack }) {
  const a = lookupAcademy(id);
  const coaches = COACHES.filter(c => c.academy === id || true).slice(0, 4);
  if (!a) return null;

  return (
    <Page
      eyebrow={<><a href="#" onClick={e => { e.preventDefault(); onBack(); }} style={{ color: 'inherit', textDecoration: 'none' }}>Académies</a> &nbsp;·&nbsp; {a.city}</>}
      title={<>{a.name}<span style={{ fontStyle: 'italic', color: GP.textMuted }}> — {a.city}</span></>}
      subtitle={`Parcours signature ${a.signature}. ${a.holes} trous, par ${a.par}. Établi en ${a.established}.`}
      actions={<Btn variant="gold" onClick={() => onNavigate({ key: 'booking', academy: id })} icon={<Icon.plus s={14}/>}>Réserver ici</Btn>}
    >
      {/* Hero placeholder + meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 22, marginBottom: 22 }}>
        <Card padded={false} style={{ overflow: 'hidden', minHeight: 280 }}>
          {/* placeholder image area */}
          <div style={{
            height: 280, position: 'relative',
            background: `linear-gradient(135deg, ${GP.ink} 0%, ${GP.inkSofter} 100%)`,
            overflow: 'hidden',
          }}>
            {/* fairway stripes */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.07,
              backgroundImage: `repeating-linear-gradient(135deg, ${GP.champagne} 0 2px, transparent 2px 32px)`,
            }}/>
            <div style={{
              position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,163,90,0.22) 0%, transparent 60%)',
            }}/>
            <div style={{
              position: 'absolute', bottom: 28, left: 32, color: GP.textOnInk,
            }}>
              <Eyebrow color={GP.champagne}>Parcours</Eyebrow>
              <div style={{
                fontFamily: SERIF, fontStyle: 'italic',
                fontSize: 44, color: GP.textOnInk, marginTop: 10, lineHeight: 1,
              }}>« {a.signature} »</div>
              <div style={{
                fontFamily: SANS, fontSize: 12, color: GP.textOnInkMuted, marginTop: 10,
                letterSpacing: '0.06em',
              }}>
                Réplique des grands greens européens, adaptée au climat marocain.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: 24, right: 28,
              fontFamily: MONO, fontSize: 10.5, color: GP.textOnInkMuted,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>
              [photo du parcours]
            </div>
          </div>
        </Card>

        <Card>
          <Eyebrow>Caractéristiques</Eyebrow>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Trous',      a.holes],
              ['Par',        a.par],
              ['Coachs',     a.coaches],
              ['Établi en',  a.established],
              ['Signature',  a.signature],
            ].map(([k, v], i, arr) => (
              <div key={k}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hair}` }}>
                  <span style={{
                    fontFamily: SANS, fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: GP.textMuted,
                  }}>{k}</span>
                  <span style={{ fontFamily: SERIF, fontSize: 18, color: GP.text }}>{v}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Coaches */}
      <div style={{ marginBottom: 14 }}>
        <Eyebrow>Coachs disponibles</Eyebrow>
        <h3 style={{
          fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em',
          margin: '10px 0 18px', lineHeight: 1.15,
        }}>Encadrés par les meilleurs.</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {coaches.map(c => (
          <Card key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={c.name} size={56} tone="gold"/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.15, color: GP.text }}>
                {c.name}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted, marginTop: 4, marginBottom: 6 }}>
                {c.speciality}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: SANS, fontSize: 11, color: GP.textMuted }}>
                <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GP.champagne }}>★ {c.rating}</span>
                <span>·</span>
                <span>{c.lessons} sessions</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

// ─── Booking flow ───────────────────────────────────────────────
function BookingFlow({ initialAcademy, onComplete, onBack }) {
  const [step, setStep] = useStateCust(0);
  const [data, setData] = useStateCust({
    academy: initialAcademy || 'mont-mar',
    date: null,
    coach: null,
    slot: null,
  });
  const update = patch => setData(d => ({ ...d, ...patch }));

  const steps = [
    { k: 'date',    label: 'Date' },
    { k: 'coach',   label: 'Coach' },
    { k: 'slot',    label: 'Créneau' },
    { k: 'confirm', label: 'Confirmation' },
  ];

  const canNext = (() => {
    if (step === 0) return !!data.date;
    if (step === 1) return !!data.coach;
    if (step === 2) return !!data.slot;
    return true;
  })();

  return (
    <Page
      eyebrow="Nouvelle réservation"
      title="Réservez votre session."
      subtitle={`Académie ${lookupAcademy(data.academy).name} — ${lookupAcademy(data.academy).city}.`}
      actions={<Btn variant="ghost" onClick={onBack}>Annuler</Btn>}
    >
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <React.Fragment key={s.k}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14,
                  background: done || active
                    ? `linear-gradient(160deg, ${GP.ink}, ${GP.inkSoft})`
                    : GP.card,
                  border: `1px solid ${done || active ? GP.hairGold : GP.hair}`,
                  color: done || active ? GP.champagne : GP.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
                }}>
                  {done ? <Icon.check s={13} c={GP.champagne}/> : i + 1}
                </div>
                <div style={{
                  fontFamily: SANS, fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: active ? GP.text : GP.textMuted,
                }}>{s.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: 1, margin: '0 18px',
                  background: done ? GP.champagne : GP.hair,
                  opacity: done ? 0.5 : 1,
                }}/>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22 }}>
        {/* Main step */}
        <Card>
          {step === 0 && <StepDate value={data.date} onChange={d => update({ date: d })}/>}
          {step === 1 && <StepCoach value={data.coach} onChange={c => update({ coach: c })}/>}
          {step === 2 && <StepSlot value={data.slot} onChange={s => update({ slot: s })}/>}
          {step === 3 && <StepConfirm data={data}/>}
        </Card>

        {/* Summary */}
        <Card dark padded={false} style={{ overflow: 'hidden', alignSelf: 'start', position: 'sticky', top: 24 }}>
          <div style={{ padding: '22px 24px', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,163,90,0.16) 0%, transparent 60%)',
            }}/>
            <Eyebrow color={GP.champagne}>Récapitulatif</Eyebrow>
            <h3 style={{
              position: 'relative',
              fontFamily: SERIF, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em',
              color: GP.textOnInk, margin: '12px 0 0', lineHeight: 1.1,
            }}>{lookupAcademy(data.academy).name}</h3>
            <div style={{
              position: 'relative',
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: GP.champagne, marginTop: 6,
            }}>{lookupAcademy(data.academy).city}</div>
          </div>

          <div style={{ borderTop: `1px solid ${GP.hairOnInk}`, padding: '18px 24px' }}>
            {[
              ['Date',    data.date ? formatDate(data.date, { long: true }) : '—'],
              ['Coach',   data.coach ? lookupCoach(data.coach).name : '—'],
              ['Créneau', data.slot || '—'],
              ['Durée',   data.slot ? '60 min' : '—'],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hairOnInk}`,
              }}>
                <span style={{
                  fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: GP.textOnInkDim,
                }}>{k}</span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: GP.textOnInk, fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${GP.hairOnInk}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: GP.textOnInkMuted,
            }}>Total</div>
            <div>
              <span style={{ fontFamily: SERIF, fontSize: 34, color: GP.champagne, lineHeight: 1 }}>
                {data.coach ? lookupCoach(data.coach).priceHour : 480}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: GP.textOnInkMuted, fontWeight: 600, letterSpacing: '0.18em', marginLeft: 6 }}>MAD</span>
            </div>
          </div>

          <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {step < steps.length - 1 ? (
              <Btn variant="gold" size="lg" disabled={!canNext} onClick={() => setStep(step + 1)} iconRight={<Icon.arrow s={13}/>}>
                Continuer
              </Btn>
            ) : (
              <Btn variant="gold" size="lg" onClick={onComplete} iconRight={<Icon.check s={14}/>}>
                Confirmer la réservation
              </Btn>
            )}
            {step > 0 && (
              <Btn variant="ghostOnInk" onClick={() => setStep(step - 1)} icon={<Icon.chevL s={12} c={GP.textOnInkMuted}/>}>
                Étape précédente
              </Btn>
            )}
          </div>
        </Card>
      </div>
    </Page>
  );
}

// Booking step: Date
function StepDate({ value, onChange }) {
  // Build a 4-week calendar starting today
  const today = new Date('2026-05-18');
  const weeks = useMemoCust(() => {
    // start on monday of current week
    const start = new Date(today);
    const day = (start.getDay() + 6) % 7; // 0 = monday
    start.setDate(start.getDate() - day);
    const out = [];
    for (let w = 0; w < 4; w++) {
      const row = [];
      for (let d = 0; d < 7; d++) {
        const dt = new Date(start);
        dt.setDate(start.getDate() + w * 7 + d);
        row.push(dt);
      }
      out.push(row);
    }
    return out;
  }, []);

  const iso = d => d.toISOString().slice(0, 10);
  const isPast = d => d < today.setHours(0,0,0,0) ? false : (new Date(d) < new Date('2026-05-18'));

  return (
    <div>
      <Eyebrow>Étape 01</Eyebrow>
      <h2 style={{
        fontFamily: SERIF, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em',
        margin: '10px 0 4px', lineHeight: 1.15,
      }}>Choisissez une date</h2>
      <p style={{ fontFamily: SANS, fontSize: 13, color: GP.textMuted, margin: '0 0 22px' }}>
        Les créneaux disponibles s'afficheront ensuite selon le coach choisi.
      </p>

      {/* week header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8 }}>
        {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontFamily: SANS, fontSize: 10, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: GP.textMuted, padding: '8px 0',
          }}>{d}</div>
        ))}
      </div>

      {/* days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {weeks.flat().map((d, i) => {
          const dIso = iso(d);
          const selected = value === dIso;
          const past = d < new Date('2026-05-18');
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          return (
            <button
              key={i}
              disabled={past}
              onClick={() => onChange(dIso)}
              style={{
                padding: '14px 8px',
                background: selected
                  ? `linear-gradient(160deg, ${GP.ink}, ${GP.inkSoft})`
                  : past ? GP.cream : '#fff',
                color: selected ? GP.champagne : past ? 'rgba(11,19,34,0.25)' : GP.text,
                border: `1px solid ${selected ? GP.hairGold : GP.hair}`,
                borderRadius: 10,
                cursor: past ? 'default' : 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                position: 'relative',
                transition: 'all 160ms',
              }}>
              <span style={{
                fontFamily: SERIF, fontSize: 20, lineHeight: 1,
              }}>{d.getDate()}</span>
              <span style={{
                fontFamily: SANS, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: selected ? GP.champagne : past ? 'inherit' : GP.textMuted,
              }}>
                {['JAN','FÉV','MAR','AVR','MAI','JUI','JUL','AOÛ','SEP','OCT','NOV','DÉC'][d.getMonth()]}
              </span>
              {isWeekend && !past && !selected && (
                <span style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 4, height: 4, borderRadius: 4,
                  background: GP.champagne, opacity: 0.7,
                }}/>
              )}
            </button>
          );
        })}
      </div>

      <div style={{
        marginTop: 18, padding: '10px 14px',
        background: GP.champagneTint, border: `1px solid ${GP.hairGold}`,
        borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: SANS, fontSize: 11.5, color: GP.text,
      }}>
        <PintaMark s={12}/>
        <span><strong style={{ fontWeight: 600 }}>Indice :</strong> les week-ends (•) sont plus prisés. Réservez à l'avance.</span>
      </div>
    </div>
  );
}

function StepCoach({ value, onChange }) {
  return (
    <div>
      <Eyebrow>Étape 02</Eyebrow>
      <h2 style={{
        fontFamily: SERIF, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em',
        margin: '10px 0 4px', lineHeight: 1.15,
      }}>Choisissez votre coach</h2>
      <p style={{ fontFamily: SANS, fontSize: 13, color: GP.textMuted, margin: '0 0 22px' }}>
        Tous nos coachs sont certifiés PGA et parlent français.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {COACHES.map(c => {
          const sel = value === c.id;
          return (
            <button key={c.id} onClick={() => onChange(c.id)} style={{
              padding: 18, textAlign: 'left',
              background: sel ? GP.champagneTint : '#fff',
              border: `1px solid ${sel ? GP.champagne : GP.hair}`,
              borderRadius: 14,
              cursor: 'pointer',
              display: 'flex', gap: 14, alignItems: 'center',
              boxShadow: sel ? `0 0 0 3px ${GP.champagneTint}` : 'none',
              transition: 'all 160ms',
            }}>
              <Avatar name={c.name} size={48} tone="gold"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontSize: 18, color: GP.text, lineHeight: 1.15 }}>{c.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11.5, color: GP.textMuted, marginTop: 3 }}>{c.speciality}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GP.champagne }}>★ {c.rating}</span>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: GP.textMuted }}>· {c.priceHour} MAD/h</span>
                </div>
              </div>
              {sel && (
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  background: GP.champagne,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon.check s={12} c={GP.ink}/>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSlot({ value, onChange }) {
  const slots = ['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
  const unavail = new Set(['11:00','15:00']);
  return (
    <div>
      <Eyebrow>Étape 03</Eyebrow>
      <h2 style={{
        fontFamily: SERIF, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em',
        margin: '10px 0 4px', lineHeight: 1.15,
      }}>Choisissez un créneau</h2>
      <p style={{ fontFamily: SANS, fontSize: 13, color: GP.textMuted, margin: '0 0 22px' }}>
        Sessions d'une heure. Présentez-vous 10 minutes avant.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {slots.map(s => {
          const sel = value === s;
          const off = unavail.has(s);
          return (
            <button key={s} disabled={off} onClick={() => onChange(s)} style={{
              padding: '16px 10px',
              background: sel ? `linear-gradient(160deg, ${GP.ink}, ${GP.inkSoft})` : off ? GP.cream : '#fff',
              color: sel ? GP.champagne : off ? 'rgba(11,19,34,0.25)' : GP.text,
              border: `1px solid ${sel ? GP.hairGold : GP.hair}`,
              borderRadius: 10,
              cursor: off ? 'default' : 'pointer',
              fontFamily: SERIF, fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em',
              position: 'relative',
              textDecoration: off ? 'line-through' : 'none',
            }}>
              {s}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18, display: 'flex', gap: 18, fontFamily: SANS, fontSize: 11, color: GP.textMuted }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: '#fff', border: `1px solid ${GP.hair}` }}/> Disponible
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: GP.ink }}/> Sélectionné
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: GP.cream }}/> Indisponible
        </span>
      </div>
    </div>
  );
}

function StepConfirm({ data }) {
  return (
    <div>
      <Eyebrow>Étape 04</Eyebrow>
      <h2 style={{
        fontFamily: SERIF, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em',
        margin: '10px 0 4px', lineHeight: 1.15,
      }}>Confirmez et payez</h2>
      <p style={{ fontFamily: SANS, fontSize: 13, color: GP.textMuted, margin: '0 0 24px' }}>
        Vérifiez les informations puis validez le paiement.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Nom du titulaire" placeholder="Prénom Nom" value="Ahmed E." onChange={() => {}}/>
        <Field label="Numéro de carte" placeholder="4242 4242 4242 4242" value="4242 4242 ···· 8723" onChange={() => {}} mono icon={<Icon.qr s={16}/>}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Expiration" placeholder="MM/AA" value="08/27" onChange={() => {}} mono/>
          <Field label="CVC" placeholder="•••" value="•••" onChange={() => {}} mono/>
        </div>
      </div>

      <div style={{
        marginTop: 22, padding: '12px 14px',
        background: GP.cream, border: `1px solid ${GP.hair}`,
        borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: SANS, fontSize: 11.5, color: GP.textMuted, lineHeight: 1.45,
      }}>
        <Icon.clock s={16} c={GP.textMuted}/>
        Annulation gratuite jusqu'à 24h avant la session. Au-delà, 50% du tarif sera retenu.
      </div>
    </div>
  );
}

// ─── My reservations ────────────────────────────────────────────
function ReservationsScreen({ onOpenReservation, onNavigate }) {
  const [filter, setFilter] = useStateCust('all');
  const filtered = RESERVATIONS.filter(r => filter === 'all' || r.status === filter);

  return (
    <Page
      eyebrow="Vos rendez-vous"
      title="Mes réservations."
      subtitle="Toutes vos sessions passées, en cours et à venir."
      actions={<Btn variant="gold" icon={<Icon.plus s={14}/>} onClick={() => onNavigate('booking')}>Nouvelle session</Btn>}
    >
      {/* Filters */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: GP.card, border: `1px solid ${GP.hair}`, borderRadius: 12, marginBottom: 22, width: 'fit-content' }}>
        {[
          ['all',       'Toutes',     RESERVATIONS.length],
          ['confirmed', 'À venir',    RESERVATIONS.filter(r => r.status === 'confirmed').length],
          ['completed', 'Terminées',  RESERVATIONS.filter(r => r.status === 'completed').length],
          ['cancelled', 'Annulées',   RESERVATIONS.filter(r => r.status === 'cancelled').length],
        ].map(([k, l, n]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            background: filter === k
              ? `linear-gradient(180deg, ${GP.ink}, ${GP.inkSoft})`
              : 'transparent',
            color: filter === k ? GP.champagne : GP.textMuted,
            border: 'none',
            padding: '8px 16px',
            borderRadius: 9,
            cursor: 'pointer',
            fontFamily: SANS, fontSize: 11.5, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            boxShadow: filter === k ? `inset 0 0 0 1px ${GP.hairGold}` : 'none',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {l}
            <span style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 600,
              padding: '1px 7px', borderRadius: 100,
              background: filter === k ? GP.champagneTint : GP.hair,
              color: filter === k ? GP.champagne : GP.textMuted,
            }}>{n}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.8fr 0.6fr',
          padding: '14px 22px',
          borderBottom: `1px solid ${GP.hair}`,
          background: GP.cream,
        }}>
          {['Identifiant','Date','Académie · Coach','Heure','Tarif','Statut'].map(h => (
            <div key={h} style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: GP.textMuted,
            }}>{h}</div>
          ))}
        </div>
        {filtered.map((r, i) => {
          const a = lookupAcademy(r.academy);
          const c = lookupCoach(r.coach);
          return (
            <div key={r.id} onClick={() => onOpenReservation(r.id)} style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.8fr 0.6fr',
              padding: '16px 22px', alignItems: 'center',
              borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${GP.hair}`,
              cursor: 'pointer',
              transition: 'background 120ms',
            }}
              onMouseEnter={e => e.currentTarget.style.background = GP.cream}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontFamily: MONO, fontSize: 12, color: GP.text, letterSpacing: '0.04em' }}>{r.id}</div>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: GP.text }}>
                {formatDate(r.date)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Monogram initial={a.initial} size={28}/>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 13, color: GP.text, fontWeight: 500 }}>{a.name}, {a.city}</div>
                  <div style={{ fontFamily: SANS, fontSize: 11, color: GP.textMuted, marginTop: 1 }}>avec {c.name}</div>
                </div>
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: GP.text }}>{r.time}</div>
              <div style={{ fontFamily: SANS, fontSize: 13, color: GP.text, fontWeight: 500 }}>{r.price} <span style={{ fontSize: 10, color: GP.textMuted, fontWeight: 600, letterSpacing: '0.16em' }}>MAD</span></div>
              <div>
                <Pill tone={r.status === 'confirmed' ? 'gold' : r.status === 'completed' ? 'green' : 'red'}>
                  {r.status === 'confirmed' ? 'À venir' : r.status === 'completed' ? 'Terminée' : 'Annulée'}
                </Pill>
              </div>
            </div>
          );
        })}
      </Card>
    </Page>
  );
}

// ─── Reservation detail ─────────────────────────────────────────
function ReservationDetail({ id, onBack }) {
  const r = RESERVATIONS.find(x => x.id === id);
  if (!r) return null;
  const a = lookupAcademy(r.academy);
  const c = lookupCoach(r.coach);

  return (
    <Page
      eyebrow={<><a href="#" onClick={e => { e.preventDefault(); onBack(); }} style={{ color: 'inherit', textDecoration: 'none' }}>Mes réservations</a> &nbsp;·&nbsp; {r.id}</>}
      title={formatDate(r.date, { long: true })}
      subtitle={`Session de ${r.duration} minutes à l'académie ${a.name}, ${a.city}.`}
      actions={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="ghost" icon={<Icon.edit s={13}/>}>Modifier</Btn>
          {r.status === 'confirmed' && <Btn variant="danger">Annuler</Btn>}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22 }}>
        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <Eyebrow>Coach</Eyebrow>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar name={c.name} size={64} tone="gold"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SERIF, fontSize: 22, color: GP.text, lineHeight: 1.15 }}>{c.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: GP.textMuted, marginTop: 4 }}>{c.speciality}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: GP.champagne }}>★ {c.rating}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted }}>· {c.lessons} sessions</span>
                </div>
              </div>
              <Btn variant="ghost" size="sm">Contacter</Btn>
            </div>
          </Card>

          <Card>
            <Eyebrow>Détails de la session</Eyebrow>
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                ['Date',         formatDate(r.date, { long: true })],
                ['Heure',        `${r.time} (${r.duration} min)`],
                ['Académie',     `${a.name}, ${a.city}`],
                ['Parcours',     `${a.holes} trous, par ${a.par}`],
                ['Tarif',        `${r.price} MAD`],
                ['Statut',       r.status === 'confirmed' ? 'Confirmée' : r.status === 'completed' ? 'Terminée' : 'Annulée'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '12px 0', borderBottom: `1px solid ${GP.hair}` }}>
                  <div style={{
                    fontFamily: SANS, fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: GP.textMuted, marginBottom: 5,
                  }}>{k}</div>
                  <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Note de votre coach</Eyebrow>
            <p style={{
              fontFamily: SERIF, fontStyle: 'italic',
              fontSize: 19, lineHeight: 1.45, color: GP.text,
              margin: '14px 0 0',
            }}>
              « Au programme : reprise du grip et travail du putting sur les 30 derniers mètres. Apportez vos propres clubs si possible. »
            </p>
            <div style={{
              marginTop: 14, fontFamily: SANS, fontSize: 12, color: GP.textMuted, letterSpacing: '0.08em',
            }}>— {c.name}</div>
          </Card>
        </div>

        {/* QR + sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card dark style={{ textAlign: 'center', padding: 28 }}>
            <Eyebrow color={GP.champagne}>Pass d'accès</Eyebrow>
            <div style={{
              margin: '18px auto 16px',
              width: 180, height: 180, borderRadius: 14,
              background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 14, boxSizing: 'border-box',
            }}>
              <QrPlaceholder/>
            </div>
            <div style={{
              fontFamily: MONO, fontSize: 13, color: GP.textOnInk, letterSpacing: '0.06em',
            }}>{r.id}</div>
            <div style={{
              fontFamily: SANS, fontSize: 11.5, color: GP.textOnInkMuted, marginTop: 8, lineHeight: 1.5,
            }}>
              Présentez ce code à l'accueil<br/>de l'académie.
            </div>
          </Card>

          <Card>
            <Eyebrow>Adresse</Eyebrow>
            <div style={{ marginTop: 12, fontFamily: SERIF, fontSize: 17, color: GP.text, lineHeight: 1.3 }}>
              Académie {a.name}<br/>
              <span style={{ color: GP.textMuted, fontSize: 14 }}>Route de l'Ourika, {a.city}</span>
            </div>
            <Btn variant="ghost" size="sm" style={{ marginTop: 14 }} iconRight={<Icon.arrow s={12}/>}>
              Itinéraire
            </Btn>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// Schematic QR
function QrPlaceholder() {
  const grid = [];
  for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 11; x++) {
      // pseudo-random pattern, deterministic
      const on = ((x * 13 + y * 7 + (x ^ y) * 3) % 3) !== 0;
      grid.push(<rect key={`${x}-${y}`} x={x*12} y={y*12} width="10" height="10" rx="1" fill={on ? GP.ink : 'transparent'}/>);
    }
  }
  return (
    <svg viewBox="0 0 132 132" width="100%" height="100%">
      {grid}
      {/* corners */}
      {[[0,0],[0,9],[9,0]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <rect x={cx*12} y={cy*12} width="34" height="34" rx="3" fill={GP.ink}/>
          <rect x={cx*12+6} y={cy*12+6} width="22" height="22" rx="2" fill="#fff"/>
          <rect x={cx*12+12} y={cy*12+12} width="10" height="10" rx="1" fill={GP.ink}/>
        </g>
      ))}
    </svg>
  );
}

// ─── Profile / Settings ─────────────────────────────────────────
function ProfileScreen({ user }) {
  return (
    <Page
      eyebrow="Compte"
      title="Profil & préférences."
      subtitle="Gérez vos informations personnelles, votre carte de membre et vos préférences."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 22 }}>
        {/* Member card */}
        <Card dark padded={false} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '26px 26px 20px', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -100, right: -100, width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,163,90,0.18) 0%, transparent 60%)',
            }}/>
            <Eyebrow color={GP.champagne}>Pinta Club</Eyebrow>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic',
              fontSize: 56, color: GP.champagne, lineHeight: 1, marginTop: 22, position: 'relative',
            }}>Or</div>
            <div style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: GP.textOnInkMuted, marginTop: 8, position: 'relative',
            }}>Membre depuis 2024</div>
          </div>
          <div style={{ padding: '18px 26px', borderTop: `1px solid ${GP.hairOnInk}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: GP.textOnInkMuted }}>Vers Platine</span>
              <span style={{ fontFamily: SERIF, fontSize: 14, color: GP.textOnInk }}>6 / 10 sessions</span>
            </div>
            <div style={{ height: 4, background: GP.hairOnInk, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: `linear-gradient(90deg, ${GP.champagneSoft}, ${GP.champagne})`, borderRadius: 2 }}/>
            </div>
          </div>
          <div style={{
            padding: '18px 26px 26px', borderTop: `1px solid ${GP.hairOnInk}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Avatar name={user.name} size={42}/>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.textOnInk, lineHeight: 1.15 }}>{user.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: GP.textOnInkMuted, marginTop: 3, letterSpacing: '0.06em' }}>
                PINTA·OR·2024·8421
              </div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Eyebrow>Informations personnelles</Eyebrow>
              <Btn variant="ghost" size="sm" icon={<Icon.edit s={12}/>}>Modifier</Btn>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {[
                ['Nom complet', user.name],
                ['E-mail', 'ahmed.e@example.com'],
                ['Téléphone', '+212 6 12 34 56 78'],
                ['Ville', 'Marrakech, Maroc'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 0', borderBottom: `1px solid ${GP.hair}` }}>
                  <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: GP.textMuted, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Préférences</Eyebrow>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Notifications par e-mail', 'Confirmations, rappels et offres', true],
                ['Notifications par SMS', 'Rappels 24h avant la session', true],
                ['Newsletter mensuelle', 'Actualités et nouveaux coachs', false],
                ['Partage de progression', 'Avec vos coachs uniquement', true],
              ].map(([k, sub, on], i, arr) => (
                <div key={k} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${GP.hair}`,
                }}>
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: 17, color: GP.text }}>{k}</div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: GP.textMuted, marginTop: 3 }}>{sub}</div>
                  </div>
                  <Toggle on={on}/>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

function Toggle({ on: initial }) {
  const [on, setOn] = useStateCust(initial);
  return (
    <button onClick={() => setOn(!on)} style={{
      width: 44, height: 26, borderRadius: 13,
      background: on
        ? `linear-gradient(180deg, ${GP.champagneSoft}, ${GP.champagne})`
        : GP.hair,
      border: 'none', cursor: 'pointer', position: 'relative',
      boxShadow: on ? `inset 0 0 0 1px ${GP.champagneDeep}` : `inset 0 0 0 1px ${GP.hair}`,
      transition: 'all 160ms',
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: 10,
        background: '#fff',
        transition: 'left 160ms',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </button>
  );
}

Object.assign(window, {
  CustomerHome, AcademiesScreen, AcademyDetail,
  BookingFlow, ReservationsScreen, ReservationDetail, ProfileScreen,
});
