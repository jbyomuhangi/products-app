import { Box } from "@mui/material";
import React from "react";

const styles = {
  pageHeaderContainer: {
    padding: "12px",
    fontSize: "40px",
    fontWeight: "bold",
    borderBottom: "1px solid #C7C7C7",
    boxShadow: "0 2px 2px -1px #C7C7C7",
  },
};

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return <Box sx={styles.pageHeaderContainer}>{title}</Box>;
};

export default PageHeader;
