# Thunderbird Ollama Translator

🇬🇧 [English](README.md) | 🇮🇹 [Italiano](README.it.md) | 🇫🇷 [Français](README.fr.md) | 🇪🇸 [Español](README.es.md) | 🇩🇪 [Deutsch](README.de.md) | 🇵🇹 [Português](README.pt.md) | 🇷🇺 [Русский](README.ru.md)

---

Um complemento do Thunderbird que traduz emails usando Ollama local - **Privacidade completa**, nenhum dado enviado online NUNCA.

## ✨ Funcionalidades

- 🏠 **100% Local** - Nenhum dado enviado online, NUNCA
- 🌍 **10 idiomas** - Italiano, Inglês, Espanhol, Francês, Alemão, Português, Russo, Japonês, Chinês, Coreano
- 🖱️ **Menu de contexto** - Clique com o botão direito para traduzir para qualquer idioma
- ⚡ **Rápido** - Usa o modelo translategemma (3GB, otimizado para traduções)
- 🔒 **Privacidade absoluta** - Tudo processado localmente, sem rastreamento
- 🌐 **Interface multilíngue** - O complemento está disponível em 7 idiomas: 🇮🇹 Italiano, 🇬🇧 Inglês, 🇩🇪 Alemão, 🇫🇷 Francês, 🇪🇸 Espanhol, 🇵🇹 Português, 🇷🇺 Russo (adapta-se automaticamente ao idioma do Thunderbird)

## 📋 Requisitos

1. **Ollama** instalado no seu PC
   - Baixe em: https://ollama.ai

2. **Um modelo Ollama** baixado
   - Recomendado: `ollama pull translategemma` (3GB, otimizado)
   - Alternativas: `llama3.2`, `mistral`

3. **Thunderbird** versão 128 ou superior

⚠️ **Nota importante**: Antes de usar o complemento, você precisará configurar `OLLAMA_ORIGINS` (veja a seção "Configuração inicial" abaixo).

## 📦 Instalação

### Método 1: Arquivo XPI (Recomendado)

1. **Baixe** o arquivo `thunderbird-ollama-translator.xpi`
2. **Abra o Thunderbird**
3. Vá para **Menu > Ferramentas > Complementos**
4. Clique no ícone de engrenagem ⚙️ no canto superior direito
5. Selecione **"Instalar complemento de um arquivo..."**
6. Selecione o arquivo `.xpi`
7. Confirme a instalação

### Método 2: Da pasta (Desenvolvimento)

1. Extraia os arquivos para uma pasta
2. Abra o Thunderbird
3. Pressione **Ctrl+Shift+A** (ou do Menu > Ferramentas > Complementos)
4. Clique no ícone de engrenagem ⚙️
5. Selecione **"Depurar complementos"**
6. Clique em **"Carregar complemento temporário..."**
7. Selecione o arquivo `manifest.json` da pasta

## ⚙️ Configuração inicial

### 1. Abrir configurações do complemento
   - Menu > Ferramentas > Complementos > "Ollama Translator" > Preferências

### 2. Configuração OBRIGATÓRIA: OLLAMA_ORIGINS

**Por que é necessário?**
Por motivos de segurança, o Ollama bloqueia solicitações de extensões do navegador. Você deve autorizar explicitamente o Thunderbird.

**Valor recomendado (mais seguro):**
```
OLLAMA_ORIGINS=moz-extension://*
```
Permite apenas extensões do Firefox/Thunderbird acessarem o Ollama. Bloqueia todos os sites externos.

**Como configurar:**

**Windows (CMD):**
```cmd
setx OLLAMA_ORIGINS "moz-extension://*"
```
Depois feche e reabra o terminal e inicie o Ollama:
```cmd
ollama serve
```

**Linux/Mac (permanente):**
```bash
echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
source ~/.bashrc
ollama serve
```

**Opção alternativa** (se você também precisa de aplicativos locais):
```
OLLAMA_ORIGINS=moz-extension://*,http://localhost:11434
```

### 3. Configurar complemento
   - **Idioma de destino**: Italiano, Inglês, Espanhol, Francês, Alemão, Português, Russo, Japonês, Chinês, Coreano
   - **URL do Ollama**: `http://localhost:11434` (padrão)
   - **Testar conexão**: Clique para verificar se o Ollama está acessível
   - **Modelo**: Selecione `translategemma` (recomendado) ou outro modelo instalado

### 4. Salvar
   - Clique em "Salvar"

## 🎯 Como usar

### Menu de contexto (Recomendado)
1. **Abra um email** que você deseja traduzir
2. **Clique com o botão direito** no corpo do email
3. **Selecione "Traduzir com Ollama ▶"** e escolha o idioma
   - O idioma selecionado aparecerá em **negrito**
   - Esta escolha se torna o padrão
4. Aguarde a mensagem "Tradução concluída"

### Mostrar original
- Após a tradução, **clique com o botão direito** no texto
- Selecione **"Mostrar original"** para restaurar o texto original

## 🔒 Segurança

### ✅ O que é seguro

- **Nenhum dado enviado online NUNCA** - Tudo é processado localmente pelo Ollama
- **Conexão local** - Comunica-se apenas com `localhost:11434`
- **Sem rastreamento** - Sem estatísticas, rastreamento ou logs remotos
- **Sem chave API** - Nenhuma chave API ou registro necessário
- **Código aberto** - Código totalmente inspecionável

### 🔐 Permissões necessárias

O complemento requer apenas estas permissões do Thunderbird:
- `messagesRead` - Lê o conteúdo do email
- `messagesModify` - Substitui o texto pela tradução
- `menus` - Adiciona menu de contexto
- `storage` - Salva configurações
- `tabs` - Injeta script no email
- `http://localhost/*` - Para comunicar com Ollama local

**Sem acesso a serviços externos**

Sem acesso a:
- ❌ Catálogo de endereços, calendário, chat
- ❌ Credenciais de conta
- ❌ Banco de dados do Thunderbird
- ❌ Sistema de arquivos (exceto localhost para Ollama)

## 🚨 Solução de problemas

### "Erro: Erro do Ollama: 403 Forbidden" ⚠️

**CAUSA**: O Ollama bloqueia solicitações de extensões do navegador por motivos de segurança.

**SOLUÇÃO COMPLETA**:

1. **Pare o Ollama** se estiver em execução (Ctrl+C no terminal onde `ollama serve` está rodando)

2. **Configure a variável de ambiente** (valor recomendado para segurança):

   **Windows (CMD):**
   ```cmd
   setx OLLAMA_ORIGINS "moz-extension://*"
   ```

   **Linux/Mac:**
   ```bash
   echo 'export OLLAMA_ORIGINS="moz-extension://*"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Feche e reabra o terminal**, depois inicie o Ollama:
   ```bash
   ollama serve
   ```

4. **Verifique a configuração**:
   - Abra o Thunderbird
   - Vá para as configurações do complemento
   - Clique em "Testar conexão"
   - Deve mostrar "Conexão bem-sucedida: X modelos disponíveis"

**Nota**: `moz-extension://*` permite apenas extensões do Firefox/Thunderbird acessarem o Ollama, bloqueando sites externos (mais seguro).

## 📝 Licença

MIT License - Livre para usar, modificar e distribuir.

## 🤝 Suporte

Se você tiver problemas:
1. **Abra o console** (Ctrl+Shift+I em uma aba do Thunderbird)
2. **Clique com o botão direito** no email > Traduzir para Italiano
3. **Procure por mensagens azuis** `[Translator]` no console
4. **Copie as mensagens de erro** e compartilhe-as

---

**Boa tradução!** 🎉
