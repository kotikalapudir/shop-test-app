const fs = require("fs");
const axios = require('axios');

const dotenv = require('dotenv');
const envPath = `.env.${process.env.NODE_ENV}`;

dotenv.load({ path: envPath });

class AddonService {

    constructor(props) {
    }

    invokeAddon() {
        try {
            // read contents of the file
            console.log(`file path is ${process.env.ADDON_SKU_FILE_PATH}`);
            if (fs.existsSync(`${process.env.ADDON_SKU_FILE_PATH}`)) {
                const data = fs.readFileSync(`${process.env.ADDON_SKU_FILE_PATH}`, 'UTF-8');

                // split the contents by comma seperator
                const lines = data.split(',');

                // print all lines
                lines.forEach((line) => {
                    this.getAddonDetails(line)
                });
            } else {
               throw new Error('!!!!!!!No Addon Input file found !!!!!')
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    getAddonDetails(planId) {
        console.log('Invoking URL', `${process.env.AADON_URL}${planId}`)
        axios.get(`${process.env.AADON_URL}${planId}`)
            .then(res => {
                this.writeToFile(JSON.stringify(res.data), planId);
            })
            .catch(err => {
                console.log("No Results Found for Addon Id:",planId);
            });
    }

    writeToFile(data, planId) {
        let fileName = `${process.env.ADDON_OUTPUT_FILE_PATH}${planId}.json`;
        fs.writeFile(fileName, data, function (err) {
            if (err) throw err;
        });
    }
}
module.exports =  AddonService;
