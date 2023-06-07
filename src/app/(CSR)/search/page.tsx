import React from "react";
import Search from "./Search";

export const metadata = { title: "Search - CSR" };

const SearchPage = () => {
  // now the SearchPage server component is a wrapper for our client component. We needed this because we needed a server component to declare our metadata!
  return <Search />;
};

export default SearchPage;
