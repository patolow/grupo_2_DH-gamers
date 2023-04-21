import React, { useEffect, useState } from "react";
import Card from "./Card";
import UltimoCargado from "./UltimoCargado";

function Home() {


  //USERS
  const [totalUsers, setTotalUsers] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/users")
      .then((response) => response.json())
      .then(jsonResponse => setTotalUsers(jsonResponse.total))
      .catch((error) => console.log(error));
  }, []);

  // PRODUCTS
  const [totalProducts, setTotalProducts] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalProducts(jsonResponse.total))
      .catch((error) => console.log(error));
  }, []);

  //CATEGORY
  const [totalCategory, setTotalCategory] = useState(null)
  const [loadingCategories, setLoadingCategories] = useState(false)


  useEffect(() => {
    setLoadingCategories(true)
    fetch("http://localhost:3000/dashboard/category")
      .then((response) => response.json())
      .then(jsonResponse => setTotalCategory(jsonResponse.total))
      .catch((error) => console.log(error))
      .finally(setLoadingCategories(false))
  }, []);

  return (
    <>
      <div className='welcome-h1'>
        <h1>DASHBOARD - DH GAMERS</h1>
      </div>
      <div className='total-boxes-container'>
        <Card
          loading={loadingCategories}
          text={totalUsers}
          cardName='TOTAL USUARIOS'
        />
        <Card
          text={totalProducts}
          cardName='TOTAL PRODUCTOS'
        />
        <Card
          text={totalCategory}
          cardName='TOTAL CATEGORÍAS'
        />
      </div>
      <UltimoCargado 
      
      />
    </>
  );
}


export default Home;