import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/events/eventListPage.css';
import logo from '../../assets/CIn_logo.png';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };
  const handleGoBack = () => {
    navigate('/events'); // Navegar para a página anterior
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>

    <body>
      <nav className="navbar">
        <div className="navbar-content">
            <img src={logo} alt="Logo" className="logo-image"/>
            <span className="website-name">Reservas CIn</span>
            <ul className="navbar-list">
                <li className="navbar-item"><a href="#home" className="navbar-link"><i className="fas fa-home"></i> Home</a></li>
                <li className="navbar-item"><a href="#services" className="navbar-link"><i className="fas fa-user"></i> Perfil</a></li>
                <li className="navbar-item"><a href="/disciplines" className="navbar-link"><i className="fas fa-book"></i> Disciplinas</a></li>
                <li className="navbar-item"><a href="/events" className="navbar-link"><i className="fas fa-calendar"></i> Eventos</a></li>
            </ul>
        </div>
      </nav>
    <div className="event-list-container">
      <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1>Eventos</h1>
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <span>{event.eventName}</span>
            <div className="event-actions">
              <button onClick={() => handleEdit(event.id)} className="edit-button-event"><i className="fas fa-edit"></i> </button>
              <button onClick={() => handleDelete(event.id)} className="delete-button-event"><i className="fas fa-trash"></i></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </body>
    </html>
  );
};

export default EventListPage;