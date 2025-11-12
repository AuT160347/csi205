import { useState, useEffect } from "react";
import Value from "./Value";

function Temperature({ name }) {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);

  
  useEffect(() => {
    setFahrenheit((celsius * 9) / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

  
  useEffect(() => {
    const newCelsius = ((fahrenheit - 32) * 5) / 9;
    setCelsius(newCelsius);
    setKelvin(newCelsius + 273.15);
  }, [fahrenheit]);

  
  useEffect(() => {
    const newCelsius = kelvin - 273.15;
    setCelsius(newCelsius);
    setFahrenheit((newCelsius * 9) / 5 + 32);
  }, [kelvin]);

  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-2 mt-3 bg-secondary-subtle"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center fw-bold text-primary">{name || "TEMPERATURE"}</h1>

      
      <div className="d-flex justify-content-center gap-4">
        <span className="badge bg-primary fs-4">{celsius.toFixed(2)} °C</span>
        <span className="badge bg-primary fs-4">{fahrenheit.toFixed(2)} °F</span>
        <span className="badge bg-primary fs-4">{kelvin.toFixed(2)} °K</span>
      </div>

      
      <div className="d-flex gap-2">
        <Value name="CELSIUS" value={celsius} setValue={setCelsius} type="real" />
        <Value name="FAHRENHEIT" value={fahrenheit} setValue={setFahrenheit} type="real" />
        <Value name="KELVIN" value={kelvin} setValue={setKelvin} type="real" />
      </div>
    </div>
  );
}

export default Temperature;
