# Thunderbird Ollama Translator

---

A Thunderbird addon that translates emails using local Ollama - **Complete privacy**, no data sent online EVER.

## ✨ Features

- 🏠 **100% Local** - No data sent online, EVER
- 🌍 **10 Languages** - Italian, English, Spanish, French, German, Portuguese, Russian, Japanese, Chinese, Korean
- 🖱️ **Context Menu** - Right-click to translate to any language
- ⚡ **Fast** - Uses translategemma model (3GB, optimized for translations)
- 🔒 **Absolute Privacy** - Everything processed locally, zero tracking
- 🌐 **Multilingual interface** - The addon is available in 7 languages: 🇮🇹 Italian, 🇬🇧 English, 🇩🇪 German, 🇫🇷 French, 🇪🇸 Spanish, 🇵🇹 Portuguese, 🇷🇺 Russian (automatically adapts to Thunderbird's language)

## 📋 Requirements

1. **Ollama** installed on your PC
   - Download from: https://ollama.ai

2. **An Ollama model** downloaded
   - Recommended: `ollama pull translategemma` (3GB, optimized)
   - Alternatives: `llama3.2`, `mistral`

3. **Thunderbird** 128 or later (ESR and non-ESR)

⚠️ **Important note**: Before using the addon, you'll need to configure `OLLAMA_ORIGINS` (see "Initial Configuration" section below).

## 📦 Installation

### Method 1: XPI File (Recommended)

1. **Download** the `thunderbird-ollama-translator.xpi` file
2. **Open Thunderbird**
3. Go to **Menu > Tools > Add-ons**
4. Click the gear icon ⚙️ in the top right
5. Select **"Install Add-on from file..."**
6. Select the `.xpi` file
7. Confirm installation

### Method 2: From Folder (Development)

1. Extract files to a folder
2. Open Thunderbird
3. Press **Ctrl+Shift+A** (or from Menu > Tools > Add-ons)
4. Click the gear icon ⚙️
5. Select **"Debug Add-ons"**
6. Click **"Load Temporary Add-on..."**
7. Select the `manifest.json` file from the folder

## ⚙️ Initial Configuration

### 1. Open addon settings
   - Menu > Tools > Add-ons > "Ollama Translator" > Preferences

### 2. REQUIRED Configuration: OLLAMA_ORIGINS

**Why is it needed?**
For security reasons, Ollama blocks requests from browser extensions. You must explicitly authorize Thunderbird.

**Recommended value (more secure):**
```
OLLAMA_ORIGINS=moz-extension://*
```
Allows only Firefox/Thunderbird extensions to access Ollama. Blocks all external websites.

**How to configure:**

**Windows (CMD):**
```cmd
setx OLLAMA_ORIGINS "moz-extension://*"
```
Then close and reopen the terminal and start Ollama:
```cmd
ollama serve
```

**Linux (permanent):**
```bash
echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
source ~/.bashrc
ollama serve
```

**macOS (permanent):**
```bash
echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.zshrc
source ~/.zshrc
ollama serve
```

**Alternative option** (if you also need local apps):
```
OLLAMA_ORIGINS=moz-extension://*,http://localhost:11434
```

### 3. Configure addon
   - **Target language**: Italian, English, Spanish, French, German, Portuguese, Russian, Japanese, Chinese, Korean
   - **Ollama URL**: `http://localhost:11434` (default)
   - **Test connection**: Click to verify that Ollama is reachable
   - **Model**: Select `translategemma` (recommended) or another installed model

### 4. Save
   - Click "Save"

## 🎯 How to Use

### Context Menu (Recommended)
1. **Open an email** you want to translate
2. **Right-click** on the email body
3. **Select "Translate with Ollama ▶"** and choose the language
   - The selected language will appear in **bold**
   - This choice becomes the default
4. Wait for the message "Translation completed"

### Show Original
- After translation, **right-click** on the text
- Select **"Show Original"** to restore the original text

## 🔒 Security

### ✅ What is Secure

- **No data sent online EVER** - Everything is processed locally by Ollama
- **Local connection** - Communicates only with `localhost:11434`
- **No tracking** - No statistics, tracking, or remote logs
- **No API key** - No API key or registration required
- **Open Source** - Fully inspectable code

### 🔐 Required Permissions

The addon requires only these Thunderbird permissions:
- `messagesRead` - Reads email content
- `messagesModify` - Replaces text with translation
- `menus` - Adds context menu
- `storage` - Saves settings
- `tabs` - Injects script into email
- `http://localhost/*` - To communicate with local Ollama

**No access to external services**

No access to:
- ❌ Address book, calendar, chat
- ❌ Account credentials
- ❌ Thunderbird database
- ❌ File system (except localhost for Ollama)

## 🚨 Troubleshooting

### "Error: Ollama error: 403 Forbidden" ⚠️

**CAUSE**: Ollama blocks requests from browser extensions for security reasons.

**COMPLETE SOLUTION**:

1. **Stop Ollama** if it's running (Ctrl+C in the terminal where `ollama serve` is running)

2. **Configure the environment variable** (recommended value for security):

   **Windows (CMD):**
   ```cmd
   setx OLLAMA_ORIGINS "moz-extension://*"
   ```

   **Linux:**
   ```bash
   echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
   source ~/.bashrc
   ```

   **macOS:**
   ```bash
   echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Close and reopen the terminal**, then start Ollama:
   ```bash
   ollama serve
   ```

4. **Verify the configuration**:
   - Open Thunderbird
   - Go to addon settings
   - Click "Test connection"
   - Should show "Connection successful: X models available"

**Note**: `moz-extension://*` allows only Firefox/Thunderbird extensions to access Ollama, blocking external websites (more secure).

## 📜 Changelog

### v1.5.0
- **Fix**: Deterministic tab/preview routing — translating from a separate email tab no longer interferes with the preview pane (and vice versa). Uses `menus.onShown` + `framePortMap` for exact frame-level targeting.
- **Fix**: Removed `message_display_scripts` manifest key (caused warnings on Thunderbird 147+). Content script is now registered programmatically via `messageDisplayScripts.register()`.

### v1.4.0
- **Fix**: Added programmatic `messageDisplayScripts` registration for broader Thunderbird version compatibility.

### v1.3.0
- **Fix**: Context menu now appears only in the email body (not in folder pane or message list).
- Versioned XPI filenames.

### v1.2.0
- **Fix**: Port-based tab routing with `portMap` for multi-tab support.

### v1.0.0
- Initial release with Ollama-only local translation.

## 📝 License

MIT License - Free to use, modify and distribute.

## 🤝 Support

If you have problems:
1. **Open the console** (Ctrl+Shift+I in a Thunderbird tab)
2. **Right-click** on the email > Translate to Italian
3. **Look for blue messages** `[Translator]` in the console
4. **Copy error messages** and share them

---

**Happy translating!** 🎉
