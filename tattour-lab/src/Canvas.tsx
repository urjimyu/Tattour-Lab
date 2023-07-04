import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasRef.current!, {
			isDrawingMode: true, // 그리기 모드 설정
		});

		// 그리기 설정
		canvas.freeDrawingBrush.color = "black";
		canvas.freeDrawingBrush.width = 5;

		// 그리기 모드에서 스크롤 방지
		canvas.on("mouse:wheel", (event: fabric.IEvent) => {
			const delta = (event as any).e.deltaY;
			const zoom = canvas.getZoom();
			if (delta > 0) {
				canvas.setZoom(zoom * 1.1);
			} else {
				canvas.setZoom(zoom * 0.9);
			}
			event.e.preventDefault();
			event.e.stopPropagation();
		});

		fabricCanvasRef.current = canvas;

		//캔버스 지우기
		return () => {
			canvas.dispose();
		};
	}, []);

	//색상 변경
	const handleColorChange = (color: string) => {
		if (fabricCanvasRef.current) {
			fabricCanvasRef.current.freeDrawingBrush.color = color;
		}
	};

	return (
		<div>
			<canvas ref={canvasRef} />
			<ColorPicker onChange={handleColorChange} />
		</div>
	);
};

export default Canvas;
