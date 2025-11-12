import { useState } from "react";
import Value from "../components/Value";
import Timer from "../components/Timer";
import Adder from "../components/Adder";
import Temperature from "../components/Temperature";


const Components = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="components-center" > 
      <div className="components-box text-center">
        <div className="row g-3 justify-content-center">
          <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center gap-3">
            <Value name="COUNTER" value={counter} setValue={setCounter} />
            <Timer />
          </div>

          <div className="col-md-6 col-sm-12">
            <Adder />
          </div>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="col-md-10 col-sm-12">
            <Temperature/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
