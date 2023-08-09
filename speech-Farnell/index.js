var speech = true;
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

const grammar =
  "#JSGF V1.0; farnell | add product | go to basket | search | bav99 | remove";
Window.SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const speechRecognitionList = new Window.SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;

recognition.interimResults = false;
recognition.continuous = false;
recognition.maxAlternatives = 1;

//const words = document.querySelector(".words");
//words.appendChild(div);
//console.log(words);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  dojo.query("#rec #content")[0].innerText = transcript;
  let arr = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
  if (transcript.indexOf("go to basket") !== -1) {
    dojo.query("#shoppingCartBar")[0].click();
  } else if (transcript.indexOf("go to login") !== -1) {
    dojo.query(".logLink")[0].click();
  } else if (transcript.indexOf("go to register") !== -1) {
    dojo.query(".regLink")[0].click();
  } else if (transcript.indexOf("log in") !== -1) {
    dojo.query("#submitLogin")[0].click();
  } else if (transcript.indexOf("go back") !== -1) {
    history.back();
  } else if (transcript.indexOf("add") !== -1) {
    let addProdCount = transcript.split(" ")[1];
    if (addProdCount === "product") {
      dojo.query(".ajaxAddToCart.btnPrimary")[0].click();
    } else if (!isNaN(addProdCount)) {
      console.log(addProdCount);
      dojo.query(".qtyField input")[0].value = addProdCount;
      dojo.query(".qtyField input")[0].keyup;
      dojo.query(".ajaxAddToCart.btnPrimary")[0].click();
    } else {
      //console.log(addProdCount);
      console.log("ASk Valid");
    }
  } else if (transcript.indexOf("remove") !== -1) {
    let removeProd = transcript.split(" ")[1];

    if (removeProd === "all") {
      dojo.query("#selectAll")[0].click();
      dojo.query("#removeItems")[0].click();
    } else if (arr.includes(removeProd)) {
      let arrInd = arr.indexOf(removeProd);
      dojo
        .query("#removeItem", dojo.query("#orderItemLine")[arrInd])[0]
        .click();
    } else {
      console.log("ASk Valid");
    }
  } else if (transcript.indexOf("search") !== -1) {
    let searchProd = transcript.split("search")[1];
    var result = searchProd.slice(1);
    //console.log(result);
    dojo.query("#SimpleSearchForm_SearchTerm")[0].value = result;
    dojo.query("#searchMain")[0].click();
  } else if (transcript.indexOf("show all products") !== -1) {
    dojo.query(".showAllProductsBottom")[0].click();
  } else if (transcript.indexOf("open") !== -1) {
    let openProd = transcript.split(" ")[1];
    if (arr.includes(openProd)) {
      let arrInd = arr.indexOf(openProd);
      //         console.log(dojo.query('.productRow')[0]);
      dojo
        .query(".description a", dojo.query(".productRow")[arrInd])[0]
        .click();
    }
  } else if (transcript.indexOf("compare") !== -1) {
    let compareProds = transcript
      .split(" ")
      .filter((prod) => {
        if (arr.includes(prod)) {
          return prod;
        }
      })
      .map((prod) => {
        let arrInd = arr.indexOf(prod);
        dojo
          .query(".compareCheck", dojo.query(".productRow")[arrInd])[0]
          .click();
        return true;
      });
    if (compareProds.length > 0) {
      dojo.query(".compareButt")[0].click();
    }
  } else {
    console.log("ASk Valid");
  }
});

if (speech === true) {
  recognition.start();
  recognition.addEventListener("end", recognition.start);
}

setTimeout(() => {
  dojo.place(
    "<div id='rec' class='recognisation'><div id='mic'></div><div id='content'></div><div id='command'></div></div>",
    "footer",
    "before"
  );
}, 900);
