const fs = require('fs');
const http = require('http');
const https = require('https');
const qs = require('querystring');

const optionObj = username => ({
  hostname: "https://api.github.com",
  path: `/users/${username}/starred`,
  headers: {
      'User-Agent': 'github-grabber'
  }
});

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        
        let body = '';
        req.on('data', d => {
            body += d;
        })
        
        req.on('end', () => {
            const username = qs.parse(body).username;
            const ws = fs.createWriteStream(`./${username}_starred_repos`);
            const options = optionObj(username);

            https.get(options, data => {
                let repoData = '';

                data.on('data', chunk => {
                    repoData += chunk;
                })

                data.on('end', () => {
                    const repos = JSON.parse(repoData).map(repo => {
                        return `Repo: ${repo.name}. Stars: ${repo.stargazer_count}`
                    }).join('\n')
                    ws.write(repos);
                    res.end(repos);
                })
            })
        })
    } else {
        res.end("DANGER, I am not a POST req");
    }
})

server.listen(8080, () => console.log('Listening on Port 8080'));