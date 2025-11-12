import { useState } from "react"

const RadixCounter = () => {
    const [value, setValue] = useState(0)

    const minusClicked = () => {
        if (value <= 0) {
            setValue(4095)
        } else {
            setValue((p) => p - 1) //ok
        }
    }
    const resetClicked = () => {
        setValue(0)
    }
    const plusClicked = () => {
        if (value >= 4095) {
            setValue(0)
        } else {
            setValue((p) => p + 1)
        }
    }

    return (
        <div>
            {/* container */}
            <div
                className="border border-black border-2 rounded-3 m-auto mt-3 p-3"
                style={{ width: "fit-content" }}
            >
                {/* title */}
                <h1 className="text-center fw-bold ">RADIX COUNTRER</h1>

                {/* body */}
                <div className="d-flex justify-content-between text-center gap-3 mt-3">
                    <div>
                        <div className="fw-bold">[HEX]</div>
                        <div className="font-monospace">{value.toString(16).toUpperCase().padStart(3, "0")}</div>
                    </div>
                    <div>
                        <div className="fw-bold">[DEC]</div>
                        <div className="font-monospace text-primary fw-bold">
                            {value.toString().padStart(4, "0")}
                        </div>
                    </div>
                    <div>
                        <div className="fw-bold">[OCT]</div>
                        <div className="font-monospace">{value.toString(8).padStart(4, "0")}</div>
                    </div>
                    <div>
                        <div className="fw-bold">[BIN]</div>
                        <div className="font-monospace">{value.toString(2).padStart(12, "0")}</div>
                    </div>
                </div>
                {/* buttons */}
                <div className="mt-3 d-flex justify-content-around">
                    <button
                        className="btn btn-danger px-4"
                        onClick={() => {
                            minusClicked()
                        }}
                    >
                        &minus;
                    </button>
                    <button
                        className="btn btn-secondary px-5"
                        onClick={() => {
                            resetClicked()
                        }}
                    >
                        RESET
                    </button>
                    <button
                        className="btn btn-success px-4"
                        onClick={() => {
                            plusClicked()
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RadixCounter
