import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../component/Sidebar";

const Layout = () => {
    return(
        <Box>
            <div>
                <Sidebar />
            </div>

         
        </Box>
    )
}

export default Layout;