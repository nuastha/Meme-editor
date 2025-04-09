import { useCanvas } from "../context/CanvasContext";

const Canvas = () => {
  const { canvasRef, updateText, texts, setActiveTextId, activeTextId } =
    useCanvas();

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = getMousePos(e);
    const ctx = canvasRef.current.getContext("2d");

    for (const textObj of texts) {
      const textWidth = ctx.measureText(textObj.text).width;
      const textHeight = 40;

      const isInside =
        offsetX > textObj.x - textWidth / 2 &&
        offsetX < textObj.x + textWidth / 2 &&
        offsetY > textObj.y - textHeight / 2 &&
        offsetY < textObj.y + textHeight / 2;

      if (isInside) {
        setActiveTextId(textObj.id);
        updateText(textObj.id, { isDragging: true });
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (activeTextId === null) return;

    const { offsetX, offsetY } = getMousePos(e);
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const activeText = texts.find((text) => text.id === activeTextId);
    if (!activeText?.isDragging) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.font = `${activeText.size}px Arial`;

    const textWidth = ctx.measureText(activeText.text).width;
    const textHeight = activeText.size;

    const canvas = canvasRef.current;
    const newX = clamp(offsetX, textWidth / 2, canvas.width - textWidth / 2);
    const newY = clamp(offsetY, textHeight, canvas.height - 20); // <-- Fix is here

    updateText(activeTextId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (activeTextId !== null) {
      updateText(activeTextId, { isDragging: false });
      setActiveTextId(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={500}
      className="border-2 border-gray-300 bg-white rounded-lg shadow-md"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default Canvas;
