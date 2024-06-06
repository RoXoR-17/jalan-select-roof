import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import CanvasView from "./CanvasView";
import ImageView from "./ImageView";
import ExportButton from "./ExportButton";

function CanvasContainer() {
  const canvasContainerRef = useRef<HTMLDivElement>(null!);
  const [exporting, setExporting] = useState(false);

  const exportHandler = () => {
    if (!canvasContainerRef.current || exporting) return;

    setExporting(true);
    html2canvas(canvasContainerRef.current, {
      backgroundColor: "rgba(0,0,0,0)",
      logging: false,
    })
      .then(async function (canvas) {
        const img = canvas.toDataURL("image/png");
        const blob = await (await fetch(img)).blob();
        const fileName = "image.png";
        const file = new File([blob], fileName, { type: blob.type });
        const link = document.createElement("a");
        const url = URL.createObjectURL(file);
        link.setAttribute("download", fileName);
        link.setAttribute("href", url);
        link.click();
        window.open(url);
        setExporting(false);
      })
      .catch((err) => {
        console.log(err);
        setExporting(false);
      });
  };

  return (
    <div ref={canvasContainerRef} className="canvas-container">
      <CanvasView />
      <ImageView />
      <ExportButton exporting={exporting} exportHandler={exportHandler} />
    </div>
  );
}

export default CanvasContainer;
