# Thunderbird Ollama Translator

Un addon per Thunderbird che traduce le email usando Ollama locale - **Privacy totale**, nessun dato inviato online MAI.

## ✨ Caratteristiche

- 🏠 **100% Locale** - Nessun dato inviato online, MAI
- 🌍 **10 Lingue** - italiano, English, Español, Français, Deutsch, Português, Русский, 日本語, 中文, 한국어
- 🖱️ **Menu Contestuale** - Click destro per tradurre in qualsiasi lingua
- 🔄 **Toggle Originale/Traduzione** - Passa facilmente tra testo originale e tradotto
- ⚡ **Veloce** - Usa modello translategemma (3GB, ottimizzato per traduzioni)
- 🔒 **Privacy Assoluta** - Tutto elaborato localmente, zero tracking
- 🌐 **Interfaccia multilingue** - L'addon è disponibile in 7 lingue: 🇮🇹 Italiano, 🇬🇧 English, 🇩🇪 Deutsch, 🇫🇷 Français, 🇪🇸 Español, 🇵🇹 Português, 🇷🇺 Русский (si adatta automaticamente alla lingua di Thunderbird)

## 📋 Requisiti

### Per usare Ollama (locale, più privato)

1. **Ollama** - Installato e in esecuzione sul tuo PC
   - Scarica da: https://ollama.ai
   - Deve essere in esecuzione sulla porta `11434` (default)

2. **⚠️ CONFIGURAZIONE OBBLIGATORIA - OLLAMA_ORIGINS**

   **Perché è necessario?**
   Per motivi di sicurezza, Ollama blocca le richieste da estensioni browser. Devi configurare la variabile d'ambiente `OLLAMA_ORIGINS="*"` per permettere all'addon di comunicare con Ollama.

   **Come configurarlo:**

   **Windows PowerShell (temporaneo - solo per la sessione corrente):**
   ```powershell
   $env:OLLAMA_ORIGINS="*"
   ollama serve
   ```

   **Windows PowerShell (permanente):**
   ```powershell
   # Imposta la variabile d'ambiente permanentemente
   [System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', '*', 'User')

   # Riavvia Ollama
   ollama serve
   ```

   **Linux/Mac (temporaneo):**
   ```bash
   export OLLAMA_ORIGINS="*"
   ollama serve
   ```

   **Linux/Mac (permanente - aggiungi al tuo ~/.bashrc o ~/.zshrc):**
   ```bash
   echo 'export OLLAMA_ORIGINS="*"' >> ~/.bashrc
   source ~/.bashrc
   ollama serve
   ```

   **⚠️ Nota sulla sicurezza:**
   `OLLAMA_ORIGINS="*"` permette a qualsiasi origine di accedere a Ollama. Se preferisci maggiore sicurezza, puoi specificare solo l'estensione:
   ```bash
   OLLAMA_ORIGINS="moz-extension://*"
   ```

3. **Un modello Ollama** - Scaricato e caricato
   - **Raccomandato**: `ollama pull translategemma` (3GB, ottimizzato per traduzioni)
   - Alternative: `ollama pull llama3.2` o `ollama pull mistral`

4. **Thunderbird** - Versione 128 o superiore

## 📦 Installazione

### Metodo 1: File XPI (Raccomandato)

1. **Scarica** il file `thunderbird-ollama-translator.xpi`
2. **Apri Thunderbird**
3. Vai a **Menu > Tools > Add-ons**
4. Clicca l'engranaggio ⚙️ in alto a destra
5. Seleziona **"Install Add-on from file..."**
6. Seleziona il file `.xpi`
7. Confema l'installazione

### Metodo 2: Da Cartella (Sviluppo)

1. Estrai i file in una cartella
2. Apri Thunderbird
3. Premi **Ctrl+Shift+A** (oppure da Menu > Tools > Add-ons)
4. Clicca l'engranaggio ⚙️
5. Seleziona **"Debug Add-ons"**
6. Clicca **"Load Temporary Add-on..."**
7. Seleziona il file `manifest.json` dalla cartella

## ⚙️ Configurazione Iniziale

1. **Apri le impostazioni dell'addon**:
   - Vai a **Menu > Tools > Add-ons**
   - Cerca "Ollama Translator"
   - Clicca su **"Preferences"**

2. **Scegli la lingua di destinazione**:
   - Italiano, English, Español, Français, Deutsch, Português, Русский, 日本語, 中文, 한국어

3. **⚠️ PRIMO PASSO OBBLIGATORIO - Configura OLLAMA_ORIGINS**:

   **Prima** di usare l'addon con Ollama, devi configurare questa variabile d'ambiente (vedi sezione "Requisiti" sopra per istruzioni dettagliate).

   Verifica rapida - apri PowerShell/Terminal:
   ```bash
   # Windows PowerShell:
   $env:OLLAMA_ORIGINS="*"
   ollama serve

   # Linux/Mac:
   export OLLAMA_ORIGINS="*"
   ollama serve
   ```

   **Senza questa configurazione, riceverai l'errore "403 Forbidden"!**

5. **Inserisci l'URL di Ollama**:
   - Default: `http://localhost:11434`
   - Se Ollama è su un'altra macchina, usa il suo IP

6. **Testa la connessione**:
   - Clicca **"Test connessione"**
   - Se va bene, vedrai il numero di modelli disponibili

7. **Seleziona il modello**:
   - **Raccomandato**: `translategemma` (ottimizzato per traduzioni, veloce)
   - Alternative veloci: `llama3.2`, `mistral`
   - Alternative accurate: `llama2`, `neural-chat`

8. **Salva**:
   - Clicca **"Salva"**

## 🎯 Come Usare

### Menu Contestuale (Raccomandato)
1. **Apri una email** che vuoi tradurre
2. **Fai clic destro** sul corpo del testo
3. **Seleziona "Traduci con Ollama ▶"** e scegli la lingua
   - La lingua selezionata apparirà in **grassetto**
   - Questa scelta diventa il default
4. Attendi il messaggio "Traduzione completata"

### Metodo Alternativo: Pulsante Veloce
1. **Apri una email**
2. Guarda l'**angolo in alto a destra** della email
3. Clicca il **pulsante blu** 🌐 **"Translate"**
4. Verrà usata la lingua configurata nelle impostazioni

### Toggle Originale/Traduzione
- Dopo la traduzione, fai **clic destro** sul testo
- Seleziona **"Mostra originale"** per vedere il testo originale
- Seleziona di nuovo **"Mostra traduzione"** per tornare alla traduzione

## 🔒 Sicurezza

### ✅ Cosa è Sicuro

- **Nessun dato inviato online MAI** - Tutto viene elaborato localmente da Ollama
- **Connessione locale** - Comunica solo con `localhost:11434`
- **Nessuna traccia** - Non ci sono statistiche, tracking o log remoti
- **Nessuna API key** - Non serve nessuna chiave API o registrazione
- **Open Source** - Codice completamente ispezionabile

### 🔐 Permessi Richiesti

L'addon richiede solo questi permessi Thunderbird:
- `messagesRead` - Legge il contenuto delle email
- `messagesModify` - Sostituisce il testo con la traduzione
- `menus` - Aggiunge il menu contestuale
- `storage` - Salva le impostazioni
- `tabs` - Inietta lo script nella email
- `http://localhost/*` - Per comunicare con Ollama locale

**Nessun accesso a servizi esterni**

Nessun accesso a:
- ❌ Rubrica, calendario, chat
- ❌ Account credentials
- ❌ Database Thunderbird
- ❌ File system (eccetto localhost per Ollama)

## 🚨 Troubleshooting

### Il menu "Traduci in [lingua]" non appare
- Ricarica l'addon: Menu > Tools > Add-ons > Ollama Translator > Ricarica
- Prova un'altra email
- Controlla che l'addon sia abilitato

### "Errore: Ollama error: 403 Forbidden" ⚠️

**CAUSA**: Ollama blocca le richieste dalle estensioni browser per motivi di sicurezza.

**SOLUZIONE COMPLETA**:

1. **Ferma Ollama** se è in esecuzione (Ctrl+C nel terminale dove gira `ollama serve`)

2. **Configura la variabile d'ambiente**:

   **Windows PowerShell (permanente - RACCOMANDATO):**
   ```powershell
   # Imposta variabile d'ambiente permanente
   [System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', '*', 'User')

   # Verifica che sia impostata
   [System.Environment]::GetEnvironmentVariable('OLLAMA_ORIGINS', 'User')
   # Dovrebbe mostrare: *
   ```

   **Windows PowerShell (temporaneo - solo questa sessione):**
   ```powershell
   $env:OLLAMA_ORIGINS="*"
   ```

   **Linux/Mac (permanente - RACCOMANDATO):**
   ```bash
   echo 'export OLLAMA_ORIGINS="*"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Riavvia Ollama**:
   ```bash
   ollama serve
   ```

4. **Verifica la configurazione**:
   - Apri Thunderbird
   - Vai nelle impostazioni dell'addon
   - Clicca "Test connessione"
   - Dovrebbe mostrare "Connessione riuscita: X modelli disponibili"

**Nota**: Se usi `moz-extension://*` invece di `*`, funzionerà solo per le estensioni Firefox/Thunderbird (più sicuro).

### "Errore: Ollama non raggiungibile"
- Avvia Ollama: `ollama serve`
- Verifica che sia sulla porta 11434: `curl http://localhost:11434/api/tags`
- Controlla l'URL nelle impostazioni

### La traduzione è lenta
- Verifica che il modello sia completamente caricato in memoria
- Modelli veloci: translategemma (~3GB), llama3.2, mistral (~4GB)
- Modelli lenti: llama2, neural-chat (~7GB+)

### La traduzione non è accurata
- Prova un modello diverso
- **Raccomandato**: `translategemma` (specializzato per traduzioni)
- Alternative: `llama3.2`, `neural-chat`

## 📊 Performance

- **Email corta** (~5KB): 5-10 secondi
- **Email media** (~50KB): 20-40 secondi
- **Email lunga** (~500KB): 2-5 minuti

*I tempi dipendono dal modello e dalla velocità di lettura/scrittura del disco.*

## 🔧 Per Sviluppatori

### Disabilitare i log di debug
Se vuoi una versione più "pulita" senza i messaggi `[Translator]` nella console:
1. Apri `background.js` e `content/translator.js`
2. Rimuovi le righe con `console.log("[Translator]"`

### Cambiare il modello di default
Nel file `background.js`, modifica:
```javascript
const DEFAULT_MODEL = "llama3.2";  // Cambia qui
```

### Personalizzare il prompt di traduzione
Nel file `background.js`, modifica:
```javascript
const TRANSLATE_PROMPT = `Translate the following text to Italian. ...`;
```

## 📝 Licenza

MIT License - Libero di usare, modificare e distribuire.

## 🤝 Supporto

Se hai problemi:
1. **Apri la console** (Ctrl+Shift+I in una scheda Thunderbird)
2. **Fai clic destro** sulla email > Traduci in italiano
3. **Guarda i messaggi blu** `[Translator]` nella console
4. **Copia i messaggi di errore** e condividili

---

**Buona traduzione!** 🎉
