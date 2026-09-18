import { Frequency, MonoSynth } from "tone";

import { UtilityManger } from "../../../shared/managers/utility-manager";

export const MUSIC_NOTES = ["A", "B", "C", "D", "E", "F", "G"] as const;

export const MUSIC_OCTAVES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export type MusicNote = `${(typeof MUSIC_NOTES)[number]}${(typeof MUSIC_OCTAVES)[number]}`;

export class SoundManager {
    private static synth?: MonoSynth;

    private static getSynth() {
        if (!this.synth) {
            this.synth = new MonoSynth().toDestination();
        }
        return this.synth;
    }

    public static getRandomNote(minOctave = 3, maxOctave = 5) {
        const note = UtilityManger.getRandomArrayElement([...MUSIC_NOTES]);
        const octave = Math.max(
            minOctave,
            Math.min(maxOctave, UtilityManger.getRandomArrayElement([...MUSIC_OCTAVES])),
        );
        return `${note}${octave}` as MusicNote;
    }

    public static playNote(note: MusicNote, duration = "8n") {
        this.getSynth().triggerAttackRelease(note, duration);
    }

    public static getNoteFrequency(note: MusicNote) {
        return Frequency(note).toFrequency();
    }
}
