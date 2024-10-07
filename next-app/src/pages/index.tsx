import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/books",
      permanent: false,
    },
  };
};

const HomePage = () => {
  return;
};

export default HomePage;
