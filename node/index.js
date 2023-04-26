const express = require('express')
const mysql = require('mysql')
const faker = require('faker')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

// Inclui alguns metodos para facilitar o teste

let connection = mysql.createConnection(config)

const createPeopleTable = () => {
    const query = 'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))'
    connection.query(query)
}

const insertPeople = (name) => {
    const query = `INSERT INTO people(name) values('${name}')`
    connection.query(query)
}

createPeopleTable()

const beforeRequest = (_request, _response, next) => {
    connection = mysql.createConnection(config)
    
    insertPeople(faker.name.firstName())

    next()
}

const endConnection = () => {
    connection.end()
}

app.get('/', beforeRequest, (_request, response, next) => {
    const query = `SELECT name FROM people`
    
    connection.query(query, (_error, result) => {
        let body = '<h1>Full Cycle Rocks!</h1>'
        
        body+= `<ul><li>${result.map(people => people.name).join('</li><li>')}</li></ul>`
        
        response.send(body)
    })

    next()
}, endConnection)

app.listen(port, ()=> {
    console.log(`Rodando na porta ${port}`)
})