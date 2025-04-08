import { createContext, useContext, useRef, useState, useEffect } from "react";

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([
    {
      id: 1,
      text: "Your Text Here",
      x: 300,
      y: 50,
      rotation: 0,
      isDragging: false,
    },
  ]);
  const [activeTextId, setActiveTextId] = useState(null);

  useEffect(() => {
    drawCanvas();
  }, [image, texts]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) drawImage(ctx, canvas);
    else {
      ctx.fillStyle = "#a0aec6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    texts.forEach((textObj) => drawText(ctx, textObj));
  };

  const drawImage = (ctx, canvas) => {
    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = image.width / image.height;

    let width, height;
    if (imageRatio > canvasRatio) {
      width = canvas.width;
      height = width / imageRatio;
    } else {
      height = canvas.height;
      width = height * imageRatio;
    }

    ctx.drawImage(
      image,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height
    );
  };

  const drawText = (ctx, { text, x, y, rotation }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    ctx.font = "30px Arial";
    const textWidth = ctx.measureText(text).width + 20;
    const textHeight = 40;

    const gradient = ctx.createLinearGradient(
      12,
      textHeight / 2,
      textHeight / 2,
      12
    );
    gradient.addColorStop(0.1, "cyan");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(0.8, "green");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.strokeRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text, 0, 10);
    ctx.restore();
  };

  const updateText = (id, newProps) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newProps } : t))
    );
  };

  const addNewText = () => {
    const newId = texts.length + 1;
    setTexts((prev) => [
      ...prev,
      {
        id: newId,
        text: "New Text",
        x: 100,
        y: 100,
        rotation: 0,
        isDragging: false,
      },
    ]);
  };

  const setImageFromFile = (file) => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => setImage(img);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        image,
        texts,
        updateText,
        addNewText,
        setImageFromFile,
        setTexts,
        drawCanvas,
        activeTextId,
        setActiveTextId,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
