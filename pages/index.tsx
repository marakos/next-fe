import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const getMessage = (): Promise<{ message: string }> =>
  fetch("http://localhost:3000/api/hello").then((resp) => resp.json());

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["message"], getMessage);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home: NextPage = () => {
  const { data } = useQuery(["message"], getMessage, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return <div>{data?.message}</div>;
};

export default Home;
