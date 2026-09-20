export const noteMatcherConfig = {
    defaultNote: "C4",
    minPitch: 0,
    maxPitch: 2000,
    pitchTolerance: 0.08,
    pitchDetectionIntervalMs: 20, 
    requiredPitchStability: 25,
} as const;
