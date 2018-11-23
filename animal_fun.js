const fs = require ('fs');
const http = require('http');
const querystring = require('querystring');

// const letter = process.argv[2].toUpperCase();

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

const server = http.createServer((req, res) => {
    let letter = process.argv[2];
    
    fs.readFile(`./animals.txt`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let animals = letter ? animalList(data.split("\n")) : data
        res.write(animals);
        res.end();
        }
    )
})

server.listen(8000, () => console.log("I'm listening on port 8000"));