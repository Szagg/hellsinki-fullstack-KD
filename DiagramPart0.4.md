sequenceDiagram
    participant browser
    participant server
Note right of browser: Uzytkownik wpisuje notke i klika 'Save' 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Wysyla wpisana notke (czyli, content=67)
    server-->>browser: odpowiedz przekierowania (302) HTTP do /notes
    deactivate server

   Note right of browser: Przegladarka odswieza sie

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

    Note right of browser: Przegladarka zaczyna wykonywac kod JavaScript, ktory pobiera dane JSON z serwera

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: aktualizuje notki JSON (wliczajac nowa notke)
    deactivate server

    Note right of browser: Przegladarka wykonuje funkcje zwrotna (callback), ktora renderuje notatki

    