import React, { useEffect, useState } from "react";
import { getToken } from "../auth/cgpAuth";

export default function AccountPanel() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Loading CGP profile...");

  useEffect(() => {
    async function load() {
      const token = getToken();

      if (!token) {
        setStatus("Not connected to CGP.");
        return;
      }

      try {
        const res = await fetch(
          "https://api.rainbowsixcuba.com/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error("Stats API unavailable");
        }

        const json = await res.json();

        setData(json.profile);
        setStatus(null);

      } catch (e) {
        setStatus(e.message);
      }
    }

    load();
  }, []);

  if (status) {
    return (
      <section className="scoreboardShell">
        <h2>CGP Account</h2>
        <p>{status}</p>
      </section>
    );
  }

  return (
    <section className="scoreboardShell">
      <h2>CGP Account</h2>

      <h3>{data.ubisoftName}</h3>

      <p>
        Discord:
        {" "}
        {data.providers?.discord?.username}
      </p>

      <p>
        Rank:
        {" "}
        {data.rank?.currentRank}
      </p>

      <p>
        RP:
        {" "}
        {data.rank?.currentRp}
      </p>

      <p>
        KD:
        {" "}
        {data.rank?.seasonKd}
      </p>

      <p>
        WR:
        {" "}
        {data.rank?.seasonWinRate}%
      </p>
    </section>
  );
}
