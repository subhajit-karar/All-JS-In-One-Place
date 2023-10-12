var speech = true;
let scrollPos = window.scrollY;
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

let speakData = new SpeechSynthesisUtterance();
speakData.rate = 0.9;
speakData.pitch = 1;

recognition.addEventListener("result", async (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  // dojo.query('#rec #your')[0].innerText = transcript;
  console.log(transcript);
  let arr = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
  if (transcript.indexOf("stop") !== -1) {
    speechSynthesis.cancel();
  }

  if (transcript.indexOf("hello") !== -1) {
    let text = "hello Subhajit, Welcome to Farnell";
    speakData.text = text;
    await speechSynthesis.speak(speakData);
  }

  if (transcript.indexOf("go to basket") !== -1) {
    dojo.query("#shoppingCartBar")[0].click();
  } else if (transcript.indexOf("go down") !== -1) {
    window.scroll({
      top: window.scrollY + 500,
      behavior: "smooth",
    });
  } else if (transcript.indexOf("go up") !== -1) {
    window.scroll({
      top: window.scrollY - 500,
      behavior: "smooth",
    });
  } else if (transcript.indexOf("go to top") !== -1) {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  } else if (transcript.indexOf("go to login") !== -1) {
    dojo.query(".logLink")[0].click();
  } else if (transcript.indexOf("read me product") !== -1) {
    speakData.text = document.querySelector(
      "#pdpSection_FAndB .collapsable-content"
    ).innerText;

    speechSynthesis.speak(speakData);
  } else if (transcript.indexOf("go to register") !== -1) {
    dojo.query(".regLink")[0].click();
  } else if (transcript.indexOf("log in") !== -1) {
    dojo.query("#submitLogin")[0].click();
  } else if (transcript.indexOf("go back") !== -1) {
    history.back();
  } else if (transcript.indexOf("add ") !== -1) {
    let addProdCount = transcript.split("add ")[1];
    if (addProdCount === "product") {
      dojo.query(".ajaxAddToCart.btnPrimary")[0].click();
      speakData.text = "Product added into basket";
      await speechSynthesis.speak(speakData);
    } else if (!isNaN(addProdCount)) {
      console.log(addProdCount);
      dojo.query(".qtyField input")[0].value = addProdCount;
      dojo.query(".qtyField input")[1].value = addProdCount;

      dojo.query(".qtyField input")[0].keyup;
      dojo.query(".ajaxAddToCart.btnPrimary")[0].click();
      speakData.text = "Product added into basket";
      await speechSynthesis.speak(speakData);
    } else if (arr.includes(addProdCount)) {
      if (globalPageName == "compareProductPage") {
        let arrInd = arr.indexOf(addProdCount);
        document
          .querySelector(
            `#compareTable tbody tr:last-child td:nth-child(${arrInd + 2}) .btn`
          )
          .click();
        speakData.text = "Product added into basket";
        await speechSynthesis.speak(speakData);
      } else if (globalPageName == "Search") {
        let arrInd = arr.indexOf(addProdCount);
        dojo
          .query(".btn.btnPrimary", dojo.query(".productRow")[arrInd])[0]
          .click();
        speakData.text = "Product added into basket";
        await speechSynthesis.speak(speakData);
      }
    } else {
      //console.log(addProdCount);
      console.log("ASk Valid");
    }
  } else if (transcript.indexOf("remove") !== -1) {
    let removeProd = transcript.split(" ")[1];

    if (removeProd === "all") {
      dojo.query("#selectAll")[0].click();
      dojo.query("#removeItems")[0].click();
      speakData.text = "All products removed";
      await speechSynthesis.speak(speakData);
    } else if (arr.includes(removeProd)) {
      let arrInd = arr.indexOf(removeProd);
      speakData.text = "product has been removed from basket";
      await speechSynthesis.speak(speakData);
      dojo
        .query("#removeItem", dojo.query("#orderItemLine")[arrInd])[0]
        .click();
    } else {
      console.log("ASk Valid");
    }
  } else if (transcript.indexOf("search ") !== -1) {
    let searchProd = transcript.split("search")[1];
    var result = searchProd.slice(1);

    speakData.text = "Searching for " + result;
    await speechSynthesis.speak(speakData);
    dojo.query("#SimpleSearchForm_SearchTerm")[0].value = result;
    dojo.query("#searchMain")[0].click();
  } else if (transcript.indexOf("show all products") !== -1) {
    speakData.text = "opening full list of products";
    await speechSynthesis.speak(speakData);
    dojo.query(".showAllProductsBottom")[0].click();
  } else if (transcript.indexOf("open") !== -1) {
    let openProd = transcript.split(" ")[1];
    if (arr.includes(openProd)) {
      let arrInd = arr.indexOf(openProd);
      dojo
        .query(".description a", dojo.query(".productRow")[arrInd])[0]
        .click();
    }
  } else if (transcript.indexOf("compare ") !== -1) {
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
      speakData.text = "Comparing";
      await speechSynthesis.speak(speakData);
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

/*
recognition.onend = () => {
	console.log("4. Speech recognition service disconnected");
};
recognition.onspeechend = () => {
	console.log("1. Speech has stopped being detected");
};
recognition.onsoundend = (event) => {
	console.log("2. Sound has stopped being received");
};
recognition.onaudioend = () => {
	console.log("3. Audio capturing ended");
};

recognition.onerror = () => {
	console.log("Error detected");
};
recognition.onnomatch = () => {
	console.error("Speech not recognized");
};
*/
//recognition.addEventListener("end", recognition.start);
setTimeout(() => {
  dojo.place(
    `<div id='rec' class='recognisation'>
		<div id='mic'></div>
		<div id='content'><div id='your'>&nbsp;</div>
		</div>
		<div id='command'> hello Farnell | Could you search * | show all products | add product | add * (quantity / first / second ) | compare * (first, second,  etc.. ) | go up / down | got to basket | remove * (first / second / all) |</div></div>`,
    "footer",
    "before"
  );
  //speechSynthesis.speak(speakData);
  document.getElementById("mic").addEventListener("click", (e) => {
    //recognition.start();

    if (dojo.hasClass(dojo.byId("mic"), "active")) {
      dojo.removeClass(dojo.byId("mic"), "active");
      speech = false;
      //recognition.stop();
      //recognition.addEventListener("end", recognition.stop);
    } else {
      dojo.addClass(dojo.byId("mic"), "active");
      // recognition.start();

      speech = true;
    }
    /*   recognition.addEventListener("end", function() {

								if(speech === true){
										recognition.start();                  
								}else{
								recognition.stop()       
								}
					 });*/
  });
}, 1000);
