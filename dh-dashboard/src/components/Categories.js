import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import SmallCard from "./SmallCard"

function Categories() {

  const [totalGPU, setTotalGPU] = useState(null)
  const [totalMonitores, setTotalMonitores] = useState(null)
  const [totalMicroprocesadores, setTotalMicroprocesadores] = useState(null)
  const [totalMotherboards, setTotalMotherboards] = useState(null)
  const [totalJoysticks, setTotalJoysticks] = useState(null)
  const [totalWaterCooling, setTotalWaterCooling] = useState(null)
  const [totalOthers, setTotalOthers] = useState(null)
  const [loadingCategories, setLoadingCategories] = useState(false)

  useEffect(() => {
    setLoadingCategories(true)
    fetch("http://localhost:3000/dashboard/products")
      .then(response => response.json())
      .then(jsonResponse => {
        setTotalMicroprocesadores(jsonResponse.Microprocesadores)
        setTotalMotherboards(jsonResponse.Motherboards)
        setTotalWaterCooling(jsonResponse.WaterCooling)
        setTotalMonitores(jsonResponse.Monitores)
        setTotalJoysticks(jsonResponse.Joysticks)
        setTotalOthers(jsonResponse.Others)
        setTotalGPU(jsonResponse.GPU)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingCategories(false))
  }, []);

  if (loadingCategories) {
    return (
      <div className="ultimo-producto-cargado-container">
        <div className='spinner-ultimo-cargado-categories'>
          <ClipLoader
            loading={loadingCategories}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    )
  }

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
          cardName='Total Motherboards:'
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