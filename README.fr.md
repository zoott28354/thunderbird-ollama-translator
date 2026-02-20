# Thunderbird Ollama Translator

🇬🇧 [English](./README.md) | 🇮🇹 [Italiano](./README.it.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇵🇹 [Português](./README.pt.md) | 🇷🇺 [Русский](./README.ru.md)

---

Une extension Thunderbird qui traduit les emails en utilisant Ollama local - **Confidentialité totale**, aucune donnée envoyée en ligne JAMAIS.

## ✨ Fonctionnalités

- 🏠 **100% Local** - Aucune donnée envoyée en ligne, JAMAIS
- 🌍 **10 langues** - Italien, Anglais, Espagnol, Français, Allemand, Portugais, Russe, Japonais, Chinois, Coréen
- 🖱️ **Menu contextuel** - Clic droit pour traduire dans n'importe quelle langue
- ⚡ **Rapide** - Utilise le modèle translategemma (3GB, optimisé pour les traductions)
- 🔒 **Confidentialité absolue** - Tout est traité localement, aucun suivi
- 🌐 **Interface multilingue** - L'extension est disponible en 7 langues : 🇮🇹 Italien, 🇬🇧 Anglais, 🇩🇪 Allemand, 🇫🇷 Français, 🇪🇸 Espagnol, 🇵🇹 Portugais, 🇷🇺 Russe (s'adapte automatiquement à la langue de Thunderbird)

## 📋 Prérequis

1. **Ollama** installé sur votre PC
   - Téléchargez depuis : https://ollama.ai

2. **Un modèle Ollama** téléchargé
   - Recommandé : `ollama pull translategemma` (3GB, optimisé)
   - Alternatives : `llama3.2`, `mistral`

3. **Thunderbird** 140x (esr)

⚠️ **Note importante** : Avant d'utiliser l'extension, vous devrez configurer `OLLAMA_ORIGINS` (voir la section "Configuration initiale" ci-dessous).

## 📦 Installation

### Méthode 1 : Fichier XPI (Recommandée)

1. **Téléchargez** le fichier `thunderbird-ollama-translator.xpi`
2. **Ouvrez Thunderbird**
3. Allez dans **Menu > Outils > Modules complémentaires**
4. Cliquez sur l'icône d'engrenage ⚙️ en haut à droite
5. Sélectionnez **"Installer un module depuis un fichier..."**
6. Sélectionnez le fichier `.xpi`
7. Confirmez l'installation

### Méthode 2 : Depuis un dossier (Développement)

1. Extrayez les fichiers dans un dossier
2. Ouvrez Thunderbird
3. Appuyez sur **Ctrl+Shift+A** (ou depuis Menu > Outils > Modules complémentaires)
4. Cliquez sur l'icône d'engrenage ⚙️
5. Sélectionnez **"Déboguer les modules"**
6. Cliquez sur **"Charger un module temporaire..."**
7. Sélectionnez le fichier `manifest.json` depuis le dossier

## ⚙️ Configuration initiale

### 1. Ouvrir les paramètres de l'extension
   - Menu > Outils > Modules complémentaires > "Ollama Translator" > Préférences

### 2. Configuration OBLIGATOIRE : OLLAMA_ORIGINS

**Pourquoi est-ce nécessaire ?**
Pour des raisons de sécurité, Ollama bloque les requêtes provenant des extensions de navigateur. Vous devez explicitement autoriser Thunderbird.

**Valeur recommandée (plus sécurisée) :**
```
OLLAMA_ORIGINS=moz-extension://*
```
Autorise uniquement les extensions Firefox/Thunderbird à accéder à Ollama. Bloque tous les sites web externes.

**Comment configurer :**

**Windows (CMD) :**
```cmd
setx OLLAMA_ORIGINS "moz-extension://*"
```
Ensuite, fermez et rouvrez le terminal et démarrez Ollama :
```cmd
ollama serve
```

**Linux/Mac (permanent) :**
```bash
echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
source ~/.bashrc
ollama serve
```

**Option alternative** (si vous avez également besoin d'applications locales) :
```
OLLAMA_ORIGINS=moz-extension://*,http://localhost:11434
```

### 3. Configurer l'extension
   - **Langue cible** : Italien, Anglais, Espagnol, Français, Allemand, Portugais, Russe, Japonais, Chinois, Coréen
   - **URL Ollama** : `http://localhost:11434` (par défaut)
   - **Tester la connexion** : Cliquez pour vérifier qu'Ollama est accessible
   - **Modèle** : Sélectionnez `translategemma` (recommandé) ou un autre modèle installé

### 4. Enregistrer
   - Cliquez sur "Enregistrer"

## 🎯 Comment utiliser

### Menu contextuel (Recommandé)
1. **Ouvrez un email** que vous souhaitez traduire
2. **Clic droit** sur le corps de l'email
3. **Sélectionnez "Traduire avec Ollama ▶"** et choisissez la langue
   - La langue sélectionnée apparaîtra en **gras**
   - Ce choix devient la langue par défaut
4. Attendez le message "Traduction terminée"

### Afficher l'original
- Après la traduction, **clic droit** sur le texte
- Sélectionnez **"Afficher l'original"** pour restaurer le texte original

## 🔒 Sécurité

### ✅ Ce qui est sécurisé

- **Aucune donnée envoyée en ligne JAMAIS** - Tout est traité localement par Ollama
- **Connexion locale** - Communique uniquement avec `localhost:11434`
- **Aucun suivi** - Pas de statistiques, suivi ou journaux distants
- **Aucune clé API** - Aucune clé API ou inscription requise
- **Code source ouvert** - Code entièrement vérifiable

### 🔐 Permissions requises

L'extension nécessite uniquement ces permissions Thunderbird :
- `messagesRead` - Lit le contenu des emails
- `messagesModify` - Remplace le texte par la traduction
- `menus` - Ajoute le menu contextuel
- `storage` - Enregistre les paramètres
- `tabs` - Injecte le script dans l'email
- `http://localhost/*` - Pour communiquer avec Ollama local

**Aucun accès aux services externes**

Aucun accès à :
- ❌ Carnet d'adresses, calendrier, chat
- ❌ Identifiants de compte
- ❌ Base de données Thunderbird
- ❌ Système de fichiers (sauf localhost pour Ollama)

## 🚨 Dépannage

### "Erreur : Erreur Ollama : 403 Forbidden" ⚠️

**CAUSE** : Ollama bloque les requêtes provenant des extensions de navigateur pour des raisons de sécurité.

**SOLUTION COMPLÈTE** :

1. **Arrêtez Ollama** s'il est en cours d'exécution (Ctrl+C dans le terminal où `ollama serve` est en cours d'exécution)

2. **Configurez la variable d'environnement** (valeur recommandée pour la sécurité) :

   **Windows (CMD) :**
   ```cmd
   setx OLLAMA_ORIGINS "moz-extension://*"
   ```

   **Linux/Mac :**
   ```bash
   echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Fermez et rouvrez le terminal**, puis démarrez Ollama :
   ```bash
   ollama serve
   ```

4. **Vérifiez la configuration** :
   - Ouvrez Thunderbird
   - Allez dans les paramètres de l'extension
   - Cliquez sur "Tester la connexion"
   - Devrait afficher "Connexion réussie : X modèles disponibles"

**Note** : `moz-extension://*` autorise uniquement les extensions Firefox/Thunderbird à accéder à Ollama, bloquant les sites web externes (plus sécurisé).

## 📝 Licence

MIT License - Libre d'utilisation, de modification et de distribution.

## 🤝 Support

Si vous rencontrez des problèmes :
1. **Ouvrez la console** (Ctrl+Shift+I dans un onglet Thunderbird)
2. **Clic droit** sur l'email > Traduire en Italien
3. **Recherchez les messages bleus** `[Translator]` dans la console
4. **Copiez les messages d'erreur** et partagez-les

---

**Bonne traduction !** 🎉
