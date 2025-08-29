# MeuApp

Projeto React Native CLI para [descrever o propósito do app, ex: TCC].

## Pré-requisitos

Antes de rodar o projeto, a pessoa precisa ter instalado:

1. **Node.js (LTS)**  
   [Download Node.js](https://nodejs.org/)

2. **Git**  
   [Download Git](https://git-scm.com/downloads)

3. **Java JDK 17**  
   [Download JDK](https://adoptium.net/)

4. **Android Studio**  
   - Durante a instalação, marque:
     - Android SDK  
     - Android SDK Platform  
     - Android SDK Command-line Tools  
   - Atualize o SDK para a versão Android 12 ou 13 e instale o **Platform-Tools**.

5. **Celular Android com depuração USB ativada**  
   - Configurações → Sobre o telefone → toque 7x em “Número da versão” para ativar **Modo Desenvolvedor**  
   - Ativar **Depuração USB** nas opções de desenvolvedor  
   - Conectar via cabo que suporta transferência de dados

---

## Clonar o projeto

```bash
git clone https://github.com/KayleDev/Startcom-Mobile
cd Startcom-Mobile
```
## Instalar dependências
```bash
npm install
```

## Verificar se o celular está conectado
No terminal, digite:
```bash
adb devices
```
Tem que aparecer algo como:

List of devices attached
XYZ12345    device

Se não aparecer, verificar cabo (dependendo do cabo ele não funciona, então tem que testar outros), depuração USB, drivers (Windows).

## Rodar o app no celular
Ainda dentro da pasta do projeto, digite:
```bash
npx react-native run-android
```

## (OPCIONAL) Gerar APK
```bash
cd android
./gradlew assembleRelease
```