import * as React from "react";
import { Link, useLocation } from "react-router-dom"

import Header from "../components/Header"
import Table from "../components/Table"
import  bibleData  from "../bibleData.json"
import "./start.css"

function convertListToString(list){
    let aString = ""
    for(var i = 0; i<list.length; i++){
        aString += " " + list[i]
    }
    return aString
}

function assignVerseValue(abook, achapter, averse) {
    //i want this to loop through the entire bibleData.json and for each verse it encounters it adds one.
    //so genesis 1:1 would == 1 while last book, chapter, and verse would == 31103

    let counterVerse = 0
    for(let i = 0; i< bibleData.books.length; i++){
        for(let j=0; j < bibleData.books[i].chapters.length;j++){
            if ((bibleData.books[i].book == abook) && (j == Number(achapter)-1)){

                return counterVerse + Number(averse)
            }
            counterVerse += bibleData.books[i].chapters[j].verses
        }
    }
    return counterVerse
}

function ProximityPoints(guess ,answer){
    //assign them both values from counting program
    let guessVal = assignVerseValue(guess[0],guess[1],guess[2])
    let answerVal = assignVerseValue(answer[0],answer[1],answer[2])

    //proximity equation = (3110-abs(difference))/6.22
//get the difference and make sure it is a positive number
    let totalPoints = Math.floor((3100-Math.abs(guessVal-answerVal))/6.22)
    if (totalPoints <= 0){
        return 0
    }

    return totalPoints
}


function checkBookScore(guess ,answer){

    if (guess[0]==answer[0]){
        return 200
    }
    return 0
}function checkChapterScore(guess ,answer){

    if (guess[1]==answer[1]){
        return 175
    }
    return 0

}function checkVerseScore(guess ,answer){

    if (guess[2]==answer[2]){
        return 125
    }
    return 0
}


export default function ScoreDisplay() {
    //const receivedData = props.location.state.data;
    const location = useLocation();
    const data = location.state;


    const [verseGuess, setVerseGuess] = React.useState(convertListToString(data[1]));
    const [answer, setAnswer] = React.useState(convertListToString(data[2]));

    

    const [bibBook, setBibBook] = React.useState(checkBookScore(data[1],data[2]));
    const [bibChapter, setBibChapter] = React.useState(checkChapterScore(data[1],data[2]));
    const [bibVerse, setBibVerse] = React.useState(checkVerseScore(data[1],data[2]));



    const [proxy, setProxy] = React.useState(ProximityPoints(data[1],data[2]))
    const [score, setScore] = React.useState(data[0]);
    const [newScore, setNewScore] = React.useState(ProximityPoints(data[1],data[2])+ data[0]+bibBook+bibChapter+bibVerse)

    return(
        <div>
            <Header  words="See How Well you have done?"/>
            <div className="centerDiv">
              <h2 className="infoDisplay smallWidth">VerseGuessed:{ verseGuess }</h2>
              <h2 className="infoDisplay smallWidth">ActualVerse: { answer }</h2>
            </div>

            <Table prox ={proxy} book={bibBook} chap={bibChapter} verse={bibVerse}></Table>
            <div className="centerDiv">
              <h2 className="infoDisplay smallWidth" style={{backgroundColor:"#6D98BA"}}>PreviousScore: { score }</h2>
              <h2 className="infoDisplay smallWidth" style={{backgroundColor:"#6D98BA"}}>CurrentScore: { newScore }</h2>
            </div>
            <Link to="/GuesserGame"  
                className="buttonlink" state={[newScore,Number(data[3])+1]}><b>Submit</b></Link> 
        </div>
    )

}