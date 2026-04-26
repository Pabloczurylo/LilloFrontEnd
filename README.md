# 🍎 Lillo - Gestión Integral de Verdulería

Sistema de gestión profesional diseñado para optimizar las operaciones de una verdulería, abarcando desde la venta al público y el punto de venta (POS) hasta el control de inventario y el balance financiero.

## 🚀 Stack Tecnológico

El proyecto utiliza un stack moderno y escalable (PERN Stack) para garantizar un rendimiento óptimo:

### Frontend
- **React.js + Vite**: Para una experiencia de desarrollo rápida y una interfaz reactiva.
- **Tailwind CSS**: Para un diseño estilizado, responsivo y basado en los mockups.
- **Deployment**: [Vercel](https://vercel.com/)

### Backend & Base de Datos
- **Node.js & Express**: Servidor robusto para la lógica de negocio.
- **Prisma ORM**: Para un modelado de datos type-safe y migraciones sencillas.
- **PostgreSQL**: Base de datos relacional para la integridad de la información.
- **Hosting/BaaS**: [Supabase](https://supabase.com/) (Base de datos y despliegue del backend).

## 📂 Estructura del Proyecto (Frontend)

Siguiendo una arquitectura basada en **Features**, el proyecto se organiza de la siguiente manera:

```text
src/
├── assets/           # Recursos estáticos (Logos, Iconos)
├── components/       # Componentes de UI atómicos (common, layout)
├── context/          # Manejo de estado global (Carrito, Auth)
├── features/         # Módulos de negocio (Shop, Inventory, POS, Finance)
│   ├── shop/         # Catálogo para el cliente
│   ├── inventory/    # Gestión de stock y precios
│   ├── pos/          # Punto de venta rápido
│   └── finance/      # Balances y reportes
├── hooks/            # Lógica extraída y reutilizable
├── services/         # Integración con la API y servicios externos
├── utils/            # Funciones de ayuda y formateo
└── pages/            # Enrutado principal (React Router)

## ✨ Características Principales
Cesta de Frescura: Interfaz para clientes con catálogo de productos y categorías.

Punto de Venta (POS): Registro rápido de ventas en el local con calculadora de peso y precio.

Gestión de Inventario: Control de stock en tiempo real, carga de productos y actualización masiva de precios.

Módulo de Finanzas: Resúmenes diarios y anuales con gráficos de ingresos.

WhatsApp Integration: Envío automático de resúmenes de pedido desde la cesta al vendedor.