// Golf Pinta — App router & shell

const { useState: useStateApp, useEffect: useEffectApp } = React;

// Font pairings. Each preset sets both the display (serif/heading) font and
// the UI/body font. "Editorial" is the original Instrument Serif + Manrope
// look; the others trade some elegance for crispness/legibility.
const FONT_PRESETS = {
  editorial: {
    label: 'Editorial',
    sub:   'Instrument Serif + Manrope',
    serif: "'Instrument Serif', Georgia, serif",
    sans:  "'Manrope', -apple-system, system-ui, sans-serif",
  },
  warm: {
    label: 'Warm',
    sub:   'Newsreader + Public Sans',
    serif: "'Newsreader', Georgia, serif",
    sans:  "'Public Sans', -apple-system, system-ui, sans-serif",
  },
  crisp: {
    label: 'Crisp',
    sub:   'DM Serif Display + Outfit',
    serif: "'DM Serif Display', Georgia, serif",
    sans:  "'Outfit', -apple-system, system-ui, sans-serif",
  },
  modern: {
    label: 'Modern',
    sub:   'Bricolage Grotesque + Plus Jakarta',
    serif: "'Bricolage Grotesque', -apple-system, system-ui, sans-serif",
    sans:  "'Plus Jakarta Sans', -apple-system, system-ui, sans-serif",
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontPreset": "warm",
  "uiScale": 100
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply font preset → CSS vars on :root
  useEffectApp(() => {
    const p = FONT_PRESETS[t.fontPreset] || FONT_PRESETS.editorial;
    document.documentElement.style.setProperty('--gp-serif', p.serif);
    document.documentElement.style.setProperty('--gp-sans',  p.sans);
  }, [t.fontPreset]);

  // Apply UI scale → root font-size proxy (we scale the main app, not the
  // login screen — that one has its own composition).
  const scale = (t.uiScale || 100) / 100;

  const [user, setUser] = useStateApp(null);
  const [route, setRoute] = useStateApp('home');
  const [routeParams, setRouteParams] = useStateApp({});

  const goto = (target) => {
    if (typeof target === 'string') {
      setRoute(target);
      setRouteParams({});
    } else {
      const { key, ...rest } = target;
      setRoute(key);
      setRouteParams(rest);
    }
    requestAnimationFrame(() => {
      const main = document.getElementById('gp-main');
      if (main) main.scrollTop = 0;
    });
  };

  const handleLogin = (u) => {
    setUser(u);
    setRoute(u.role === 'coach' ? 'coach.home' : 'home');
    setRouteParams({});
  };

  const handleLogout = () => {
    setUser(null);
    setRoute('home');
    setRouteParams({});
  };

  const tweaksUI = (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Typography"/>
      <TweakSelect
        label="Font pair"
        value={t.fontPreset}
        options={Object.keys(FONT_PRESETS).map(k => ({
          value: k,
          label: `${FONT_PRESETS[k].label} — ${FONT_PRESETS[k].sub}`,
        }))}
        onChange={v => setTweak('fontPreset', v)}
      />
      <TweakSlider
        label="UI scale"
        value={t.uiScale}
        min={90} max={115} step={1} unit="%"
        onChange={v => setTweak('uiScale', v)}
      />
    </TweaksPanel>
  );

  if (!user) {
    return (
      <>
        <LoginScreen onLogin={handleLogin}/>
        {tweaksUI}
      </>
    );
  }

  const isCoach = user.role === 'coach';

  return (
    <div style={{
      display: 'flex', height: '100%', width: '100%',
      fontSize: `${scale}em`,
    }}>
      <Sidebar
        role={user.role}
        route={route}
        onNavigate={goto}
        onLogout={handleLogout}
        user={user}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          right={isCoach
            ? <Btn variant="ghost" size="sm" icon={<Icon.plus s={13}/>}>Nouveau créneau</Btn>
            : <Btn variant="gold" size="sm" icon={<Icon.plus s={13}/>} onClick={() => goto('booking')}>Réserver</Btn>}
        />
        <div id="gp-main" style={{ flex: 1, overflow: 'auto', background: GP.cream }}>
          {/* Customer routes */}
          {!isCoach && route === 'home'         && <CustomerHome user={user} onNavigate={goto} onOpenReservation={id => goto({ key: 'reservationDetail', id })}/>}
          {!isCoach && route === 'academies'    && <AcademiesScreen onNavigate={goto}/>}
          {!isCoach && route === 'academy'      && <AcademyDetail id={routeParams.id} onNavigate={goto} onBack={() => goto('academies')}/>}
          {!isCoach && route === 'booking'      && <BookingFlow initialAcademy={routeParams.academy} onComplete={() => goto('reservations')} onBack={() => goto('home')}/>}
          {!isCoach && route === 'reservations' && <ReservationsScreen onOpenReservation={id => goto({ key: 'reservationDetail', id })} onNavigate={goto}/>}
          {!isCoach && route === 'reservationDetail' && <ReservationDetail id={routeParams.id} onBack={() => goto('reservations')}/>}
          {!isCoach && route === 'profile'      && <ProfileScreen user={user}/>}
          {!isCoach && route === 'settings'     && <ProfileScreen user={user}/>}

          {/* Coach routes */}
          {isCoach && route === 'coach.home'     && <CoachHome user={user} onNavigate={goto}/>}
          {isCoach && route === 'coach.schedule' && <CoachSchedule onNavigate={goto}/>}
          {isCoach && route === 'coach.students' && <CoachStudents/>}
          {isCoach && route === 'coach.academy'  && <CoachAcademy/>}
          {isCoach && route === 'profile'        && <ProfileScreen user={user}/>}
          {isCoach && route === 'settings'       && <ProfileScreen user={user}/>}
        </div>
      </main>
      {tweaksUI}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
