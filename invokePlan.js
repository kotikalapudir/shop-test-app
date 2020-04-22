var fs = require("fs");
const axios = require('axios');

function invokePlan(){
      try {
        // read contents of the file
        if(fs.existsSync('plansku.txt')) {
            const data = fs.readFileSync('plansku.txt', 'UTF-8');
    
            // split the contents by new line
            const lines = data.split(/\r?\n/);
    
            // print all lines
            lines.forEach((line) => {
            console.log(line);
            getPlanDetails(line)
            });
        }else{
            console.log('No File exists !!!!!');
        }
    } catch (err) {
        console.error(err);
    }
}

function getPlanDetails(planId) {
    const url = 'https://shop.vodafone.com.au/rest/service/ProductCatalog/planSku?externalSkuId='+planId;
    console.log('Invoking URL',url)
    axios.get(url)
.then(res => {
    writeToFile(JSON. stringify(res.data),planId);
  })
  .catch(err => {
    console.log("No Results Found");
  });
}

function writeToFile(data,planId){
    let fileName = planId+'.txt';
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;      
      });
}

invokePlan()