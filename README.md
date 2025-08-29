# Startcom

Aplicativo mobile feito com React Native para um trabalho de conclusão de curso que se trata de uma plataforma gerenciadora de pequenos e médios negócios.


## (RECOMENDADO) Gerar APK Release
Caso queira rodar o app sem instalar Node, JDK ou Android Studio:

```bash
cd android
./gradlew assembleRelease
```
O APK gerado ficará em:

android/app/build/outputs/apk/release/app-release.apk

Basta copiar para o celular e instalar manualmente
---

## Pré-requisitos

Antes de rodar o projeto, a pessoa precisa ter instalado:

1. **Node.js (LTS)**  
   [Download Node.js](https://nodejs.org/)

2. **Git**  
   [Download Git](https://git-scm.com/downloads)

3. **Java JDK 17 (64 bits)**  
   [Download JDK](https://adoptium.net/)  
   ⚠️ Importante: configurar a variável de ambiente `JAVA_HOME` apontando para a pasta do JDK 17.  
   Exemplo no Windows (PowerShell):
   ```powershell
   setx JAVA_HOME "C:\Users\SEU_USUARIO\AppData\Local\Programs\Eclipse Adoptium\jdk-17.0.16.8-hotspot"
   setx PATH "%JAVA_HOME%\bin;%PATH%"
---
   Rode no terminal:
```bash
java -version
```
Deve mostrar Java 17 64 bits.

## Android Studio
Durante a instalação do Android Studio, marque:
```bash
Android SDK
Android SDK Platform
Android SDK Command-line Tools
Atualize o SDK para a versão Android 12 ou 13 e instale o Platform-Tools.
```

## Celular Android com depuração USB ativada

Configurações → Sobre o telefone → toque 7x em “Número da versão” para ativar Modo Desenvolvedor

Ativar Depuração USB nas opções de desenvolvedor

Conectar via cabo que suporta transferência de dados

## Clonar o projeto
```bash
git clone https://github.com/KayleDev/Startcom-Mobile
cd Startcom-Mobile
```

Instalar dependências
```bash
npm install
```
Verificar se o celular está conectado
No terminal, digite:

```bash
adb devices
```
Saída esperada:
List of devices attached
XYZ12345    device


Se não aparecer, verificar: cabo, depuração USB, drivers (Windows)

## Rodar o app no celular
Abra um terminal na pasta do projeto e inicie o Metro Bundler:

```bash
npx react-native start
```
Em outro terminal, ainda na pasta do projeto, rode:

```bash
npx react-native run-android
```
O app será instalado no celular