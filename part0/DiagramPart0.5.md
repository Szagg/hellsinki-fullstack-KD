sequenceDiagram 
participant przegladarka 
participant server
 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server--> przegladarka: Dokument HTML
deactivate server
 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server--> przegladarka: Plik CSS
deactivate server
 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate server
server--> przegladarka: Plik JavaScript dla SPA
deactivate server

Note right of przegladarka: Przegladarka zaczyna wykonywac kod JavaScript, ktory pobiera dane JSON z serwera
 przegladarka->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server--> przegladarka: JSON ze wszystkimi zapisanymi notatkami
deactivate server

Note right of przegladarka: Przegladarka wykonuje funkcje zwrotna, ktora renderuje notatki aktualizujac je