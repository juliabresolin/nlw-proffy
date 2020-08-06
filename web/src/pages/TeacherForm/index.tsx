import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';


function TeacherForm() {

  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "0", from: '', to: '' }
  ]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: "0",
        from: '',
        to: '',
      }
    ])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItens = scheduleItems.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value }
      }

      return item;
    });

    setScheduleItems(updatedScheduleItens);
  }

  return (

    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrível que você quer dar aulas." description="O primeiro passo, é preencher esse formulário de inscrição." />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome completo" value={name} onChange={(e) => { setName(e.target.value) }} />
            <Input name="avatar" label="URL do Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select name="subject"
              label="Matéria"
              value={subject} onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Química', label: 'Química' },
                { value: 'Sociologia', label: 'Sociologia' },
                { value: 'Filosofia', label: 'Filosofia' },
              ]} />
            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>
            {scheduleItems.map((item, index) => {
              return (
                <div key={item.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={item.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça' },
                      { value: '3', label: 'Quarta' },
                      { value: '4', label: 'Quinta' },
                      { value: '5', label: 'Sexta' },
                      { value: '6', label: 'Sábado' },
                    ]} />
                  <Input name="from" label="Das" type="time" value={item.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}></Input>
                  <Input name="to" label="Até" type="time" value={item.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}></Input>
                </div>
              )
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="warning icon" />
            Importante! <br />
            Preencha todos os dados!
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>

  )
}

export default TeacherForm;
