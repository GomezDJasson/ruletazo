# 🎯 Ruletazo

Ruletazo es una aplicación web interactiva que permite crear una lista de opciones y seleccionar una de ellas de forma aleatoria mediante una ruleta animada.

Está pensada para situaciones en las que necesitas tomar una decisión de forma rápida y sencilla: elegir una actividad, decidir qué jugar, seleccionar una opción al azar o simplemente añadir un poco de diversión al proceso.

## ✨ Características

* 🎡 Ruleta interactiva con animaciones.
* ➕ Agregar y eliminar opciones.
* 🎯 Selección aleatoria de un ganador.
* 🏆 Modal con el resultado seleccionado.
* 🔊 Efectos de sonido durante el giro.
* 🔇 Control para activar o desactivar los sonidos.
* 📜 Historial de resultados.
* 💾 Persistencia de opciones mediante `localStorage`.
* 📱 Diseño responsive para desktop, tablet y dispositivos móviles.
* 🌙 Soporte para tema claro y oscuro.
* ⚡ Interfaz rápida y fluida.
* 🎨 Segmentos y texto de la ruleta generados dinámicamente según la cantidad de opciones.

## 🛠️ Tecnologías

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide React**
* **Web Audio API**
* **LocalStorage**

## 📂 Estructura del proyecto

```text
src/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── History.tsx
│   ├── OptionForm.tsx
│   ├── OptionList.tsx
│   ├── Wheel.tsx
│   └── WinnerModal.tsx
├── hooks/
├── types/
├── utils/
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

La aplicación está organizada por responsabilidades para facilitar su mantenimiento y evolución.

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/GomezDJasson/ruletazo.git
```

Entra al proyecto:

```bash
cd ruletazo
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la URL indicada por Vite, normalmente:

```text
http://localhost:5173
```

## 🏗️ Build de producción

Para comprobar que el proyecto puede compilarse correctamente:

```bash
npm run build
```

Para ejecutar la versión de producción localmente:

```bash
npm run preview
```

## 📱 Responsive Design

Ruletazo está diseñado para funcionar en diferentes tamaños de pantalla.

La interfaz ha sido probada en:

* 💻 Desktop
* 📱 Mobile

La ruleta adapta su tamaño al espacio disponible y mantiene la legibilidad de las opciones incluso cuando aumenta el número de segmentos.

## 🧠 Aspectos técnicos destacados

### Ruleta dinámica

Los segmentos de la ruleta se generan dinámicamente a partir de las opciones introducidas por el usuario.

La distribución se recalcula automáticamente al agregar o eliminar opciones.

### Selección aleatoria

El ganador se determina mediante un índice aleatorio asociado a las opciones actuales.

### Persistencia

Las opciones se almacenan utilizando `localStorage`, permitiendo conservarlas después de recargar la página.

### Animaciones

Framer Motion se utiliza para controlar la animación de giro y proporcionar una experiencia más fluida.

### Sonido

Los efectos de sonido utilizan la Web Audio API, evitando depender de archivos de audio externos.

## 📸 Capturas

> Próximamente se añadirán capturas de la aplicación en desktop y mobile.

## 🔗 Demo

> Próximamente disponible.

## 👨‍💻 Autor

**Jasson D. Gomez**

Desarrollador enfocado en construir aplicaciones web modernas, funcionales y responsive.

* GitHub: [@GomezDJasson](https://github.com/GomezDJasson)

---

⭐ Si te gusta el proyecto, considera darle una estrella al repositorio.
