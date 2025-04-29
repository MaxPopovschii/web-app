# 🌱 EcoFootprint Tracker

Un'app mobile per calcolare, monitorare e ridurre la propria impronta ecologica. Sviluppata con React Native (Expo) per il client, Spring Boot per il backend e MySQL come database.

---

## 📌 Indice

- [🌍 Cos'è l'Ecofootprint](#-cosè-lecofootprint)
- [🎯 Obiettivi del Progetto](#-obiettivi-del-progetto)
- [🧑‍💻 Tecnologie Utilizzate](#-tecnologie-utilizzate)
- [📱 Interfaccia Utente](#-interfaccia-utente)
- [📊 Schema del Database](#-schema-del-database)
- [⚙️ Esempi di Codice](#️-esempi-di-codice)
- [🚀 Come Avviare il Progetto](#-come-avviare-il-progetto)
- [📽️ Video Dimostrativo](#️-video-dimostrativo)
- [📄 Licenza](#-licenza)

---

## 🌍 Cos'è l'Ecofootprint

L'**ecofootprint** (impronta ecologica) misura l'impatto delle attività umane sull'ambiente, considerando il consumo di risorse naturali e la produzione di emissioni. Monitorare la propria impronta aiuta a:

- Comprendere il proprio impatto ambientale.
- Identificare comportamenti sostenibili.
- Promuovere uno stile di vita responsabile.

---

## 🎯 Obiettivi del Progetto

- **Educare** gli utenti sull'importanza della sostenibilità.
- **Fornire** uno strumento intuitivo per calcolare e monitorare l'ecofootprint.
- **Suggerire** azioni concrete per ridurre l'impatto ambientale.

---

## 🧑‍💻 Tecnologie Utilizzate

### Frontend (Client)

- **Linguaggio:** JavaScript
- **Framework:** [React Native](https://reactnative.dev/) con [Expo](https://expo.dev/)
- **Funzionalità:**
  - Interfaccia utente responsive.
  - Navigazione intuitiva.
  - Visualizzazione grafica dei dati.

### Backend (Server)

- **Linguaggio:** Java
- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot)
- **Funzionalità:**
  - API RESTful.
  - Autenticazione e autorizzazione.
  - Calcolo e memorizzazione dell'ecofootprint.

### Database

- **Sistema:** [MySQL](https://www.mysql.com/)
- **Struttura:**
  - Tabelle per utenti, attività, categorie e impronte ecologiche.

---

## 📱 Interfaccia Utente

![Schermata Home](./assets/screenshot-home.png)
*Schermata principale dell'app.*

![Calcolo Impronta](./assets/screenshot-calcolo.png)
*Modulo per il calcolo dell'ecofootprint.*

![Risultati](./assets/screenshot-risultati.png)
*Visualizzazione dei risultati e suggerimenti.*

---

## 📊 Schema del Database

Di seguito è riportato lo schema del database aggiornato:

```mermaid
erDiagram
    UTENTI {
        varchar(100) email PK
        varchar(50) nome
        varchar(50) cognome
        varchar(255) password_hash
        datetime data_registrazione
        datetime ultimo_accesso
    }
    ATTIVITA {
        int id_attivita PK
        varchar(100) email_utente FK
        int id_tipo_attivita FK
        datetime data_inserimento
        text note
    }
    CATEGORIE {
        int id_categoria PK
        varchar(50) nome
        text descrizione
    }
    TIPIATTIVITA {
        int id_tipo_attivita PK
        int id_categoria FK
        varchar(50) nome
        varchar(20) unita_misura
        decimal(10,4) fattore_conversione
    }
    ATTIVITAALIMENTAZIONE {
        int id_attivita_alimentazione PK
        int id_attivita FK
        decimal(10,2) quantita
        varchar(50) origine_prodotto
        tinyint biologico
        varchar(50) imballaggio
        datetime data_consumo
    }
    ATTIVITACASA {
        int id_attivita_casa PK
        int id_attivita FK
        datetime data_inizio
        datetime data_fine
        decimal(10,2) quantita
        varchar(50) lettura_contatore_iniziale
        varchar(50) lettura_contatore_finale
    }
    ATTIVITATRASPORTO {
        int id_attivita_trasporto PK
        int id_attivita FK
        varchar(50) mezzo_trasporto
        varchar(100) punto_partenza
        varchar(100) punto_arrivo
        decimal(10,2) distanza
        datetime data_viaggio
        int numero_passeggeri
        varchar(50) tipo_carburante
    }
    ECOFOOTPRINT {
        int id_ecofootprint PK
        int id_attivita FK
        decimal(10,4) co2_equivalente
        datetime data_calcolo
    }

    UTENTI ||--o{ ATTIVITA : "ha"
    CATEGORIE ||--o{ TIPIATTIVITA : "contiene"
    TIPIATTIVITA ||--o{ ATTIVITA : "classifica"
    ATTIVITA ||--o{ ATTIVITAALIMENTAZIONE : "dettagli-alimentazione"
    ATTIVITA ||--o{ ATTIVITACASA : "dettagli-casa"
    ATTIVITA ||--o{ ATTIVITATRASPORTO : "dettagli-trasporto"
    ATTIVITA ||--o{ ECOFOOTPRINT : "calcoli"
```

### Descrizione Tabelle

- **UTENTI:** Informazioni sugli utenti registrati.
- **ATTIVITA:** Attività generali registrate dagli utenti.
- **CATEGORIE:** Categorie di attività (es. Trasporti, Casa, Alimentazione).
- **TIPIATTIVITA:** Tipologie di attività con unità di misura e fattori di conversione.
- **ATTIVITAALIMENTAZIONE, ATTIVITACASA, ATTIVITATRASPORTO:** Dettagli specifici delle attività.
- **ECOFOOTPRINT:** Calcoli dell'impronta ecologica.

---

## ⚙️ Esempi di Codice

### Frontend (React Native)

```javascript
// Esempio di fetch dei dati dell'ecofootprint
useEffect(() => {
  fetch('https://api.ecofootprint.com/user/footprint')
    .then(response => response.json())
    .then(data => setFootprint(data));
}, []);
```

### Backend (Spring Boot)

```java
// Endpoint per ottenere l'ecofootprint dell'utente
@GetMapping("/user/footprint")
public ResponseEntity<Footprint> getUserFootprint(@RequestParam Long userId) {
    Footprint footprint = footprintService.calculate(userId);
    return ResponseEntity.ok(footprint);
}
```

---

## 🚀 Come Avviare il Progetto

### Prerequisiti

- [Node.js](https://nodejs.org/) installato.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installato globalmente.
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installato.
- [MySQL](https://www.mysql.com/) installato e configurato.

### Avvio del Client

```bash
cd client
npm install
npx expo start
```

### Avvio del Server

```bash
cd server
./mvnw spring-boot:run
```

---

## 📽️ Video Dimostrativo

Per una panoramica completa dell'applicazione, guarda il video dimostrativo:

[![Demo Video](./assets/demo-thumbnail.png)](https://www.youtube.com/watch?v=tuo_video_id)

---

## 📄 Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file [LICENSE](./LICENSE) per maggiori dettagli.

---
