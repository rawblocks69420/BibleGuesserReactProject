
import bibleData from "./bibleData.json"




function FindVerseFromValue(verseVal) {
    let counterVerse = 1
    for(let i = 0; i< bibleData.books.length; i++){
        for(let j=0; j < bibleData.books[i].chapters.length;j++){




            
            for(let v = 0; v < bibleData.books[i].chapters[j].verses; v++){
                if (counterVerse == verseVal) { 
                    return [bibleData.books[i].book, j + 1,v+1]
                }
            counterVerse += 1

            }
        }
    }
    
}
FindVerseFromValue(1)