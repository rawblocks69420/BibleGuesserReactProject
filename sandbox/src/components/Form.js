import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import  bibleData  from "../bibleData.json"
import "../pages/guesser.css"




export default function Form(props) {
    const [book, setBook] = useState("0");
    const [chapter, setChapter] = useState("0");
    const [verse, setVerse] = useState("1")

    
    const [chapterVal, setchapterVal] = useState("1")
    const [bookVal, setbookVal] = useState("Genesis");

    const versesArr = []
    const chapterArr = []
    for (let i = 1; i < bibleData.books[book].chapters[chapter].verses+1; i++) {
        versesArr.push(i)
    }  
    for (let i = 1; i< bibleData.books[book].chapters.length+1; i++){
        chapterArr.push(i)
    }


    return (
        <div className="formClass">
            <div>
                <select id="book" onChange={(e) => {
                    const value = e.target.value;
                    setbookVal(value);
                    setBook(e.target.selectedIndex);
                    setChapter("0");}}>

                    {bibleData.books.map((i, index) => (
                        <option key={index}>{i.book}</option>
                    ))}
                </select>
                <select id="chapter" onChange={(e) => {
                    const value = e.target.value;
                    setChapter(e.target.selectedIndex);
                    setchapterVal(value);}}>

                    {chapterArr.map((name, index) => (
                        <option key={index}>{name}</option>
                    ))}
                </select>
                <select id="verse" onChange={(e) => {
                    const value = e.target.value;
                    setVerse(value);}}>
                        
                    {versesArr.map((i) => (
                        <option key={i}>{i}</option>
                    ))}
                </select>
            </div>
            <div>

                <Link to="/ScoreDisplay" className="buttonlink" state={[props.score,[bookVal,chapterVal,verse],props.randVerse,props.round]}>Submit</Link>
            </div>
        </div>
    );
}