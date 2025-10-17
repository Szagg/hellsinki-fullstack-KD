sequenceDiagram
    participant przegladarka
    participant server
Note right of przegladarka: Uzytkownik wpisuje notke i klika 'Save' 
 przegladarka->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of przegladarka: Wysyla wpisana notke (czyli, content=68)
    server--> przegladarka: odpowiedz przekierowania {"message":"note created"} (201) HTTP do /spa
    deactivate server


    Note right of przegladarka: JavaScript wyswietla nowa notatke 

    