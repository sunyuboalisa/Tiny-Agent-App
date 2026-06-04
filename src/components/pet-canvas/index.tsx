import React, { useState, useEffect, useRef } from "react";
import * as tauriWindow from "@tauri-apps/api/window";

import { ANIMATION_MAP, PetAction } from "./types";
// import spriteImg from "../../assets/pets/mallow/spritesheet.webp";
// import spriteImg from "../../assets/pets/bubu/spritesheet.webp";
// import spriteImg from "../../assets/pets/kitty/spritesheet.webp";
// import spriteImg from "../../assets/pets/chen-pingan/spritesheet.webp";
// import spriteImg from "../../assets/pets/gojo/spritesheet.webp";
import spriteImg from "../../assets/pets/sasuke/spritesheet.webp";
const FRAME_WIDTH = 192;
const FRAME_HEIGHT = 208;

export default function PetCanvas() {
  const [action, setAction] = useState<PetAction>("idle");
  const [currentFrame, setCurrentFrame] = useState(0);
  const timerRef = useRef<number | null>(null);

  const config = ANIMATION_MAP[action];

  // 1. 动画帧定时器
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % config.frameCount);
    }, 1000 / config.fps);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [action, config]);

  // 2. 窗口拖拽
  const handleMouseDown = async (e: React.MouseEvent) => {
    if (e.button === 0) {
      const win = tauriWindow.getCurrentWindow
        ? tauriWindow.getCurrentWindow()
        : (tauriWindow as any).appWindow;
      if (win && win.startDragging) {
        await win.startDragging();
      }
    }
  };

  // 3. 随机换动作（先让他每4秒随机切个动作）
  useEffect(() => {
    const randomTimer = setInterval(() => {
      const actions: PetAction[] = ["idle", "walk", "run", "wave", "sad"];
      const nextAction = actions[Math.floor(Math.random() * actions.length)];
      setAction(nextAction);
      setCurrentFrame(0);
    }, 4000);
    return () => clearInterval(randomTimer);
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: `${FRAME_WIDTH}px`,
        height: `${FRAME_HEIGHT}px`,
        backgroundImage: `url(${spriteImg})`,
        backgroundPosition: `-${currentFrame * FRAME_WIDTH}px -${
          config.row * FRAME_HEIGHT
        }px`,
        backgroundRepeat: "no-repeat",
        cursor: "grab",
        userSelect: "none",

        filter: "screen",
      }}
    />
  );
}
