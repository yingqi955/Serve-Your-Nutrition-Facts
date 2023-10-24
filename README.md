source link for GAS 1: https://script.google.com/d/18Qknsp03HenrPpkcPYXUV6E_xApvO3Esvw7x9vFY2r2nuvqwpUOUUnLb/edit?usp=sharing
source link for GAS 2: https://script.google.com/d/1LJdLo6Gg1UyNFJTTzIp1DJCn72N9vjjiv3v7ik6_ADm3Gq33MKUOfSkC/edit?usp=sharing

# Serve your Nutrition Facts
## this is the application for user to type their input into the inputfield, and the system will pop out the basic informations such as energy, protein, fats in ratio (which the data is came from the GAS 1, the first GAS 1 does not support the amount calculation, and only shows the basic info ratio, that's why i used another GAS as second implementation for the amount calculation). And it will also output the Diet in and Features that show how the amount of the foods will impact the features that describe such foods, so that the user know whether their food is healthy or not (the data came from the GAS 2).

## examples: if user type "rice", it will not show the "Diet in" informations. If user type "10 oz rice", it will show the diet in and more accurate features that describe what the user eat.

- Code analysis:
  ```
  function btnClicked() {
  let value = document.getElementById('inputField').value
  getParseData(value)
  getParseData2(value)
  }



1. This function as button click, when the button click, it will direct to the getParseData and getParseData2. The getParseData contains calling GET and POST from GAS 1, and getParse2 contains calling GET in GAS 2.


```
function assignsuggestion(data){
document.getElementById('diet').innerHTML = ""
if(data.dietLabels.length==0){
  document.getElementById('diet').innerHTML = "No Diet Informations."
}
}
```



2. the above methods is for assigning the diet in and features that came from the GAS 2. 

```
async function fetchData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      assignParse(data);

    })
    .catch(error => console.error(error));
}
```

3. by fetching the data, we can know utilize the data came from the API and display to the user!

# That's all for serve your nutrition facts! this projects aims to let user know better about their basic serving size in ratio and how the amount can making an impact to their diet status and providing them ability to categorize their foods belongs to in the "features" section.

