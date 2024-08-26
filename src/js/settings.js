export const settings = {
  antialiasing: true,
  faceOverlap: false,
  faceOverlapPx: 0,
  ao: { // Fake Ambient Occlusion
    enabled: true,
    size: .6, // Size or "spread" of the
    intensity: .3, // Darkness or intensity of the fake AO. Multiplied on some elements like tiles.
  },
};
