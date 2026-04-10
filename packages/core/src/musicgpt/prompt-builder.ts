import type { TherapyParams } from '../therapy-engine/types';

export function buildMusicPrompt(params: TherapyParams): string {
  const minutes = Math.round(params.duration / 60);
  return [
    `${params.style} music`,
    `in ${params.key}`,
    `starting at ${params.startBPM} BPM`,
    `gradually transitioning to ${params.targetBPM} BPM`,
    `${minutes} minute${minutes > 1 ? 's' : ''} long`,
    'no lyrics',
    'therapeutic and immersive',
    'high quality audio',
  ].join(', ');
}
