sequenceDiagram
    participant browser
    participant server
Note right of browser: Uzytkownik wpisuje notke i klika 'Save' 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Wysyla wpisana notke (czyli, content=68)
    server-->>browser: odpowiedz przekierowania (201) HTTP do /spa
    deactivate server

   Note right of browser: Przegladarka odswieza sie

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
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

    Note right of browser: Przegladarka zaczyna wykonywac kod JavaScript, ktory pobiera dane JSON z serwera

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "68", "date": "2025-10-16" }, ... ]
    deactivate server

    Note right of browser: Przegladarka wykonuje funkcje zwrotna (callback), ktora renderuje notatki aktualizujac je

    