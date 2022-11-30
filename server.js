
const http = require('http');
const { getMaxListeners } = require('process');
const url = require('url');
const { deleteUser, getAllUsers, getUserById, createUser, updateUser } = require('./modules/fakeDb');



const server = http.createServer((req, res) => {

    const requestURL = url.parse(req.url, true);

    const notFound = () => {
        res.writeHead(404)
        res.end('Not found')
    }
    
    const badRequest = () => {
        res.writeHead(401)
        res.end('Bad Request')
    }

    switch (requestURL.pathname) {
        case '/users':
            const users = getAllUsers()
            res.writeHead(200, {'Content-type' : 'application/json'})
            res.end(JSON.stringify(users))
            break;

        case '/user':
            if (requestURL.query.id) {
                const user = getUserById(requestURL.query.id)
                if (user) {
                    res.writeHead(200, {'Content-type' : 'application/json'})
                    res.end(JSON.stringify(user))
                }
                else{
                    notFound()
                }
            }
            else{
                badRequest()
            }
            break;
        
        case '/create':
            if (requestURL.query.name) {
                createUser(requestURL.query.name)
                res.writeHead(301, {'location' : 'http://localhost:1337/users'})
                res.end()
            }
            else{
                badRequest()
            }
            break;
        
        case '/update':
            if (requestURL.query.id && requestURL.query.name) {
                if (updateUser(requestURL.query.id, requestURL.query.name)) {
                    res.writeHead(301, {'location' : 'http://localhost:1337/users'})
                    res.end()
                }
                else{
                    badRequest()
                }
            }
            else{
                badRequest()
            }
            break;
        case '/delete':
            if (requestURL.query.id) {
                if (deleteUser(requestURL.query.id)) {
                    res.writeHead(301, {'location' : 'http://localhost:1337/users'})
                    res.end()
                }
                else{
                    badRequest()
                }
                
            }
            else{
                badRequest()
            }
        break;
    
        default:
            notFound()
            break;
    }




})

server.listen(1337)