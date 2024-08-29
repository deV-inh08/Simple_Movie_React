import React from "react";

const Button = ({ onClick, className, children, type = "button", bgColor="primary", full}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary"
            break;
        case "secondary":
            bgClassName = "bg-secondary"
            break;
        default:
            break;
    }
    return(
        <button
            onClick={onClick}
            className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${full ? "w-full": "w-auto"} mt-auto ${className}`}>
            Watch now
        </button>
    )
};
export default Button;