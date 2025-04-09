import { createContext, useContext, useRef, useState, useEffect } from "react";

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

/**
 * The CanvasProvider component provides a context for the canvas, 
 * including the canvas element itself, the image, text elements, and 
 * functions to update the text and set a new image.
 * 
 * The context is automatically updated when the image or text elements change.
 * The canvas is redrawn whenever the image or texts change.
 * 
 * The provider also provides functions to update the text and set a new image.
 * The canvas is automatically redrawn after calling any of these functions.
 * 
 * The context is passed to all children of the provider.
 * This allows components to access the canvas and its properties.
 */
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
      color: "#000000",
      size: 16,
    },
  ]);
  const [activeTextId, setActiveTextId] = useState(null);

  useEffect(() => {
    drawCanvas();
  }, [image, texts]);

  /**
   * Draws the canvas.
   * Clears the canvas, draws the image if set, or a default background color,
   * and draws the text elements.
   * This function is automatically called when the image or text elements change.
   */
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

  /**
   * Draws the image on the canvas, scaling it to fit the canvas.
   * The image is centered horizontally and vertically.
   * If the image is wider than the canvas, the image is scaled down
   * to fit the canvas width. If the image is taller than the canvas,
   * the image is scaled down to fit the canvas height.
   * @param {CanvasRenderingContext2D} ctx The canvas 2D context.
   * @param {HTMLCanvasElement} canvas The canvas element.
   */
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

  /**
   * Draws a text element on the canvas.
   * The text is drawn in Arial font and the given size and color.
   * The text is centered horizontally and vertically at the given x and y coordinates.
   * The text is rotated by the given rotation angle.
   * @param {CanvasRenderingContext2D} ctx The canvas 2D context.
   * @param {{ text: string, x: number, y: number, rotation: number, size: number, color: string }} textObj The text element to draw.
   */
  const drawText = (ctx, { text, x, y, rotation, size, color }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    ctx.font = `${size}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, 0, 10);
    ctx.restore();
  };

  /**
   * Updates the text element with the given id with the given new properties.
   * @param {number} id The id of the text element to update.
   * @param {{ text?: string, x?: number, y?: number, rotation?: number, size?: number, color?: string }} newProps The new properties to update the text element with.
   */
  const updateText = (id, newProps) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newProps } : t))
    );
  };

  /**
   * Removes the text element with the given id from the state.
   * This is used to delete a text element from the canvas.
   * @param {number} id The id of the text element to remove.
   */
  const removeText = (id) => {
    setTexts((prevTexts) => {
      const updated = prevTexts.filter((text) => text.id !== id);
      return updated;
    });
  };

  /**
   * Adds a new text element to the state.
   * The new text element is created with default properties and is added to the end of the state array.
   * The new text element is given a new id which is one more than the length of the current state array.
   */
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
        size: 16,
        color: "#000000",
      },
    ]);
  };

  /**
   * Sets the image on the canvas to the given file.
   * If the file is null or undefined, this does nothing.
   * The image is loaded from the file and when it is loaded, it is set as the image on the canvas.
   * If the image fails to load, an error is logged to the console.
   * @param {File} file The file to load the image from.
   */
  const setImageFromFile = (file) => {
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    /**
     * Handles the successful load of the image.
     * Sets the state to the new image and cleans up the object URL.
     */
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(objectUrl); // Clean up the URL after the image is loaded
    };

    /**
     * Handles the error case when the image fails to load.
     * Logs an error to the console and cleans up the object URL.
     */
    img.onerror = () => {
      console.error("Failed to load image");
      URL.revokeObjectURL(objectUrl); // Clean up if loading fails
    };
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
        removeText,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
