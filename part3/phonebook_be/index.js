const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(express.json());

morgan.token('body', (request) => {
    return JSON.stringify(request.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get("/api/persons", (request, response) => {
    response.end(JSON.stringify(persons))
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
})

app.post("/api/persons", (request, response) => {
    // Renamed 'name' to 'personName' to fix dreplicate error with using 'name' 
    const { name: personName, number } = request.body;

    // check The name or number is missing
    if (!personName || !number) {
        return response.status(400).send({ error: 'name and number are required' });
    }
    // check The name already exists in the phonebook
    const existingPerson = persons.find(person => person.name === personName);
    if (existingPerson) {
        return response.status(400).send({ error: 'name must be unique' });
    }

    const randId = Math.floor(Math.random() * 100)
    const person = { id: String(randId), name: personName, number };
    persons = persons.concat(person)
    response.json(person)
})

app.put("/api/persons/:id", (request, response) => { })

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})

app.get("/info", (request, response) => {
    const currentTime = new Date().toString();
    const numberOfEntries = persons.length;
    response.send("phonebook has " + numberOfEntries + " people<br/>" + currentTime);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})
