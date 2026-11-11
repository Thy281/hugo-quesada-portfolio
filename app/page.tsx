"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

type Language = "en" | "es" | "pt";

const languages: Record<Language, {
  role: string;
  country: string;
  aboutPrompt: string;
  aboutTitle: string;
  aboutText: string;
  projectsPrompt: string;
  projectsTitle: string;
  projectsLink: string;
  toolsPrompt: string;
  toolsTitle: string;
  contactPrompt: string;
  contactTitle: string;
  certificationsTitle: string;
  contactLabel: string;
  footer: string;
  backToTop: string;
  navLabel: string;
  languageTitle: string;
  copyEmail: string;
  emailCopied: string;
  projects: Array<{ name: string; description: string; stack: string; href: string }>;
}> = {
  en: {
    role: "data, machine learning & applications",
    country: "Brazil, RJ",
    aboutPrompt: "cat about.txt",
    aboutTitle: "/About Me",
    aboutText: "I'm a student and independent developer working with Python, Pandas, Scikit-learn, Streamlit, MLflow, and SQL. I build data projects and applications, and I'm open to collaborating on new ones.",
    projectsPrompt: "ls ./projects",
    projectsTitle: "/Projects",
    projectsLink: "See all projects",
    toolsPrompt: "cat tools.txt",
    toolsTitle: "/Tools",
    contactPrompt: "./contact",
    contactTitle: "/Contact",
    certificationsTitle: "/Certifications",
    contactLabel: "Contact links",
    footer: "𝐻𝓊𝑔𝑜 𝒬𝓊𝑒𝓈𝒶𝒹𝒶 · Portfolio 2026",
    backToTop: "BACK TO TOP ↑",
    navLabel: "Portfolio sections",
    languageTitle: "/Language",
    copyEmail: "Copy email",
    emailCopied: "Copied",
    projects: [
      { name: "modelo-diabetes", description: "Educational classification project built with Python and Streamlit.", stack: "Python · Scikit-learn · Streamlit", href: "https://github.com/Thy281/modelo-diabetes" },
      { name: "ModelPredictionHouse", description: "Regression model for home price predictions.", stack: "Python · MLflow · Streamlit", href: "https://github.com/Thy281/ModelPredictionHouse" },
      { name: "FinComplaint-ML", description: "Exploratory analysis of consumer finance complaints.", stack: "Python · Pandas · Visualization", href: "https://github.com/Thy281/FinComplaint-ML" },
      { name: "sensor-polichinelo", description: "Computer vision app that detects and counts jumping jacks with Python and MediaPipe.", stack: "Python · MediaPipe · OpenCV", href: "https://github.com/Thy281/contador-polichinelo" }
    ]
  },
  es: {
    role: "datos, machine learning y aplicaciones",
    country: "Brasil, RJ",
    aboutPrompt: "cat acerca.txt",
    aboutTitle: "/Sobre Mí",
    aboutText: "Soy estudiante y desarrollador independiente; trabajo con Python, Pandas, Scikit-learn, Streamlit, MLflow y SQL. Creo proyectos de datos y aplicaciones, y estoy abierto a colaborar en nuevos proyectos.",
    projectsPrompt: "ls ./proyectos",
    projectsTitle: "/Proyectos",
    projectsLink: "Ver todos los proyectos",
    toolsPrompt: "cat herramientas.txt",
    toolsTitle: "/Herramientas",
    contactPrompt: "./contacto",
    contactTitle: "/Contacto",
    certificationsTitle: "/Certificaciones",
    contactLabel: "Enlaces de contacto",
    footer: "𝐻𝓊𝑔𝑜 𝒬𝓊𝑒𝓈𝒶𝒹𝒶 · Portafolio 2026",
    backToTop: "VOLVER ARRIBA ↑",
    navLabel: "Secciones del portafolio",
    languageTitle: "/Idioma",
    copyEmail: "Copiar correo",
    emailCopied: "Copiado",
    projects: [
      { name: "modelo-diabetes", description: "Proyecto educativo de clasificación con Python y Streamlit.", stack: "Python · Scikit-learn · Streamlit", href: "https://github.com/Thy281/modelo-diabetes" },
      { name: "ModelPredictionHouse", description: "Modelo de regresión para predecir precios de viviendas.", stack: "Python · MLflow · Streamlit", href: "https://github.com/Thy281/ModelPredictionHouse" },
      { name: "FinComplaint-ML", description: "Análisis exploratorio de quejas financieras de consumidores.", stack: "Python · Pandas · Visualización", href: "https://github.com/Thy281/FinComplaint-ML" },
      { name: "sensor-polichinelo", description: "Aplicación de visión por computadora que detecta y cuenta saltos de tijera con Python y MediaPipe.", stack: "Python · MediaPipe · OpenCV", href: "https://github.com/Thy281/contador-polichinelo" }
    ]
  },
  pt: {
    role: "dados, machine learning e aplicações",
    country: "Brasil, RJ",
    aboutPrompt: "cat sobre.txt",
    aboutTitle: "/Sobre Mim",
    aboutText: "Sou estudante e desenvolvedor independente e trabalho com Python, Pandas, Scikit-learn, Streamlit, MLflow e SQL. Crio projetos de dados e aplicações e estou aberto a colaborar em novos projetos.",
    projectsPrompt: "ls ./projetos",
    projectsTitle: "/Projetos",
    projectsLink: "Ver todos os projetos",
    toolsPrompt: "cat ferramentas.txt",
    toolsTitle: "/Ferramentas",
    contactPrompt: "./contato",
    contactTitle: "/Contato",
    certificationsTitle: "/Certificações",
    contactLabel: "Links de contato",
    footer: "𝐻𝓊𝑔𝑜 𝒬𝓊𝑒𝓈𝒶𝒹𝒶 · Portfólio 2026",
    backToTop: "VOLTAR AO TOPO ↑",
    navLabel: "Seções do portfólio",
    languageTitle: "/Linguagem",
    copyEmail: "Copiar e-mail",
    emailCopied: "Copiado",
    projects: [
      { name: "modelo-diabetes", description: "Projeto educacional de classificação com Python e Streamlit.", stack: "Python · Scikit-learn · Streamlit", href: "https://github.com/Thy281/modelo-diabetes" },
      { name: "ModelPredictionHouse", description: "Modelo de regressão para previsão de preços de imóveis.", stack: "Python · MLflow · Streamlit", href: "https://github.com/Thy281/ModelPredictionHouse" },
      { name: "FinComplaint-ML", description: "Análise exploratória de reclamações financeiras de consumidores.", stack: "Python · Pandas · Visualização", href: "https://github.com/Thy281/FinComplaint-ML" },
      { name: "sensor-polichinelo", description: "Aplicação de visão computacional que detecta e conta polichinelos com Python e MediaPipe.", stack: "Python · MediaPipe · OpenCV", href: "https://github.com/Thy281/contador-polichinelo" }
    ]
  }
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const content = languages[language];

  useEffect(() => {
    function blockContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    function blockCopy(event: ClipboardEvent) {
      event.preventDefault();
    }

    function blockInspectionShortcuts(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const commandKey = event.ctrlKey || event.metaKey;
      const devtoolsShortcut = commandKey && event.shiftKey && ["i", "j", "c"].includes(key);
      const copyOrSourceShortcut = commandKey && ["c", "u"].includes(key);

      if (event.key === "F12" || devtoolsShortcut || copyOrSourceShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("keydown", blockInspectionShortcuts);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("keydown", blockInspectionShortcuts);
    };
  }, []);

  function selectLanguage(nextLanguage: Language) {
    document.documentElement.lang = nextLanguage;
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  }

  async function copyEmail() {
    await navigator.clipboard.writeText("quesada8hugo@gmail.com");
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  }

  return (
    <>
      <nav className="top-bar" aria-label={content.navLabel}>
        <div className="top-bar-inner">
          <div className="section-nav">
            <a href="#sobre">{content.aboutTitle}</a>
            <a href="#projetos">{content.projectsTitle}</a>
            <a href="#tools">{content.toolsTitle}</a>
            <a href="#contato">{content.contactTitle}</a>
            <a href="https://www.linkedin.com/in/hugo-quesada-5999bb355/details/certifications/" target="_blank" rel="noreferrer">{content.certificationsTitle}</a>
            <div className="language-menu">
              <button className="language-menu-trigger" type="button" aria-expanded={languageOpen} aria-controls="language-options" onClick={() => setLanguageOpen(!languageOpen)}>{content.languageTitle}<span aria-hidden="true"> {languageOpen ? "−" : "+"}</span></button>
              <div className="language-options" id="language-options" role="group" aria-label={content.languageTitle} hidden={!languageOpen}>
                {([["en", "English"], ["pt", "Portuguese"], ["es", "Spanish"]] as const).map(([option, label]) => (
                  <button className="language-option-button" type="button" key={option} onClick={() => selectLanguage(option)} aria-pressed={language === option}>[{label}]</button>
                ))}
              </div>
            </div>
          </div>
          <div className="profile-controls">
            <ThemeToggle />
            <button className="email-copy-button" type="button" onClick={copyEmail} aria-live="polite">[{emailCopied ? content.emailCopied : content.copyEmail}]</button>
          </div>
        </div>
      </nav>
      <main className="page-shell" id="inicio">
      <header className="profile-header">
        <div className="profile-identity">
          <div className="profile-avatar">
            <Image src="/foto-perfil.jpeg" alt={language === "es" ? "Foto de Hugo Quesada" : language === "pt" ? "Foto de Hugo Quesada" : "Photo of Hugo Quesada"} width={80} height={80} priority />
          </div>
          <div className="identity-copy">
            <h1>𝐻𝓊𝑔𝑜 𝒬𝓊𝑒𝓈𝒶𝒹𝒶</h1>
            <p>{content.role}</p>
            <span>{content.country}</span>
          </div>
        </div>
      </header>

      <section className="about-section" id="sobre">
        <div className="terminal-prompt"><span>hugo@portfolio</span>:~$ {content.aboutPrompt}</div>
        <h2>{content.aboutTitle}</h2>
        <p>{content.aboutText}</p>
      </section>

      <section className="projects-section" id="projetos">
        <div className="terminal-prompt"><span>hugo@portfolio</span>:~$ {content.projectsPrompt}</div>
        <h2>{content.projectsTitle}</h2>
        <ul className="project-list">
          {content.projects.map(project => (
            <li className="project-row" key={project.name}>
              <a className="project-name" href={project.href} target="_blank" rel="noreferrer">{project.name}</a>
              <span className="project-separator" aria-hidden="true">—</span>
              <div className="project-description">
                <p>{project.description}</p>
                <span>{project.stack}</span>
              </div>
            </li>
          ))}
        </ul>
        <a className="projects-link" href="https://github.com/Thy281?tab=repositories" target="_blank" rel="noreferrer">{content.projectsLink} <span aria-hidden="true">→</span></a>
      </section>

      <section className="stack-section" id="tools">
        <div className="terminal-prompt"><span>hugo@portfolio</span>:~$ {content.toolsPrompt}</div>
        <h2>{content.toolsTitle}</h2>
        <p>Python · Pandas · Scikit-learn · Streamlit · MLflow · SQL</p>
      </section>

      <footer className="site-footer" id="contato">
        <div className="terminal-prompt"><span>hugo@portfolio</span>:~$ {content.contactPrompt}</div>
        <h2>{content.contactTitle}</h2>
        <nav className="contact-links" aria-label={content.contactLabel}>
          <a href="https://github.com/Thy281" target="_blank" rel="noreferrer">
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .5C5.65.5.5 5.74.5 12.2c0 5.17 3.34 9.56 7.97 11.11.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.24.72-3.92-1.59-3.92-1.59-.53-1.38-1.3-1.75-1.3-1.75-1.06-.74.08-.73.08-.73 1.18.08 1.8 1.24 1.8 1.24 1.04 1.82 2.73 1.3 3.4.99.1-.77.41-1.3.74-1.6-2.59-.3-5.31-1.32-5.31-5.88 0-1.3.46-2.37 1.23-3.2-.12-.3-.53-1.52.12-3.16 0 0 1.01-.33 3.3 1.22a11.23 11.23 0 0 1 6 0c2.28-1.55 3.29-1.22 3.29-1.22.66 1.64.25 2.86.12 3.16.77.83 1.23 1.9 1.23 3.2 0 4.57-2.72 5.58-5.32 5.87.42.37.79 1.1.79 2.22 0 1.6-.02 2.9-.02 3.29 0 .31.21.68.8.57 4.62-1.55 7.96-5.94 7.96-11.11C23.5 5.74 18.35.5 12 .5Z" /></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hugo-quesada-5999bb355/" target="_blank" rel="noreferrer">
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" /></svg>
            LinkedIn
          </a>
        </nav>
        <div className="footer-bottom"><span>{content.footer}</span><a href="#inicio">{content.backToTop}</a></div>
      </footer>
      </main>
    </>
  );
}
