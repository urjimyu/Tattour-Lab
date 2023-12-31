import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import styled from "styled-components";

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
	// const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

	// const initCanvas = () =>
	// 	new fabric.Canvas(canvasRef.current, {
	// 		isDrawingMode: true,
	// 		width: 335,
	// 		height: 458,
	// 	});

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasRef.current, {
			isDrawingMode: true,
			width: 335,
			height: 458,
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

	// useEffect(() => {}, [canvas]);

	//색상 변경
	const handleColorChange = (color: string) => {
		if (fabricCanvasRef.current) {
			fabricCanvasRef.current.freeDrawingBrush.color = color;
		}
	};

	const handleDelete = () => {
		fabricCanvasRef.current?.clear();
	};

	return (
		<div>
			<St.Canvas className="canvas">
				<canvas ref={canvasRef} />
			</St.Canvas>
			<ColorPicker onChange={handleColorChange} />
			<St.Button type="button" value="삭제" onClick={handleDelete}>
				전체 삭제
			</St.Button>
		</div>
	);
};

export default Canvas;

const St = {
	Button: styled.button`
		color: white;
		font-size: 1rem;
		background-color: hotpink;
	`,
	Canvas: styled.div`
		width: 335px;
		height: 458px;
		background-color: lightgray;
	`,
};
