import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/events/eventsPage.css';
import NavBarCin from '../../components/common/NavBarCin';


const EventsPage = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleEditEventClick = () => {
    navigate('/events-list');
    // Navegar para a página de editar evento
  };

  const handleViewEventsClick = () => {
    navigate('/calendar-events');
    // Navegar para a página de ver eventos
  };
  const handleGoBack = () => {
    navigate('/events'); // Navegar para a página anterior
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>

    <body>
     <NavBarCin />
    <div className="events-page-container">
      <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1>Eventos</h1>
      <div className="button-group">
        <button className="event-button" onClick={handleCreateEventClick}>Cadastrar Novo Evento</button>
        <button className="event-button" onClick={handleEditEventClick}>Editar Evento Existente</button>
        <button className="event-button" onClick={handleViewEventsClick}>Ver Eventos</button>
      </div>
    </div>
    </body>
    </html>
  );
};

export default EventsPage;