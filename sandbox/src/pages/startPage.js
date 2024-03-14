import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState } from "react";
import { Link } from "react-router-dom"


import Header from "../components/Header"

import "./start.css"
export default function StartPage() {

    return(
        
        <div className="thisclass">
            <Header words="Welcome To Bible Guesser"/>
            <div className="centerDiv"><p className="infoDisplay mediumWidth">Welcome to Bible Guesser, The objective of the game is to guess as close as you can to the verse displayed. The closer you are to guessing the verse, the more points you are awarded. <b>Unlimited Tries For Unlimited Points!</b></p></div>
            <Link to="/GuesserGame" className="buttonlink">
            Start</Link>
        </div>
    )

}