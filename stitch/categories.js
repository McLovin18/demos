// Categorías principales de Tecno Things
export const CATEGORIES = [
  { id: "perifericos", label: "Periféricos", icon: "mouse" },
  { id: "monitores", label: "Monitores", icon: "desktop_mac" },
  { id: "hardware", label: "Hardware", icon: "build" },
  { id: "laptops", label: "Laptops", icon: "laptop" },
];

// Subcategorías
export const SUBCATEGORIES = [
  // Periféricos
  { id: "perifericos", value: "mouses", label: "Mouses", icon: "mouse", minId: 1, maxId: 139 },
  { id: "perifericos", value: "teclados", label: "Teclados", icon: "keyboard", minId: 140, maxId: 279 },
  { id: "perifericos", value: "auriculares", label: "Auriculares", icon: "headphones", minId: 280, maxId: 419 },
  { id: "perifericos", value: "mousepads", label: "Mouse Pads", icon: "crop_square", minId: 420, maxId: 559 },
  { id: "perifericos", value: "microfonos", label: "Micrófonos", icon: "mic", minId: 560, maxId: 699 },
  { id: "perifericos", value: "cables", label: "Cables", icon: "cable", minId: 700, maxId: 839 },
  { id: "perifericos", value: "adaptadores", label: "Adaptadores", icon: "adapter", minId: 840, maxId: 979 },
  { id: "perifericos", value: "hubs", label: "Hubs USB", icon: "hub", minId: 980, maxId: 1119 },
  { id: "perifericos", value: "webcams", label: "Webcams", icon: "videocam", minId: 1120, maxId: 1259 },
  { id: "perifericos", value: "joysticks", label: "Joysticks", icon: "videogame_asset", minId: 1260, maxId: 1399 },

  // Monitores
  { id: "monitores", value: "monitores-24", label: "Monitores 24 pulgadas", icon: "desktop_mac", minId: 2000, maxId: 2169 },
  { id: "monitores", value: "monitores-27", label: "Monitores 27 pulgadas", icon: "desktop_mac", minId: 2170, maxId: 2339 },
  { id: "monitores", value: "monitores-32", label: "Monitores 32 pulgadas", icon: "desktop_mac", minId: 2340, maxId: 2509 },
  { id: "monitores", value: "monitores-ultrawide", label: "Monitores Ultrawide", icon: "desktop_mac", minId: 2510, maxId: 2679 },
  { id: "monitores", value: "monitores-gaming", label: "Monitores Gaming", icon: "sports_esports", minId: 2680, maxId: 2849 },
  { id: "monitores", value: "soportes", label: "Soportes para monitores", icon: "support", minId: 2850, maxId: 3019 },

  // Hardware
  { id: "hardware", value: "procesadores", label: "Procesadores", icon: "memory", minId: 4000, maxId: 4169 },
  { id: "hardware", value: "tarjetas-graficas", label: "Tarjetas Gráficas", icon: "animation", minId: 4170, maxId: 4339 },
  { id: "hardware", value: "memorias-ram", label: "Memorias RAM", icon: "database", minId: 4340, maxId: 4509 },
  { id: "hardware", value: "ssd", label: "SSD", icon: "storage", minId: 4510, maxId: 4679 },
  { id: "hardware", value: "discos-duros", label: "Discos Duros", icon: "storage", minId: 4680, maxId: 4849 },
  { id: "hardware", value: "fuentes-poder", label: "Fuentes de Poder", icon: "power", minId: 4850, maxId: 5019 },
  { id: "hardware", value: "gabinetes", label: "Gabinetes", icon: "inventory_2", minId: 5020, maxId: 5189 },
  { id: "hardware", value: "refrigeracion", label: "Refrigeración", icon: "ac_unit", minId: 5190, maxId: 5359 },
  { id: "hardware", value: "placas-madre", label: "Placas Madre", icon: "memory", minId: 5360, maxId: 5529 },

  // Laptops
  { id: "laptops", value: "laptops-budget", label: "Laptops Budget", icon: "laptop", minId: 6000, maxId: 6169 },
  { id: "laptops", value: "laptops-mid-range", label: "Laptops Mid-Range", icon: "laptop", minId: 6170, maxId: 6339 },
  { id: "laptops", value: "laptops-gaming", label: "Laptops Gaming", icon: "sports_esports", minId: 6340, maxId: 6509 },
  { id: "laptops", value: "laptops-profesional", label: "Laptops Profesionales", icon: "work", minId: 6510, maxId: 6679 },
  { id: "laptops", value: "laptops-ultraportables", label: "Laptops Ultraportables", icon: "import_export", minId: 6680, maxId: 6849 },
  { id: "laptops", value: "accesorios-laptops", label: "Accesorios para Laptops", icon: "account_balance", minId: 6850, maxId: 6999 },
];

// Helper para obtener subcategorías de una categoría
export const getSubcategoriesByCategory = (categoryId) => {
  return SUBCATEGORIES.filter(sub => sub.id === categoryId);
};

// Helper para obtener el rango de IDs de una subcategoría
export const getSubcategoryIdRange = (value) => {
  const sub = SUBCATEGORIES.find(s => s.value === value);
  if (!sub || typeof sub.minId !== "number" || typeof sub.maxId !== "number") {
    return null;
  }
  return { categoryId: sub.id, minId: sub.minId, maxId: sub.maxId };
};

// Export por defecto
export default CATEGORIES;
