//the GAS fetching the edaman data for the basic number of calories, fats, etc
const GAS_URL1 = `https://script.google.com/macros/s/AKfycbwAMKTd1JJT53-0Z-FoFN02gT3Wr1CS8wM9-CUH26h0uFZ3jezmVPBy1sUO0r3oLiAS/exec`

//This is the GAS_URL2 for looking at the specific suggestion, allergy. 
const GAS_URL2 = `https://script.google.com/macros/s/AKfycbyD-Nwvaj1OeOpyqpx8RkFvYQ47yWuejWxvXc5Muu0EX1P-R7ptq0ACRVncWM4qAWRxhA/exec`

try {
  main()
}
catch (e) {
  console.log("Error:" + e.message)
}

function main() {
  document.getElementById('btn').addEventListener('click', btnClicked)
}

function btnClicked() {
  let value = document.getElementById('inputField').value
  getParseData(value)
  getParseData2(value)
}

/** 
after getting the parsed data, we need to assign it into
our html value*/
async function assignParse(data) {
  //console.log(data.text)
  // console.log("text: ",data.text)
  // console.log("foodid: ",data.parsed[0].food.foodId)
  // console.log("kcal: ", data.parsed[0].food.nutrients.ENERC_KCAL)
  // console.log("protein: ", data.parsed[0].food.nutrients.PROCNT)
  // console.log("fat: ", data.parsed[0].food.nutrients.FAT)
  // console.log("kcal: ", data.parsed[0].food.nutrients.ENERC_KCAL)
  // console.log("image: ", data.parsed[0].food.image)
  // console.log("measure uri: ", data.hints[0].measures[0].uri)
  document.getElementById('item').innerHTML = data.text;
  document.getElementById('energy').innerHTML = data.parsed[0].food.nutrients.ENERC_KCAL;
  document.getElementById('protein').innerHTML = data.parsed[0].food.nutrients.PROCNT;
  document.getElementById('fat').innerHTML = data.parsed[0].food.nutrients.FAT;
  document.getElementById('image').setAttribute('src', data.parsed[0].food.image)

  displayOutput();
  // getPost(foodid = data.parsed[0].food.foodId, measureuri = data.hints[0].measures[0].uri);
  
}

// function getPost(foodid, measureuri) {
//   fetch(GAS_URL1, {
//     method: 'POST',
//     body: JSON.stringify({ ingredients: [{ measureURI: measureuri, foodId: foodid }] })
//   })
//     .then(response => response.json())
//     .then(data => getsuggestion(data))
//     .catch(error => console.error(error));
// }

// function getsuggestion(data) {
//   console.log(data.healthLabels);
//   document.getElementById('suggestion').innerHTML;
//   for(let i = 0; i < data.healthLabels.length; i++){
//     // document.getElementById('suggestion').innerHTML += data.healthLabels[i] + "<br>";
//     document.getElementById('suggestion').innerHTML += 
//       `${i+1}:  ${data.healthLabels[i]} 
//         <br>`;
//   }
// }

function assignsuggestion(data){
  //console.log(data.dietLabels);

  //assign the information for diet informations from api
  document.getElementById('diet').innerHTML = ""
  if(data.dietLabels.length==0){
    document.getElementById('diet').innerHTML = "No Diet Informations."
  }
  for(let i = 0; i < data.dietLabels.length; i++){
    document.getElementById('diet').innerHTML += 
      `<br> 
      ${i+1}:  ${data.dietLabels[i]} 
          <br>`;

  }

  
  document.getElementById('suggestion').innerHTML = ""
  //document.getElementById('suggestion').innerHTML;
  for(let i = 0; i < data.healthLabels.length-2; i++){
    // document.getElementById('suggestion').innerHTML += data.healthLabels[i] + "<br>";
    document.getElementById('suggestion').innerHTML += 
      `${i+1}:  ${data.healthLabels[i]} ${'\xa0'.repeat(10)} ${i+2}:  ${data.healthLabels[i+2]} 
          <br>`;
  }

  
  
  
  
}


function displayOutput() {
  document.getElementById('output').hidden = false;
}

/** 
this method will call the doGet in google app script*/
async function getParseData(value) {
  try {
    const url = GAS_URL1 + "?ingr=" + encodeURIComponent(value);
    //print out the url for debugging in postman
    console.log(url)
    const data = await fetchData(url);
  }
  catch (e) {
    console.log("unable to get the nutrient data: " + e.message);
  }



}

async function getParseData2(value) {

  try{
    const url = GAS_URL2 + "?ingr=" + encodeURIComponent(value);
    console.log(url)
    //start fetching the data that came from the gas2
    fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      assignsuggestion(data);

    })

    .catch(error => console.error(error));
    
  }catch (e) {
    console.log("unable to get the nutrient data: " + e.message);
  }
}

async function fetchData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      assignParse(data);

    })

    .catch(error => console.error(error));
}

