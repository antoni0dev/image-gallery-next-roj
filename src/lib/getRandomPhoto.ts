import { RandomPhoto } from "../../types";

const getRandomPhoto = async () => {
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY);

  if (!response.ok) {
    console.error(response.status);
    return undefined;
  }

  const image: RandomPhoto = await response.json();
  return image;
};

export default getRandomPhoto;
