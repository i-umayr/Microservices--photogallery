import React from "react";
import {Outlet} from "react-router-dom"
import MainNavigation from "../components/MainNavigation/MainNavigation.js";

const RootLayout=()=>{
    return (
    <>
    <MainNavigation/>
    <main>
    <Outlet/>
    </main>
    </>
    )


}

export default RootLayout;