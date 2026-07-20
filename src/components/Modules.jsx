import React from "react";
import { ChevronRight } from "lucide-react";

function ModuleCard({
  definition,
  t,
  active,
  setActive,
  imageBase
}) {
  const [id, Icon, color, cardImage] = definition;
  const [title, text] = t.modules[id];

  return (
    <button
      className={`module ${color} ${active === id ? "selected" : ""}`}
      onClick={() => setActive(id)}
    >
      <img
        src={`${imageBase}${cardImage}`}
        alt={title}
        loading="lazy"
      />

      <div className="modShade" />

      <div className="modText">
        <Icon className="modIcon" size={28} />
        <h3>{title}</h3>
        <p>{text}</p>

        <span>
          {t.openModule}
          <ChevronRight size={15} />
        </span>
      </div>
    </button>
  );
}

export default function Modules({
  t,
  active,
  setActive,
  modules,
  imageBase
}) {
  return (
    <section className="modules">
      {modules.map((definition) => (
        <ModuleCard
          key={definition[0]}
          definition={definition}
          t={t}
          active={active}
          setActive={setActive}
          imageBase={imageBase}
        />
      ))}
    </section>
  );
}
