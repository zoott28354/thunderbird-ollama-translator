# Thunderbird Ollama Translator

🇬🇧 [English](./README.md) | 🇮🇹 [Italiano](./README.it.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇵🇹 [Português](./README.pt.md) | 🇷🇺 [Русский](./README.ru.md)

---

Un complemento de Thunderbird que traduce correos electrónicos usando Ollama local - **Privacidad completa**, nunca se envían datos en línea.

## ✨ Características

- 🏠 **100% Local** - Nunca se envían datos en línea, NUNCA
- 🌍 **10 idiomas** - Italiano, Inglés, Español, Francés, Alemán, Portugués, Ruso, Japonés, Chino, Coreano
- 🖱️ **Menú contextual** - Clic derecho para traducir a cualquier idioma
- ⚡ **Rápido** - Usa el modelo translategemma (3GB, optimizado para traducciones)
- 🔒 **Privacidad absoluta** - Todo se procesa localmente, sin rastreo
- 🌐 **Interfaz multilingüe** - El complemento está disponible en 7 idiomas: 🇮🇹 Italiano, 🇬🇧 Inglés, 🇩🇪 Alemán, 🇫🇷 Francés, 🇪🇸 Español, 🇵🇹 Portugués, 🇷🇺 Ruso (se adapta automáticamente al idioma de Thunderbird)

## 📋 Requisitos

1. **Ollama** instalado en tu PC
   - Descarga desde: https://ollama.ai

2. **Un modelo Ollama** descargado
   - Recomendado: `ollama pull translategemma` (3GB, optimizado)
   - Alternativas: `llama3.2`, `mistral`

3. **Thunderbird** 140x (esr)

⚠️ **Nota importante**: Antes de usar el complemento, necesitarás configurar `OLLAMA_ORIGINS` (ver la sección "Configuración inicial" a continuación).

## 📦 Instalación

### Método 1: Archivo XPI (Recomendado)

1. **Descarga** el archivo `thunderbird-ollama-translator.xpi`
2. **Abre Thunderbird**
3. Ve a **Menú > Herramientas > Complementos**
4. Haz clic en el icono de engranaje ⚙️ en la parte superior derecha
5. Selecciona **"Instalar complemento desde archivo..."**
6. Selecciona el archivo `.xpi`
7. Confirma la instalación

### Método 2: Desde carpeta (Desarrollo)

1. Extrae los archivos a una carpeta
2. Abre Thunderbird
3. Presiona **Ctrl+Shift+A** (o desde Menú > Herramientas > Complementos)
4. Haz clic en el icono de engranaje ⚙️
5. Selecciona **"Depurar complementos"**
6. Haz clic en **"Cargar complemento temporal..."**
7. Selecciona el archivo `manifest.json` de la carpeta

## ⚙️ Configuración inicial

### 1. Abrir configuración del complemento
   - Menú > Herramientas > Complementos > "Ollama Translator" > Preferencias

### 2. Configuración OBLIGATORIA: OLLAMA_ORIGINS

**¿Por qué es necesario?**
Por razones de seguridad, Ollama bloquea las solicitudes de extensiones del navegador. Debes autorizar explícitamente a Thunderbird.

**Valor recomendado (más seguro):**
```
OLLAMA_ORIGINS=moz-extension://*
```
Permite solo a las extensiones de Firefox/Thunderbird acceder a Ollama. Bloquea todos los sitios web externos.

**Cómo configurar:**

**Windows (CMD):**
```cmd
setx OLLAMA_ORIGINS "moz-extension://*"
```
Luego cierra y vuelve a abrir el terminal e inicia Ollama:
```cmd
ollama serve
```

**Linux/Mac (permanente):**
```bash
echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
source ~/.bashrc
ollama serve
```

**Opción alternativa** (si también necesitas aplicaciones locales):
```
OLLAMA_ORIGINS=moz-extension://*,http://localhost:11434
```

### 3. Configurar complemento
   - **Idioma de destino**: Italiano, Inglés, Espagnol, Francés, Alemán, Portugués, Ruso, Japonés, Chino, Coreano
   - **URL de Ollama**: `http://localhost:11434` (predeterminado)
   - **Probar conexión**: Haz clic para verificar que Ollama es accesible
   - **Modelo**: Selecciona `translategemma` (recomendado) u otro modelo instalado

### 4. Guardar
   - Haz clic en "Guardar"

## 🎯 Cómo usar

### Menú contextual (Recomendado)
1. **Abre un correo** que deseas traducir
2. **Haz clic derecho** en el cuerpo del correo
3. **Selecciona "Traducir con Ollama ▶"** y elige el idioma
   - El idioma seleccionado aparecerá en **negrita**
   - Esta elección se convierte en el predeterminado
4. Espera el mensaje "Traducción completada"

### Mostrar original
- Después de la traducción, **haz clic derecho** en el texto
- Selecciona **"Mostrar original"** para restaurar el texto original

## 🔒 Seguridad

### ✅ Lo que es seguro

- **Nunca se envían datos en línea** - Todo es procesado localmente por Ollama
- **Conexión local** - Se comunica solo con `localhost:11434`
- **Sin rastreo** - Sin estadísticas, rastreo o registros remotos
- **Sin clave API** - No se requiere clave API ni registro
- **Código abierto** - Código totalmente inspeccionable

### 🔐 Permisos requeridos

El complemento requiere solo estos permisos de Thunderbird:
- `messagesRead` - Lee el contenido del correo
- `messagesModify` - Reemplaza el texto con la traducción
- `menus` - Añade el menú contextual
- `storage` - Guarda la configuración
- `tabs` - Inyecta el script en el correo
- `http://localhost/*` - Para comunicarse con Ollama local

**Sin acceso a servicios externos**

Sin acceso a:
- ❌ Libreta de direcciones, calendario, chat
- ❌ Credenciales de cuenta
- ❌ Base de datos de Thunderbird
- ❌ Sistema de archivos (excepto localhost para Ollama)

## 🚨 Solución de problemas

### "Error: Error de Ollama: 403 Forbidden" ⚠️

**CAUSA**: Ollama bloquea las solicitudes de extensiones del navegador por razones de seguridad.

**SOLUCIÓN COMPLETA**:

1. **Detén Ollama** si está en ejecución (Ctrl+C en el terminal donde `ollama serve` está ejecutándose)

2. **Configura la variable de entorno** (valor recomendado para seguridad):

   **Windows (CMD):**
   ```cmd
   setx OLLAMA_ORIGINS "moz-extension://*"
   ```

   **Linux/Mac:**
   ```bash
   echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Cierra y vuelve a abrir el terminal**, luego inicia Ollama:
   ```bash
   ollama serve
   ```

4. **Verifica la configuración**:
   - Abre Thunderbird
   - Ve a la configuración del complemento
   - Haz clic en "Probar conexión"
   - Debería mostrar "Conexión exitosa: X modelos disponibles"

**Nota**: `moz-extension://*` permite solo a las extensiones de Firefox/Thunderbird acceder a Ollama, bloqueando sitios web externos (más seguro).

## 📝 Licencia

MIT License - Libre de usar, modificar y distribuir.

## 🤝 Soporte

Si tienes problemas:
1. **Abre la consola** (Ctrl+Shift+I en una pestaña de Thunderbird)
2. **Haz clic derecho** en el correo > Traducir a Italiano
3. **Busca mensajes azules** `[Translator]` en la consola
4. **Copia los mensajes de error** y compártelos

---

**¡Feliz traducción!** 🎉
