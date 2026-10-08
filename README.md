# DotsIA — Simulación corporativa

Guía para clonar el proyecto, abrirlo en Visual Studio Code, instalar sus dependencias y ejecutarlo localmente.

## Requisitos previos

- [Git](https://git-scm.com/downloads), que incluye Git Bash.
- [Visual Studio Code](https://code.visualstudio.com/) y el comando `code` disponible en la terminal.
- [Node.js](https://nodejs.org/) (versión LTS, que incluye npm).

Para comprobar que Git, Node.js y npm están instalados, ejecuta en Git Bash:

```bash
git --version
node --version
npm --version
```

## 1. Clonar el repositorio

En Git Bash, ve a la carpeta donde quieras guardar el proyecto y clona el repositorio:

```bash
cd /c/ruta/a/la/carpeta/donde/guardar/proyectos
git clone https://github.com/Mauricio2202/phishing-simulator.git
```

Entra a la carpeta del proyecto:

```bash
cd phishing-simulator
```

## 2. Abrir el proyecto en Visual Studio Code

Desde la carpeta del proyecto, ejecuta:

```bash
code .
```

El punto indica que se abrirá en VS Code la carpeta actual. Si Git Bash no reconoce `code`, abre VS Code y habilita el comando `code` en el `PATH`, o vuelve a instalar VS Code marcando la opción para agregarlo al `PATH`.

## 3. Instalar las dependencias

Este proyecto utiliza React y Vite. Desde la carpeta raíz del proyecto, instala las dependencias definidas en `package-lock.json` con:

```bash
npm ci
```

No es necesario instalar React o Vite por separado: npm los instalará junto con el resto de las dependencias del proyecto.

## 4. Ejecutar el proyecto

Inicia el servidor de desarrollo con:

```bash
npm run dev
```

Abre en el navegador la dirección local que muestre la terminal (normalmente `http://localhost:5173/`). Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.
