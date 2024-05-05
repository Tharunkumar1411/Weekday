import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../pages/Layout"

const AppRoutes = () => {

    return(
        <Suspense>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} /> 
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes