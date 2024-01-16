import React from "react";

const Button = ({ btn_style, btn_value }) => {
    return (
        <button
            type="submit"
            className={`btn ${btn_style} post-buttoncontainer__button edit btn col-lg-12 `}
        >
            <h5 className="button-text m-0 py-1">{btn_value}</h5>
        </button>
    );
};

export default Button;
