import React, { useState } from "react";
import "./index.css";
import Banner from "../../components/Banner";
import { uploadImage } from "../../services/imgbb";
import apiClient from "../../services/axios";

const PRODUCTOS_INITIAL_STATE = {
  collar: false,
  pulsera_sil: false,
  charm: false,
};

const COLOR_INITIAL_STATE = {
  black: false,
  white: false,
  purple: false,
  red: false,
  beige: false,
  green: false,
};

const MARKER_INITIAL_STATE = {
  heart: false,
  letter: false,
  letterInput: "",
};

const USER_INFO_INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  address: "",
  postalCode: "",
  city: "",
};

const Shop = () => {
  const [productos, setProductos] = useState(PRODUCTOS_INITIAL_STATE);

  const [colors, setColors] = useState(COLOR_INITIAL_STATE);

  const [marker, setMarker] = useState(MARKER_INITIAL_STATE);

  const [userInfo, setUserInfo] = useState(USER_INFO_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [, setUploading] = useState(false);

  const onFileChange = async (event) => {
    const base64Image = await convertToBase64(event.target.files[0]);
    setSelectedFile(base64Image);
    if (!base64Image) return;

    setUploading(true);

    try {
      const response = await uploadImage(base64Image);
      console.log(response);
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setUploading(false);
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const setProductSelected = (product) => {
    setProductos({
      ...PRODUCTOS_INITIAL_STATE,
      [product]: !productos[product],
    });
  };

  const setColorSelected = (color) => {
    setColors({
      ...COLOR_INITIAL_STATE,
      [color]: !colors[color],
    });
  };

  const getTotalToPay = (products) => {
    let total = 0;
    if (products.collar) total += 1000;
    if (products.pulsera_sil) total += 300;
    if (products.charm) total += 500;
    return total;
  };

  const setMarkerSelected = (markerType) => {
    setMarker({
      ...MARKER_INITIAL_STATE,
      [markerType]: !marker[markerType],
    });
  };
  const handleInputChange = (e, field) => {
    console.log(e.target.value);
    setUserInfo({
      ...userInfo,
      [field]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    // Validate one marker is selected
    setTimeout(async () => {
      let error = false;
      if (!marker.heart && !marker.letter) {
        alert("Selecciona un tipo de marcador");
        error = true;
      }
      // Validar todos los campos de userInfo
      for (const key in userInfo) {
        if (userInfo[key] === "") {
          alert(`Llena el campo faltante: ${key}`);
          error = true;
        }
      }
      // Validar que se haya seleccionado un producto
      if (!Object.values(productos).some((value) => value)) {
        alert("Selecciona un producto");
        error = true;
      }
      // Validar que se haya seleccionado un color
      if (
        productos.pulsera_sil &&
        !Object.values(colors).some((value) => value)
      ) {
        alert("Selecciona un color");
        error = true;
      }
      // Validar que se haya subido una imagen
      if (!imageUrl) {
        alert("Sube una imagen");
        error = true;
      }
      if (error) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      let selectedMarker = "";
      if (marker.heart) {
        selectedMarker = "heart";
      }
      if (marker.letter) {
        selectedMarker = marker.letterInput;
      }
      const data = {
        userInfo: JSON.stringify(userInfo),
        image: imageUrl,
        // Obtener la key del objeto productos que tenga el valor true
        product: Object.keys(productos).find((key) => productos[key]),
        // Obtener la key del objeto colors que tenga el valor true
        color: Object.keys(colors).find((key) => colors[key]),
        // Obtener la key del objeto marker que tenga el valor true
        marker: selectedMarker,
      };
      try {
        const response = await apiClient.post("/order", data);
        console.log(response);
        alert("¡Pedido confirmado, nos pondremos en contacto contigo pronto!");
        window.location.reload();
      } catch (error) {
        console.error("Error creating the order:", error);
        alert("Ocurrió un error al confirmar el pedido, intenta de nuevo");
      }
    }, 1000);
  };

  return (
    <div class="shop">
      <Banner />
      <div class="producto"></div>
      <span class="seleccion1">Selecciona un producto:</span>
      <button
        class={`collar ${productos.collar ? "item-selected" : ""}`}
        onClick={() => setProductSelected("collar")}
      ></button>
      <button
        class={`pulsera_sil ${productos.pulsera_sil ? "item-selected" : ""}`}
        onClick={() => setProductSelected("pulsera_sil")}
      ></button>
      <button
        class={`charm ${productos.charm ? "item-selected" : ""}`}
        onClick={() => setProductSelected("charm")}
      ></button>

      <div class="color"></div>
      <span class="seleccion2">
        Si seleccionaste Sparkle Silicona, selecciona un color:
      </span>
      <button
        class={`negro ${colors.black ? "item-selected" : ""}`}
        onClick={() => setColorSelected("black")}
      ></button>
      <button
        class={`blanco ${colors.white ? "item-selected" : ""}`}
        onClick={() => setColorSelected("white")}
      ></button>
      <button
        class={`morado ${colors.purple ? "item-selected" : ""}`}
        onClick={() => setColorSelected("purple")}
      ></button>
      <button
        class={`rojo ${colors.red ? "item-selected" : ""}`}
        onClick={() => setColorSelected("red")}
      ></button>
      <button
        class={`beige ${colors.beige ? "item-selected" : ""}`}
        onClick={() => setColorSelected("beige")}
      ></button>
      <button
        class={`verde ${colors.green ? "item-selected" : ""}`}
        onClick={() => setColorSelected("green")}
      ></button>

      <div class="perso"></div>
      <span class="seleccion3">Selecciona el corazón o escribe UNA letra:</span>
      <button
        class={`corazonfondo ${marker.heart ? "item-selected" : ""}`}
        onClick={() => setMarkerSelected("heart")}
      >
        <span class="signocorazon"></span>
      </button>

      <div
        class={`letra ${marker.letter ? "item-selected" : ""}`}
        onClick={() => setMarkerSelected("letter")}
        contenteditable="true"
      ></div>

      <div class="datos1"></div>

      <span class="forms">Completa los campos para tu envío</span>
      <span class="nombre">Nombre completo</span>
      <input
        class="nom"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "name")}
      />

      <span class="phone">Teléfono</span>
      <input
        class="phone_fill"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "phone")}
      />

      <span class="email">Correo electrónico </span>
      <input
        class="email_fill"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "email")}
      />

      <span class="direccion">Dirección</span>
      <input
        class="dir_fill"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "address")}
      />

      <span class="codigo">Código postal</span>
      <input
        class="codigo_fill"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "postalCode")}
      />

      <span class="city">Ciudad</span>
      <input
        class="city_fill"
        contenteditable="true"
        onChange={(e) => handleInputChange(e, "city")}
      />

      <div class="upload_datos"></div>
      <span class="imagen">Sube tu imagen aquí:</span>

      {imageUrl ? (
        <div class="uploaded-img">
          <img src={imageUrl} alt="Uploaded" width={"100%"} />
        </div>
      ) : (
        <React.Fragment>
          <button class="upload"></button>
          <input
            class="upload upload-btn"
            type="file"
            onChange={onFileChange}
          />
        </React.Fragment>
      )}

      <div class="datos2"></div>

      <span class="confirmacion">Confirmación de pedido</span>
      <span class="costo">Costo de envío:</span>
      <div class="costo_auto">200</div>

      <span class="t_pagar">TOTAL A PAGAR:</span>
      <div class="total_pagar">{getTotalToPay(productos)}</div>

      {isLoading ? (
        <button class="boton_confirmar2" disabled>
          Cargando pedido...
        </button>
      ) : (
        <button class="boton_confirmar2" onClick={handleConfirm}>
          Confirmar
        </button>
      )}
    </div>
  );
};

export default Shop;
