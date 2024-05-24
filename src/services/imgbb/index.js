const API_KEY = "46f77df933de8d087642b8dd90c039d9";

export const uploadImage = async (image) => {
  const formData = new FormData();
  console.log(image);
  formData.append("image", image.split(',')[1]);
  formData.append("key", API_KEY);
  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });
  return response.json();
};
