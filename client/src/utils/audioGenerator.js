import seedrandom from "seedrandom";

let activeNodes = [];

export function stopPreview() {
  activeNodes.forEach((node) => {
    try {
      node.stop();
    } catch {}
  });

  activeNodes = [];
}

export function playPreview(seed) {
  stopPreview();

  const rng = seedrandom(seed);

  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  const ctx = new AudioContext();

  const tempo =
    80 + Math.floor(rng() * 80);

  const beat = 60 / tempo;

  const scales = [
    [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88], // C
    [293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 554.37], // D
    [329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 622.25], // E
  ];

  const scale =
    scales[Math.floor(rng() * scales.length)];

  const waveTypes = [
    "sine",
    "triangle",
    "square",
  ];

  const leadWave =
    waveTypes[
      Math.floor(rng() * waveTypes.length)
    ];

  const bassWave =
    waveTypes[
      Math.floor(rng() * waveTypes.length)
    ];

  const duration = 6;

  let time = ctx.currentTime;

  // БАС
  for (
    let step = 0;
    step < duration * 2;
    step++
  ) {
    const bass = ctx.createOscillator();
    const gain = ctx.createGain();

    bass.type = bassWave;

    const root =
      scale[
        Math.floor(rng() * 3)
      ];

    bass.frequency.value =
      root / 2;

    gain.gain.setValueAtTime(
      0.08,
      time
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + beat
    );

    bass.connect(gain);
    gain.connect(ctx.destination);

    bass.start(time);
    bass.stop(time + beat);

    activeNodes.push(bass);

    time += beat;
  }

  time = ctx.currentTime;

  // МЕЛОДИЯ
  for (
    let step = 0;
    step < duration * 4;
    step++
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = leadWave;

    const note =
      scale[
        Math.floor(
          rng() * scale.length
        )
      ];

    const octave =
      rng() > 0.5 ? 1 : 2;

    osc.frequency.value =
      note * octave;

    gain.gain.setValueAtTime(
      0.05,
      time
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + beat * 0.7
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + beat * 0.7);

    activeNodes.push(osc);

    time += beat / 2;
  }
}