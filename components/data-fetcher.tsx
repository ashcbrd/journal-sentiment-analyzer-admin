"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import Spinner from "./spinner";

interface DataFetcherProps<T> {
  urls: string[];
  params?: any;
  children: (props: { data: T[] }) => JSX.Element;
}

const DataFetcher = <T,>({ urls, params, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      urls.map((url) =>
        axiosInstance.get(url, { params }).then((response) => response.data)
      )
    )
      .then((results) => {
        setData(results.flat());
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [urls, params]);

  return loading ? <Spinner /> : children({ data });
};

export default DataFetcher;
