// Módulo de Inventario - Gestión completa de productos

// Estructura de datos local (IndexedDB o localStorage)
const STORAGE_KEY = 'tecno_things_inventory';

// Mapeo de categorías y subcategorías
export const CATEGORIES = {
  perifericos: {
    name: 'Periféricos',
    subcategories: {
      mouses: 'Mouses',
      teclados: 'Teclados',
      auriculares: 'Auriculares',
      cables: 'Cables',
      adaptadores: 'Adaptadores'
    }
  },
  monitores: {
    name: 'Monitores',
    subcategories: {
      'monitores-24': 'Monitores 24"',
      'monitores-27': 'Monitores 27"',
      'monitores-ultrawide': 'Monitores Ultrawide',
      'monitores-portatiles': 'Monitores Portátiles'
    }
  },
  hardware: {
    name: 'Hardware',
    subcategories: {
      procesadores: 'Procesadores',
      'tarjetas-graficas': 'Tarjetas Gráficas',
      'memorias-ram': 'Memorias RAM',
      ssd: 'SSD',
      'discos-duros': 'Discos Duros',
      fuentes: 'Fuentes de Poder'
    }
  },
  laptops: {
    name: 'Laptops',
    subcategories: {
      'laptops-budget': 'Budget',
      'laptops-gaming': 'Gaming',
      'laptops-ultrabook': 'Ultrabook',
      macbook: 'MacBook'
    }
  }
};

// Obtener subcategorías de una categoría
export function getSubcategoriesByCategory(category) {
  if (!CATEGORIES[category]) {
    return {};
  }
  return CATEGORIES[category].subcategories;
}

// Obtener productos del inventario local
export function getInventoryProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Guardar productos en el inventario local
export function saveInventoryProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Crear nuevo producto
export function createProduct(productData) {
  const products = getInventoryProducts();
  
  // Generar ID único
  const newId = products.length > 0 
    ? Math.max(...products.map(p => p.id)) + 1 
    : 1;
  
  const newProduct = {
    id: newId,
    name: productData.name,
    price: parseFloat(productData.price),
    stock: parseInt(productData.stock),
    category: productData.category,
    subcategory: productData.subcategory,
    image: productData.image || 'https://via.placeholder.com/400x400?text=Producto',
    detail: productData.detail || '',
    characteristics: productData.characteristics || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  saveInventoryProducts(products);
  
  return newProduct;
}

// Actualizar producto
export function updateProduct(productId, updatedData) {
  const products = getInventoryProducts();
  const index = products.findIndex(p => p.id === productId);
  
  if (index === -1) {
    throw new Error('Producto no encontrado');
  }
  
  products[index] = {
    ...products[index],
    ...updatedData,
    id: productId, // Proteger ID
    updatedAt: new Date().toISOString()
  };
  
  saveInventoryProducts(products);
  return products[index];
}

// Actualizar stock de un producto
export function updateProductStock(productId, newStock) {
  return updateProduct(productId, { stock: parseInt(newStock) });
}

// Eliminar producto
export function deleteProduct(productId) {
  const products = getInventoryProducts();
  const filtered = products.filter(p => p.id !== productId);
  saveInventoryProducts(filtered);
}

// Obtener producto por ID
export function getProductById(productId) {
  const products = getInventoryProducts();
  return products.find(p => p.id === productId);
}

// Obtener productos por categoría
export function getProductsByCategory(category) {
  const products = getInventoryProducts();
  return products.filter(p => p.category === category);
}

// Obtener productos por subcategoría
export function getProductsBySubcategory(category, subcategory) {
  const products = getInventoryProducts();
  return products.filter(p => p.category === category && p.subcategory === subcategory);
}

// Buscar productos
export function searchProducts(query) {
  const products = getInventoryProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.detail.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

// Migrar productos desde products.js
export async function migrateProductsFromJS() {
  try {
    // Importar los productos del archivo products.js
    const { PRODUCTS } = await import('../products.js');
    
    if (!Array.isArray(PRODUCTS)) {
      throw new Error('No se encontraron productos en products.js');
    }
    
    const localProducts = getInventoryProducts();
    
    // Agregar stock predeterminado a productos migrados
    const migratedProducts = PRODUCTS.map(product => ({
      ...product,
      stock: product.stock || 100, // Stock por defecto
      detail: product.detail || '',
      characteristics: product.characteristics || [],
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: product.updatedAt || new Date().toISOString()
    }));
    
    // Combinar: actualizar existentes, agregar nuevos
    const productMap = new Map(migratedProducts.map(p => [p.id, p]));
    const localMap = new Map(localProducts.map(p => [p.id, p]));
    
    // Preservar cambios locales, agregar nuevos del archivo
    localProducts.forEach(local => {
      productMap.set(local.id, local);
    });
    
    const finalProducts = Array.from(productMap.values());
    saveInventoryProducts(finalProducts);
    
    return {
      success: true,
      message: `${migratedProducts.length} productos migrados exitosamente`,
      migratedCount: migratedProducts.length,
      totalProducts: finalProducts.length
    };
  } catch (error) {
    return {
      success: false,
      message: `Error en migración: ${error.message}`,
      error
    };
  }
}

// Obtener estadísticas del inventario
export function getInventoryStats() {
  const products = getInventoryProducts();
  
  return {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStockCount: products.filter(p => p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    byCategory: {
      perifericos: products.filter(p => p.category === 'perifericos').length,
      monitores: products.filter(p => p.category === 'monitores').length,
      hardware: products.filter(p => p.category === 'hardware').length,
      laptops: products.filter(p => p.category === 'laptops').length
    }
  };
}

// Exportar inventario como JSON
export function exportInventoryJSON() {
  const products = getInventoryProducts();
  const dataStr = JSON.stringify(products, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `inventario-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Importar inventario desde JSON
export function importInventoryJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const products = JSON.parse(e.target.result);
        
        if (!Array.isArray(products)) {
          throw new Error('El archivo debe contener un array de productos');
        }
        
        saveInventoryProducts(products);
        resolve({
          success: true,
          message: `${products.length} productos importados`,
          count: products.length
        });
      } catch (error) {
        reject({
          success: false,
          message: `Error al importar: ${error.message}`,
          error
        });
      }
    };
    
    reader.onerror = () => {
      reject({
        success: false,
        message: 'Error al leer el archivo'
      });
    };
    
    reader.readAsText(file);
  });
}

// Validar producto
export function validateProduct(productData) {
  const errors = [];
  
  if (!productData.name || productData.name.trim().length === 0) {
    errors.push('El nombre del producto es requerido');
  }
  
  if (!productData.price || isNaN(parseFloat(productData.price)) || parseFloat(productData.price) < 0) {
    errors.push('El precio debe ser un número válido y mayor a 0');
  }
  
  if (productData.stock === undefined || isNaN(parseInt(productData.stock)) || parseInt(productData.stock) < 0) {
    errors.push('El stock debe ser un número válido y no negativo');
  }
  
  if (!productData.category) {
    errors.push('La categoría es requerida');
  }
  
  if (!productData.subcategory) {
    errors.push('La subcategoría es requerida');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export default {
  getInventoryProducts,
  saveInventoryProducts,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  migrateProductsFromJS,
  getInventoryStats,
  exportInventoryJSON,
  importInventoryJSON,
  validateProduct
};
