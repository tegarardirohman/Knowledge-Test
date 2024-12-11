import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger"; // Optional prop to set the button style
  disabled?: boolean; // Optional to disable the button
  type?: "button" | "submit" | "reset"; // Specify button type (default is "button")
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary", // Default to "primary" if no variant is provided
  disabled = false,
  type = "button", // Default to "button"
}) => {
  // Apply styles based on variant prop
  const baseStyle =
    "px-4 py-2 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
