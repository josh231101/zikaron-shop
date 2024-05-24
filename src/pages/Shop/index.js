import React from "react";
import './index.css'

const Shop = () => {
  return (
    <div class="shop">
      <div class="fondo_logo"></div>
      <div class="banner"></div>
      <button class="Zikaron">Zikaron Jewelry</button>
      <button class="logo"></button>

      <div class="producto"></div>
      <span class="seleccion1">Selecciona un producto:</span>
      <button class="collar"></button>
      <button class="pulsera_sil"></button>
      <button class="charm"></button>

      <div class="color"></div>
      <span class="seleccion2">
        Si seleccionaste Sparkle Silicona, selecciona un color:
      </span>
      <button class="negro"></button>
      <button class="blanco"></button>
      <button class="morado"></button>
      <button class="rojo"></button>
      <button class="beige"></button>
      <button class="verde"></button>

      <div class="perso"></div>
      <span class="seleccion3">Selecciona el corazón o escribe UNA letra:</span>
      <button class="corazonfondo"></button>
      <button class="signocorazon"></button>
      <div class="letra" contenteditable="true"></div>

      <div class="datos1"></div>

      <span class="forms">Completa los campos para tu envío</span>
      <span class="nombre">Nombre completo</span>
      <div class="nom" contenteditable="true"></div>

      <span class="phone">Teléfono</span>
      <div class="phone_fill" contenteditable="true"></div>

      <span class="email">Correo electrónico </span>
      <div class="email_fill" contenteditable="true"></div>

      <span class="direccion">Dirección</span>
      <div class="dir_fill" contenteditable="true"></div>

      <span class="codigo">Código postal</span>
      <div class="codigo_fill" contenteditable="true"></div>

      <span class="city">Ciudad</span>
      <div class="city_fill" contenteditable="true"></div>

      <div class="upload_datos"></div>
      <span class="imagen">Sube tu imagen aquí:</span>
      <button class="upload"></button>

      <div class="datos2"></div>

      <span class="confirmacion">Confirmación de pedido</span>
      <span class="productos">Productos:</span>
      <div class="product_auto" contenteditable="true"></div>

      <span class="t_productos">Total de productos:</span>
      <div class="t_prod" contenteditable="true"></div>

      <span class="costo">Costo de envío:</span>
      <div class="costo_auto" contenteditable="true"></div>

      <span class="t_pagar">TOTAL A PAGAR:</span>
      <div class="total_pagar" contenteditable="true"></div>

      <button class="boton_confirmar1">Confirmar</button>

      <button class="boton_confirmar2">Confirmar</button>

      <button class="paypal"></button>
    </div>
  );
};

export default Shop;
