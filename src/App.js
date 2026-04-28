import React, { useEffect, useMemo, useState } from "react";

const AMFI_URL =
  "https://api.allorigins.win/raw?url=https://portal.amfiindia.com/spages/NAVAll.txt";

function parseFunds(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(";");
      if (parts.length < 5) {
        return null;
      }

      const schemeName = parts[3]?.trim();
      const navValue = Number.parseFloat(parts[4]);

      if (!schemeName || Number.isNaN(navValue)) {
        return null;
      }

      return {
        schemeName,
        nav: navValue,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.schemeName.localeCompare(b.schemeName));
}

export default function App() {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState("");
  const [units, setUnits] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFunds = async () => {
      try {
        setStatus("loading");
        setError("");

        const response = await fetch(AMFI_URL);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        const parsedFunds = parseFunds(text);

        if (!parsedFunds.length) {
          throw new Error("No valid fund data found in feed");
        }

        setFunds(parsedFunds);
        setStatus("ready");
      } catch (err) {
        setStatus("error");
        setError(
          `Could not fetch AMFI data (${err.message}). Please refresh and try again.`
        );
      }
    };

    loadFunds();
  }, []);

  const selectedFundData = useMemo(
    () => funds.find((fund) => fund.schemeName === selectedFund),
    [funds, selectedFund]
  );

  const nav = selectedFundData?.nav ?? null;
  const numericUnits = Number.parseFloat(units);
  const portfolioValue =
    nav !== null && Number.isFinite(numericUnits)
      ? (nav * numericUnits).toFixed(2)
      : "0.00";

  return (
    <main style={{ maxWidth: 760, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>AMFI Portfolio Tracker</h1>
      <p style={{ color: "#475569" }}>
        Track approximate mutual fund portfolio value from the latest AMFI NAV
        feed.
      </p>

      {status === "loading" && <p>Loading fund list…</p>}
      {status === "error" && (
        <p style={{ color: "#b91c1c", fontWeight: 600 }}>{error}</p>
      )}

      {status === "ready" && (
        <>
          <label htmlFor="fund-select">Select Fund</label>
          <br />
          <select
            id="fund-select"
            value={selectedFund}
            onChange={(event) => setSelectedFund(event.target.value)}
            style={{ width: "100%", maxWidth: 560, marginTop: 8 }}
          >
            <option value="">-- Select --</option>
            {funds.map((fund) => (
              <option key={fund.schemeName} value={fund.schemeName}>
                {fund.schemeName}
              </option>
            ))}
          </select>

          <div style={{ marginTop: 20 }}>
            <label htmlFor="units-input">Units</label>
            <br />
            <input
              id="units-input"
              type="number"
              inputMode="decimal"
              min="0"
              value={units}
              onChange={(event) => setUnits(event.target.value)}
              style={{ width: 220, marginTop: 8 }}
            />
          </div>

          <section style={{ marginTop: 24 }}>
            <h3>NAV: {nav !== null ? nav.toFixed(4) : "-"}</h3>
            <h3>Portfolio Value: ₹ {portfolioValue}</h3>
          </section>
        </>
      )}
    </main>
  );
}
