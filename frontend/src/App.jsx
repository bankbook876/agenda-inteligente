import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('hub');
  
  const [tasks, setTasks] = useState([
    { text: 'Ecuaciones de segundo grado', borderColor: '#E74C3C', completed: false, day: 3 },
    { text: 'Investigación sobre los fundamentos de IoT', borderColor: '#3498DB', completed: false, day: 10 },
    { text: 'Elaboración de estructura de carrito bluetooth', borderColor: '#34495E', completed: false, day: 15 }
  ]);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isFocusRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsFocusRunning(false);
      alert('¡Tiempo de concentración completado!');
    }
    return () => clearInterval(timer);
  }, [isFocusRunning, timeLeft]);

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ backgroundColor: '#3B5345', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {currentView !== 'hub' && (
        <button 
          onClick={() => setCurrentView('hub')}
          style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', backgroundColor: '#2C3682', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          ← Volver al Hub
        </button>
      )}

      {/* VISTA 1: HUB PRINCIPAL CON LÍNEAS SVG PERFECTAS */}
      {currentView === 'hub' && (
        <div style={{ width: '480px', height: '480px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ width: '460px', height: '460px', backgroundColor: '#1E2356', borderRadius: '50%', position: 'absolute', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }} />

          {/* SVG para trazar líneas punteadas exactas desde el centro */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            {/* Línea hacia Tareas (Arriba) */}
            <line x1="240" y1="240" x2="240" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,6" />
            {/* Línea hacia Foco (Abajo Izquierda) */}
            <line x1="240" y1="240" x2="130" y2="360" stroke="white" strokeWidth="4" strokeDasharray="6,6" />
            {/* Línea hacia Mes (Abajo Derecha) */}
            <line x1="240" y1="240" x2="350" y2="360" stroke="white" strokeWidth="4" strokeDasharray="6,6" />
          </svg>

          {/* Nodo Tareas */}
          <div 
            onClick={() => setCurrentView('tasks')}
            style={{ width: '80px', height: '80px', backgroundColor: '#6265E8', borderRadius: '50%', position: 'absolute', top: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontWeight: 'bold', zIndex: 3 }}>
            Tareas
          </div>

          {/* Nodo Foco */}
          <div 
            onClick={() => setCurrentView('focus')}
            style={{ width: '80px', height: '80px', backgroundColor: '#17B978', borderRadius: '50%', position: 'absolute', bottom: '50px', left: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontWeight: 'bold', zIndex: 3 }}>
            Foco
          </div>

          {/* Nodo Mes */}
          <div 
            onClick={() => setCurrentView('calendar')}
            style={{ width: '80px', height: '80px', backgroundColor: '#F39C12', borderRadius: '50%', position: 'absolute', bottom: '50px', right: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontWeight: 'bold', zIndex: 3 }}>
            Mes
          </div>

          {/* Centro del Hub */}
          <div style={{ width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#333', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <span style={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>Agenda<br/>Inteligente</span>
            <span style={{ color: '#D32F2F', fontSize: '11px', marginTop: '4px', fontWeight: '500' }}>1 entrega hoy</span>
          </div>
        </div>
      )}

      {/* VISTA 2: GESTIÓN DE TAREAS */}
      {currentView === 'tasks' && (
        <div style={{ width: '450px', backgroundColor: '#1A1A1A', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '20px' }}>Gestión de Tareas</h2>
          <div style={{ height: '2px', backgroundColor: '#6265E8', marginBottom: '20px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {tasks.map((task, index) => (
              <div key={index} style={{ backgroundColor: '#2D2D2D', padding: '14px', borderRadius: '10px', borderLeft: `6px solid ${task.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ flex: 1, fontSize: '13px', color: '#ddd', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </div>
            ))}
          </div>

          <button style={{ width: '100%', padding: '12px', backgroundColor: '#6265E8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Nueva Tarea
          </button>
        </div>
      )}

      {/* VISTA 3: MODO CONCENTRACIÓN */}
      {currentView === 'focus' && (
        <div style={{ width: '420px', backgroundColor: '#1A1A1A', padding: '35px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '20px' }}>Modo Concentración</h2>
          <div style={{ height: '2px', backgroundColor: '#17B978', marginBottom: '30px' }} />
          
          <div style={{ width: '170px', height: '170px', border: '6px solid #17B978', borderRadius: '50%', margin: '0 auto 30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(23, 185, 120, 0.2)' }}>
            <span style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'monospace' }}>{formatTime(timeLeft)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsFocusRunning(!isFocusRunning)}
              style={{ padding: '10px 22px', backgroundColor: isFocusRunning ? '#E74C3C' : '#17B978', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {isFocusRunning ? 'Pausar' : 'Iniciar Sesión'}
            </button>
            <button 
              onClick={() => { setIsFocusRunning(false); setTimeLeft(25 * 60); }}
              style={{ padding: '10px 22px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Reiniciar
            </button>
          </div>
        </div>
      )}

      {/* VISTA 4: CALENDARIO */}
      {currentView === 'calendar' && (
        <div style={{ width: '460px', backgroundColor: '#1A1A1A', padding: '25px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '20px' }}>Octubre 2026</h2>
          <div style={{ height: '2px', backgroundColor: '#F39C12', marginBottom: '20px' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '8px' }}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
              <div key={d} style={{ fontSize: '12px', fontWeight: 'bold', color: '#aaa' }}>{d}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '20px' }}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const matchedTask = tasks.find(t => t.day === day);
              return (
                <div key={day} style={{ backgroundColor: '#2D2D2D', padding: '8px 2px', borderRadius: '6px', fontSize: '12px', minHeight: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontWeight: matchedTask ? 'bold' : 'normal' }}>{day}</span>
                  {matchedTask && <div style={{ width: '6px', height: '6px', backgroundColor: '#F39C12', borderRadius: '50%', marginTop: '4px' }} />}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'left', backgroundColor: '#252525', padding: '15px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#F39C12' }}>Entregas del Mes:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {tasks.map((t, idx) => (
                <li key={idx}><strong>Día {t.day}:</strong> {t.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;