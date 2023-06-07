import React from "react";
import { RandomPhoto } from "../../../../../types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Alert } from "@/components/bootstrap";

export const dynamicParams = false;

interface Props {
  params: {
    topic: string;
  };
  // searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = ({ params: { topic } }: Props) => {
  if (!topic) {
    return { title: "This topic couldn't be found!" };
  }

  return { title: `A cool page about ${topic}`, description: "A very cool topic page" };
};

const TopicPage = async ({ params: { topic } }: Props) => {
  console.log(topic);

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    return notFound();
  }

  const images: RandomPhoto[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses generateStaticParams() to render and cache static pages at build time, even though the URL has a
        dynamic parameter. Pages that are not included in the generateStaticParams will be fetched & rendered on first
        access and then cached for subsequent requests and this can be disabled - export const dynamicParams = false
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          className=""
          key={image.urls.raw}
          src={image.urls.raw}
          alt={image.description}
          width={250}
          height={250}
        />
      ))}
    </div>
  );
};

export default TopicPage;

export const generateStaticParams = async () => {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
};
