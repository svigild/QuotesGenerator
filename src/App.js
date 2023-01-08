import { useState, useEffect } from 'react';
import './App.css';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {

  const [quote, setQuote] = useState("Our lives begin to end the day we become silent about things that matter.");
  const [author, setauthor] = useState("Martin Luther King");
  const [randomNumber, setrandomNumber] = useState(0); 
  const [quotesArray, setQuotesArray] = useState(null);
  const [strongColor, setcolor] = useState('#282C34');

  /* Start getting the quotes and authors from the DB */
  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const generateRandomQuote = () => {
    let randomInteger = Math.floor((quotesArray.length)*Math.random());
    setrandomNumber(randomInteger);
    setcolor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setauthor(quotesArray[randomInteger].author);
    
  }
  /* Ends getting the quotes and authors from the DB */

  return (
    <div className="App">
      <header className="App-header" style={
      {backgroundColor:strongColor, color:strongColor}}>
      <div id="quote-box" style={{color: strongColor}}>
      <h2 id="text">
        <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} style={{color:strongColor}}/></span> {quote}"
      </h2>
      <p id="author" style={
      {color:strongColor}}>
          - {author}
        </p>
        <a id="tweet-quote" target="_blank" style={
      {backgroundColor:strongColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
      <a id="my-github" target="_blank" style={
      {backgroundColor:strongColor}} href="https://github.com/svigild"><FontAwesomeIcon icon={faGithub} /></a>
        <button id="new-quote" style={
      {backgroundColor:strongColor, color:"#FFFF"}} onClick={()=>generateRandomQuote()}>Generate a random quote</button>
      </div>
      <h4 id="author">By @svigild</h4>
      </header>
    </div>
  );
}

export default App;
