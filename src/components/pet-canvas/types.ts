export type PetAction = "idle" | "walk" | "run" | "wave" | "jump" | "sad";

export interface AnimationConfig {
  row: number;
  frameCount: number;
  fps: number;
}

export const ANIMATION_MAP: Record<PetAction, AnimationConfig> = {
  idle: { row: 0, frameCount: 6, fps: 6 }, // 第一行 6 帧
  run: { row: 1, frameCount: 8, fps: 12 }, // 第二行 8 帧
  walk: { row: 2, frameCount: 8, fps: 8 }, // 第三行 8 帧
  wave: { row: 3, frameCount: 4, fps: 6 }, // 第四行 4 帧
  jump: { row: 4, frameCount: 5, fps: 10 }, // 第五行 5 帧
  sad: { row: 5, frameCount: 8, fps: 6 }, // 第六行 8 帧
};
