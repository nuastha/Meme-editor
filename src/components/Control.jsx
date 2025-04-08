import { useCanvas } from "../context/CanvasContext";
import Button from "./buttons/Button";

export const SettingsPanel = () => {
  const { texts, updateText, addNewText, canvasRef, setImageFromFile } =
    useCanvas();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageFromFile(file);
  };

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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            className="p-8 border border-gray-300 bg-gray-200 rounded "
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <h2 className="text-lg font-semibold mb-4">Text Settings</h2>
        <div>
          {texts.map((t) => (
            <div key={t.id} className="flex gap-2 items-center">
              <span className="text-sm font-medium">{t.id}</span>
              <div>
                <input
                  type="text"
                  value={t.text}
                  onChange={(e) => updateText(t.id, { text: e.target.value })}
                  className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text"
                />
              </div>
              <div>
                <label htmlFor="fontSize">font size</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={t.fontSize}
                  onChange={(e) =>
                    updateText(t.id, { fontSize: parseInt(e.target.value) })
                  }
                />
                <span>{t.fontSize}px</span>
              </div>
              <div>
                <label htmlFor="color">text color</label>
                <input
                  type="color"
                  value={t.color}
                  onChange={(e) => updateText(t.id, { color: e.target.value })}
                />
              </div>

              <input
                type="range"
                min="0"
                max="360"
                value={t.rotation}
                onChange={(e) =>
                  updateText(t.id, { rotation: parseInt(e.target.value) })
                }
              />
              <span>{t.rotation}°</span>
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
