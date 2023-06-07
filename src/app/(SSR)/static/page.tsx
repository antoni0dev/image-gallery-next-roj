import React from "react";
import getRandomPhoto from "../../../lib/getRandomPhoto";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Static Fetching of Random Images",
};

const StaticPage = async () => {
  const image = await getRandomPhoto();

  if (!image) {
    return notFound();
  }

  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at build time</strong>. Even though we provide the Unsplash API always
        returns a new image, we see the same image after refreshing the page until we compile the project again.
      </Alert>
      <Image
        className="rounded shadow mw-100 h-100"
        src={image.urls.raw}
        alt="random illustration"
        width={width}
        height={height}
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
};

export default StaticPage;
