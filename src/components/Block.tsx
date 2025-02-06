import { useRef,useEffect } from "react";
import { useDrag } from "react-dnd";
import rough from "roughjs";

export type BlockType = "Mass" | "Spring" | "Damper"; //types of blocks allowed.

interface BlockProps {
  id: string;
  type: BlockType;
  x: number;
  y: number;
}

const Block: React.FC<BlockProps> = ({ id, type, x, y }) => { //React.FC is functional component
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blockRef.current) {
      drag(blockRef.current);
    }
  }, [drag]);

  console.log("block added")
  return (
    <div
      ref={drag}
      className=""
      style={{
        left: x|0,
        top: y|0,
        opacity: isDragging ? 0.5 : 1,
      }}
    >sad
      <canvas id={`canvas-${id}`} width="200" height="250" className="bg-indigo-700">fs</canvas>
      <div className="text-center font-semibold">{type}</div>
    </div>
  );
};

export default Block;
