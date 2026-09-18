export class PitchDetector {
    private static readonly FFT_WINDOW = 2048;
    private static readonly NOISE_THRESHOLD = 0.01;
    private static readonly MIN_FREQUENCY = 20;
    private static readonly MAX_FREQUENCY = 2000;

    private static audioContext?: AudioContext;
    private static analyser?: AnalyserNode;
    private static source?: MediaStreamAudioSourceNode;
    private static buffer?: Float32Array<ArrayBuffer>;

    public static async start() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
            },
        });
        this.audioContext = new AudioContext();
        this.source = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = this.FFT_WINDOW;
        this.buffer = new Float32Array(this.FFT_WINDOW);
        this.source.connect(this.analyser);
    }

    public static getPitch() {
        if (!this.analyser || !this.buffer || !this.audioContext) {
            return 0;
        }

        this.analyser.getFloatTimeDomainData(this.buffer);

        let rms = 0;
        for (let i = 0; i < this.buffer.length; i++) {
            rms += this.buffer[i] * this.buffer[i];
        }
        rms = Math.sqrt(rms / this.buffer.length);

        if (rms < this.NOISE_THRESHOLD) {
            return 0;
        }

        let bestOffset = -1;
        let bestCorrelation = 0;

        const minOffset = Math.floor(this.audioContext.sampleRate / this.MAX_FREQUENCY);
        const maxOffset = Math.ceil(this.audioContext.sampleRate / this.MIN_FREQUENCY);

        for (
            let offset = minOffset;
            offset <= maxOffset && offset < this.buffer.length / 2;
            offset++
        ) {
            let sum = 0;
            let sum1 = 0;
            let sum2 = 0;

            for (let i = 0; i < this.buffer.length / 2; i++) {
                const a = this.buffer[i];
                const b = this.buffer[i + offset];

                sum += a * b;
                sum1 += a * a;
                sum2 += b * b;
            }

            const correlation = sum / Math.sqrt(sum1 * sum2);

            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        if (bestOffset === -1 || bestCorrelation < this.NOISE_THRESHOLD) {
            return 0;
        }

        return this.audioContext.sampleRate / bestOffset;
    }

    public static stop() {
        this.source?.disconnect();
        this.analyser?.disconnect();
        this.audioContext?.close();
    }
}
