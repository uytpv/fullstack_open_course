```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes something into text field and clicks Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note contains JSON data
    activate server

    Note left of server: The server responds with HTTP status code 302

    server-->>browser: HTTP 302 Found
    deactivate server

    Note right of browser: The browser follows the redirect URL and requests the notes page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code to fetch the latest JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hello", "date": "2024-11-06T11:59:16.139Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```
