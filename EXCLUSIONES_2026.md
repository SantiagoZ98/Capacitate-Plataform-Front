# Exclusiones del Registro de Asistencia 2026

## Implementación

Se ha implementado un sistema de exclusión en el componente `AsistenciaPanel.jsx` que automáticamente excluye personas específicas del registro de asistencia del año 2026.

## Personas Excluidas

### Rodriguez Cabeza Edison Michael
- **Cédula de Identidad:** 1726681941
- **Efecto:** 
  - ❌ No aparecerá en el registro de asistencia de 2026
  - ❌ No podrá descargar su certificado del año 2026
  - ✅ No aparecerá en la tabla de asistencia
  - ✅ No aparecerá en la exportación a PDF de 2026
  - ✅ No aparecerá en la exportación a CSV

## Detalles Técnicos

### Archivo Modificado
- `src/components/AsistenciaPanel.jsx`

### Ubicación del Código
- Línea 88-100: Array `EXCLUIDOS_2026` y filtrado en `registrosFiltrados`

### Cómo Funciona
1. Se define una lista constante `EXCLUIDOS_2026` con las personas a excluir
2. El filtro `registrosFiltrados` verifica que cada registro:
   - Coincida con el curso seleccionado
   - Coincida con el estado filtrado
   - **No esté en la lista de excluidos**
3. La exportación a PDF usa `registrosFiltrados`, por lo que automáticamente excluye a estas personas

### Agregar Más Exclusiones
Para agregar más personas, simplemente añade nuevas entradas al array `EXCLUIDOS_2026`:

```javascript
const EXCLUIDOS_2026 = [
  { cedula: '1726681941', nombre: 'Rodriguez Cabeza Edison Michael' },
  { cedula: 'NUEVA_CEDULA', nombre: 'Nombre de la Persona' }
];
```

## Funciones Afectadas
- **`registrosFiltrados`**: Excluye automáticamente las personas
- **`exportarCSV`**: Usa `registrosFiltrados`, por lo que las excluye
- **`exportarPDF2025`**: Usa `registrosFiltrados`, por lo que las excluye
- **`exportarPDF`**: Usa `registrosFiltrados`, por lo que las excluye
- **Tabla en JSX**: Usa `registrosFiltrados`, por lo que las excluye

## Fecha de Implementación
- **Fecha:** 2026-11-19
- **Razón:** Exclusión específica para el año 2026
