import { SCREAMER_SOUND } from './media.ts';

/**
 * Проигрывает звук скримера. Вызывать прямо из обработчика клика:
 * браузеры разрешают звук только в ответ на действие пользователя.
 */
export function playScream() {
    if (SCREAMER_SOUND) {
        const audio = new Audio(SCREAMER_SOUND);
        audio.volume = 1;
        audio.play().catch(synthScream);
        return;
    }
    synthScream();
}

/** Заглушка, пока нет настоящего звука: шум и визг пилообразных волн с перегрузом. */
function synthScream() {
    const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const duration = 1.6;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.9, now);
    master.gain.exponentialRampToValueAtTime(0.01, now + duration);

    const distortion = ctx.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i++) {
        const x = (i / curve.length) * 2 - 1;
        curve[i] = Math.tanh(x * 8);
    }
    distortion.curve = curve;
    distortion.connect(master).connect(ctx.destination);

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.35;
    noise.connect(noiseGain).connect(distortion);
    noise.start(now);
    noise.stop(now + duration);

    for (const frequency of [440, 466, 932]) {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.linearRampToValueAtTime(frequency * 1.7, now + duration * 0.4);
        osc.frequency.linearRampToValueAtTime(frequency * 1.2, now + duration);
        const gain = ctx.createGain();
        gain.gain.value = 0.25;
        osc.connect(gain).connect(distortion);
        osc.start(now);
        osc.stop(now + duration);
    }

    setTimeout(() => void ctx.close(), (duration + 0.2) * 1000);
}
