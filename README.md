# Who Are Ya? — Backend

# Dokumentazioa

```
Eneko Ruiz, Itxaso Urgoitia, Olaia Barriuso, Kepa Gaztañaga
06 / 01 / 2026
```
## Sarrera

Dokumentu honek "Who Are Ya?" aplikazioaren zerbitzariaren aldeko (backend) arkitektura, erabaki teknikoak eta APIaren definizioa biltzen ditu.

## Milestone 0: Arkitekturaren diseinua eta justifikazioa

Atal honetan proiektuaren egitura eta antolaketa definitzen dira, inplementazio fasea hasi aurretik oinarri sendoak ezartzeko helburuarekin.

### 2.1. Proiektuaren egitura

**Aukeratutako aukera: B aukera - Egitura modularra (modernoa):** src/ barruan antolatutako karpetak, sarrera-puntua server.js fitxategian duela.

**Justifikazioa:** Proiektuaren garapen osoa (Milestone 0tik 6ra) aztertu ondoren, egitura hau aukeratu dugu hiru arrazoi nagusirengatik:

1. **Kodearen antolaketa eta garbitasuna:** src/ direktorioaren erabilerak iturburu-kodea (logika) eta proiektuaren konfigurazio-fitxategiak (.env, package.json, .gitignore) argi bereizten ditu. Horrek proiektuaren erroa garbi mantentzen du eta nabigazioa errazten du garatzailearentzat.
   
2. **Models, Views eta Controllers-en erabilera:** Proiektu honek ereduak (Milestone 2: Mongoose Schemas erabiltzea esaten duenean), kontrolatzaileak (Milestone 4: API    REST logikarekin) eta Bistak (Milestone 5: EJS txantiloiak erabiltzeko) eskatzen dituenez, egitura modularrak osagai hauek karpeta independenteetan (/models, /controllers, /views) banatzea errazten du. "Express Generator" (A aukera) zaharkituta geratu da eta askotan beharrezkoak ez diren fitxategiak sortzen ditu, eta guk egitura garbiagoa behar dugu proiektuaren garapen osorako.

3. **Eskalagarritasuna** : Milestone 1ean scraping script-ak eta Milestone 4an API konplexu bat garatu behar direnez, egitura honek erraztasuna ematen du karpeta berriak sortzeko (adibidez /utils script-etarako edo /middleware segurtasunerako) proiektuaren arkitektura orokorra hautsi gabe.

**Baztertutako aukerak:** Bestalde, beste bi aukerak baztertu ditugu proiektuaren beharretara ez direlako ondo egokitzen. A aukera (Express Generator) zaharkituta geratu da; egitura zurrunegia sortzen du, askotan beharrezkoak ez diren fitxategi gehigarriekin. C aukera (Egitura hibridoa) ere ezetsi dugu, proiektuaren egungo tamainarako gehiegizko konplexutasuna ekarriko lukeelako; domeinuen araberako banaketa egitea ez da beharrezkoa etapa honetan eta karpeta-egitura soilik korapilatuko luke.

### 2.2. Zerbitzariaren sarrera-puntua

**Aukeratutako aukera: B aukera - server.js:** app inportatuz zerbitzaria abiarazten duen fitxategi bakarra.

**Justifikazioa:** Aukera hau bat dator 2.1 puntuan definitutako egitura modularrarekin (src/ karpetan oinarritua) honako arrazoiengatik:

1. **Argitasuna** : server.js fitxategia proiektuaren erroan egoteak edozein garatzaileri (edo irakasleari) berehala adierazten dio nondik abiarazi behar den aplikazioa (npm start edo node server.js abiaraziz). Ez dago karpeta ezkutuetan (Express generator-en bin/www bezala), eta horrek gardentasuna ematen dio proiektuari.

2. **Logika eta Exekuzioa bereiztea:** Egitura honekin, bi gauza desberdintzen ditugu:
    - src/ barruan: Aplikazioa zer den definitzen dugu (rutak, konfigurazioa, logika).
    
    - server.js fitxategian: Aplikazioa martxan jartzen dugu. Fitxategi honek soilik "pizteko botoiaren" funtzioa betetzen du: datu-basearekin konektatu (Milestone 2) eta zerbitzaria entzuten jarri. Honek kodea askoz ordenatuago mantentzen du.

3. **Datu-basearen konexio-fluxua:** MongoDB erabiltzen dugunean, garrantzitsua da zerbitzaria ez abiaraztea datu-basea konektatu arte. server.js fitxategia leku aproposa da ordena hori kontrolatzeko: lehenengo Datu-Basea konektatu, eta ondo badoa, orduan zerbitzaria abiarazi.

**Baztertutako aukerak:** Beste bi aukerak ez dira egokienak proiektu honen eskakizunetarako. 
- A aukera (bin/www) egitura zaharkitua da, fitxategien arrastoa jarraitzea zailduz. 
- Bestalde, C aukera (dena elkarrekin), hasieran erraza dirudien arren, praktika txarra da proiektu ertain/handietan; konfigurazioa eta zerbitzariaren abiaraztea fitxategi berean nahasteak kodea zikintzen du eta asko zailtzen du unit testing-a (ezin delako aplikazioa probatu zerbitzaria portu batean altxatu gabe).

## 2.3. Karpeta antolaketa

Aukeratutako aukera: A aukera — Motaren arabera (MVC Eredua): /routes, /controllers, /models moduko karpetak erabiliz.

**Justifikazioa:** Egitura hau hautatu dugu **Model-View-Controller (MVC)** patroi arkitektonikoa jarraitzen duelako. Proiektuaren eskakizunak aztertu ondoren, hau da aukerarik egokiena arrazoi hauengatik:

1. **Milestones-en logikarekin lerrokatzea:** Proiektuaren fase bakoitzak geruza tekniko espezifiko bat garatzen du, eta egitura honek horretarako karpeta propioak eskaintzen ditu:

    - **Milestone 2 (Datuak):** Datu-basearen definizioak src/models karpetan zentralizatuko dira (Player, Team, League), proiektu osotik eskuragarri egon daitezen.

    - **Milestone 3 (Segurtasuna):** Autentifikazioa kudeatzeko src/middleware karpeta erabiliko dugu, kontrolatzaileetan kodea bikoiztea saihestuz.
       
    - **Milestone 4 (API Logika):** Bideratzeak (routes) eta negozio-logika (controllers) bereizteak kodea askoz garbiagoa egiten du API REST bat garatzean.
       
    - **Milestone 5 (Admin Panela):** Administrazio interfazea zerbitzarian renderizatuko denez (SSR), src/views karpeta erabiliko dugu EJS txantiloietarako.

2. **Argitasuna:** Garatzaile taldearentzat askoz errazagoa da fitxategiak aurkitzea funtzio teknikoaren arabera antolatuta daudenean (adibidez: "non dago datu-baseko    eskema?" → models karpetan), domeinuaren arabera sakabanatuta daudenean baino.

**Baztertutako aukerak:** Beste bi aukerak ezetsi ditugu proiektuaren eskalara ez direlako ondo egokitzen. 
- B aukera (Moduluaren arabera), domeinu bakoitzak (Players, Users) bere karpeta propioa izatea proposatzen duena, erabilgarria izan daitekeen arren, proiektu honetan gehiegikeria ekarriko luke; logika sakabanatu egingo litzateke eta zailagoa litzateke proiektuaren ikuspegi orokorra izatea. 

- C aukera (Hibridoa) ere baztertu dugu, koherentzia falta ekar dezakeelako; garatzaileentzat zaila izan daiteke erabakitzea fitxategi bat karpeta orokor batera edo modulu batera doan, eta horrek kode bikoiztuak eta estandar falta sor ditzake.

**Hasierako karpeta-zuhaitza:** Aukeratutako egituren arabera (B aukera 2.1ean, B aukera 2.2an eta A aukera 2.3an), honako hau da gure proiektuaren hasierako egitura:
```
whoareya/
├── node_modules/
├── public/ # Fitxategi estatikoak (Milestone 1)
│ ├── images/
│ │ ├── leagues/
│ │ ├── nations/
│ │ ├── players/
│ │ └── teams/
├── src/ # Iturburu kodea
│ ├── config/ # Konfigurazioa eta DB konexioa
│ ├── controllers/ # Eskaeren logika (Milestone 4)
│ ├── middleware/ # Autentifikazioa eta balidazioak (Milestone 3)
│ ├── models/ # Mongoose eskemak (Milestone 2)
│ ├── routes/ # APIaren definizioak
│ └── views/ # EJS txantiloiak (Milestone 5 - Admin)
├── .env # Ingurune aldagaiak (ez da subitu behar)
├── .gitignore
├── package.json
├── README.md
└── server.js # Sarrera puntua
```
### 2.4. Konfigurazioaren kudeaketa

Aukeratutako aukera: A aukera — .env erabiltzea (dotenv liburutegiaren bidez).

**Justifikazioa** : Gure backend-aren konfigurazioa kudeatzeko, industriako estandarra den .env fitxategien erabilera zuzena aukeratu dugu. Erabaki hau hiru printzipiotan oinarritzen da:

- **Sinpletasuna eta Arintasuna:** process.env zuzenean erabiltzeak bitartekari-geruza gehigarriak saihesten ditu. Horrek kodea ulergarriagoa egiten du talde osoarentzat eta garapen abiadura handitzen du, aldagai bat behar den lekuan bertan eskuragarri baitago.

- **Estandarizazioa** : Node.js ekosisteman, dotenv liburutegia da ingurune-aldagaiak kudeatzeko tresnarik hedatuena. Dokumentazio zabala du eta edozein garatzailek erraz ulertzen du nola funtzionatzen duen, ikasketa-kurba murriztuz.

- **Bereizketa argia:** .env fitxategia .gitignore zerrendan egoteak bermatzen du sekretuak (API gakoak, pasahitzak) ez direla inoiz errepositoriora igotzen, segurtasuna mantenduz inplementazio konplexurik gabe.

**Baztertutako aukerak: B aukera (Konfigurazio zentralizatua)** baztertu dugu proiektuaren egungo tamainarako gehiegizkoa delako. Fitxategi gehigarri bat sortzeak eta mantentzeak
konplexutasuna gehitzen du onura argirik ekarri gabe gure kasuan.

**Definitutako aldagaiak:** Estrategia honen barruan, honako aldagai hauek zentralizatuko ditugu:
```
Zerbitzaria: PORT (defektuz 3000).
Datu-basea: MONGODB_URI (MongoDBrako konexio-katea).
Segurtasuna: SESSION_SECRET (erabiltzaileen saioak zifratzeko gakoa) eta admin-aren
lehenetsitako kredentzialak (aukerakoa garapenerako).
```
### 2.5. Espezifikazioa: Sistemaren ibilbideak (API Endpoints)


Hemen definitzen dira aplikazioak izango dituen sarrera-puntu nagusiak, bi multzotan banatuta: Publikoak (Jokoa) eta Pribatuak (Administrazioa).
**A. Jokoaren API Publikoa (Ez du autentifikaziorik behar)**
Frontend-eko loaders.js fitxategiak kontsumituko dituen ibilbideak.

| Metodoa | Endpoint                  | Deskribapena                                                   | Baimena  |
|---------|---------------------------|----------------------------------------------------------------|----------|
| GET     | /api/players              | Jokalari guztien zerrenda itzultzen du (autocompleterako).     | Publikoa |
| GET     | /api/players/:id          | Jokalari zehatz baten datuak itzultzen ditu (konparaketarako). | Publikoa |
| GET     | /api/solution/:gameNumber | Eguneko jokalari "ezkutua" itzultzen du zenbakiaren arabera.   | Publikoa |

**B. Administrazio APIa (Admin rola beharrezkoa)**
Panelak erabiliko dituen CRUD eragiketak.

Administratzaile erabiltzailea sortzen den lehenengo erabiltzailea izango da soilik. Gurea iada sortuta dago eta erabiltzailea _admin@admin.com_ izango da eta pasahitza _admin_.

| Metodoa | Endpoint                | Deskribapena                                | Baimena  |
|---------|-------------------------|---------------------------------------------|----------|
| POST    | /api/register           | Erabiltzaile berria sortu (Admin sortzeko). | Publikoa |
| POST    | /api/login              | Saioa hasi sisteman.                        | Publikoa |
| GET     | /admin                  | Admin panelaren bista nagusia (SSR/EJS).    | Admin    |
| GET     | /admin/players          | Jokalariak ikusi eta aukeratu               | Admin    |
| POST    | /admin/players/new      | Jokalari berri bat datu-basean sortu.       | Admin    |
| PUT     | /admin/players/edit/:id | Jokalari baten datuak eguneratu.            | Admin    |
| DELETE  | /admin/players/:id      | Jokalari bat ezabatu.                       | Admin    |