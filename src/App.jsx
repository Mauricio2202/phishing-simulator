import React, { useState } from "react";

const profiles = {
  veronica: { name: "Verónica", role: "Seguridad de la información", initials: "V", color: "lilac" },
  sam: { name: "Sam Altman", role: "Director ejecutivo", initials: "S", color: "mint" },
  mateo: { name: "Mateo", role: "Usuario externo", initials: "M", color: "orange" },
};

const demoAccounts = {
  veronica: { username: "veronica@dotsia.demo", password: "Veronica-Demo-2026" },
  sam: { username: "sam@dotsia.demo", password: "Sam-Demo-2026" },
  mateo: { username: "mateo@external.demo", password: "Mateo-Demo-2026" },
};

const files = [
  { name: "DotsIA — visión del producto.pdf", meta: "PDF · 2.4 MB · Modificado ayer", type: "PDF", color: "red" },
  { name: "Arquitectura del sistema.fig", meta: "FIG · 18.6 MB · Modificado el lunes", type: "FIG", color: "purple" },
  { name: "Plan de lanzamiento.xlsx", meta: "XLSX · 840 KB · Modificado el 12 oct.", type: "XLSX", color: "green" },
  { name: "Contratos del evento — borrador.docx", meta: "DOCX · 1.2 MB · Modificado el 10 oct.", type: "DOC", color: "blue" },
];

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const shapes = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    folder: <><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H10l2 2h7.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" /></>,
    shield: <><path d="M12 21s8-3.7 8-10V5l-8-3-8 3v6c0 6.3 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r=".8" /><circle cx="12" cy="12" r=".8" /><circle cx="19" cy="12" r=".8" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h11" /></>,
  };
  return <svg {...common}>{shapes[name]}</svg>;
}

function Avatar({ person, small = false }) {
  return <span className={`avatar ${person.color} ${small ? "avatar-small" : ""}`}>{person.initials}</span>;
}

function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeNav, setActiveNav] = useState("Correo");
  const [mailSent, setMailSent] = useState(false);
  const [incident, setIncident] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const person = activeProfile ? profiles[activeProfile] : null;

  const openPhishingLink = () => {
    setIncident(true);
    setAccessGranted(true);
    setShowTraining(true);
  };

  const resetScenario = () => {
    setMailSent(false);
    setIncident(false);
    setAccessGranted(false);
    setShowTraining(false);
    setActiveProfile(null);
    setActiveNav("Correo");
  };

  const login = (profileId) => {
    setActiveProfile(profileId);
    setActiveNav(profileId === "veronica" ? "Correo" : "Inicio");
  };

  if (!activeProfile) {
    return <LoginView onLogin={login} onReset={resetScenario} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark"><span /><span /><span /><span /></div>
          <span className="brand-name">dotsia</span>
          <button className="icon-button sidebar-more" aria-label="Más opciones"><Icon name="more" /></button>
        </div>

        <button className="workspace-switcher">
          <span className="workspace-icon">D</span>
          <span className="workspace-copy"><strong>DotsIA</strong><small>Espacio de trabajo</small></span>
          <span className="switcher-arrows">⌃<br />⌄</span>
        </button>

        <div className="side-search"><Icon name="search" /><span>Buscar en el espacio</span><kbd>⌘ K</kbd></div>
        <nav className="primary-nav" aria-label="Navegación principal">
          <button className={`nav-item ${activeNav === "Inicio" ? "selected" : ""}`} onClick={() => setActiveNav("Inicio")}><Icon name="grid" />Inicio</button>
          <button className={`nav-item ${activeNav === "Correo" ? "selected" : ""}`} onClick={() => setActiveNav("Correo")}><Icon name="mail" />Correo{mailSent && !incident && <span className="unread-count">1</span>}</button>
          <button className={`nav-item ${activeNav === "Archivos" ? "selected" : ""}`} onClick={() => setActiveNav("Archivos")}><Icon name="folder" />Archivos</button>
          <button className={`nav-item ${activeNav === "Seguridad" ? "selected" : ""}`} onClick={() => setActiveNav("Seguridad")}><Icon name="shield" />Seguridad</button>
        </nav>

        <div className="sidebar-divider" />
        <div className="section-heading"><span>ESPACIO DE TRABAJO</span><button className="icon-button" aria-label="Agregar"><Icon name="plus" size={16} /></button></div>
        <button className="nav-item folder-nav" onClick={() => setActiveNav("Archivos")}><span className="folder-dot" />DotsAISystem<Icon name="chevron" size={15} /></button>

        <div className="sidebar-bottom">
          <div className="sidebar-divider" />
          <div className="current-user">
            <Avatar person={person} small />
            <span className="person-copy"><strong>{person.name}</strong><small>{person.role}</small></span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>DotsIA</span><span className="crumb-slash">/</span><strong>{activeProfile === "mateo" ? "Perfil externo" : activeNav}</strong></div>
          <div className="top-actions">
            <span className="secure-label"><span className="secure-dot" />Espacio seguro</span>
            <button className="help-button" onClick={() => setShowTraining(true)}>?</button>
            <button className="logout-button" onClick={() => setActiveProfile(null)}>Salir</button>
            <span className="top-avatar-button" aria-label={`Sesión de ${person.name}`}><Avatar person={person} small /></span>
          </div>
        </header>

        <div className="content-wrap">
          {activeProfile === "mateo" ? (
            <MateoView mailSent={mailSent} accessGranted={accessGranted} onSend={() => setMailSent(true)} />
          ) : activeNav === "Correo" ? (
            <MailView onOpenLink={openPhishingLink} onOpenSecurity={() => setActiveNav("Seguridad")} incident={incident} mailSent={mailSent} profile={person} />
          ) : activeNav === "Archivos" ? (
            <FilesView incident={incident} profile={person} onReturn={() => setActiveNav("Correo")} />
          ) : activeNav === "Seguridad" ? (
            <SecurityView incident={incident} onReset={resetScenario} />
          ) : (
            <HomeView profile={person} incident={incident} onOpenMail={() => setActiveNav("Correo")} onOpenFiles={() => setActiveNav("Archivos")} />
          )}
        </div>
        <footer className="footer-note"><span>DotsIA Workspace</span><span>Simulación educativa · Datos ficticios</span></footer>
      </main>

      {showTraining && <TrainingModal onClose={() => setShowTraining(false)} onReset={resetScenario} />}
    </div>
  );
}

function LoginView({ onLogin, onReset }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const matched = Object.entries(demoAccounts).find(([, account]) =>
      username.trim().toLowerCase() === account.username && password === account.password,
    );
    if (!matched) {
      setError("Usuario o contraseña incorrectos. Usa las credenciales de demo.");
      return;
    }
    setError("");
    onLogin(matched[0]);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand"><div className="brand-mark"><span /><span /><span /><span /></div><span className="brand-name">dotsia</span></div>
        <div className="login-lock"><Icon name="shield" size={22} /></div>
        <div className="eyebrow">ESPACIO DE TRABAJO</div>
        <h1>Inicia sesión en DotsIA</h1>
        <p className="login-intro">Accede a la simulación educativa con una cuenta de prueba.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-username">Correo de demo</label>
          <input id="login-username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="usuario@dotsia.demo" required />
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña de demo" required />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="primary-button login-submit" type="submit">Continuar</button>
        </form>
        <button className="text-button login-reset" onClick={onReset}>Reiniciar simulación</button>
        <div className="login-footnote"><Icon name="shield" size={14} /> Solo usa las cuentas ficticias incluidas en <strong>demo-credentials.txt</strong>. No reutilices contraseñas personales.</div>
      </section>
      <div className="login-disclaimer">Simulación local de concientización · No se envían correos reales ni se accede a archivos externos.</div>
    </main>
  );
}

function PageTitle({ eyebrow, title, subtitle, action }) {
  return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function MailView({ onOpenLink, onOpenSecurity, incident, mailSent, profile }) {
  return (
    <>
      <PageTitle eyebrow="BUZÓN DE ENTRADA" title="Correo" subtitle={mailSent ? `Hola, ${profile.name}. Tienes 1 mensaje nuevo.` : `Hola, ${profile.name}. Tu bandeja está vacía.`}
        action={<button className="compose-button"><Icon name="plus" size={16} /> Redactar</button>} />
      <div className="mail-layout">
        <section className="mail-list-card">
          <div className="mail-toolbar"><div className="mail-filter"><span className="filter-active">Principal</span><span>Otros</span></div><button className="icon-button" aria-label="Más opciones"><Icon name="more" /></button></div>
          <div className="mail-list-heading">Hoy <span>{mailSent ? "1 mensaje" : "0 mensajes"}</span></div>
          {mailSent ? (
            <button className="mail-row mail-row-active">
              <span className="sender-avatar vendor">N</span>
              <span className="mail-row-copy"><strong>Nexus Eventos <i className="unverified-mark">•</i></strong><span>Contratos para presentación DotsIA</span><small>Hola Verónica, te compartimos los contratos...</small></span>
              <span className="mail-time">Ahora</span>
            </button>
          ) : (
            <div className="mail-empty"><div className="empty-check"><Icon name="check" /></div><strong>No tienes mensajes nuevos</strong><span>Los mensajes aparecerán aquí.</span></div>
          )}
        </section>

        <section className="email-card">
          {mailSent ? (
            <>
          <div className="email-toolbar">
            <div className="email-toolbar-left"><button className="icon-button" aria-label="Volver al buzón"><Icon name="back" /></button><span className="toolbar-divider" /><button className="icon-button" aria-label="Archivar"><Icon name="folder" size={16} /></button><button className="icon-button" aria-label="Más opciones"><Icon name="more" /></button></div>
            <span className="message-position">1 de 1</span>
          </div>
          <div className="email-content">
            <div className="email-subject-row"><h2>Contratos para presentación DotsIA</h2><span className="inbox-tag">Recibidos</span></div>
            <div className="sender-details">
              <span className="sender-avatar vendor sender-large">N</span>
              <div className="sender-meta"><strong>Nexus Eventos <span className="sender-address">&lt;contratos@nexus-eventos.co&gt;</span></strong><span>para mí <button className="inline-chevron">⌄</button></span></div>
              <span className="email-date">Hoy, 10:42 a. m.</span><button className="icon-button" aria-label="Más opciones"><Icon name="more" /></button>
            </div>
            <div className="email-body">
              <p>Hola Verónica,</p>
              <p>Qué gusto saludarte. Estamos cerrando los detalles para el evento de presentación del modelo <strong>DotsIA</strong>.</p>
              <p>Adjuntamos la versión final de los contratos para revisión. Para confirmar que todo esté correcto, puedes consultar y aceptar los documentos en el siguiente enlace:</p>
              <div className="contract-cta-wrap"><button className="contract-cta" onClick={onOpenLink}>Revisar y aceptar contratos <Icon name="arrow" size={16} /></button></div>
              <p>Si tienes alguna duda, responde a este correo y con gusto te ayudamos.</p>
              <p>Saludos,<br /><strong>Equipo de contratos</strong><br />Nexus Eventos</p>
            </div>
            <div className="email-attachments"><div className="attachment-head"><strong>2 archivos adjuntos</strong><span>·</span><button>Descargar todo</button></div><div className="attachment-list"><Attachment name="Contrato_evento_DotsIA.pdf" type="PDF" color="red" /><Attachment name="Anexo_proveedores.pdf" type="PDF" color="red" /></div></div>
            <div className="email-reply"><button>↩ <span>Responder</span></button><button>↪ <span>Reenviar</span></button></div>
          </div>
          {incident && <div className="simulation-inline"><span className="simulation-pulse" /><span>Incidente simulado registrado</span><button onClick={onOpenSecurity}>Ver detalles en Seguridad <Icon name="arrow" size={13} /></button></div>}
            </>
          ) : (
            <div className="empty-email-view"><span className="empty-check"><Icon name="mail" /></span><strong>Tu bandeja está vacía</strong><span>Cuando Mateo envíe el correo de prueba, aparecerá aquí.</span></div>
          )}
        </section>
      </div>
    </>
  );
}

function Attachment({ name, type, color }) {
  return <div className="attachment"><span className={`file-icon ${color}`}>{type}</span><span className="attachment-name">{name}</span><span className="attachment-size">PDF · 248 KB</span><Icon name="more" size={16} /></div>;
}

function MateoView({ mailSent, accessGranted, onSend }) {
  return (
    <div className="single-column">
      <PageTitle eyebrow="PERFIL EXTERNO · MATEO" title="Correo de prueba" subtitle="Prepara y envía el mensaje de phishing únicamente dentro de esta simulación." />
      {!mailSent ? (
        <div className="outgoing-mail-card">
          <div className="outgoing-mail-head"><span className="sender-avatar vendor sender-large">N</span><div><span className="card-label">BORRADOR DE SIMULACIÓN</span><h2>Contratos para presentación DotsIA</h2></div><span className="status-pill neutral">Borrador</span></div>
          <div className="outgoing-mail-fields"><div><span>Cuenta</span><strong>Mateo &lt;mateo@external.demo&gt;</strong></div><div><span>Para</span><strong>Verónica &lt;veronica@dotsia.demo&gt;</strong></div><div><span>Remitente visible</span><strong>Nexus Eventos &lt;contratos@nexus-eventos.co&gt;</strong></div><div><span>Asunto</span><strong>Contratos para presentación DotsIA</strong></div></div>
          <p className="outgoing-mail-copy">Hola Verónica, te compartimos los contratos para el evento de presentación del modelo DotsIA. Revisa y acepta los documentos en el enlace incluido.</p>
          <div className="outgoing-mail-cta"><span>Revisar y aceptar contratos <Icon name="arrow" size={14} /></span><small>Enlace ficticio · Solo activa el escenario de capacitación</small></div>
          <div className="outgoing-mail-actions"><button className="primary-button" onClick={onSend}><Icon name="mail" size={15} /> Enviar correo de prueba</button><span>El correo solo aparecerá dentro de la app al iniciar sesión como Verónica.</span></div>
        </div>
      ) : (
        <>
          <div className={`incident-banner ${accessGranted ? "" : "mail-sent-banner"}`}><span className="banner-icon"><Icon name={accessGranted ? "arrow" : "mail"} size={17} /></span><div><strong>{accessGranted ? "Acceso simulado · DotsAISystem" : "Correo enviado a Verónica"}</strong><span>{accessGranted ? "Verónica seleccionó el enlace de prueba. Vuelve a iniciar sesión para ver el resultado." : "La bandeja de Verónica ya recibió el mensaje dentro de esta experiencia."}</span></div><span className={`status-pill ${accessGranted ? "danger" : "safe"}`}>{accessGranted ? "SIMULACIÓN" : "ENTREGADO"}</span></div>
          {accessGranted ? (
            <div className="drive-card">
              <div className="drive-breadcrumb"><span>Espacio de Verónica</span><Icon name="chevron" size={14} /><strong><span className="folder-dot" />DotsAISystem</strong></div>
              <div className="drive-card-title"><div><h2>Contenido de la carpeta</h2><p>Vista de impacto simulada · Archivos de muestra</p></div><span className="file-count">4 elementos</span></div>
              <div className="file-table">
                <div className="file-table-head"><span>Nombre</span><span>Propietario</span><span>Última modificación</span><span>Tamaño</span></div>
                {files.map((file, i) => <div className="file-table-row" key={file.name}><div className="file-name-cell"><span className={`file-icon ${file.color}`}>{file.type}</span><span>{file.name}</span></div><span>Verónica</span><span>{["Ayer", "Lun, 14 oct.", "Sáb, 12 oct.", "Jue, 10 oct."][i]}</span><span>{["2.4 MB", "18.6 MB", "840 KB", "1.2 MB"][i]}</span></div>)}
              </div>
              <div className="mock-data-note"><Icon name="shield" size={17} /><span>Estos nombres y metadatos son ficticios. La simulación no lee ni copia archivos del equipo.</span></div>
            </div>
          ) : (
            <div className="state-card external-state"><span className="state-icon muted"><Icon name="shield" size={24} /></span><div className="state-copy"><h2>Sin acceso a los archivos</h2><p>El correo se entregó en el buzón de Verónica, pero la carpeta sigue bloqueada en esta simulación. Solo se mostrará después de que ella pulse el enlace.</p></div><span className="status-pill neutral">Bloqueado</span></div>
          )}
        </>
      )}
      <div className="safe-callout"><Icon name="shield" size={18} /><span><strong>Entorno de capacitación.</strong> No se envía correo fuera de la app ni se accede a documentos reales.</span></div>
    </div>
  );
}

function FilesView({ incident, profile, onReturn }) {
  return (
    <div className="single-column">
      <PageTitle eyebrow="ARCHIVOS COMPARTIDOS" title="Archivos" subtitle={`Documentos de trabajo de ${profile.name}.`} action={<button className="compose-button"><Icon name="plus" size={16} /> Nuevo</button>} />
      <div className="drive-card">
        <div className="drive-breadcrumb"><span>Mi espacio</span><Icon name="chevron" size={14} /><strong><span className="folder-dot" />DotsAISystem</strong></div>
        <div className="drive-card-title"><div><h2>DotsAISystem</h2><p>Carpeta privada · Propietaria: Verónica</p></div><span className="file-count">4 elementos</span></div>
        <div className="file-table">
          <div className="file-table-head"><span>Nombre</span><span>Propietario</span><span>Última modificación</span><span>Tamaño</span></div>
          {files.map((file, i) => <div className="file-table-row" key={file.name}><div className="file-name-cell"><span className={`file-icon ${file.color}`}>{file.type}</span><span>{file.name}</span></div><span>Verónica</span><span>{["Ayer", "Lun, 14 oct.", "Sáb, 12 oct.", "Jue, 10 oct."][i]}</span><span>{["2.4 MB", "18.6 MB", "840 KB", "1.2 MB"][i]}</span></div>)}
        </div>
        {incident && <div className="mock-data-note"><Icon name="shield" size={17} /><span>Los elementos son datos de muestra. La vista de Mateo es una representación educativa, no acceso real.</span></div>}
      </div>
      <button className="text-button back-to-mail" onClick={onReturn}><Icon name="back" size={15} /> Volver al correo</button>
    </div>
  );
}

function SecurityView({ incident, onReset }) {
  return (
    <div className="single-column">
      <PageTitle eyebrow="CENTRO DE SEGURIDAD" title="Seguridad" subtitle="Estado y actividad de protección de tu espacio." />
      <div className="security-grid">
        <div className="security-card"><span className="security-card-icon green-bg"><Icon name="shield" /></span><div><span className="card-label">ESTADO DEL ESPACIO</span><h3>Protección activa</h3><p>Las herramientas de seguridad están funcionando.</p></div><span className="status-pill safe">Protegido</span></div>
        <div className="security-card"><span className="security-card-icon lavender-bg"><Icon name="mail" /></span><div><span className="card-label">SIMULACIÓN DE PHISHING</span><h3>{incident ? "Clic registrado" : "Lista para iniciar"}</h3><p>{incident ? "Se detectó la interacción con un enlace sospechoso simulado." : "Revisa el correo de prueba en tu bandeja de entrada."}</p></div><span className={`status-pill ${incident ? "danger" : "neutral"}`}>{incident ? "En revisión" : "Pendiente"}</span></div>
      </div>
      <div className="activity-card"><div className="activity-heading"><h2>Actividad reciente</h2><span>Últimos 7 días</span></div>{incident ? <div className="activity-row"><span className="activity-indicator warning" /><div><strong>Interacción con enlace de prueba</strong><span>Correo “Contratos para presentación DotsIA” · Ahora</span></div><span className="status-pill danger">Simulado</span></div> : <div className="activity-empty"><div className="empty-check"><Icon name="check" /></div><span>No hay incidentes recientes.</span></div>}</div>
      {incident && <div className="learning-card"><div className="learning-icon"><Icon name="shield" /></div><div><strong>Aprendizaje de esta simulación</strong><p>Verifica el dominio del remitente y confirma solicitudes de documentos con el proveedor por un canal conocido.</p></div><button className="text-button" onClick={onReset}>Reiniciar</button></div>}
    </div>
  );
}

function HomeView({ profile, incident, onOpenMail, onOpenFiles }) {
  return (
    <div className="single-column home-view">
      <div className="welcome-line"><div><div className="eyebrow">MI ESPACIO DE TRABAJO</div><h1>Buenos días, {profile.name.split(" ")[0]}</h1><p>Todo lo importante para tu equipo, en un solo lugar.</p></div><div className="welcome-date">Lunes, 14 de octubre <span>☀</span></div></div>
      <div className="home-cards">
        <button className="home-card" onClick={onOpenMail}><span className="home-card-icon mail-bg"><Icon name="mail" /></span><span className="card-label">BANDEJA DE ENTRADA</span><strong>1 mensaje nuevo</strong><span>Revisa tu correo reciente <Icon name="chevron" size={14} /></span></button>
        <button className="home-card" onClick={onOpenFiles}><span className="home-card-icon files-bg"><Icon name="folder" /></span><span className="card-label">TUS ARCHIVOS</span><strong>DotsAISystem</strong><span>4 documentos compartidos <Icon name="chevron" size={14} /></span></button>
      </div>
      <div className="home-section-heading"><h2>Actividad del equipo</h2><button className="text-button">Ver todo <Icon name="arrow" size={14} /></button></div>
      <div className="activity-card compact-activity"><div className="activity-row"><Avatar person={profiles.sam} small /><div><strong>Sam Altman compartió una actualización</strong><span>Presentación del modelo DotsIA · Ayer</span></div><span className="activity-indicator" /></div>{incident && <div className="activity-row"><span className="activity-indicator warning" /><div><strong>Evento de capacitación de seguridad</strong><span>Enlace sospechoso · Simulación</span></div><span className="status-pill danger">Simulado</span></div>}</div>
      <div className="home-safety"><Icon name="shield" size={17} /><span>Recuerda: verifica siempre quién te envía documentos antes de abrir enlaces.</span><button onClick={() => onOpenMail()}>Ver correo de prueba</button></div>
    </div>
  );
}

function TrainingModal({ onClose, onReset }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="training-modal" role="dialog" aria-modal="true" aria-labelledby="training-title">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal-icon"><Icon name="shield" size={25} /></div>
        <div className="eyebrow">SIMULACIÓN DE CONCIENTIZACIÓN</div>
        <h2 id="training-title">Este correo era una prueba de phishing</h2>
        <p>El enlace que seleccionaste activó un escenario ficticio para mostrar el riesgo potencial. No se compartieron credenciales ni se accedió a archivos reales.</p>
        <div className="training-clues">
          <div><span className="clue-number">01</span><span><strong>Revisa el dominio</strong><small>El remitente usa un dominio que podría no coincidir con el proveedor oficial.</small></span></div>
          <div><span className="clue-number">02</span><span><strong>Desconfía de la urgencia</strong><small>Una solicitud de “versión final” puede presionarte para actuar rápido.</small></span></div>
          <div><span className="clue-number">03</span><span><strong>Confirma por otra vía</strong><small>Contacta al proveedor con los datos de contacto que ya tienes registrados.</small></span></div>
        </div>
        <div className="modal-actions"><button className="primary-button" onClick={onClose}>Entendido</button><button className="secondary-button" onClick={onReset}>Reiniciar escenario</button></div>
        <div className="modal-footnote"><Icon name="shield" size={14} /> Todo el contenido de esta experiencia es ficticio.</div>
      </section>
    </div>
  );
}

export default App;
