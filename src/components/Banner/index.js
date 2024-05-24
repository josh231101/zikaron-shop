import React from "react";

const Banner = () => {
  const gotoShop = () => {
    window.location.href = "/shop";
  };

  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <div class="banner">
      <div class="home" onClick={goToHome}>
        <button class="logo"></button>
        <button class="Zikaron">Zikaron Jewelry</button>
      </div>

      <button class="carrito" onClick={gotoShop}></button>
    </div>
  );
};

export default Banner;
