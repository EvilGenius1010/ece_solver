import { BlockType } from "./components/Block";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

export default function App(){
  const [blocks,setBlocks] =  useState<{ id: string; type: BlockType; x: number; y: number }[]>([]);
  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { id: uuidv4(), type, x: 50, y: 50 }]);
  };

return(<>
<div className="text-slate-950 bg-white">

 <DndProvider backend={HTML5Backend}>
      <Toolbar onAddBlock={addBlock} />
      <Canvas />
    </DndProvider>
</div>
  </>)
}