import { useState, useEffect, useRef } from "react";

function SearchBox({ onSubmit }) {
  const [search, setSearch] = useState("");
  const [cycle, setNextCycle] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const pillRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && search.trim() !== "") {
      event.preventDefault();
      onSubmit(search);
    }
  };

  const placeholders = [
    "koala bears...",
    "New York...",
    "rubber ducks...",
    "space mining...",
    "programming...",
    "startups...",
  ];

  // Establishes setInterval method that fires every 1500. Cycles through the remainder over the length of the array.
  // When the component unmounts, it stops the function.

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNextCycle((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine) and (hover: hover)").matches
    ) {
      return;
    }
    let timer;
    let lastPos = null;

    const clamp = (dx, dy) => {
      const el = pillRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const restCx = rect.left - offset.x + rect.width / 2;
      const restCy = rect.top - offset.y + rect.height / 2;
      const pad = 24;
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      const minX = pad + halfW - restCx;
      const maxX = window.innerWidth - pad - halfW - restCx;
      const minY = pad + halfH - restCy;
      const maxY = window.innerHeight - pad - halfH - restCy;
      return {
        x: minX > maxX ? (minX + maxX) / 2 : Math.max(minX, Math.min(maxX, dx)),
        y: minY > maxY ? (minY + maxY) / 2 : Math.max(minY, Math.min(maxY, dy)),
      };
    };

    const onMove = (event) => {
      lastPos = { x: event.clientX, y: event.clientY };
      clearTimeout(timer);
      timer = setTimeout(() => {
        const el = pillRef.current;
        if (!el || !lastPos) return;
        const rect = el.getBoundingClientRect();
        const restCx = rect.left - offset.x + rect.width / 2;
        const restCy = rect.top - offset.y + rect.height / 2;
        const next = clamp(lastPos.x - restCx, lastPos.y - restCy);
        if (next) setOffset(next);
      }, 400);
    };

    const onResize = () => {
      const next = clamp(offset.x, offset.y);
      if (next && (next.x !== offset.x || next.y !== offset.y)) setOffset(next);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [offset.x, offset.y]);

  return (
    <div className="searchBox-wrapper">
      <h1 className="searchBox-prompt">think about&hellip;</h1>
      <div
        className="searchBox-pill"
        ref={pillRef}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <svg
          className="searchBox-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.5" y2="16.5" />
        </svg>
        <input
          className="searchBox-input"
          type="search"
          placeholder={placeholders[cycle]}
          onKeyDown={handleKeyDown}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
}

export default SearchBox;
