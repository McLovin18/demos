# Sistema de Gestión de Secciones - Guía de Uso

## Cómo Funciona

### 1️⃣ **Crear una Sección desde el Editor**

**En `landing-editor.html` (Editor):**
- Haz clic en el botón **"Agregar Sección"** (+ Agregar)
- Se abre un modal con 8 tipos de secciones:
  - `hero`, `text-image`, `image-text`, `banner`, `gallery`
  - **`categories`** ← Nuestro nuevo tipo para categorías
  - **`featured-products`** ← Nuestro nuevo tipo para productos
  - `newsletter`

### 2️⃣ **Gestionar Categorías**

**Para una sección de tipo "categories":**

```javascript
// El editor muestra:
// ✓ Campo de "Título de la Sección"
// ✓ Lista editable de categorías con:
//   - Nombre (editable)
//   - Icon (editable - usa Material Icons)
//   - Link (editable)
//   - Botón para eliminar
// ✓ Botón "+ Agregar Categoría"

// Estructura de datos en localStorage:
{
  id: "section-1234567890",
  type: "categories",
  order: 2,
  title: "Nuestras Categorías",
  categories: [
    { id: 1704067890000, name: "Laptops", icon: "computer", link: "/laptops" },
    { id: 1704067891000, name: "Móviles", icon: "phone", link: "/phones" }
  ]
}
```

**Funciones disponibles:**
```javascript
addCategory(sectionId)           // Agregar nueva categoría
updateCategory(sectionId, idx, field, value)  // Editar nombre/icon/link
removeCategory(sectionId, idx)   // Eliminar una categoría
```

### 3️⃣ **Gestionar Productos Destacados**

**Para una sección de tipo "featured-products":**

```javascript
// El editor muestra:
// ✓ Campo de "Título de la Sección"
// ✓ Lista de productos seleccionados con:
//   - Nombre del producto
//   - ID (solo referencia)
//   - Botón para eliminar
// ✓ Botón "+ Agregar Producto"
//   → Se abre un modal con productos disponibles (checkbox)

// Estructura de datos en localStorage:
{
  id: "section-9876543210",
  type: "featured-products",
  order: 3,
  title: "Productos Destacados",
  products: [
    { id: 1, name: "MacBook Pro M2", price: "$1,299.00", category: "Tecnología" },
    { id: 4, name: "Smartwatch Pro", price: "$399.00", category: "Wearables" }
  ]
}
```

**Funciones disponibles:**
```javascript
openProductSelector(sectionId)   // Abre modal para seleccionar productos
addProduct(sectionId, product)   // Agrega producto a la sección
removeProduct(sectionId, idx)    // Elimina producto de la sección
```

### 4️⃣ **Cómo se Renderizan en la Landing Page**

**En `index.html` (Landing Page):**

La función `loadSectionsData()` renderiza cada sección según su tipo:

```javascript
// Para type === 'categories':
// ✓ Muestra título
// ✓ Renderiza grid de categorías con:
//   - Icon (usando Material Icons)
//   - Nombre
//   - Link clickeable
// ✓ Responsive: 2 cols mobile, 3 cols tablet, 5 cols desktop

// Para type === 'featured-products':
// ✓ Muestra título
// ✓ Renderiza grid de productos con:
//   - Nombre
//   - Categoría
//   - Precio
// ✓ Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop
```

### 5️⃣ **Flujo Completo de Guardado**

1. **Usuario edita en el editor** (landing-editor.html)
   - Cambios se guardan en memoria en la variable `sections`
   - Sin guardar automáticamente al localStorage

2. **Usuario hace clic en "💾 Guardar"**
   ```javascript
   SectionsManager.saveSections(sections) // Guarda a localStorage
   localStorage.setItem('landing_editor_last_save', timestamp)
   ```

3. **Landing page detecta el cambio**
   - Escucha evento `'storage'` en clave `'landing_editor_last_save'`
   - Se dispara la función `loadSectionsData()`
   - Se renderizan todas las secciones en nuevo orden

### 6️⃣ **Reordenar Secciones**

En el editor, puedes **arrastrar y soltar** secciones para reordenarlas:

```javascript
// Drag-and-drop implementation:
divSection.draggable = true
addEventListener('dragstart') → Marca índice de sección
addEventListener('dragover', 'drop') → Intercambia posiciones
sections.forEach((s, idx) => s.order = idx + 1)  // Recalcula orden
```

---

## 📋 Checklist de Funcionalidades

✅ **Editor Visual**
- ✅ Crear secciones de tipo "categories"
- ✅ Crear secciones de tipo "featured-products"
- ✅ Editar inline título, nombre, icon, link de categorías
- ✅ Agregar/eliminar categorías individuales
- ✅ Modal selector de productos
- ✅ Agregar/eliminar productos de la sección
- ✅ Drag-and-drop para reordenar secciones
- ✅ Botón "Guardar" que persiste en localStorage

✅ **Landing Page Rendering**
- ✅ Renderizar secciones de categorías dinámicamente
- ✅ Renderizar secciones de productos dinámicamente
- ✅ Mostrar en orden correcto (según value de `order`)
- ✅ Detectar cambios automáticamente

✅ **Data Persistence**
- ✅ localStorage con clave `'tecno_landing_sections'`
- ✅ Sincronización entre editor y landing page
- ✅ Event listeners para cambios en tiempo real

---

## 🚀 Próximas Mejoras Opcionales

1. **Integración con Inventario Real**
   - En `openProductSelector()`, cargar productos desde `products.js` o API
   - Actualmente usa array de ejemplo

2. **Búsqueda/Filtro en Selector**
   - Agregar input search en modal de productos
   - Filtrar por nombre o categoría

3. **Preview de Imágenes de Productos**
   - Agregar URL de imagen a estructura de productos
   - Mostrar thumbnail en selector

4. **Validación y Alertas**
   - Alertar si hay categorías/productos vacíos
   - Validar que no haya duplicados

5. **Drag-and-drop para Reordenar Categorías/Productos**
   - Permitir reordenar dentro de cada sección, no solo secciones completas
