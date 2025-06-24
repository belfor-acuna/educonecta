# Sistema de Estilos EduConecta Rural

Este sistema de estilos está construido con **Tailwind CSS v4** y está organizado de manera modular para facilitar la reutilización y el mantenimiento.

## 📁 Estructura de Archivos

```
src/styles/
├── theme.css              # Variables CSS y tema principal
├── components/
│   ├── layout.css         # Contenedores, grids, flexbox
│   ├── buttons.css        # Todos los estilos de botones
│   ├── cards.css          # Tarjetas y componentes de contenido
│   ├── forms.css          # Formularios e inputs
│   ├── typography.css     # Tipografía y texto
│   └── navigation.css     # Navegación y menús
└── README.md             # Esta documentación
```

## 🎨 Variables del Tema

### Colores Principales
- `--color-primary`: #2563eb (Azul principal)
- `--color-secondary`: #10b981 (Verde secundario)
- `--color-accent`: #f59e0b (Amarillo de acento)

### Colores de Estado
- `--color-success`: #10b981
- `--color-error`: #ef4444
- `--color-warning`: #f59e0b
- `--color-info`: #3b82f6

### Espaciado
- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)

## 🧩 Componentes Disponibles

### Layout (layout.css)
```html
<!-- Contenedor principal -->
<div class="container-main">
  <div class="container-section">
    <!-- Contenido -->
  </div>
</div>

<!-- Header -->
<header class="header-main">
  <div class="container-section">
    <div class="header-container">
      <h1 class="header-logo">EduConecta</h1>
      <nav class="header-nav">
        <div class="header-nav-list">
          <a href="#" class="header-nav-link">Inicio</a>
        </div>
      </nav>
    </div>
  </div>
</header>

<!-- Secciones -->
<section class="section-padding section-bg-white">
  <!-- Contenido -->
</section>
```

### Botones (buttons.css)
```html
<!-- Botones principales -->
<button class="btn-primary">Botón Primario</button>
<button class="btn-secondary">Botón Secundario</button>
<button class="btn-white">Botón Blanco</button>

<!-- Tamaños -->
<button class="btn-primary btn-sm">Pequeño</button>
<button class="btn-primary btn-lg">Grande</button>

<!-- Grupos -->
<div class="btn-group">
  <button class="btn-primary">Acción 1</button>
  <button class="btn-secondary">Acción 2</button>
</div>
```

### Tarjetas (cards.css)
```html
<!-- Tarjeta básica -->
<div class="card">
  <h3 class="heading-card">Título</h3>
  <p class="text-card">Contenido de la tarjeta</p>
</div>

<!-- Tarjeta de característica -->
<div class="feature-card">
  <div class="feature-card-icon-primary">
    <!-- Icono -->
  </div>
  <h3 class="feature-card-title">Título</h3>
  <p class="feature-card-description">Descripción</p>
</div>

<!-- Tarjeta de beneficio -->
<div class="benefit-card-primary">
  <div class="benefit-card-header">
    <div class="benefit-card-icon-primary">
      <!-- Icono -->
    </div>
    <h3 class="benefit-card-title">Título</h3>
  </div>
  <ul class="benefit-card-list">
    <li class="benefit-card-item">
      <svg class="benefit-card-item-icon"><!-- Icono --></svg>
      <span class="benefit-card-item-text">Beneficio 1</span>
    </li>
  </ul>
</div>
```

### Formularios (forms.css)
```html
<!-- Formulario básico -->
<form class="form-container">
  <div class="form-group">
    <label class="form-label">Nombre</label>
    <input type="text" class="form-input" placeholder="Tu nombre">
  </div>
  
  <div class="form-group">
    <label class="form-label">Mensaje</label>
    <textarea class="form-textarea" placeholder="Tu mensaje"></textarea>
  </div>
  
  <button type="submit" class="contact-form-submit">Enviar</button>
</form>

<!-- Formulario de búsqueda -->
<div class="form-search">
  <input type="text" class="form-search-input" placeholder="Buscar...">
  <svg class="form-search-icon"><!-- Icono --></svg>
</div>
```

### Tipografía (typography.css)
```html
<!-- Títulos -->
<h1 class="heading-hero">Título Principal</h1>
<h2 class="heading-section">Título de Sección</h2>
<h3 class="heading-subsection">Subtítulo</h3>

<!-- Párrafos -->
<p class="text-hero">Texto principal destacado</p>
<p class="text-section">Texto de sección</p>
<p class="text-card">Texto de tarjeta</p>

<!-- Listas -->
<ul class="list-styled">
  <li class="list-item">
    <svg class="list-item-icon"><!-- Icono --></svg>
    <span class="list-item-text">Elemento de lista</span>
  </li>
</ul>

<!-- Enlaces -->
<a href="#" class="link">Enlace normal</a>
<a href="#" class="link-light">Enlace claro</a>
```

### Navegación (navigation.css)
```html
<!-- Navegación principal -->
<nav class="nav-main">
  <div class="container-section">
    <div class="nav-container">
      <a href="#" class="nav-brand">EduConecta</a>
      <div class="nav-desktop">
        <div class="nav-list">
          <a href="#" class="nav-link">Inicio</a>
          <a href="#" class="nav-link-active">Activo</a>
        </div>
      </div>
    </div>
  </div>
</nav>

<!-- Tabs -->
<div class="tab-nav">
  <a href="#" class="tab-link-active">Tab 1</a>
  <a href="#" class="tab-link">Tab 2</a>
</div>
```

## 🚀 Cómo Usar

1. **Importación**: Los estilos se importan automáticamente en `src/index.css`

2. **Clases Utilitarias**: Combina las clases de componentes con las utilitarias de Tailwind:
   ```html
   <button class="btn-primary hover:shadow-lg transform hover:scale-105">
     Botón con efectos
   </button>
   ```

3. **Personalización**: Modifica las variables en `theme.css` para cambiar colores, espaciado, etc.

4. **Responsive**: Usa los prefijos de Tailwind para responsive design:
   ```html
   <div class="card md:card-lg lg:card-hover-lift">
     Tarjeta responsive
   </div>
   ```

## 🎯 Ejemplos de Uso en EduConecta

### Hero Section
```html
<section class="section-padding">
  <div class="container-section text-center">
    <h1 class="heading-hero">Conectando la Educación Rural</h1>
    <p class="text-hero max-w-3xl mx-auto">
      Sistema integral para el monitoreo y gestión académica...
    </p>
    <div class="btn-group">
      <button class="btn-primary">Conocer Más</button>
      <button class="btn-secondary">Ver Demo</button>
    </div>
  </div>
</section>
```

### Grid de Características
```html
<section class="section-padding section-bg-gray">
  <div class="container-section">
    <h2 class="heading-section text-center">Características</h2>
    <div class="grid-features">
      <div class="feature-card">
        <div class="feature-card-icon-primary">
          <!-- Icono -->
        </div>
        <h3 class="feature-card-title">Gestión de Escuelas</h3>
        <p class="feature-card-description">Descripción...</p>
      </div>
      <!-- Más tarjetas -->
    </div>
  </div>
</section>
```

## 📝 Notas Importantes

- **Tailwind v4**: Este sistema usa la nueva sintaxis de Tailwind CSS v4
- **Variables CSS**: Todas las variables están definidas en `theme.css`
- **Modularidad**: Cada archivo de componente es independiente
- **Reutilización**: Las clases están diseñadas para ser reutilizadas
- **Mantenimiento**: Fácil de mantener y extender

## 🔧 Extensión

Para agregar nuevos componentes:

1. Crea un nuevo archivo en `src/styles/components/`
2. Define tus clases usando `@layer components`
3. Importa el archivo en `src/index.css`
4. Documenta las nuevas clases aquí

¡Listo para usar en cualquier componente de React! 🎉
