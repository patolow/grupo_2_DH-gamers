import React, { useEffect, useState } from "react";
import Card from "./Card";
import UltimoCargado from "./UltimoCargado";
import Categories from "./Categories"


function Home() {


  //USERS
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalProducts, setTotalProducts] = useState(null)
  const [totalCategory, setTotalCategory] = useState(null)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingProducts, SetLoadingProducts] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)

  useEffect(() => {
    setLoadingUsers(true)
    fetch("http://localhost:3000/dashboard/users")
      .then((response) => response.json())
      .then(jsonResponse => setTotalUsers(jsonResponse.total))
      .catch((error) => console.log(error))
      .finally(() => setLoadingUsers(false))
  }, []);

  useEffect(() => {
    SetLoadingProducts(true)
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then(jsonResponse => setTotalProducts(jsonResponse.total))
      .catch((error) => console.log(error))
      .finally(() => SetLoadingProducts(false))
  }, []);

  useEffect(() => {
    setLoadingCategories(true)
    fetch("http://localhost:3000/dashboard/category")
      .then((response) => response.json())
      .then(jsonResponse => setTotalCategory(jsonResponse.total))
      .catch((error) => console.log(error))
      .finally(() => setLoadingCategories(false))
  }, []);

  const isLoading = () => loadingCategories || loadingProducts || loadingUsers

  return (
    <>
      <div className='welcome-h1'>
        <h1>DASHBOARD - DH GAMERS</h1>
      </div>
      <div className='total-boxes-container'>
        <Card
          loading={isLoading()}
          text={totalUsers}
          cardName='TOTAL USUARIOS'
        />
        <Card
          loading={isLoading()}
          text={totalProducts}
          cardName='TOTAL PRODUCTOS'
        />
        <Card
          loading={isLoading()}
          text={totalCategory}
          cardName='TOTAL CATEGORÍAS'
        />
      </div>
      <div className="categories-ultimoCargado-container">
        <div>
          <UltimoCargado />
        </div>
        <div>
          <Categories />
        </div>
      </div>
    </>
  );
}


export default Home;