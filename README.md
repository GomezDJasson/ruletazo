# 🎯 Ruletazo

**Ruletazo** es una aplicación web interactiva que te ayuda a tomar decisiones de forma sencilla y divertida. Crea tus propias ruletas, agrega opciones y deja que una ruleta animada elija el resultado al azar.

🔗 **[Probar Ruletazo](https://ruletazo-ten.vercel.app/)**

## ✨ Características

- 🎡 **Varias ruletas independientes:** crea, selecciona, renombra y elimina ruletas.
- 🧩 **Opciones separadas por ruleta:** cada ruleta conserva su propia lista de opciones.
- ✏️ **Gestión de opciones:** agrega, edita y elimina opciones antes de girar.
- 🎯 **Resultado animado:** la ruleta gira durante la animación y el resultado coincide con el segmento ganador.
- 🏆 **Modal de ganador** para destacar el resultado seleccionado.
- 📜 **Historial por ruleta:** consulta los resultados anteriores de cada una y limpia su historial de forma independiente.
- 💾 **Persistencia local:** ruletas, opciones, tema e historial se guardan en el navegador mediante `localStorage`.
- 🔊 **Efectos de sonido** con control para activarlos o desactivarlos.
- 🎉 **Confeti** al mostrar el resultado.
- 🌗 **Tema claro y oscuro.**
- 📱 **Diseño responsive** para computadoras, tabletas y móviles.
- 📚 **Paneles con desplazamiento propio** para mantener organizadas las listas largas de opciones y el historial.

## 🛠️ Tecnologías

- **React 19** — interfaz basada en componentes.
- **TypeScript** — tipado estático.
- **Vite** — servidor de desarrollo y compilación.
- **Tailwind CSS 4** — estilos y diseño responsive.
- **Framer Motion** — animaciones.
- **Lucide React** — iconos.
- **canvas-confetti** — efecto de confeti.
- **Web Audio API** — efectos de sonido.
- **LocalStorage** — persistencia de datos en el navegador.

## 📂 Estructura del proyecto

```text
src/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── History.tsx
│   ├── OptionForm.tsx
│   ├── OptionList.tsx
│   ├── RouletteSelector.tsx
│   ├── Wheel.tsx
│   └── WinnerModal.tsx
├── hooks/
│   ├── useConfetti.ts
│   ├── useHistory.ts
│   ├── useLocalStorage.ts
│   └── useSound.ts
├── types/
│   └── index.ts
├── utils/
│   ├── colors.ts
│   └── wheel.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🧠 Detalles de implementación

### Ruletas independientes

El selector permite administrar varias ruletas. Cada una tiene un identificador, un nombre y sus propias opciones. La selección actual se conserva al volver a abrir la aplicación.

### Giro y resultado

Los segmentos se calculan a partir de las opciones de la ruleta activa. Durante el giro, las opciones se mantienen estables y el resultado final corresponde al segmento señalado por la ruleta.

### Historial por ruleta

Los resultados se guardan asociados a la ruleta que los generó. Cada historial conserva hasta 20 resultados, evitando que crezca indefinidamente.

### Guardado local

La aplicación usa `localStorage` para conservar los datos en el mismo navegador y dispositivo. No requiere una cuenta para usar sus funciones principales. Los datos locales no se sincronizan automáticamente entre dispositivos o navegadores.

### Accesibilidad visual y adaptación

La interfaz ofrece tema claro y oscuro, controles para administrar las ruletas y listas con desplazamiento propio para facilitar el uso tanto en pantallas grandes como pequeñas.

## 🚀 Instalación y uso local

Necesitas tener instalado **Node.js** y **npm**.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/GomezDJasson/ruletazo.git
   ```

2. Entra en la carpeta:

   ```bash
   cd ruletazo
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Vite mostrará en la terminal la dirección local para abrir la aplicación, normalmente `http://localhost:5173`.

## 🧪 Comprobaciones y compilación

Ejecuta ESLint para revisar el código:

```bash
npm run lint
```

Genera la compilación de producción:

```bash
npm run build
```

Para previsualizar la compilación localmente:

```bash
npm run preview
```

## 🌐 Demo

La versión publicada está disponible en Vercel:

**[ruletazo-ten.vercel.app](https://ruletazo-ten.vercel.app/)**

## 👨‍💻 Autor

**Jasson D. Gomez**

- GitHub: [@GomezDJasson](https://github.com/GomezDJasson)

---

Si Ruletazo te resulta útil, puedes apoyar el proyecto dándole una ⭐ en GitHub.
