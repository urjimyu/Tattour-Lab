import React from "react";

interface ColorPickerProps {
	onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const color = event.target.value;
		onChange(color);
	};

	return <input type="color" defaultValue="#000000" onChange={handleChange} />;
};

export default ColorPicker;
