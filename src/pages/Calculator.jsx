import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState("0");

    const formatNumber = (numStr) => {
        if (numStr === "" || numStr === "-" || numStr === "Error") return numStr;
        const parts = numStr.split(/([+\-*/])/);
        return parts
            .map((p) => {
                if (/^[\d.]+$/.test(p)) {
                    const num = parseFloat(p);
                    return isNaN(num)
                        ? p
                        : new Intl.NumberFormat("en-US").format(num);
                }
                return p;
            })
            .join("");
    };

    const cleanNumber = (numStr) => numStr.replaceAll(",", "");

    const numberClick = (num) => {
        setCurrentInput((prev) => {
            const clean = cleanNumber(prev);
            return clean === "0" ? num.toString() : formatNumber(clean + num);
        });
    };

    const operatorClick = (op) => {
        setCurrentInput((prev) => {
            const clean = cleanNumber(prev);
            if (clean === "0" && op !== "-") return prev;
            return formatNumber(clean + op);
        });
    };

    const equalClick = () => {
        try {
            const result = eval(cleanNumber(currentInput));
            setCurrentInput(formatNumber(result.toString()));
        } catch {
            setCurrentInput("Error");
        }
    };

    const ceClick = () => {
        setCurrentInput("0");
    };

    const backspace = () => {
        setCurrentInput((prev) => {
            const clean = cleanNumber(prev);
            const newVal = clean.slice(0, -1) || "0";
            return formatNumber(newVal);
        });
    };

    const handleKeyboard = (e) => {
        if (e.key >= "0" && e.key <= "9") numberClick(e.key);
        else if (["+", "-", "*", "/"].includes(e.key)) operatorClick(e.key);
        else if (e.key === "Enter") equalClick();
        else if (e.key === "Backspace") backspace();
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboard);
        return () => window.removeEventListener("keydown", handleKeyboard);
    }, []);

    // ฟังก์ชัน √, %, 1/x
    const sqrtClick = () => {
        try {
            const result = Math.sqrt(parseFloat(cleanNumber(currentInput)));
            setCurrentInput(formatNumber(result.toString()));
        } catch {
            setCurrentInput("Error");
        }
    };

    const percentClick = () => {
        try {
            const result = parseFloat(cleanNumber(currentInput)) / 100;
            setCurrentInput(formatNumber(result.toString()));
        } catch {
            setCurrentInput("Error");
        }
    };

    const inverseClick = () => {
        try {
            const value = parseFloat(cleanNumber(currentInput));
            if (value === 0) {
                setCurrentInput("Error");
                return;
            }
            const result = 1 / value;
            setCurrentInput(formatNumber(result.toString()));
        } catch {
            setCurrentInput("Error");
        }
    };

    return (
        <div className="cal-container">
            <h2>CALCULATOR PAGE</h2>

            <div className="cal-screen p-4" id="calScreen">
                {currentInput}
            </div>

            <div className="button-grid">
                <button className="btn btn-success" disabled>MC</button>
                <button className="btn btn-success" disabled>MR</button>
                <button className="btn btn-success" disabled>M+</button>
                <button className="btn btn-success" disabled>M&minus;</button>
                <button className="btn btn-danger" onClick={ceClick}>CE</button>

                {[7, 8, 9].map((n) => (
                    <button key={n} className="btn btn-info" onClick={() => numberClick(n)}>
                        {n}
                    </button>
                ))}
                <button className="btn btn-success" onClick={() => operatorClick("/")}>
                    &divide;
                </button>
                <button className="btn btn-success" onClick={sqrtClick}>
                    &radic;
                </button>

                {[4, 5, 6].map((n) => (
                    <button key={n} className="btn btn-info" onClick={() => numberClick(n)}>
                        {n}
                    </button>
                ))}
                <button className="btn btn-success" onClick={() => operatorClick("*")}>
                    &times;
                </button>
                <button className="btn btn-success" onClick={percentClick}>%</button>

                {[1, 2, 3].map((n) => (
                    <button key={n} className="btn btn-info" onClick={() => numberClick(n)}>
                        {n}
                    </button>
                ))}
                <button className="btn btn-success" onClick={() => operatorClick("-")}>
                    &minus;
                </button>
                <button className="btn btn-success" onClick={inverseClick}>
                    1/<sub>x</sub>
                </button>

                <button className="btn btn-info" onClick={() => numberClick(0)}>
                    0
                </button>
                <button className="btn btn-info" disabled>.</button>
                <button className="btn btn-info" disabled>
                    +/<sub>&minus;</sub>
                </button>
                <button className="btn btn-success" onClick={() => operatorClick("+")}>
                    +
                </button>
                <button className="btn btn-success" onClick={equalClick}>
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;
