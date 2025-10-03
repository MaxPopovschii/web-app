### Refresh Token e Sicurezza Sessione

Per mantenere la sessione sicura e senza richiedere il login continuo, l'API espone l'endpoint `/auth/refresh-token`.

- Al login, il backend può restituire sia un access token (scadenza breve) che un refresh token (scadenza lunga, es. 7 giorni).
- Il refresh token viene inviato come cookie httpOnly e può essere usato per ottenere un nuovo access token quando quello attuale scade.

#### Esempio di richiesta refresh token

```http
POST /auth/refresh-token
Cookie: refreshToken=eyJhbGciOiJIUzI1NiJ9...

Risposta:
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Se il refresh token è scaduto o non valido, la risposta sarà 401 Unauthorized.
# 🌿 EcoPasso: Cammina Verso un Futuro Sostenibile

**EcoPasso** è l'app che ti aiuta a calcolare, monitorare e ridurre la tua impronta ecologica. Ogni passo conta per rendere il pianeta un posto migliore.  

Con un design intuitivo e strumenti avanzati, EcoPasso ti guida verso uno stile di vita più sostenibile. 🌍✨

---

## 📌 Indice

- [🌍 Cos'è l'Impronta Ecologica](#-cosè-limpronta-ecologica)
- [🎯 Obiettivi del Progetto](#-obiettivi-del-progetto)
- [🌟 Benefici dell'Uso di EcoPasso](#-benefici-delluso-di-ecopasso)
- [🧑‍💻 Tecnologie Utilizzate](#-tecnologie-utilizzate)
- [📱 Interfaccia Utente](#-interfaccia-utente)
- [📊 Schema del Database](#-schema-del-database)
- [⚙️ Esempi di Codice](#️-esempi-di-codice)
- [🚀 Come Avviare EcoPasso](#-come-avviare-ecopasso)
- [📽️ Video Dimostrativo](#️-video-dimostrativo)

---

## 🌍 Cos'è l'Impronta Ecologica

L'**impronta ecologica** è un indicatore globale che misura il consumo umano di risorse naturali rispetto alla capacità del pianeta di rigenerarle.  
Viene calcolata considerando diversi aspetti dell'impatto umano sull'ambiente, tra cui:

- **Emissioni di gas serra (CO2):** Derivanti da trasporti, produzione di energia, riscaldamento e altre attività.
- **Consumo di risorse naturali:** Come acqua, cibo, materiali e combustibili fossili.
- **Produzione di rifiuti:** Inclusi rifiuti non riciclabili e pericolosi.
- **Uso del suolo:** Per agricoltura, urbanizzazione e deforestazione.

### Tipi di Impronta Ecologica

1. **Impronta di carbonio:** Misura le emissioni di CO2 generate da attività quotidiane.
2. **Impronta idrica:** Indica il consumo di acqua dolce.
3. **Impronta dei materiali:** Si riferisce all'uso di risorse come metalli, plastica e legname.
4. **Impronta alimentare:** Analizza l'impatto della produzione e del consumo di cibo.

### Perché è importante monitorare l'impronta ecologica?

- **Prevenire il sovrasfruttamento:** Il pianeta ha risorse limitate e il sovraconsumo porta a conseguenze irreversibili, come cambiamenti climatici e perdita di biodiversità.
- **Aumentare la consapevolezza:** Sapere dove e come possiamo ridurre il nostro impatto è il primo passo verso un cambiamento positivo.
- **Promuovere uno stile di vita sostenibile:** Piccole azioni quotidiane, come ridurre gli sprechi o scegliere fonti di energia rinnovabile, fanno una grande differenza.
- **Garantire un futuro migliore:** Per noi e per le prossime generazioni.

Con **EcoPasso**, monitorare l'impronta ecologica diventa semplice e accessibile a tutti. 🌿

---

## 🎯 Obiettivi del Progetto

**EcoPasso** è stato progettato con una missione chiara: aiutarti a vivere in modo più responsabile e sostenibile. I principali obiettivi includono:

1. **Educazione Ambientale:**
   - Sensibilizzare gli utenti sull'importanza della sostenibilità.
   - Fornire informazioni dettagliate sull'impatto ambientale delle loro azioni.

2. **Monitoraggio e Analisi:**
   - Offrire strumenti per monitorare l'impronta ecologica personale.
   - Visualizzare i progressi con grafici e report chiari e intuitivi.

3. **Promozione di Azioni Concrete:**
   - Suggerire abitudini sostenibili, come ridurre gli sprechi di energia o scegliere mezzi di trasporto ecologici.
   - Premiare i progressi con badge o notifiche motivazionali.

4. **Creazione di una Comunità:**
   - Connettere gli utenti in una rete globale per condividere consigli e ispirazione.
   - Favorire il cambiamento collettivo attraverso la collaborazione.

5. **Supporto alle Politiche Ambientali:**
   - Offrire dati aggregati per supportare iniziative e politiche di sostenibilità.
   - Collaborare con enti locali e globali per promuovere uno sviluppo sostenibile.

---

## 🌟 Benefici dell'Uso di EcoPasso

### Per gli Utenti:

- **Consapevolezza:** Impara a conoscere il tuo impatto ambientale e come ridurlo.
- **Risparmio:** Riduci gli sprechi di energia, acqua e risorse, risparmiando anche denaro.
- **Motivazione:** Raggiungi obiettivi personali e condividi i tuoi successi con la comunità.

### Per il Pianeta:

- **Riduzione delle emissioni:** Promuovendo scelte più ecologiche.
- **Conservazione delle risorse:** Favorendo un uso più responsabile di acqua, energia e materiali.
- **Protezione della biodiversità:** Riducendo l'impatto delle attività umane sull'ambiente naturale.

### Per la Società:

- **Educazione collettiva:** Diffondere conoscenze e buone pratiche.
- **Sviluppo sostenibile:** Supportare comunità e aziende verso un futuro green.
- **Impatto positivo:** Ogni piccolo passo contribuisce a un cambiamento globale.

---

## 🧑‍💻 Tecnologie Utilizzate

### Frontend (Client)

- **Linguaggi:** TypeScript/JavaScript
- **Framework:** [React Native](https://reactnative.dev/) con [Expo](https://expo.dev/)
- **Router:** [Expo Router](https://expo.github.io/router/)
- **Librerie principali:**
  - **@react-navigation**: Per la gestione della navigazione fluida.
  - **React Native Paper**: Per un'interfaccia utente moderna basata su Material Design.
  - **React Native Maps**: Per l'integrazione di mappe interattive e personalizzate.
  - **React Native Chart Kit**: Per la visualizzazione di grafici e dati personalizzati.
  - **React Native Webview**: Per l'integrazione di componenti web.
- **State Management:** Utilizzo di hook e contesto React per la gestione dello stato locale.
- **Tipizzazione:** Utilizzo di **TypeScript** per garantire un codice più robusto e manutenibile.
- **Altri strumenti:**
  - **React Native Gesture Handler**: Per gestire gesture fluide e intuitive.
  - **Async Storage**: Per la memorizzazione locale dei dati utente.
  - **Expo Font e Icons**: Per un design accattivante con font personalizzati e icone.
  - **Expo Linear Gradient**: Per effetti visivi avanzati tramite gradienti.


### Backend (Server)

- **Linguaggio:** Java
- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot)
- **Funzionalità principali:**
  - API RESTful per una comunicazione veloce e sicura.
  - Gestione avanzata dell'autenticazione e autorizzazione utilizzando JWT.
  - Calcolo dinamico dell'impronta ecologica basato sui dati forniti dagli utenti.
  - Logging e monitoraggio con strumenti integrati per garantire la stabilità del sistema.

### Esempi di codice


### Gestione Ruoli e Sicurezza Endpoint

Gli utenti hanno un campo `role` (es. `USER`, `ADMIN`).

- Gli endpoint `/api/users` sono accessibili solo agli utenti con ruolo `ADMIN`.
- Gli endpoint `/api/activities` sono accessibili a `USER` e `ADMIN`.

#### Esempio: Creazione di un utente ADMIN

```java
User admin = User.builder()
  .name("Admin")
  .surname("Superuser")
  .email("admin@ecopasso.com")
  .password(passwordEncoder.encode("password"))
  .role("ADMIN")
  .build();
userRepo.save(admin);
```

#### Esempio: Protezione Controller

```java
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class UserController { ... }

@RestController
@RequestMapping("/api/activities")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public class ActivityController { ... }
```

#### Configurazione di Sicurezza con JWT

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            .addFilter(new JwtAuthorizationFilter(authenticationManager()));
    }
}
```
---

### Database

- **Sistema:** [MySQL](https://www.mysql.com/)
- **Struttura:**
  - Tabelle ben organizzate per utenti, attività e calcoli ambientali.

---

## 📱 Interfaccia Utente

![Schermata Home](./assets/screenshot-home.png)
*Benvenuto nella tua dashboard personalizzata.*

![Calcolo Impronta](./assets/screenshot-calcolo.png)
*Inserisci i tuoi dati per calcolare l'impatto.*

![Risultati](./assets/screenshot-risultati.png)
*Visualizza i tuoi progressi e ricevi consigli utili.*

---

## 📊 Schema del Database

Ecco uno schema visivo del database che alimenta **EcoPasso**:

```mermaid
erDiagram
    UTENTI {
        string email
        string nome
        string cognome
        string password_hash
        datetime data_registrazione
        datetime ultimo_accesso
    }
    ATTIVITA {
        int id_attivita
        string email_utente
        int id_tipo_attivita
        datetime data_inserimento
        text note
    }
    CATEGORIE {
        int id_categoria
        string nome
        text descrizione
    }
    TIPIATTIVITA {
        int id_tipo_attivita
        int id_categoria
        string nome
        string unita_misura
        decimal fattore_conversione
    }
    ATTIVITAALIMENTAZIONE {
        int id_attivita_alimentazione
        int id_attivita
        decimal quantita
        string origine_prodotto
        boolean biologico
        string imballaggio
        datetime data_consumo
    }
    ATTIVITACASA {
        int id_attivita_casa
        int id_attivita
        datetime data_inizio
        datetime data_fine
        decimal quantita
        string lettura_contatore_iniziale
        string lettura_contatore_finale
    }
    ATTIVITATRASPORTO {
        int id_attivita_trasporto
        int id_attivita
        string mezzo_trasporto
        string punto_partenza
        string punto_arrivo
        decimal distanza
        datetime data_viaggio
        int numero_passeggeri
        string tipo_carburante
    }
    ECOFOOTPRINT {
        int id_ecofootprint
        int id_attivita
        decimal co2_equivalente
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

---

## ⚙️ Esempi di Codice

### Frontend (React Native con TypeScript)

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🚀 Come Avviare EcoPasso

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

Scopri come funziona **EcoPasso** con il nostro video dimostrativo:

[![Demo Video](./assets/demo-thumbnail.png)](https://www.youtube.com/watch?v=tuo_video_id)
