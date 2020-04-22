const fs = require("fs");
const axios = require('axios');

const dotenv = require('dotenv');
const envPath = `.env.${process.env.NODE_ENV}`;

dotenv.load({ path: envPath });

class PlanService {

    constructor(props) {
    }

    async invokePlan() {
        try {
            // read contents of the file
            console.log(`file path is ${process.env.PLAN_SKU_FILE_PATH}`);
            if (fs.existsSync(`${process.env.PLAN_SKU_FILE_PATH}`)) {
                const data = fs.readFileSync(`${process.env.PLAN_SKU_FILE_PATH}`, 'UTF-8');

                // split the contents by comma seperated
                const lines = data.split(',');

                // print all lines
                lines.forEach((line) => {
                    this.getPlanDetails(line)
                });
            } else {
               throw new Error('!!!!!No Input File Found !!!!!!!')
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    getPlanDetails(planId) {
        console.log('Invoking URL', `${process.env.PRODUCT_CATALOG_URL}${planId}`)
        axios.get(`${process.env.PRODUCT_CATALOG_URL}${planId}`)
            .then(res => {
                this.writeToFile(JSON.stringify(res.data), planId);
            })
            .catch(err => {
                console.log("No Results Found for PlanId:",planId);
            });
    }

    writeToFile(data, planId) {
        let fileName = `${process.env.PLAN_OUTPUT_FILE_PATH}${planId}.json`;
        fs.writeFile(fileName, data, function (err) {
            if (err) throw err;
        });
    }
}

module.exports =  PlanService;
