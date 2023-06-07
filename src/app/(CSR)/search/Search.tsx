"use client";

import { notFound } from "next/navigation";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { RandomPhoto } from "../../../../types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<RandomPhoto[]>();
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsError, setSearchResultsError] = useState(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) return;

    try {
      // We need to create an API route to be able to use our access key on the frontend as currently process.env.... returns undefined here
      setResults(undefined);
      setSearchResultsLoading(true);
      setSearchResultsError(false);
      // this detour over our own backend route is necessary because we can't put any API credentials in our client code, we can only do this in our own backend, therefore the request has to always happen on the server
      const response = await fetch("/api/search?query=" + searchTerm);
      const images: RandomPhoto[] = await response.json();
      setResults(images);
      setSearchTerm("");
    } catch (e) {
      setSearchResultsError(true);
    } finally {
      setSearchResultsLoading(true);
    }
  };

  return (
    <div>
      <Alert>
        This page fetches data on the <strong>client side</strong>. In order to not leak API credentials, we had to sent
        a request to a NextJS route handler that runs on the server. This route handler then fetches the data from the
        Unsplash API and returns it to the client.
      </Alert>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="E.g. cats, hotels,..."
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsError && <p>Something went wrong. Please try again</p>}
        {results?.length === 0 && <p>Nothing found! Please try a different query.</p>}
        {results?.length && (
          <Fragment>
            {results.map((image) => (
              <Image src={image.urls.raw} width={250} height={250} alt={image.description} key={image.urls.raw} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Search;
