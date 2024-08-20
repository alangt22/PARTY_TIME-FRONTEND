import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import partyFetch from '../axios/config';
import useToast from '../hooks/useToast';
import './Form.css';

const CreateParty = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState('');
  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();
  const showToast = useToast(); 

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await partyFetch.get('/services');
        setServices(res.data);
      } catch (error) {
        showToast('Failed to load services', 'error');
      }
    };
    loadServices();
  }, [showToast]);

  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const selectedService = services.find((s) => s._id === value);

    if (checked) {
      setPartyServices((prevServices) => [...prevServices, selectedService]);
    } else {
      setPartyServices((prevServices) =>
        prevServices.filter((s) => s._id !== value)
      );
    }
  };

  // Create new party
  const handleCreateParty = async (e) => {
    e.preventDefault();

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };

      const res = await partyFetch.post('/parties', party);

      if (res.status === 201) {
        navigate('/');
        showToast(res.data.msg);
      }
    } catch (error) {
      showToast(error.response?.data?.msg || 'An error occurred', 'error');
    }
  };


  return (
    <div className='form-page'>
      <h2>Crie sua Propria Festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={handleCreateParty}>
        <label>
          <span>Nome da festa:</span>
          <input
            type='text'
            placeholder='Seja criativo...'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type='text'
            placeholder='Quem está dando a festa?'
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder='Conte mais sobre a festa'
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type='number'
            placeholder='Quanto você pretende investir?'
            required
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            value={budget}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type='text'
            placeholder='Insira a URL de uma imagem'
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className='services-container'>
            {services.length === 0 ? (
              <p>Carregando...</p>
            ) : (
              services.map((service) => (
                <div className='service' key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className='service-name'>{service.name}</p>
                  <p className='service-price'>R${service.price}</p>
                  <div className='checkbox-container'>
                    <input
                      type='checkbox'
                      value={service._id}
                      onChange={handleServices}
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <input type='submit' value='Criar Festa' className='btn' />
      </form>
    </div>
  );
};

export default CreateParty;
