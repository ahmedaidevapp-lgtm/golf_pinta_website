// Golf Pinta — Login & sign up

const { useState: useStateLogin } = React;

function LoginScreen({ onLogin }) {
  const [mode, setMode] = useStateLogin('signin');
  const [role, setRole] = useStateLogin('client');
  const [email, setEmail] = useStateLogin('');
  const [password, setPassword] = useStateLogin('');
  const [name, setName] = useStateLogin('');

  const handleSubmit = () => {
    const finalName = mode === 'signup' && name
      ? name
      : (role === 'coach' ? 'Karim El Hassan' : 'Ahmed E.');
    onLogin({ role, name: finalName, email: email || 'ahmed.e@example.com', tier: 'Or' });
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex',
      background: GP.cream,
    }}>
      {/* Left: dark hero panel */}
      <div style={{
        flex: '0 0 48%',
        background: `linear-gradient(160deg, ${GP.ink} 0%, ${GP.inkSoft} 60%, ${GP.inkSofter} 100%)`,
        color: GP.textOnInk,
        position: 'relative',
        overflow: 'hidden',
        padding: '56px 60px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* gold radial */}
        <div style={{
          position: 'absolute', top: -180, right: -180, width: 540, height: 540,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,163,90,0.18) 0%, transparent 60%)',
        }}/>
        {/* subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.6,
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 100%',
        }}/>

        <div style={{ position: 'relative' }}>
          <Wordmark color={GP.champagne} size={11} large/>
        </div>

        <div style={{ position: 'relative', maxWidth: 460 }}>
          <Eyebrow dash={false}>Bienvenue</Eyebrow>
          <h1 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: 64, lineHeight: 1.0, letterSpacing: '-0.02em',
            color: GP.textOnInk, margin: '14px 0 18px',
          }}>
            L'art du <span style={{ fontStyle: 'italic' }}>swing</span>, signé.
          </h1>
          <p style={{
            fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55,
            color: GP.textOnInkMuted, margin: 0, maxWidth: 420,
          }}>
            Quatre académies signature au Maroc, encadrées par des maîtres du jeu. Réservez votre prochaine session en quelques clics.
          </p>
        </div>

        <div style={{ position: 'relative' }}/>

        {/* gold hairline at base */}
        <div style={{
          position: 'absolute', left: 60, right: 60, bottom: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GP.champagne}, transparent)`,
          opacity: 0.4,
        }}/>
      </div>

      {/* Right: form */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 48, overflow: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* role switcher */}
          <Eyebrow dash={false}>{mode === 'signup' ? 'Créer un compte' : 'Connexion'}</Eyebrow>
          <h2 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.015em',
            margin: '12px 0 8px',
          }}>
            {mode === 'signup' ? 'Rejoignez Pinta' : 'Heureux de vous revoir.'}
          </h2>
          <p style={{
            fontFamily: SANS, fontSize: 14, color: GP.textMuted, margin: '0 0 28px',
          }}>
            {mode === 'signup'
              ? 'Quelques instants suffisent pour commencer.'
              : 'Identifiez-vous pour accéder à votre espace.'}
          </p>

          {/* role tabs */}
          <div style={{
            display: 'flex', gap: 4, padding: 4,
            background: '#fff',
            border: `1px solid ${GP.hair}`,
            borderRadius: 12,
            marginBottom: 22,
          }}>
            {[
              { k: 'client', l: 'Client' },
              { k: 'coach',  l: 'Coach' },
            ].map(t => (
              <button key={t.k} onClick={() => setRole(t.k)} style={{
                flex: 1,
                background: role === t.k
                  ? `linear-gradient(180deg, ${GP.ink}, ${GP.inkSoft})`
                  : 'transparent',
                color: role === t.k ? GP.champagne : GP.textMuted,
                border: 'none',
                borderRadius: 9,
                padding: '10px 14px',
                fontFamily: SANS, fontSize: 11.5, fontWeight: 600,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: role === t.k ? `inset 0 0 0 1px ${GP.hairGold}` : 'none',
                transition: 'all 160ms',
              }}>{t.l}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <Field
                label="Nom complet"
                placeholder="Prénom Nom"
                value={name}
                onChange={setName}
              />
            )}
            <Field
              label="Adresse e-mail"
              placeholder="vous@domaine.com"
              value={email}
              onChange={setEmail}
              icon={<Icon.mail s={16}/>}
            />
            <Field
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              type="password"
            />

            {mode === 'signin' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  fontFamily: SANS, fontSize: 12, color: GP.textMuted,
                }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: 4,
                    border: `1px solid ${GP.hairStrong}`, background: '#fff',
                  }}/>
                  Se souvenir de moi
                </label>
                <a href="#" style={{
                  fontFamily: SANS, fontSize: 12, color: GP.text, fontWeight: 600,
                  textDecoration: 'none', borderBottom: `1px solid ${GP.champagne}`,
                }}>Mot de passe oublié&nbsp;?</a>
              </div>
            )}

            <Btn variant="primary" size="lg" onClick={handleSubmit} iconRight={<Icon.arrow s={14} c={GP.champagne}/>}>
              {mode === 'signup' ? 'Créer mon compte' : 'Se connecter'}
            </Btn>

            {/* divider */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0',
              fontFamily: SANS, fontSize: 10.5, color: GP.textMuted,
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              <div style={{ flex: 1, height: 1, background: GP.hair }}/>
              ou
              <div style={{ flex: 1, height: 1, background: GP.hair }}/>
            </div>

            <Btn variant="ghost" size="lg">
              Continuer avec Apple
            </Btn>
          </div>

          <div style={{
            marginTop: 28, textAlign: 'center',
            fontFamily: SANS, fontSize: 13, color: GP.textMuted,
          }}>
            {mode === 'signup' ? 'Vous avez déjà un compte ?' : 'Pas encore membre ?'}{' '}
            <a href="#" onClick={e => { e.preventDefault(); setMode(mode === 'signup' ? 'signin' : 'signup'); }}
              style={{ color: GP.text, fontWeight: 600, textDecoration: 'none', borderBottom: `1px solid ${GP.champagne}` }}>
              {mode === 'signup' ? 'Se connecter' : 'Créer un compte'}
            </a>
          </div>

          {/* demo hint */}
          <div style={{
            marginTop: 36,
            padding: '12px 14px',
            background: GP.champagneTint,
            border: `1px solid ${GP.hairGold}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <PintaMark s={12} c={GP.champagne}/>
            <div style={{
              flex: 1,
              fontFamily: SANS, fontSize: 11.5, color: GP.text, lineHeight: 1.4,
            }}>
              <strong style={{ fontWeight: 600 }}>Démo —</strong>{' '}
              <span style={{ color: GP.textMuted }}>
                Cliquez sur «&nbsp;Se connecter&nbsp;» pour explorer l'espace {role === 'coach' ? 'coach' : 'client'}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
