const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'wishes.json');

module.exports = class Wish {
    constructor(wish) {
       this.description = wish; 
    }

    saveWish() {
        fs.promises.readFile(filePath)
            .then(fileContent => {
                let wishes = JSON.parse(fileContent);
                wishes.push(this);
                return fs.promises.writeFile(filePath, JSON.stringify(wishes));
            })
            .then(() => {
                console.log('Wish saved');
            })
            .catch(error => {
                console.error(error);
            });
    }
 
    static fetchAllWishes(callBack){
        fs.readFile(filePath, (error, fileContent) => {
            if(error){
                callBack([]);
            } else {
                callBack(JSON.parse(fileContent));
            }
        });
    }
}