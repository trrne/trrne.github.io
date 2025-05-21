const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const lineWidthControl = document.getElementById("lineWidth");
const brushButton = document.getElementById("brush");
const bucketButton = document.getElementById("bucket");
const eraserButton = document.getElementById("eraser");
const clearCanvasButton = document.getElementById("clearCanvas");
const downloadButton = document.getElementById("dl");

document.addEventListener("DOMContentLoaded", () => {
  canvas.width = 800;
  canvas.height = 600;

  const types = Object.freeze({
    none: "❎️",
    brush: "🎨",
    bucket: "🪣",
    eraser: "🧹",
  });

  let currentMode = types.none;
  let currentColor = colorPicker.value;
  let currentLineWidth = lineWidthControl.value;

  let isPressed = false;

  // おえかき開始
  canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    switch (currentMode) {
      case types.bucket:
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
      case types.brush:
      case types.eraser:
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        break;
    }
  });

  canvas.addEventListener("touchstart", (e) => {
    isPressed = true;
    switch (currentMode) {
      case types.bucket:
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
      case types.brush:
      case types.eraser:
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        break;
    }
  });

  // おえかき中
  canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineWidth = currentLineWidth;
      ctx.lineCap = ctx.lineJoin = "round";
      switch (currentMode) {
        case types.brush:
          ctx.strokeStyle = currentColor;
          ctx.globalCompositeOperation = "source-over";
          break;
        case types.eraser:
          ctx.globalCompositeOperation = "destination-out";
          break;
      }
      ctx.stroke();
    }
  });

  canvas.addEventListener("touchmove", (e) => {
    if (isPressed) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineWidth = currentLineWidth;
      ctx.lineCap = ctx.lineJoin = "round";
      switch (currentMode) {
        case types.brush:
          ctx.strokeStyle = currentColor;
          ctx.globalCompositeOperation = "source-over";
          break;
        case types.eraser:
          ctx.globalCompositeOperation = "destination-out";
          break;
      }
      ctx.stroke();
    }
  });

  // おえかき終了
  canvas.addEventListener("mouseup", () => {
    isPressed = false;
    ctx.closePath();
  });

  canvas.addEventListener("touchend", () => {
    isPressed = false;
    ctx.closePath();
  });

  // キャンバス外にでたとき
  canvas.addEventListener("mouseout", () => {
    isPressed = false;
    ctx.closePath();
  });

  canvas.addEventListener("touchout", () => {
    isPressed = false;
    ctx.closePath();
  });

  // 色の変更
  colorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
  });

  // 線の太さの変更
  lineWidthControl.addEventListener("change", (e) => {
    currentLineWidth = e.target.value;
  });

  // フデ機能
  brushButton.addEventListener("click", () => {
    currentColor = colorPicker.value;
    currentLineWidth = lineWidthControl.value;
    currentMode = types.brush;
  });

  // バケツ機能
  bucketButton.addEventListener("click", () => {
    currentMode = types.bucket;
  });

  // 消しゴム機能
  eraserButton.addEventListener("click", () => {
    currentMode = types.eraser;
  });

  // 全消去機能
  clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // ダウンロード機能
  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
