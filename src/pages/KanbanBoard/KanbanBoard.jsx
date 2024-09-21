import React, { useState} from 'react';
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import JobCard from '../../components/JobCard/JobCard';
import KanbanColumn from '../../components/KanbanColumn/KanbanColumn';
import AddNewJobModal from '../../components/AddNewJobModal/AddNewJobModal';
import add from '@assets/icons/add.svg';
import './KanbanBoard.scss';

function KanbanBoard() {
    const containers = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejection'];
    const [buttonPopUp, setButtonPopUp] = useState(false);
   
    const [items, setItems] = useState({
      Wishlist: [],
      Applied: [],
      Interview: [],
      Offer: [],
      Rejection: []
    });
  
    function handleDragEnd(event) {
      const { active, over } = event;
  
      if (over) {
        setItems((prev) => {
          const newItems = { ...prev };
          const draggedItem = newItems[active.data.current.parent].find(item => item.id === active.id);
          newItems[active.data.current.parent] = newItems[active.data.current.parent].filter(item => item.id !== active.id);
          newItems[over.id].push(draggedItem);
          return newItems;
        });
      }
    }
    const sensors = useSensors(
      useSensor(MouseSensor), 
      useSensor(TouchSensor)  
    );
  
    function addCard(container) {
      const newId = `draggable-${Math.random().toString(36).substring(7)}`;
      setItems((prev) => ({
        ...prev,
        [container]: [...prev[container], { id: newId, content: `New Job ${newId}` }]
      }));
    }  
    
    const handleNavigation = (() => {
      setButtonPopUp(true);
    })

    const handlePopUpClose = (() => {
      setButtonPopUp(false);
    })

    return (
      <>
      <DndContext  sensors={sensors} onDragEnd={handleDragEnd}>
        <section className='board__outer'>
          <div className='board__date-wrapper'>
            <p className='board__date'>10th September 2024</p>
          </div>
          <div className='board__inner'>
            {containers.map((id) => (
              <KanbanColumn key={id} id={id} addCard = {addCard}>
                {items[id].map((item) => (
                  <JobCard key={item.id} id={item.id} parent={id}>
                    {item.content}
                  </JobCard>
                ))}
                {/* <button onClick={() => addCard(id)}>Add Card</button> */}
              </KanbanColumn>
            ))}
          </div>
        </section>
      </DndContext>
      <button className='board__float-button' onClick={handleNavigation}>
        <img src={add}/>
      </button>
      <AddNewJobModal trigger={buttonPopUp} setTrigger={handlePopUpClose}/>
    </>
    );
  }

export default KanbanBoard