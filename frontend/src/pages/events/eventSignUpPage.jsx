import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { MdDateRange } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
//import 'react-datepicker/dist/react-datepicker.css';
//import '../../style/events/eventSignUpPage.css';
import NavBarCin from '../../components/common/NavBarCin';
import Cookie from 'js-cookie';
import NavUserBar from '../../components/common/NavUserBar';

const EventsSignUpPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDateAndTime, setEventDateAndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [responsibleTeacher, setResponsibleTeacher] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAttempted, setIsAttempted] = useState(false);
  const navigate = useNavigate();
  const userType = Cookie.get('userType') || 'Desconhecido';

  useEffect(() => {
    if (userType !== 'professor' && userType !== 'admin') {
      navigate('/mainpage');
    }
  }, [navigate, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAttempted(true);

    // Formatar a data para DD-MM-AAAA hh:mm AM/PM
    const formattedDate = format(eventDateAndTime, 'dd-MM-yyyy hh:mm a');

    const eventData = {
      eventName,
      description,
      responsibleTeacher,
      eventDateAndTime: formattedDate // Usar a data formatada
    };

    console.log('Dados a serem enviados:', eventData); // Logando dados a serem enviados

    try {
      const response = await axios.post('http://localhost:3001/events/signup', eventData);

      if (response.status === 201) {
        setSuccessMessage('Evento cadastrado com sucesso!');
        setEventName('');
        setEventDateAndTime(new Date());
        setDescription('');
        setResponsibleTeacher('');
        setTimeout(() => navigate('/mainpage'), 2000);
      }
    } catch (error) {
      console.error('Detalhes do erro:', error); // Logando o erro
      setErrorMessage(error.response?.data?.error || 'Erro ao cadastrar evento');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'eventName':
        setEventName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'responsibleTeacher':
        setResponsibleTeacher(value);
        break;
      default:
        break;
    }

    if (isAttempted) {
      setErrorMessage('');
      setSuccessMessage('');
    }
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
        <NavUserBar />
        <div className="event-form-container">
          <h1>Cadastrar Novo Evento</h1>
          <button className="back-button-red" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <MdOutlineEventNote className="form-icon" />
              <label htmlFor="eventName">Nome do Evento</label>
              <input 
                type="text" 
                id="eventName"
                name="eventName"
                value={eventName} 
                onChange={handleInputChange}
                required 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <MdDriveFileRenameOutline className="form-icon" />
              <label htmlFor="description">Descrição</label>
              <input 
                type="text" 
                id="description"
                name="description"
                value={description} 
                onChange={handleInputChange}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <FaChalkboardTeacher className="form-icon" />
              <label htmlFor="responsibleTeacher">Professor Responsável</label>
              <input 
                type="text" 
                id="responsibleTeacher"
                name="responsibleTeacher"
                value={responsibleTeacher} 
                onChange={handleInputChange}
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <MdDateRange className="form-icon" />
              <label htmlFor="eventDateAndTime">Data e Hora do Evento</label>
              <DatePicker 
                id="eventDateAndTime"
                name="eventDateAndTime"
                selected={eventDateAndTime} 
                onChange={date => setEventDateAndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd-MM-yyyy hh:mm a"
                timeCaption="time"
                className="form-input datepicker-input"
              />
            </div>
            <button type="submit" className="submit-button-event">Cadastrar Evento</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </body>
    </html>
  );
};

export default EventsSignUpPage;