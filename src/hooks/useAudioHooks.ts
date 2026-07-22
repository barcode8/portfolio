import { useCallback, useEffect, useRef } from 'react';
import { useDossier } from '../contexts/DossierContext';

export function useAudioHooks() {
  const { isMuted } = useDossier();
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize lazily to avoid auto-play restrictions
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    document.addEventListener('click', initAudio, { once: true });
    return () => { document.removeEventListener('click', initAudio); };
  }, []);

  const playHover = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(3000, ctx.currentTime);
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4000, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.025);
    
    osc.onended = () => {
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }, []);

  const playDeploy = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    // Low-frequency structural thud
    const oscThud = ctx.createOscillator();
    const gainThud = ctx.createGain();
    oscThud.type = 'sine';
    oscThud.frequency.setValueAtTime(100, ctx.currentTime);
    oscThud.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.05);
    
    gainThud.gain.setValueAtTime(0, ctx.currentTime);
    gainThud.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gainThud.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);
    
    // High-frequency transient click
    const oscClick = ctx.createOscillator();
    const filterClick = ctx.createBiquadFilter();
    const gainClick = ctx.createGain();
    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(6000, ctx.currentTime);
    
    filterClick.type = 'highpass';
    filterClick.frequency.setValueAtTime(5000, ctx.currentTime);
    
    gainClick.gain.setValueAtTime(0, ctx.currentTime);
    gainClick.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.002);
    gainClick.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
    
    oscClick.connect(filterClick);
    filterClick.connect(gainClick);
    gainClick.connect(ctx.destination);
    
    oscThud.start();
    oscClick.start();
    oscThud.stop(ctx.currentTime + 0.06);
    oscClick.stop(ctx.currentTime + 0.02);
    
    oscThud.onended = () => {
      oscThud.disconnect();
      gainThud.disconnect();
    };
    
    oscClick.onended = () => {
      oscClick.disconnect();
      filterClick.disconnect();
      gainClick.disconnect();
    };
  }, []);

  const playScramble = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const duration = 0.1;
    const bufferSize = ctx.sampleRate * duration; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    
    // Rapid-fire amplitude modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 50; // 50 Hz modulation
    
    const amGain = ctx.createGain();
    amGain.gain.value = 0;
    
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    mainGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
    mainGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    
    lfo.connect(amGain.gain);
    noiseSource.connect(filter);
    filter.connect(amGain);
    amGain.connect(mainGain);
    mainGain.connect(ctx.destination);
    
    noiseSource.start();
    lfo.start();
    lfo.stop(ctx.currentTime + duration);
    
    noiseSource.onended = () => {
      noiseSource.disconnect();
      filter.disconnect();
      lfo.disconnect();
      amGain.disconnect();
      mainGain.disconnect();
    };
  }, []);

  return { playHover, playDeploy, playScramble };
}
