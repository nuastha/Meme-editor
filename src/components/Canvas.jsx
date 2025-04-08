import { useEffect } from "react";
import { useCanvas } from "../context/CanvasContext";

const Canvas = () => {
  const {
    canvasRef,
    updateText,
    texts,
    drawCanvas,
    setActiveTextId,
    activeTextId,
  } = useCanvas();

  useEffect(() => {
    drawCanvas();
  }, [texts]);

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
      ctx.font = "30px Arial";
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
    updateText(activeTextId, { x: offsetX, y: offsetY });
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
