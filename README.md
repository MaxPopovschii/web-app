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

Di seguito è riportato lo schema aggiornato del database:

```mermaid
erDiagram
    UTENTI {
        email PK
        nome
        cognome
        password_hash
        data_registrazione
        ultimo_accesso
    }
    ATTIVITA {
        id_attivita PK
        email_utente FK
        id_tipo_attivita FK
        data_inserimento
        note
    }
    CATEGORIE {
        id_categoria PK
        nome
        descrizione
    }
    TIPIATTIVITA {
        id_tipo_attivita PK
        id_categoria FK
        nome
        unita_misura
        fattore_conversione
    }
    ATTIVITAALIMENTAZIONE {
        id_attivita_alimentazione PK
        id_attivita FK
        quantita
        origine_prodotto
        biologico
        imballaggio
        data_consumo
    }
    ATTIVITACASA {
        id_attivita_casa PK
        id_attivita FK
        data_inizio
        data_fine
        quantita
        lettura_contatore_iniziale
        lettura_contatore_finale
    }
    ATTIVITATRASPORTO {
        id_attivita_trasporto PK
        id_attivita FK
        mezzo_trasporto
        punto_partenza
        punto_arrivo
        distanza
        data_viaggio
        numero_passeggeri
        tipo_carburante
    }
    ECOFOOTPRINT {
        id_ecofootprint PK
        id_attivita FK
        co2_equivalente
        data_calcolo
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
