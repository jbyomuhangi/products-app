import { Box } from "@mui/material";
import React from "react";

const styles = {
  pageHeaderContainer: {
    padding: "12px",
    fontSize: "40px",
    fontWeight: "bold",
  },
};

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return <Box sx={styles.pageHeaderContainer}>{title}</Box>;
};

export default PageHeader;
