import { Box } from "@mui/material";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";

interface Props {
  title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title || "OpenJira"}</title>
      </Head>
      <Navbar />
      {/* <Sidebar /> */}
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
