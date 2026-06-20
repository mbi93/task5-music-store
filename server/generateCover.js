function generateCover(title, artist, rng) {
  const palettes = [
    ["#ff6b6b", "#ee5253"],
    ["#48dbfb", "#0abde3"],
    ["#1dd1a1", "#10ac84"],
    ["#feca57", "#ff9f43"],
    ["#5f27cd", "#341f97"],
    ["#ff9ff3", "#f368e0"],
    ["#54a0ff", "#2e86de"],
  ];

  const [c1, c2] =
    palettes[Math.floor(rng() * palettes.length)];

  const circles = Array.from({ length: 8 })
    .map(() => {
      const x = Math.floor(rng() * 300);
      const y = Math.floor(rng() * 300);
      const r = 15 + Math.floor(rng() * 90);

      return `
        <circle
          cx="${x}"
          cy="${y}"
          r="${r}"
          fill="white"
          opacity="0.08"
        />
      `;
    })
    .join("");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg"
       width="300"
       height="300">

    <defs>
      <linearGradient
        id="bg"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </linearGradient>
    </defs>

    <rect
      width="300"
      height="300"
      fill="url(#bg)"
    />

    ${circles}

    <text
      x="20"
      y="220"
      fill="white"
      font-size="22"
      font-family="Arial"
      font-weight="bold">
      ${title}
    </text>

    <text
      x="20"
      y="255"
      fill="white"
      font-size="16"
      font-family="Arial">
      ${artist}
    </text>

  </svg>
  `;

  return (
    "data:image/svg+xml;base64," +
    Buffer.from(svg).toString("base64")
  );
}

module.exports = {
  generateCover,
};