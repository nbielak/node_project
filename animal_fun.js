const fs = require ('fs');
const http = require('http');
const querystring = require('querystring');

let letter;
let cache = {};

function animalList(animals) {
    return animals
      .filter(animal => animal[0] === letter.toUpperCase())
      .join("\n");
};

// fs.readFile(`./animals.txt`, 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     let animals = animalList(data.split("\n"));

//     fs.writeFile(`${letter}_animals.txt`, animals, err => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log("File successfully written!");
//     });
// });
// let letter; 
const server = http.createServer((req, res) => {
    if (process.argv[2]) {
      letter = process.argv[2].toUpperCase();
    }
    
    console.log(querystring.stringify(req));
    
    fs.readFile(`./animals.txt`, 'utf-8', (err, data) => {
        let animals;
        if (err) {
            console.log(err);
            return;
        }

        if (!letter) {
            animals = data;
        } else if (cache[letter]) {
            animals = cache[letter];
        } else {
            animals = animalList(data.split("\n"));
            cache[letter] = animals;
        }
        
        res.write(animals);
        res.end();
        }
    )
})

server.listen(8000, () => console.log("I'm listening on port 8000"));