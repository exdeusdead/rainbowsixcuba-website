import React from "react";
import {
  BarChart3,
  ChevronRight,
  MessageCircle,
  Radio,
  Users
} from "lucide-react";

import { SITE_CONFIG } from "../config/siteConfig";

export default function Hero({
  t,
  active,
  setActive,
  moduleMap,
  imageBase
}) {
  const definition = moduleMap[active];
  const isModule = active !== "home" && definition;

  const [id, Icon, color, , heroImage] = definition || [];
  const moduleContent = isModule ? t.modules[id] : null;

  const background = isModule
    ? `${imageBase}${heroImage}`
    : `${imageBase}v21-hero-hq-hero.webp`;

  return (
    <section
      className={`hero dashboardHero ${isModule ? "moduleActive" : ""}`}
    >
      <img
        className="hero-bg"
        src={background}
        alt="Rainbow Six CUBA"
      />

      <div className="hero-mask" />

      <aside className="side-rail">
        <button onClick={() => setActive("statistics")}>
          <BarChart3 />
          Stats
        </button>

        <button onClick={() => setActive("events")}>
          <Radio />
          Eventos
        </button>

        <button onClick={() => setActive("community")}>
          <Users />
          Social
        </button>
      </aside>

      <div className="hero-copy">
        <span className="eyebrow">
          {isModule ? t.moduleLabel : t.badge}
        </span>

        {isModule ? (
          <>
            <div className={`activeIcon ${color}`}>
              <Icon size={34} />
            </div>

            <h1 className="sectionTitle">{moduleContent[0]}</h1>
            <h2>{moduleContent[1]}</h2>
            <p>{moduleContent[2]}</p>
          </>
        ) : (
          <>
            <h1>
              {t.title.map((text, index) => (
                <span
                  key={text}
                  className={index === 2 ? "red" : ""}
                >
                  {text}
                </span>
              ))}
            </h1>

            <h2>{t.subtitle}</h2>
            <p>{t.body}</p>
          </>
        )}

        <div className="ctas">
          <a
            className="btn primary"
            href={SITE_CONFIG.discord}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            {t.join}
          </a>

          <button
            className="btn ghost"
            onClick={() =>
              setActive(isModule ? "home" : "community")
            }
          >
            {isModule ? t.reset : t.explore}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
