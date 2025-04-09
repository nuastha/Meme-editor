import { useCanvas } from "../context/CanvasContext";
import Button from "./buttons/Button";

export const SettingsPanel = () => {
  const {
    texts,
    updateText,
    addNewText,
    canvasRef,
    setImageFromFile,
    removeText,
  } = useCanvas();

/**
 * Handles image upload from input field.
 * When an image is selected from the input field, this function is called.
 * It takes the selected image file and passes it to the setImageFromFile function to set the image on the canvas.
 * @param {Event} e The event from the input field, which contains the image file in the target.files array.
 */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageFromFile(file);
  };

/**
 * Saves the current canvas image as a PNG file.
 * Creates a link with the download attribute set to "edited-image.png"
 * and clicks it to download the image.
 */
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const imageURI = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURI;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
      <div className="w-full space-y-3">
        <div className="flex gap-2 mb-4 flex-row-reverse items-baseline justify-end">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            className="p-4 border border-gray-300 bg-gray-200 rounded "
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <h2 className="text-lg font-semibold mb-4">Text Settings</h2>
        <div>
          {texts.map((t) => (
            <div key={t.id} className="flex gap-2 items-start flex-col">
              <div className="flex items-baseline gap-2 bg-gray-100 p-2 rounded-lg shadow-sm mb-4">
                <span className="text-sm font-medium bg-amber-300 px-[10px] py-1 rounded-full">
                  {t.id}
                </span>
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="text"
                        className="text-teal-500 capitalize"
                      >
                        text input
                      </label>
                      <input
                        type="text"
                        value={t.text}
                        onChange={(e) =>
                          updateText(t.id, { text: e.target.value })
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter text"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="fontSize"
                        className="text-teal-500 capitalize"
                      >
                        font size
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={t.size}
                        id="size"
                        onChange={(e) =>
                          updateText(t.id, { size: parseInt(e.target.value) })
                        }
                      />
                      <span>{t.size}px</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between w-full">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="color"
                        className="text-teal-500 capitalize"
                      >
                        text color
                      </label>
                      <input
                        type="color"
                        value={t.color}
                        className="w-10 h-8 border border-gray-300 rounded"
                        id="color"
                        onChange={(e) =>
                          updateText(t.id, { color: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="rotation"
                        className="text-teal-500 capitalize"
                      >
                        rotation
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={t.rotation}
                        onChange={(e) =>
                          updateText(t.id, {
                            rotation: parseInt(e.target.value),
                          })
                        }
                      />
                      <span>{t.rotation}°</span>
                    </div>
                    <div>
                      <button
                        onClick={() => removeText(t.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-4 justify-end">
        <Button
          onClick={addNewText}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Text
        </Button>
        <Button
          onClick={handleSaveImage}
          className="ml-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Save Image
        </Button>
      </div>
    </div>
  );
};
