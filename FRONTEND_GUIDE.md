# 📱 FRONTEND - Guía Completa

## Estructura General del Frontend

### Fases de Desarrollo

#### **FASE 1: Admin Dashboard (Panel de Administración)**
Permite a administradores de procesos crear, editar y gestionar cursos.

**Componentes Creados:**
1. **adminProcesoHome.jsx** - Dashboard principal del admin
   - Bienvenida y resumen
   - Tarjetas de acceso rápido
   - Información sobre funcionalidades

2. **adminCursos.jsx** - Página principal de gestión de cursos
   - Listar cursos del proceso
   - Crear/editar/eliminar cursos
   - Buscar cursos
   - Acceso a gestión de módulos e inscripciones

3. **CursoForm.jsx** - Componente de formulario reutilizable
   - Crear nuevo curso
   - Editar curso existente
   - Validación de datos
   - Alertas de éxito/error

4. **CursosTable.jsx** - Tabla de visualización de cursos
   - Lista de todos los cursos
   - Botones de acción (editar, eliminar, ver módulos, ver inscripciones)
   - Estados visuales (activo/inactivo)
   - Confirmaciones antes de eliminar

5. **ModulosManager.jsx** - Modal de gestión de módulos
   - Ver todos los módulos de un curso
   - Crear nuevo módulo (video, imagen, PDF, texto)
   - Editar módulo existente
   - Eliminar módulo
   - Interfaz de lista y formulario

6. **InscripcionesManager.jsx** - Modal de gestión de inscripciones
   - Ver estudiantes inscritos en un curso
   - Cambiar estado de inscripción (no iniciado → en progreso → completado)
   - Desuscribir estudiante
   - Filtrar por estado
   - Tabla con información del estudiante

#### **FASE 2: Student Portal (Portal de Estudiantes)**
Permite a estudiantes ver y tomar cursos.

**Componentes Creados:**
1. **cursosDisponibles.jsx** - Catálogo de cursos para estudiantes
   - Ver todos los cursos disponibles
   - Filtrar por proceso
   - Buscar cursos
   - Inscribirse en cursos
   - Ver estado de inscripción
   - Badge para cursos inscritos

2. **VisorModulos.jsx** - Visor de contenido de módulos
   - Ver módulos en orden
   - Navegación entre módulos (anterior/siguiente)
   - Reproducir videos
   - Ver imágenes
   - Ver PDFs
   - Leer contenido de texto
   - Marcar módulos como completado
   - Barra de progreso
   - Completar curso y descargar certificado

---

## Rutas Disponibles

### Admin (Rutas Protegidas)
```
/admin/home              → Dashboard del admin (adminProcesoHome)
/admin/cursos            → Gestión de cursos (adminCursos)
/admin/procesos          → Login para admin de proceso (LoginAdminProceso)
/admin                   → Login de admin (Login)
```

### Estudiante (Rutas Protegidas)
```
/cursos-disponibles      → Catálogo de cursos
/inicio                  → Página de inicio
/soporte                 → Página de soporte
/procesos                → Procesos disponibles
/courses/*               → Cursos legacy (TTHHH - formato antiguo)
```

---

## API Endpoints Utilizados

### Cursos
```
GET  /api/cursos                 → Listar cursos (filtra por proceso de admin)
POST /api/cursos                 → Crear curso
GET  /api/cursos/:id             → Obtener detalles de curso
PUT  /api/cursos/:id             → Editar curso
DELETE /api/cursos/:id           → Eliminar curso
```

### Módulos
```
GET  /api/modulos/curso/:cursoId → Listar módulos de un curso
POST /api/modulos                → Crear módulo
PUT  /api/modulos/:id            → Editar módulo
DELETE /api/modulos/:id          → Eliminar módulo
```

### Inscripciones
```
GET  /api/inscripciones/usuario/:id    → Listar inscripciones del usuario
GET  /api/inscripciones/curso/:id      → Listar inscritos en un curso
POST /api/inscripciones                → Crear inscripción
PUT  /api/inscripciones/:id            → Actualizar estado
DELETE /api/inscripciones/:id          → Eliminar inscripción
```

### Evaluaciones
```
GET  /api/evaluaciones/curso/:id → Listar evaluaciones de un curso
POST /api/evaluaciones           → Crear evaluación
PUT  /api/evaluaciones/:id       → Editar evaluación
DELETE /api/evaluaciones/:id     → Eliminar evaluación
```

---

## Almacenamiento de Datos

### LocalStorage (Admin)
```javascript
localStorage.getItem("admin_token")          // Token JWT del admin
localStorage.getItem("admin_proceso_user")   // Datos del admin (JSON)
  // Estructura: {id, username, proceso_name, rol}
```

### LocalStorage (Estudiante)
```javascript
localStorage.getItem("user_token")           // Token JWT del estudiante
localStorage.getItem("usuario_logueado")     // Datos del estudiante (JSON)
  // Estructura: {id, username, correo, cedula_identidad, ...}
localStorage.getItem("usuario")              // Nombre de usuario
localStorage.getItem("isLoggedIn")           // Boolean "true"/"false"
```

---

## Flujo de Uso

### Para Administrador
1. **Login** → `/admin/procesos`
2. **Dashboard** → `/admin/home` (muestra bienvenida y opciones)
3. **Gestionar Cursos** → `/admin/cursos`
   - Ver lista de cursos
   - Crear nuevo curso (click "Nuevo Curso")
   - Editar curso (click "Editar")
   - Ver/gestionar módulos (click "Ver Módulos")
   - Ver/gestionar inscripciones (click "Ver Inscripciones")

### Para Estudiante
1. **Login** → `/` (página de login)
2. **Catálogo** → `/cursos-disponibles`
   - Ver cursos disponibles
   - Inscribirse en un curso
3. **Ver Contenido** → Dentro de cursosDisponibles
   - Click en "Ver Contenido" del curso
   - Abre VisorModulos
   - Navegar entre módulos
   - Marcar como completado
   - Completar curso

---

## Estados de Inscripción

- **no iniciado**: Estudiante está inscrito pero no ha comenzado
- **en progreso**: Estudiante está viendo el contenido
- **completado**: Estudiante ha completado todos los módulos

---

## Tipos de Módulo

- **video**: Reproduce videos (YouTube, Vimeo, Cloudinary, etc)
- **imagen**: Muestra imágenes (PNG, JPG, etc)
- **pdf**: Abre archivos PDF
- **texto**: Muestra contenido de texto formateado

---

## Validaciones del Frontend

### Admin
- ✓ Usuario debe estar autenticado (token en localStorage)
- ✓ Usuario debe tener rol 'admin_proceso'
- ✓ Curso debe tener nombre
- ✓ Módulo debe tener título
- ✓ Módulo debe tener URL (excepto si es tipo texto)
- ✓ No se puede eliminar sin confirmación

### Estudiante
- ✓ Usuario debe estar autenticado (token en localStorage)
- ✓ No se puede inscribir dos veces en el mismo curso
- ✓ Estado debe ser válido (uno de: no iniciado, en progreso, completado)
- ✓ Debe marcar todos los módulos para completar curso

---

## Estilos Utilizados

### Framework CSS
- **Bootstrap 5.3.8**: Sistema de grid, componentes
- **Bootstrap Icons**: Iconos

### Iconos
- **Lucide React**: Iconos modernos (Plus, Edit, Trash2, etc)

### Librerías de UI
- **SweetAlert2**: Alertas y confirmaciones
- **Bootstrap Modal**: Ventanas modales

---

## Próximos Pasos Recomendados

1. **Evaluaciones para Estudiantes**
   - Componente para responder preguntas
   - Validación automática de respuestas
   - Calificación inmediata

2. **Sistema de Certificados**
   - Generación de PDF con jsPDF
   - Descarga de certificado al completar curso
   - Historial de certificados

3. **Dashboard del Estudiante**
   - Ver mis cursos
   - Ver mis inscripciones
   - Ver mis certificados
   - Estadísticas de progreso

4. **Reportes para Admin**
   - Estadísticas por curso
   - Progreso de estudiantes
   - Tasa de completación
   - Exportar a Excel/PDF

5. **Mejoras de UX**
   - Tema oscuro (Dark Mode)
   - Internacionalización (i18n)
   - Notificaciones en tiempo real
   - Mensajes de estado en tiempo real

---

## Notas Técnicas

### Autenticación
- JWT tokens almacenados en localStorage
- Verificación en cada request del API
- Estructura: `Authorization: Bearer {token}`

### CORS
- Backend tiene CORS habilitado para el frontend
- Origen configurado según ambiente (development/production)

### Manejo de Errores
- Try/catch en todas las llamadas API
- SweetAlert2 para mostrar errores al usuario
- Logs en consola para debugging

### Performance
- Componentes funcionales con Hooks
- Lazy loading de módulos
- Caché de datos en state
- Evitar re-renders innecesarios

---

## Estructura de Carpetas

```
src/
├── components/
│   ├── CursoForm.jsx           (Admin - Formulario de curso)
│   ├── CursosTable.jsx         (Admin - Tabla de cursos)
│   ├── ModulosManager.jsx      (Admin - Modal de módulos)
│   ├── InscripcionesManager.jsx (Admin - Modal de inscripciones)
│   └── VisorModulos.jsx        (Estudiante - Visor de contenido)
│
├── pages/
│   ├── adminProcesoHome.jsx    (Admin - Dashboard)
│   ├── adminCursos.jsx         (Admin - Gestión de cursos)
│   ├── cursosDisponibles.jsx   (Estudiante - Catálogo)
│   ├── adminProcesos.jsx       (Admin - Login proceso)
│   ├── cursos.jsx              (Estudiante - Catálogo legacy)
│   └── ...más páginas
│
├── cursos/                     (Cursos legacy de TTHHH)
│
└── styles/
    └── pages/
        └── adminProceso.css
```

---

## Cómo Agregar un Nuevo Módulo

1. **Crear archivo del componente** en `src/components/`
2. **Importar** en `src/App.jsx`
3. **Agregar ruta** en `<Routes>`
4. **Proteger ruta** si es necesario (PrivateRoute o ProtectedUserRoute)
5. **Agregar enlace** en navbar o menú

---

## Ambiente Variables

En `.env` o `.env.local`:
```
VITE_API_URL=http://localhost:5000  # Para desarrollo
VITE_API_URL=https://api.tudominio.com  # Para producción
```

En `vite.config.js`, el API URL se define así:
```javascript
import.meta.env.VITE_API_URL
```

---

## Debugging

### Logs importantes
```javascript
// En chrome DevTools Console
localStorage.getItem("admin_token")           // Ver token
localStorage.getItem("admin_proceso_user")    // Ver usuario admin
localStorage.getItem("user_token")            // Ver token estudiante
localStorage.getItem("usuario_logueado")      // Ver usuario estudiante
```

### Redes (Network tab)
- Verificar que las requests tengan Authorization header
- Ver respuestas del API
- Verificar status codes (401 = sin autenticación)

---

## Cambios en App.jsx

Se agregaron:
1. Import de AdminCursos
2. Import de AdminProcesoHome
3. Import de CursosDisponibles
4. Ruta `/admin/home` → AdminProcesoHome
5. Ruta `/admin/cursos` → AdminCursos
6. Ruta `/cursos-disponibles` → CursosDisponibles

---

## Flujo Completo de Datos

```
Usuario Login
    ↓
Autenticación en Backend
    ↓
Token + Datos guardados en localStorage
    ↓
Redirección a Dashboard/Catálogo
    ↓
Llamadas API con Authorization: Bearer {token}
    ↓
Backend valida token y rol
    ↓
Respuesta con datos filtrados por proceso/usuario
    ↓
Frontend renderiza componentes con datos
    ↓
Usuario interactúa (crear, editar, eliminar)
    ↓
Nuevas llamadas API
    ↓
Backend procesa
    ↓
Frontend actualiza UI
```

---

Última actualización: Fase 2 (Componentes de Estudiante)
