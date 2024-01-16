import React, { useEffect, useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import SearchForm from "./SearchForm";
import { Inertia } from "@inertiajs/inertia";

async function a({ user }) {
    // const user = await fetch(`http://localhost:8000/authuser`).then(user=>user);
    let profileRoute = `http://localhost:8000/u/${user.slug}`;
    if (user.name == "") {
        user = {
            name: "",
            email: "",
            slug: "",
        };
        profileRoute = "http://localhost:8000/login";
    }
}
function Header({ user }) {
    let profileRoute = `http://localhost:8000/u/${user.slug}`;
    if (user.name == "") {
        user = {
            name: "",
            email: "",
            slug: "",
        };
        profileRoute = "http://localhost:8000/login";
    }

    return (
        <header className="navbar shadow fixed-top container-fluid">
            <InertiaLink
                href="/"
                className="header-title col-8 col-sm-6 col-md-3 col-lg-4 col-xl-5"
            >
                <h3 className="navbar-title display-4">Laravel Blog</h3>
            </InertiaLink>
            <div className="header-links row align-items-center col-8 col-sm-6 col-md-5 col-lg-4 d-none d-sm-flex">
                <InertiaLink href="/" className="nav-link">
                    Home
                </InertiaLink>
                <InertiaLink className="nav-link" href={profileRoute}>
                    Profile
                </InertiaLink>
                <InertiaLink href="/posts" className="nav-link">
                    Explore
                </InertiaLink>
            </div>

            <SearchForm></SearchForm>
        </header>
    );
}
export default Header;
