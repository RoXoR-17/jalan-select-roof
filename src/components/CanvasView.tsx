import { MouseEvent, useEffect, useRef, useState } from "react";

function CanvasView() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    canvasEl.width = canvasEl.clientWidth;
    canvasEl.height = canvasEl.clientHeight;

    canvasContextRef.current = canvasEl.getContext("2d");
  }, []);

  const onDrawStart = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContextRef.current) return;

    setIsDrawing(true);
    canvasContextRef.current.beginPath();
    canvasContextRef.current.lineWidth = 5;
    canvasContextRef.current.lineCap = "round";
    canvasContextRef.current.strokeStyle = "#ACD3ED";
    canvasContextRef.current.moveTo(event.clientX, event.clientY);
  };

  const onDrawContinue = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContextRef.current) return;

    canvasContextRef.current.lineTo(event.clientX, event.clientY);
    canvasContextRef.current.stroke();
  };

  return (
    <div className="canvas-view">
      <canvas
        ref={canvasRef}
        onMouseDown={onDrawStart}
        onMouseMove={onDrawContinue}
        onMouseUp={() => setIsDrawing(false)}
      ></canvas>
    </div>
  );
}

export default CanvasView;
