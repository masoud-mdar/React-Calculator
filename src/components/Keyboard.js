import React from "react"

const Keyboard = (props) => {

    return (
        <div id="buttons">
            <div className="button" id="clear" onClick={props.handleClick}>C</div>
            <div className="button" id="decimal" onClick={props.handleClick}>.</div>
            <div className="button" id="divide" onClick={props.handleClick}>/</div>
            <div className="button" id="multiply" onClick={props.handleClick}>*</div>
            <div className="button" id="subtract" onClick={props.handleClick}>-</div>
            <div className="button" id="add" onClick={props.handleClick}>+</div>
            <div className="button" id="nine" onClick={props.handleClick}>9</div>
            <div className="button" id="eight" onClick={props.handleClick}>8</div>
            <div className="button" id="seven" onClick={props.handleClick}>7</div>
            <div className="button" id="six" onClick={props.handleClick}>6</div>
            <div className="button" id="five" onClick={props.handleClick}>5</div>
            <div className="button" id="four" onClick={props.handleClick}>4</div>
            <div className="button" id="three" onClick={props.handleClick}>3</div>
            <div className="button" id="two" onClick={props.handleClick}>2</div>
            <div className="button" id="one" onClick={props.handleClick}>1</div>
            <div className="button" id="zero" onClick={props.handleClick}>0</div>
            <div className="button" id="equals" onClick={props.handleClick} >=</div>
        </div>
    )
}

export default Keyboard