import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard"

function Categories() {

  //GPU
  const [totalGPU, setTotalGPU] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalGPU(jsonResponse.GPU))
      .catch((error) => console.log(error));
  }, []);

  //Monitores
  const [totalMonitores, setTotalMonitores] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalMonitores(jsonResponse.Monitores))
      .catch((error) => console.log(error));
  }, []);

  // Microprocesadores
  const [totalMicroprocesadores, setTotalMicroprocesadores] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalMicroprocesadores(jsonResponse.Microprocesadores))
      .catch((error) => console.log(error));
  }, []);

  //Motherboards
  const [totalMotherboards, setTotalMotherboards] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalMotherboards(jsonResponse.Motherboards))
      .catch((error) => console.log(error));
  }, []);

  //WaterCooling
  const [totalWaterCooling, setTotalWaterCooling] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalWaterCooling(jsonResponse.WaterCooling))
      .catch((error) => console.log(error));
  }, []);

  //Joysticks
  const [totalJoysticks, setTotalJoysticks] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalJoysticks(jsonResponse.Joysticks))
      .catch((error) => console.log(error));
  }, []);

  //Others
  const [totalOthers, setTotalOthers] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalOthers(jsonResponse.Others))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="smallcard-container">
        <SmallCard
          text={totalGPU}
          cardName='Total GPU:'
        />
        <SmallCard
          text={totalMonitores}
          cardName='Total Monitores:'
        />
        <SmallCard
          text={totalMicroprocesadores}
          cardName='Total Microprocesadores:'
        />

        <SmallCard
          text={totalMotherboards}
          cardName='Total Microprocesadores:'
        />
        <SmallCard
          text={totalWaterCooling}
          cardName='Total WaterCooling:'
        />
        <SmallCard
          text={totalJoysticks}
          cardName='Total Joysticks:'
        />
        <SmallCard
          text={totalOthers}
          cardName='Total Others:'
        />

      </div>
    </>
  )

}

export default Categories;