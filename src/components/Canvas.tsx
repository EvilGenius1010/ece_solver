import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import Block, { BlockType } from "./Block";
import rough from "roughjs"

const Canvas: React.FC = () => {
  const [blocks, setBlocks] = useState<{ id: string; type: BlockType; x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [_, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item: { id: string; type: BlockType }, monitor) => {
      const delta = monitor.getSourceClientOffset();
      if (!delta || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();

      setBlocks((prev) =>
        prev.map((b) => (b.id === item.id ? { ...b, x: delta.x - rect.left, y: delta.y - rect.top } : b))
      );
    },
  }));

  useEffect(() => {
    blocks.forEach((block) => {
      const canvas = document.getElementById(`canvas-${block.id}`) as HTMLCanvasElement;
      if (!canvas) return;
      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
    //   ctx.clearRect(200, 100, canvas.width, canvas.height);

      if (block.type === "Mass") {
        rc.rectangle(10, 10, 80, 30, { roughness: 1, stroke: "black", fill: "lightblue" });
      } else if (block.type === "Spring") {
        rc.line(10, 25, 90, 25, { roughness: 1, stroke: "black" });
      } else if (block.type === "Damper") {
        rc.rectangle(30, 15, 40, 20, { roughness: 1, stroke: "black", fill: "gray" });
      }
    });
  }, [blocks]);

  const blockRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (blockRef.current) {
    drop(blockRef.current);
  }
}, [drop]);

  return (
    <div ref={blockRef} className="relative w-full h-screen  text-slate-950" >This is the canvas.
      {blocks.map((block) => (
        <Block key={block.id} {...block} />
      ))}
    </div>
  );
};

export default Canvas;
