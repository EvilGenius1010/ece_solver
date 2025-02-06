import { v4 as uuidv4 } from "uuid";
import { BlockType } from "./Block";

interface ToolbarProps {
  onAddBlock: (type: BlockType) => void;
}



const Toolbar: React.FC<ToolbarProps> = ({ onAddBlock }) => {
  return (
    <div className="flex gap-4 p-4 text-white">
      {(["Mass", "Spring", "Damper"] as BlockType[]).map((type) => (
        <button
          key={type}
          onClick={() => onAddBlock(type)}
          
        >
          Add {type}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
