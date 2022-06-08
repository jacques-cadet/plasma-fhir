import React from "react";

function Footer() {
    return (
        <footer className="h-20 p-5">
            <div className="flex items-center flex-shrink-0 mr-6 px-2">
                <img src={require("./../../assets/img/logo.jpg")} className="rounded-md" style={{ maxHeight: "25px" }} alt="PlasmaFHIR" />
                <label className="pl-2 pr-1">Powered by</label>
                <a href="https://plasmafhir.com" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "blue" }}>Plasma</a>
            </div>
        </footer>
    );
}

export default Footer;