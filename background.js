"use strict";

const DEFAULT_OLLAMA_URL = "http://localhost:11434";
const DEFAULT_MODEL = "translategemma";
const DEFAULT_TARGET_LANGUAGE = "it";

const LANGUAGE_NAMES = {
  it: "italiano",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
};

// Convert text to Unicode bold (for menu highlighting)
function toBold(text) {
  const boldMap = {
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
    'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
    's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
    'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
    'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
    'á': 'á', 'é': 'é', 'í': 'í', 'ó': 'ó', 'ú': 'ú', 'ñ': 'ñ', 'ü': 'ü',
    'Á': 'Á', 'É': 'É', 'Í': 'Í', 'Ó': 'Ó', 'Ú': 'Ú', 'Ñ': 'Ñ', 'Ü': 'Ü',
    'à': 'à', 'è': 'è', 'ì': 'ì', 'ò': 'ò', 'ù': 'ù',
    'ç': 'ç', 'Ç': 'Ç'
  };
  return text.split('').map(char => boldMap[char] || char).join('');
}

// --- Settings ---

async function getSettings() {
  const defaults = {
    ollamaUrl: DEFAULT_OLLAMA_URL,
    model: DEFAULT_MODEL,
    targetLanguage: DEFAULT_TARGET_LANGUAGE,
  };
  const stored = await messenger.storage.local.get(defaults);
  return stored;
}

// --- Context Menu ---

// Serialize menu creation: queue at most one pending rebuild
let menuCreateChain = Promise.resolve();
let menuPendingCount = 0;

function createContextMenu() {
  if (menuPendingCount >= 1) return;
  menuPendingCount++;
  menuCreateChain = menuCreateChain.then(async () => {
    menuPendingCount--;
    try {
      const settings = await getSettings();
      const { targetLanguage } = settings;

      // Always remove all menus first to avoid ID conflicts
      await messenger.menus.removeAll();

      const languages = Object.keys(LANGUAGE_NAMES);

      for (const langCode of languages) {
        const langName = LANGUAGE_NAMES[langCode];
        const isSelected = langCode === targetLanguage;
        const title = isSelected ? toBold(langName) : langName;

        await messenger.menus.create({
          id: `translate-${langCode}`,
          title: title,
          contexts: ["page", "frame", "selection"],
        });
      }

      console.log(`[Translator] Created ${languages.length} language options attached to extension parent`);
    } catch (e) {
      console.warn("[Translator] Error in createContextMenu:", e.message);
    }
  });
}

// --- Initialize context menu on startup and install ---
messenger.runtime.onStartup.addListener(() => {
  console.log("[Translator] Extension started, creating menu");
  createContextMenu();
});

messenger.runtime.onInstalled.addListener(() => {
  console.log("[Translator] Extension installed, creating menu");
  createContextMenu();
});

// --- Update context menu when settings change ---
messenger.storage.onChanged.addListener(async (changes, area) => {
  if (area === "local" && changes.targetLanguage) {
    console.log("[Translator] Target language changed, updating menu");
    await createContextMenu();
  }
});

// --- Port-based communication with content scripts ---

// Map from tabId → port for all connected content scripts.
// lastActivePort is used as fallback when tab info is unavailable.
const portMap = new Map();
let lastActivePort = null;
let lastClickedPort = null;   // port that received the most recent contextmenu event
let lastActivatedTabId = null; // tabId of the most recently focused tab

messenger.tabs.onActivated.addListener(({ tabId }) => {
  lastActivatedTabId = tabId;
  console.log("[Translator] Tab activated:", tabId);
});

function getPortForTab(tabId) {
  // 1. Exact match from menu click tab
  if (tabId != null && portMap.has(tabId)) return portMap.get(tabId);
  // 2. Port that sent the contextmenu event
  if (lastClickedPort) return lastClickedPort;
  // 3. Most recently activated tab
  if (lastActivatedTabId != null && portMap.has(lastActivatedTabId)) return portMap.get(lastActivatedTabId);
  // 4. Last connected port
  return lastActivePort;
}

messenger.runtime.onConnect.addListener((port) => {
  if (port.name !== "translator") return;

  const tabId = port.sender?.tab?.id ?? null;
  console.log("[Translator] Content script connected, tabId:", tabId);

  if (tabId != null) portMap.set(tabId, port);
  lastActivePort = port;

  port.onDisconnect.addListener(() => {
    console.log("[Translator] Content script disconnected, tabId:", tabId);
    if (tabId != null) portMap.delete(tabId);
    if (lastActivePort === port) {
      lastActivePort = portMap.size > 0 ? [...portMap.values()].at(-1) : null;
    }
  });

  // Handle messages from content script through the port
  port.onMessage.addListener(async (message) => {
    if (message.command === "contextmenu") {
      lastClickedPort = port;
      return;
    }

    if (message.command === "getMessages") {
      // Send localized messages to content script
      const getMsg = (key, fallback) => {
        try {
          return messenger.i18n?.getMessage(key) || fallback;
        } catch (e) {
          return fallback;
        }
      };
      
      port.postMessage({
        command: "messages",
        data: {
          noText: getMsg("noText", "No text to translate"),
          translating: getMsg("translating", "Translating..."),
          success: getMsg("translationComplete", "Translation complete!"),
          errorUnreachable: "Error: " + getMsg("translationError", "Translation error"),
          error: getMsg("translationError", "Translation error"),
        }
      });
      return;
    }

    if (message.command === "translate") {
      console.log(`[Translator] Received translate request, id: ${message.id}, text length: ${message.text?.length || 0}`);
      try {
        let settings = await getSettings();

        // Override targetLanguage if provided in message (from menu selection)
        if (message.targetLanguage) {
          settings = { ...settings, targetLanguage: message.targetLanguage };
          console.log(`[Translator] Using target language from menu: ${message.targetLanguage}`);
        }

        console.log(`[Translator] Settings loaded:`, settings);
        const translated = await translateText(message.text, settings);
        console.log(`[Translator] Translation completed, sending response. Translated length: ${translated?.length || 0}`);
        port.postMessage({ id: message.id, success: true, translated });
        console.log(`[Translator] Response sent to content script`);
      } catch (e) {
        console.error("[Translator] Translation error:", e);
        port.postMessage({ id: message.id, success: false, error: e.message });
      }
    }

    if (message.command === "translationComplete") {
      toggleMenuCreated = true;
      try {
        await messenger.menus.create({
          id: "toggle-original",
          title: messenger.i18n.getMessage("showOriginal"),
          contexts: ["page", "frame", "selection"],
        });
      } catch (_) {
        messenger.menus.update("toggle-original", {
          title: messenger.i18n.getMessage("showOriginal"),
          visible: true,
        });
      }
    }
  });
});

// --- Ollama API ---

async function translateWithOllama(text, settings) {
  const { ollamaUrl, model, targetLanguage } = settings;
  const url = `${ollamaUrl}/api/generate`;

  const langName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;
  const prompt = `Translate the following text to ${langName}.
Rules:
- Only output the translation, nothing else
- Preserve the original formatting
- Do not add notes or explanations
- If the text is already in ${langName}, return it unchanged

Text: ${text}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Ollama model "${model}" not found. Please run: ollama pull ${model}`);
    }
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.trim();
}

// --- Google Translate API (non-official, free) ---

// --- Main Translation Function ---

async function translateText(text, settings) {
  const { targetLanguage } = settings;

  console.log(`[Translator] translateText called - target: ${targetLanguage}, text length: ${text.length}`);

  try {
    const result = await translateWithOllama(text, settings);
    console.log(`[Translator] Translation successful, result length: ${result?.length || 0}`);
    return result;
  } catch (e) {
    console.error(`[Translator] Ollama error:`, e);
    throw e;
  }
}

async function getInstalledModels(ollamaUrl) {
  const url = `${ollamaUrl || DEFAULT_OLLAMA_URL}/api/tags`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }
  const data = await response.json();
  return data.models.map((m) => m.name);
}

// --- Toggle State ---

let toggleMenuCreated = false;

// --- Inject content script as fallback ---
// content/translator.js is declared in manifest as message_display_scripts
// and is automatically loaded by Thunderbird whenever a message is displayed.
// This function is only called when the port is not yet active.

async function injectAndSend(targetLang, preferredTabId = null) {
  let tabId = preferredTabId;

  // Strategy 1: dedicated messageDisplay tab (email in separate window)
  if (tabId === null) {
    try {
      const msgTabs = await messenger.tabs.query({ type: "messageDisplay" });
      if (msgTabs.length > 0) {
        tabId = msgTabs[0].id;
        console.log("[Translator] Found messageDisplay tab:", tabId);
      }
    } catch (e) {
      console.warn("[Translator] tabs.query messageDisplay failed:", e.message);
    }
  }

  // Strategy 2: active mail tab (3-pane view)
  if (tabId === null) {
    try {
      const mailTabs = await messenger.mailTabs.query({ active: true, currentWindow: true });
      if (mailTabs.length > 0) {
        const msg = await messenger.messageDisplay.getDisplayedMessage(mailTabs[0].id);
        if (msg) {
          tabId = mailTabs[0].id;
          console.log("[Translator] Found active mail tab with message:", tabId);
        }
      }
    } catch (e) {
      console.warn("[Translator] mailTabs strategy failed:", e.message);
    }
  }

  if (tabId === null) {
    console.error("[Translator] No message display tab found - open an email first");
    return;
  }

  console.log("[Translator] Injecting content script into tab:", tabId);
  try {
    await messenger.tabs.executeScript(tabId, {
      file: "content/translator.js",
      runAt: "document_start",
      allFrames: false,
    });
    console.log("[Translator] Injection via tabs.executeScript succeeded");
  } catch (e1) {
    console.warn("[Translator] tabs.executeScript failed:", e1.message, "- trying scripting API");
    try {
      await messenger.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content/translator.js"],
      });
      console.log("[Translator] Injection via scripting.executeScript succeeded");
    } catch (e2) {
      console.error("[Translator] All injection methods failed:", e2.message);
      return;
    }
  }

  // Poll for port connection by tabId, then send the command
  const resolvedTabId = tabId;
  let waited = 0;
  const interval = setInterval(() => {
    waited += 50;
    const port = getPortForTab(resolvedTabId);
    if (port) {
      clearInterval(interval);
      console.log("[Translator] Port connected after injection, sending startTranslation");
      port.postMessage({ command: "startTranslation", targetLanguage: targetLang });
    } else if (waited >= 2000) {
      clearInterval(interval);
      console.error("[Translator] Port never connected after injection (timeout 2s)");
    }
  }, 50);
}

// --- Event Handlers ---

messenger.menus.onClicked.addListener(async (info, tab) => {
  // Check if it's a translate menu item
  if (info.menuItemId.startsWith("translate-")) {
    const targetLang = info.menuItemId.replace("translate-", "");
    const tabId = tab?.id ?? null;
    console.log(`[Translator] Translate to '${targetLang}' (${LANGUAGE_NAMES[targetLang]}) menu clicked, tabId:`, tabId);

    // Save the selected language
    await messenger.storage.local.set({
      targetLanguage: targetLang
    });

    console.log(`[Translator] Saved targetLanguage = ${targetLang}`);

    // Find the port for the tab where the menu was clicked
    const port = getPortForTab(tabId);
    if (port) {
      console.log("[Translator] Port active for tab", tabId, ", sending startTranslation with target:", targetLang);
      port.postMessage({ command: "startTranslation", targetLanguage: targetLang });
    } else {
      console.log("[Translator] No active port for tab", tabId, ", attempting injection as fallback");
      await injectAndSend(targetLang, tabId);
    }
  } else if (info.menuItemId === "toggle-original") {
    const tabId = tab?.id ?? null;
    const port = getPortForTab(tabId);
    if (port) {
      port.postMessage({ command: "reloadOriginal" });
    }
  }
});

// Handle messages from options page (uses runtime.sendMessage, not ports)
messenger.runtime.onMessage.addListener(async (message, sender) => {
  if (message.command === "getModels") {
    try {
      const settings = await getSettings();
      const models = await getInstalledModels(settings.ollamaUrl);
      return { success: true, models };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (message.command === "testConnection") {
    try {
      const url = message.ollamaUrl || DEFAULT_OLLAMA_URL;
      const models = await getInstalledModels(url);
      return { success: true, models };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (message.command === "getSettings") {
    return await getSettings();
  }

  if (message.command === "saveSettings") {
    // Aggiorna il menu quando cambiano le impostazioni
    await messenger.storage.local.set({
      targetLanguage: message.targetLanguage || DEFAULT_TARGET_LANGUAGE,
      ollamaUrl: message.ollamaUrl,
      model: message.model,
    });

    // Ricrea il menu con la nuova lingua
    createContextMenu();

    return { success: true };
  }
});

// --- Initialization ---

createContextMenu();
