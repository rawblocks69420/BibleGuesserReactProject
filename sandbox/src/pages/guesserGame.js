import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { useState } from "react";

import { Link, useLocation } from "react-router-dom"

import  bibleData  from "../bibleData.json"
import bookKey from "../bookKey.json"
import Aheader from "../components/Header.js"
import AForm from "../components/Form.js"
import "../fums.js"
import "./guesser.css"


const API_KEYa= "d7377fdeec87c11261ab8181b123d48a";
const API_KEY = `866d569937b2773ee584496aacee8eda`;





function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomVerse() {
    const biblebooks = bibleData.books
    //to get a random verse in the jason file, then assign it a value genesis 1:1 being assigned a 0
    const randBookValue = getRandomInt(0, biblebooks.length-1)
    const bookArr = biblebooks[randBookValue]
    const randomChapterValue = getRandomInt(0, biblebooks[randBookValue].chapters.length-1)
    const randomVerseValue = getRandomInt(1, biblebooks[randBookValue].chapters[randomChapterValue].verses)

    return [(bookArr.book), randomChapterValue, randomVerseValue]
}

function RandomVerseSelection() {
    let randVerseArr = GetRandomVerse()
    let randVerseVal = AssignVerseValue(randVerseArr[0],randVerseArr[1],randVerseArr[2])
    let laterVerse = FindVerseFromValue(randVerseVal+10)

    //now i just need to convert the bible and return a string with the input I want.
    let adjust = randVerseArr[1] + 1

    let stringToPrint = bookKey.bookNames[randVerseArr[0]] + "." + adjust + "." + randVerseArr[2] +"-"+
    bookKey.bookNames[laterVerse[0]] + "." + laterVerse[1] + "." + laterVerse[2]
    return [stringToPrint,[randVerseArr[0], adjust, randVerseArr[2]]]
}

function AssignVerseValue(abook, achapter, averse) {
    //i want this to loop through the entire bibleData.json and for each verse it encounters it adds one.
    //so genesis 1:1 would == 1 while last book, chapter, and verse would == 31103
    let counterVerse = 0
    for(let i = 0; i< bibleData.books.length; i++){
        for(let j=0; j < bibleData.books[i].chapters.length;j++){
            if ((bibleData.books[i].book == abook) && (j == achapter)){
                return counterVerse + averse
            }
            counterVerse += bibleData.books[i].chapters[j].verses
        }
    }
    return counterVerse
}

function FindVerseFromValue(verseVal) {
    let counterVerse = 1
    for(let i = 0; i< bibleData.books.length; i++){
        for(let j=0; j < bibleData.books[i].chapters.length;j++){
            if ((counterVerse + bibleData.books[i].chapters[j].verses)>= verseVal){
                //100 + 7 >= 105
                let verse = verseVal- counterVerse
                return [bibleData.books[i].book, j + 1,verse+1]

            }

            counterVerse += bibleData.books[i].chapters[j].verses

        }
    }
    
}



//      const bookurl = "https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/books";
//                


function VerseDisplay(props) {
    const [verse, setVerse] = React.useState("Loading...");
    const [verseSelection, setVerseSelection] = useState(props.randVerse);
    
    
    React.useEffect(() => {
      const url = "https://api.scripture.api.bible/v1/bibles/" +
      "bba9f40183526463-01/verses/" + verseSelection;

      const options = { method: "GET", headers: { "api-key": API_KEY } };
  
      fetch(url, options).then(
        response => response.json()).then(
          ({ data }) => {
            let v = data.content;
            v = v.replace(/<[^>]+>/g, ' ').replace(/\d+/g, ' ');
            setVerse(v);
          });
        }, []);
  
    return (
      <p className="scrollDisplay">{ verse }</p>
    );
  }

 
//                <VerseDisplay randVerse={ randomVerseString }/>

export default function GuesserGame(){

    let RVS = RandomVerseSelection()
    const [randomVerseString, setRandomVerseString] = React.useState(RVS[0]);
    const [formatVerse, setFormatVerse] = React.useState(RVS[1]);

    const [scoreCount, setScoreCount] = React.useState(0);
    const [roundCount, setRoundCount] = React.useState(0);

    const location = useLocation();
    const gameData = location.state;
    
    React.useEffect(()=>{
        console.log(formatVerse)
        if (gameData) {
            setScoreCount(gameData[0])
            setRoundCount(gameData[1])
        }

    },[])


    return (
        <div>
            <Aheader words= "Guesser Game Activated"/>
            <div>
                
                <VerseDisplay randVerse={ randomVerseString }/>
                <AForm randVerse={ formatVerse } round={ roundCount } score= { scoreCount }/>
            </div>
        </div>
        
    );
}


