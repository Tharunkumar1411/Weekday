import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import SearchJob from "../pages/SearchJob"

const AppRoutes = () => {

    return(
        <Suspense>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<SearchJob />} /> 
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes