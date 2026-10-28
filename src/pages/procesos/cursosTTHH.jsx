import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/pages/cursos.css";

export default function CoursesTTHH() {
  const navigate = useNavigate();
  const location = useLocation();
  const nombre = localStorage.getItem("usuario");
  const API_URL = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);
  const [cursosCompletados, setCursosCompletados] = useState({});
  const [cargandoCursos, setCargandoCursos] = useState(true);

  // Cursos estáticos originales (con su contenido existente)
  const cursosEstaticos = [
    { 
      id: "estatico_2", 
      name: "1. Derechos laborales de mujeres y hombres", 
      desc: "Duración: 10 horas", 
      link: "/courses/derechoslaborales",
      dbName: "derechos_laborales",
      bloqueado: false,
      esEstatico: true
    },
    { 
      id: "estatico_3", 
      name: "2. Igualdad de género", 
      desc: "Duración: 10 horas", 
      link: "/courses/igualdadgenero",
      dbName: "igualdad_genero",
      bloqueado: false,
      esEstatico: true
    },
    { 
      id: "estatico_4", 
      name: "3. Erradicación de violencia y no discriminación en un centro de trabajo", 
      desc: "Duración: 10 horas", 
      link: "/courses/erradicacionviolencia",
      dbName: "erradicacion_Violencia",
      bloqueado: false,
      esEstatico: true
    },
    { 
      id: "estatico_5", 
      name: "4. Otros relacionados para establecer el trabajo de igual valor", 
      desc: "Duración: 10 horas", 
      link: "/courses/otrosrelacionados",
      dbName: "otrosRelacionados",
      bloqueado: false,
      esEstatico: true
    }
  ];

  // SOLO USAR CURSOS ESTÁTICOS
  const cargarCursosDelAPI = async () => {
    try {
      setCargandoCursos(true);
      setCourses(cursosEstaticos);
      console.log('✅ Cursos cargados: 4 estáticos');
    } catch (error) {
      console.error('❌ Error cargando cursos:', error);
      setCourses(cursosEstaticos);
    } finally {
      setCargandoCursos(false);
    }
  };

  // FUNCIÓN PARA CARGAR CURSOS COMPLETADOS - SOLO DESDE /progreso/cursos-completados
  const cargarCursosCompletados = async () => {
    if (!nombre) {
      console.log('⚠️ No hay nombre de usuario');
      return;
    }
    
    try {
      console.log(`🔍 Cargando cursos completados para: ${nombre}`);
      const response = await fetch(`${API_URL}/api/progreso/cursos-completados/${encodeURIComponent(nombre)}`);
      
      if (!response.ok) {
        console.error(`❌ Error en respuesta: ${response.status}`);
        return;
      }

      const dataEstaticos = await response.json();
      console.log('📥 Respuesta de /cursos-completados:', dataEstaticos);
      
      const completadosObj = {};
      
      if (dataEstaticos.ok && dataEstaticos.cursosCompletados && Array.isArray(dataEstaticos.cursosCompletados)) {
        console.log('📊 Cursos completados de BD:', dataEstaticos.cursosCompletados);
        dataEstaticos.cursosCompletados.forEach(curso => {
          console.log(`  ✅ Marcando como completado: ${curso}`);
          completadosObj[curso] = true;
        });
      }

      console.log('✅ Objeto completados final:', completadosObj);
      setCursosCompletados(completadosObj);
      console.log(`📊 Total cursos completados: ${Object.keys(completadosObj).length}`);
    } catch (error) {
      console.error("❌ Error cargando cursos completados:", error);
    }
  };

  // Cargar progreso al entrar por primera vez
  useEffect(() => {
    cargarCursosDelAPI();

    if (nombre) {
      cargarCursosCompletados();
    }
  }, [nombre]);

  // Refrescar cuando se regresa desde un curso
  useEffect(() => {
    if (location.state && location.state.refrescar) {
      console.log('🔄 Refrescando cursos...');
      cargarCursosCompletados();
      cargarCursosDelAPI();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Verificar si un curso específico está completado
  const estaCursoCompletado = (cursoDbName) => {
    const completado = cursosCompletados[cursoDbName] || false;
    console.log(`🔍 Curso ${cursoDbName} completado: ${completado}`);
    return completado;
  };

  // Calcular progreso manualmente basado en cursos completados
  const calcularProgresoManual = () => {
    const totalCursos = courses.length;
    const cursosCompletadosCount = courses.filter(c => estaCursoCompletado(c.dbName)).length;
    return Math.round((cursosCompletadosCount / totalCursos) * 100);
  };

  // Manejar clic en botón de curso
  const manejarClicCurso = (curso) => {
    if (curso.bloqueado) return;
    if (estaCursoCompletado(curso.dbName)) {
      if (window.confirm(`Ya completaste "${curso.name}". ¿Deseas repasarlo?`)) {
        navigate(curso.link);
      }
    } else {
      navigate(curso.link);
    }
  };

  // Solo los 4 temas cuentan para habilitar la prueba
  const TTHH_REQUERIDOS = ['derechos_laborales', 'igualdad_genero', 'erradicacion_Violencia', 'otrosRelacionados'];
  const listo4Cursos = TTHH_REQUERIDOS.every(dbName => cursosCompletados[dbName]);
  const completadosRequeridos = TTHH_REQUERIDOS.filter(dbName => cursosCompletados[dbName]).length;

  return (
    <div className="contenedor-cursos py-5 mt-5">
      
      <div className="container-wide">
        
        <div className="text-center mb-5">
          <h2 className="titulo-pagina">
            Plataforma de Capacitación
          </h2>
          <h3 className="titulo-pagina">
            Cursos disponibles
          </h3>
          <p className="subtitulo-pagina">
            Completa los cursos paso a paso y adquiere nuevas habilidades.
          </p>
        </div>

        {/* LISTA DE CURSOS */}
        <h4 className="fw-bold text-secondary mb-4">
          Cursos disponibles
          {cargandoCursos && (
            <span className="ms-2">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </span>
          )}
        </h4>

        <div className="row g-4 mb-5">
          {courses.map((curso) => {
            const completado = estaCursoCompletado(curso.dbName);
            const proximo = !curso.bloqueado && !!curso.fecha_inicio && new Date(curso.fecha_inicio) > new Date();
            const noDisponible = curso.bloqueado || proximo;
            
            return (
              <div key={curso.id} className="col-md-3">
                <div className={`card card-curso shadow-sm h-100 ${completado ? 'curso-completado' : ''} ${noDisponible ? 'curso-bloqueado' : ''}`}>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="titulo-curso">
                        {curso.name}
                      </h5>
                      {noDisponible ? (
                        <span className="badge bg-warning text-dark">
                          🕐
                        </span>
                      ) : completado && (
                        <span className="badge bg-success">
                          ✅
                        </span>
                      )}
                    </div>
                    <p className="descripcion-curso">
                      {curso.desc}
                    </p>

                    {/* Aviso de disponibilidad futura */}
                    {proximo && (
                      <div className="mb-2 p-2 rounded" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', fontSize: '0.8rem', color: '#856404' }}>
                        🕐 Disponible el {new Date(curso.fecha_inicio).toLocaleString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                    
                    {/* Estado del curso */}
                    <div className="mt-auto">
                      <div className="mb-2">
                        <small className={`badge ${noDisponible ? 'bg-warning text-dark' : completado ? 'bg-success' : 'bg-secondary'}`}>
                          {noDisponible ? 'Próximamente' : completado ? 'Completado' : 'Por comenzar'}
                        </small>
                        {!noDisponible && completado && (
                          <small className="ms-2 text-success">
                            <i className="bi bi-check-circle"></i> Realizado
                          </small>
                        )}
                      </div>
                      
                      <button
                        className={`btn w-100 ${noDisponible ? 'btn-warning' : completado ? 'btn-success' : 'btn-iniciar'}`}
                        onClick={() => manejarClicCurso(curso)}
                        disabled={noDisponible}
                      >
                        {noDisponible ? (
                          <>
                            <i className="bi bi-clock me-2"></i>
                            PRÓXIMAMENTE
                          </>
                        ) : completado ? (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Curso realizado
                          </>
                        ) : (
                          'Iniciar curso'
                        )}
                      </button>
                      
                      {/* Botón para repasar incluso si está completado */}
                      {!noDisponible && completado && (
                        <button
                          className="btn btn-outline-primary w-100 mt-2"
                          onClick={() => navigate(curso.link, { state: { courseId: curso.id, repasar: true } })}
                        >
                          <i className="bi bi-arrow-repeat me-2"></i>
                          Volver a Revisar el Curso
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón para acceder a la prueba */}
        {listo4Cursos && (
          <div className="text-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/courses/capacitacion/pruebafinal')}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Ir a la Prueba Final
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
