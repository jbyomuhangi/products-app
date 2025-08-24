import { Box } from "@mui/material";
import Link from "next/link";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Link href="/products?page=0&rowsPerPage=100">
        <NavButton>Products</NavButton>
      </Link>

      <Link href="/attributes?page=0&rowsPerPage=100">
        <NavButton>Attributes</NavButton>
      </Link>
    </Box>
  );
};

export default NavBar;
