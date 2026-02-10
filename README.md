# 🛍️ Tecno Things - E-Commerce Demo

Sistema de tienda online completamente funcional con múltiples páginas, carrito de compras y tema dinámico.

## 🚀 Inicio Rápido

### Opción 1: Live Server (Recomendado)
```
1. Abre VS Code
2. Instala extensión "Live Server"
3. Click derecho en: stitch/tecno_things_landing_page/index.html
4. Selecciona "Open with Live Server"
```

### Opción 2: Python
```bash
cd diseño_demo
python -m http.server 8000
# Abre http://localhost:8000
```

### Opción 3: Node.js
```bash
cd diseño_demo
npx http-server
```

## 📁 Estructura del Proyecto

```
diseño_demo/
├── stitch/
│   ├── tecno_things_landing_page/
│   │   ├── index.html ← 🏠 LANDING PAGE (INICIO)
│   │   ├── products-by-category.html ← 🛍️ CATEGORÍAS
│   │   ├── product-detail.html ← 📦 DETALLE PRODUCTO
│   │   ├── cart.html ← 🛒 CARRITO
│   │   └── screen.png
│   ├── login_and_registration/
│   │   └── login.html ← 🔐 LOGIN
│   ├── admin_dashboard/
│   │   └── adminDashboard.html
│   ├── customer_dashboard/
│   │   └── clientDashboard.html
│   ├── products.js ← 📊 Datos de productos
│   ├── categories.js ← 📂 Datos de categorías
│   ├── users-data.js ← 👤 Datos de usuarios
│   ├── cart-manager.js ← 🛒 Gestor de carrito
│   ├── theme.js ← 🎨 Sistema de temas
│   └── ui-utils.js
└── README.md
```

## 📱 Páginas Principales

### 1️⃣ Landing Page
**URL:** `stitch/tecno_things_landing_page/index.html`
- Página de inicio con productos destacados
- Categorías de navegación
- Navbar con tema toggle y carrito
- Responsive en todos los dispositivos

### 2️⃣ Productos por Categoría
**URL:** `stitch/tecno_things_landing_page/products-by-category.html?category=XXXX`

Parámetros válidos:
- `?category=perifericos`
- `?category=monitores`
- `?category=hardware`
- `?category=laptops`

Características:
- Filtros por subcategoría
- Grid de productos
- Agregar al carrito directamente
- Ordenamiento

### 3️⃣ Detalle de Producto
**URL:** `stitch/tecno_things_landing_page/product-detail.html?id=XXXX`

Ejemplo: `?id=1`, `?id=2`, etc.

Características:
- Información completa del producto
- Selector de cantidad
- Botón "Agregar al Carrito"
- Productos relacionados
- Compartir en redes sociales

### 4️⃣ Carrito
**URL:** `stitch/tecno_things_landing_page/cart.html`

Características:
- Ver todos los productos
- Modificar cantidades
- Eliminar productos
- Cálculos automáticos
- Código de descuento
- Resumen de compra

## 🎨 Sistema de Temas

El sitio incluye temas **Light** y **Dark** completamente funcionales:

- **Toggle:** Botón en la navbar de todas las páginas
- **Persistencia:** Se guarda en `localStorage` como `tecno-theme`
- **Sincronización:** Automática en todas las pestañas del navegador
- **Por defecto:** Comienza en modo Light

## 🛒 Sistema de Carrito

- **Almacenamiento:** localStorage (`tecno_things_cart`)
- **Persistencia:** Los productos se mantienen al recargar
- **Sincronización:** Se actualiza en tiempo real en todas las páginas
- **Badge:** Muestra cantidad de productos en navbar

## 🔐 Autenticación

Usuarios de prueba:

| Email | Password | Rol |
|-------|----------|-----|
| user@test.com | password123 | Usuario Normal |
| admin@test.com | admin123 | Administrador |

El navbar cambia según estado de autenticación:
- **No autenticado:** Botones "Iniciar Sesión" y "Registrarse"
- **Autenticado:** Avatar con menú dropdown

## 📊 Datos del Sistema

### Productos
- 21 productos disponibles
- Cada uno con: id, name, price, category, subcategory, etc.

### Categorías
- 4 categorías principales
- 36 subcategorías distribuidas

### Usuarios
- 2 usuarios de prueba
- Sistema de roles (admin/usuario)

## 🔄 Flujo de Navegación

```
Landing Page (index.html)
    ↓
    ├─→ Categoría → products-by-category.html?category=XXX
    │       ↓
    │       └─→ Producto → product-detail.html?id=XXX
    │               ↓
    │               ├─→ Agregar al carrito
    │               ├─→ Ver productos relacionados
    │               └─→ Continuar comprando
    │
    ├─→ Producto → product-detail.html?id=XXX
    │       ↓
    │       └─→ Agregar al carrito
    │
    ├─→ Carrito → cart.html
    │       ↓
    │       ├─→ Ver items
    │       ├─→ Modificar cantidades
    │       ├─→ Proceder a pagar
    │       └─→ Continuar comprando
    │
    └─→ Login → login.html
```

## 🎯 Características Principales

✅ **Navegación Multi-página**
- Páginas independientes con parámetros URL

✅ **Carrito Funcional**
- Agregar/quitar productos
- Modificar cantidades
- Cálculos automáticos

✅ **Sistema de Temas**
- Light/Dark mode
- Persistencia en localStorage

✅ **Responsive Design**
- Optimizado para móvil, tablet y desktop
- Navegación adaptable a cada pantalla

✅ **Autenticación**
- Sistema de login
- Roles diferenciados
- Dropdown de usuario

✅ **URLs Dinámicas**
- Parámetros de búsqueda
- No requiere servidor

## 💾 LocalStorage Keys

```javascript
"tecno-theme"        → "light" | "dark"
"tecno_things_cart"  → JSON array de productos
"tecno_user"         → JSON del usuario autenticado
```

## 🐛 Solución de Problemas

### El sitio se ve en blanco
→ Asegúrate de usar un servidor HTTP (Live Server, Python, etc.)
→ No funcionará con file:// URLs

### Los estilos no cargan
→ Verifica que Tailwind CDN esté accesible
→ Recarga la página (Ctrl+F5)

### El carrito no persiste
→ Verifica que localStorage esté habilitado en el navegador
→ Abre DevTools (F12) → Application → LocalStorage

### Los links no funcionan
→ Verifica las rutas relativas en la barra de dirección
→ Asegúrate de estar en el directorio correcto

## 📝 Notas Técnicas

- **HTML/CSS/JavaScript puro** (sin frameworks complejos)
- **Tailwind CSS** vía CDN
- **ES6 Modules** para importar/exportar
- **localStorage** para persistencia
- **Material Icons** para iconografía
- **No requiere servidor backend** (todo en cliente)

## 🚀 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Sistema de pagos (Stripe, PayPal)
- [ ] Búsqueda de productos
- [ ] Sistema de reseñas
- [ ] Wishlist/Favoritos
- [ ] Historial de compras
- [ ] Email de confirmación
- [ ] Panel admin completo

## 📞 Soporte

Para problemas o sugerencias, verifica:
1. La consola del navegador (F12)
2. Los archivos de datos (products.js, categories.js)
3. Las rutas de los archivos

---

**¡Listo para usar!** 🎉
Abre `index.html` en tu navegador y comienza a explorar el sistema.
