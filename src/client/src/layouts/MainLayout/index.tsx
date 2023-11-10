import React from "react";
import './styles.css'
import SideBar from "./SideBar";
import LayoutHeader from "./Header";
import { Outlet } from "react-router-dom";


export default function MainLayout() {

    return (
        <div className="main-layout">
            <LayoutHeader/>

            <div className="layout-body">
                <SideBar/>
                <Outlet/>
            </div>
        </div>
    )
}