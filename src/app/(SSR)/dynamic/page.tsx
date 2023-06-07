import React from "react";
import getRandomPhoto from "../../../lib/getRandomPhoto";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Dynamic fetching of Random Images",
};

export const revalidate = 0;

const DynamicPage = async () => {
  const image = await getRandomPhoto();

  if (!image) {
    return notFound();
  }

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        <p>
          <em> Dynamic Re-validaiton (SSR pages, not SSG)</em> The frequency at which a page should be revalidated is
          denoted by assigning a value to the revalidate constant. A revalidate value of 0 indicates that the page will
          be revalidated each time it is refreshed, and there will be no caching, effectively making it a dynamic page.
          Moreover, its worth noting that revalidation strategy can be set individually for each fetch request,
          providing finer control than applying a blanket strategy for the entire page. For example, you can configure
          one fetch request to have a <strong>no-store</strong> cache (meaning the request wont be cached), while
          another fetch request follows the default revalidation behavior, denoted as <strong>force-cache</strong>. R
          The second option is to utilize the next object, specifying a revalidate field with a value in seconds. This
          value determines the frequency of revalidation for a specific fetch request.
        </p>
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

export default DynamicPage;
