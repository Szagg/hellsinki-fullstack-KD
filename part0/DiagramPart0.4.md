sequenceDiagram
    participant przegladarka
    participant server
Note right of przegladarka: Uzytkownik wpisuje notke i klika 'Save' 
 przegladarka->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of przegladarka: Wysyla wpisana notke (czyli, content=67)
    server--> przegladarka: odpowiedz przekierowania {"message":"note created"} (302) HTTP do /notes
    deactivate server

   Note right of przegladarka: Przegladarka odswieza sie

 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server--> przegladarka: dokument HTML
    deactivate server

 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server--> przegladarka: Plik CSS
    deactivate server

 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server--> przegladarka: Plik Javascript
    deactivate server

    Note right of przegladarka: Przegladarka zaczyna wykonywac kod JavaScript, ktory pobiera dane JSON z serwera

 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server--> przegladarka:  Plik JSON wyswietla wszystkie wiadomosci wraz z nowa
    deactivate server

    Note right of przegladarka: Przegladarka wykonuje funkcje zwrotna, ktora renderuje notatki aktualizujac je

    