import React from "react";

// This is what the { next: { revalidate: {  } } } and revalidate on a page level are for.

// ISR can be done on a per page basis
export const revalidate = 15;

const IncrementalStaticRegenerationPage = async () => {
  const randomImage = fetch(
    "https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
    // ISR can be done on a per fetch request basis
    {
      next: { revalidate: 60 },
    }
  );

  return <div>Basically the same as dynamic, however, you have to decide how dynamic you want the fetchign request to be either by </div>;
};

export default IncrementalStaticRegenerationPage;
