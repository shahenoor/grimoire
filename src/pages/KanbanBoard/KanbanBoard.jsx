import React, { useState} from 'react';
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import JobCard from '../../components/JobCard/JobCard';
import { v4 as uuidv4 } from 'uuid';
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
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: 5, 
        },
      }),
      useSensor(TouchSensor, {
        activationConstraint: {
          delay: 250, 
          tolerance: 5, 
        },
      })
    );
  
    function addCard(container, title, company, blockPickerColor) {
      const newId = uuidv4();
      console.log(title);
      console.log(company);
      setItems((prev) => ({
        ...prev,
        [container]: [...prev[container], { id: newId, title, company, blockPickerColor}]
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
                 <AddNewJobModal trigger={buttonPopUp} setTrigger={handlePopUpClose} addCard = {addCard} id={id} />
                {items[id].map((item) => (
                  <JobCard key={item.id} id={item.id} parent={id} title={item.title} company={item.company} color = {item.blockPickerColor}>
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
     
    </>
    );
  }

export default KanbanBoard