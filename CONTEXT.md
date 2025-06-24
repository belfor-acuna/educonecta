# EduConecta Rural - Contexto del Proyecto Frontend

## 📋 Descripción del Proyecto

**EduConecta Rural** es una aplicación frontend desarrollada en React que presenta el sistema integral para el monitoreo y gestión académica en escuelas rurales del sur de Chile. Este frontend sirve como landing page y portal de información para el proyecto.

### 🎯 Propósito del Frontend
- **Landing Page**: Presentación del sistema EduConecta Rural
- **Información del Producto**: Características, beneficios y funcionalidades
- **Portal de Contacto**: Formularios para solicitar información y demos
- **Showcase**: Demostración visual del impacto y alcance del sistema

## 🌍 Contexto del Sistema EduConecta Rural

### Problemática Abordada
Las escuelas rurales del sur de Chile enfrentan desafíos únicos:
- **Baja Conectividad**: Internet limitado o intermitente
- **Monitoreo Limitado**: Dificultad para seguir el progreso académico en tiempo real
- **Recursos Limitados**: Herramientas complejas que requieren formación técnica avanzada
- **Aislamiento Geográfico**: Dificultad para comunicación con familias y autoridades

### Solución Propuesta
Sistema modular que permite:
- ✅ Registrar y monitorear el progreso académico de estudiantes
- ✅ Gestionar asistencia, participación y actividades escolares
- ✅ Funcionalidad offline con sincronización automática
- ✅ Reportes para docentes, familias y ministerio
- ✅ Herramientas simples para docentes con formación básica en TIC

### Cliente y Alcance
- **Cliente**: Dirección de Educación Rural – Ministerio de Educación de Chile
- **Usuarios Objetivo**: 
  - Docentes de escuelas rurales
  - Familias de estudiantes
  - Autoridades del Ministerio de Educación
  - Directores de escuelas rurales

### Funcionalidades del Sistema Completo
1. **Registro de Escuelas**: Gestión de escuelas rurales y sus docentes
2. **Fichas de Estudiantes**: Datos personales, rendimiento, asistencia
3. **Gestión de Actividades**: Carga de actividades por docente
4. **Reportes Inteligentes**: Avance por curso, escuela y región
5. **Sincronización Offline/Online**: Funciona sin internet
6. **Portal Familiar**: Acceso web y móvil para familias
7. **Administración de Usuarios**: Gestión de permisos y accesos

## 🛠️ Stack Tecnológico Frontend

### Tecnologías Principales
- **React 18**: Framework principal para la interfaz de usuario
- **Vite**: Herramienta de build y desarrollo
- **Tailwind CSS v4**: Framework de estilos utilitarios
- **JavaScript ES6+**: Lenguaje de programación

### Estructura del Proyecto
```
educonecta/
├── src/
│   ├── App.jsx                 # Componente principal (Landing Page)
│   ├── index.css              # Archivo principal de estilos
│   └── styles/                # Sistema de estilos modular
│       ├── theme.css          # Variables CSS y tema
│       ├── components/        # Componentes de estilos
│       │   ├── layout.css     # Contenedores y grids
│       │   ├── buttons.css    # Botones reutilizables
│       │   ├── cards.css      # Tarjetas y componentes
│       │   └── typography.css # Tipografía y texto
│       └── README.md          # Documentación de estilos
├── public/                    # Archivos estáticos
├── package.json              # Dependencias del proyecto
├── postcss.config.js         # Configuración PostCSS para Tailwind v4
└── CONTEXT.md                # Este archivo de contexto
```

## 🎨 Sistema de Estilos

### Tailwind CSS v4 - Configuración
- **Sintaxis Nueva**: `@import "tailwindcss"` en lugar de directivas separadas
- **Variables CSS**: Definidas en `@theme` blocks
- **PostCSS Plugin**: `@tailwindcss/postcss` para procesamiento
- **Sin Archivo Config**: No requiere `tailwind.config.js` tradicional

### Arquitectura de Estilos Modular

#### 1. **Theme (theme.css)**
Variables CSS centralizadas:
```css
@theme {
  --color-primary: #2563eb;      /* Azul principal */
  --color-secondary: #10b981;    /* Verde secundario */
  --color-accent: #f59e0b;       /* Amarillo de acento */
  --spacing-md: 1rem;            /* Espaciado medio */
  --radius-lg: 0.75rem;          /* Bordes redondeados */
  --shadow-md: 0 4px 6px...;     /* Sombras */
}
```

#### 2. **Layout (layout.css)**
Contenedores y estructura:
- `.container-main`: Contenedor principal con gradiente
- `.container-section`: Contenedor de sección con max-width
- `.header-main`: Estilos del header
- `.section-padding`: Espaciado de secciones
- `.grid-features`: Grid para tarjetas de características

#### 3. **Buttons (buttons.css)**
Botones reutilizables:
- `.btn-primary`: Botón principal azul
- `.btn-secondary`: Botón secundario con borde
- `.btn-group`: Grupo de botones responsive

#### 4. **Cards (cards.css)**
Componentes de tarjetas:
- `.feature-card`: Tarjeta de característica
- `.feature-card-icon-*`: Iconos con colores específicos
- `.feature-card-title`: Títulos de tarjetas
- `.feature-card-description`: Descripciones

#### 5. **Typography (typography.css)**
Tipografía consistente:
- `.heading-hero`: Título principal de hero
- `.heading-section`: Títulos de sección
- `.text-hero`: Texto principal destacado
- `.text-section`: Texto de sección

### Paleta de Colores del Proyecto

#### Colores Principales
- **Azul Primario** (`#2563eb`): Confianza, profesionalismo, tecnología
- **Verde Secundario** (`#10b981`): Crecimiento, naturaleza rural, éxito
- **Amarillo Acento** (`#f59e0b`): Atención, advertencias, destacados

#### Colores de Estado
- **Éxito**: Verde para confirmaciones y logros
- **Error**: Rojo para problemas y alertas
- **Advertencia**: Amarillo para precauciones
- **Información**: Azul para datos informativos

#### Colores de Fondo
- **Primario**: Blanco para contenido principal
- **Secundario**: Gris muy claro para secciones alternas
- **Gradientes**: Azul a verde para hero y CTAs

## 📱 Responsive Design

### Breakpoints Utilizados
- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: > 768px

### Estrategia Mobile-First
- Diseño base para móvil
- Mejoras progresivas para pantallas más grandes
- Grid responsive que se adapta automáticamente
- Navegación móvil con menú hamburguesa

## 🧩 Componentes de la Landing Page

### 1. **Header/Navegación**
- Logo de EduConecta Rural
- Navegación desktop con enlaces a secciones
- Menú móvil hamburguesa
- Sticky navigation

### 2. **Hero Section**
- Título principal impactante
- Descripción del sistema
- Call-to-action buttons
- Gradiente de fondo

### 3. **Sección de Problemas**
- Identificación de desafíos rurales
- Tarjetas con iconos descriptivos
- Grid responsive de 3 columnas

### 4. **Características Principales**
- Grid de 6 características
- Iconos con colores diferenciados
- Descripciones detalladas

### 5. **Beneficios por Stakeholder**
- Tres columnas: Docentes, Familias, Ministerio
- Listas de beneficios específicos
- Colores diferenciados por audiencia

### 6. **Estadísticas de Impacto**
- Números destacados
- Fondo azul con texto blanco
- Grid de 4 estadísticas

### 7. **Call-to-Action**
- Gradiente llamativo
- Botones de acción principales
- Mensaje motivacional

### 8. **Formulario de Contacto**
- Información de contacto
- Formulario funcional
- Grid de 2 columnas

### 9. **Footer**
- Enlaces organizados
- Información corporativa
- Redes sociales

## 🔄 Flujo de Desarrollo

### Comandos Principales
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

### Flujo de Estilos
1. **Variables**: Definir en `theme.css`
2. **Componentes**: Crear en archivos específicos
3. **Importar**: Agregar a `index.css`
4. **Usar**: Aplicar clases en componentes React

## 📚 Documentación y Recursos

### Archivos de Documentación
- `src/styles/README.md`: Guía completa del sistema de estilos
- `CONTEXT.md`: Este archivo de contexto del proyecto

### Recursos Externos
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎯 Objetivos del Frontend

### Inmediatos
- ✅ Landing page funcional y atractiva
- ✅ Sistema de estilos reutilizable
- ✅ Responsive design completo
- ✅ Información clara del producto

### Futuros (Posibles Expansiones)
- 🔄 Portal de login para usuarios
- 🔄 Dashboard de demostración
- 🔄 Integración con backend
- 🔄 Aplicación móvil complementaria

---

**Nota**: Este es un proyecto frontend que presenta y promociona el sistema EduConecta Rural. El sistema completo incluiría backend, base de datos y aplicaciones móviles para el funcionamiento completo en escuelas rurales.
