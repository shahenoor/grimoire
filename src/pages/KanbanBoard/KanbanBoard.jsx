import React, { useEffect, useState} from 'react';
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import JobCard from '../../components/JobCard/JobCard';
import { v4 as uuidv4 } from 'uuid';
import KanbanColumn from '../../components/KanbanColumn/KanbanColumn';
import AddNewJobModal from '../../components/AddNewJobModal/AddNewJobModal';
import add from '@assets/icons/add.svg';
import apiClient from '../../utils/ApiClient';
import { useLocation } from 'react-router-dom';
import './KanbanBoard.scss';
import dayjs from 'dayjs';


const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th'; 
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDate = (date, month, year) => {
  const daySuffix = getOrdinalSuffix(date);
  const formattedDate = dayjs(new Date(year, month - 1, date)).format('DD'); 
  const formattedMonth = dayjs(new Date(year, month - 1, date)).format('MMMM');
  const formattedFullDate = dayjs(new Date(year, month - 1, date)).format('YYYY-MM-DD'); 
  
  const longFormat = `${formattedDate}${daySuffix} ${formattedMonth} ${year}`;
  const shortFormat = formattedFullDate;

  return { longFormat, shortFormat }; 
};

function KanbanBoard() {
    const location = useLocation();
    const { date, month, year } = location.state || {};
    const { longFormat, shortFormat } = formatDate(date, month, year);
    const [selectedItem, setSelectedItem] = useState(null);
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

    const getJobByDate = async () => {
      try {
         const data = await apiClient.getJobByDate(1, shortFormat);
         
         const jobsByColumn = data.reduce((acc, job) => {
            const columnKey = job.status || 'Wishlist'; 
            if (!acc[columnKey]) {
               acc[columnKey] = [];
            }
            acc[columnKey].push(job);
            return acc;
         }, {
            Wishlist: [],
            Applied: [],
            Interview: [],
            Offer: [],
            Rejection: [],
         });
   
         setItems(jobsByColumn);
      } catch (error) {
         console.error('Error fetching job data:', error);
      }
   };
  
    useEffect(() => {
     getJobByDate();
    }, [shortFormat]);

    function addCard(container) {
      const newId = uuidv4();
      setItems((prev) => ({
        ...prev,
        [container]: [...prev[container], { id: newId }]
      }));
    }  
    
    const handleNavigation = (() => {
      setSelectedItem(item);
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
            <p className='board__date'>{longFormat}</p>
          </div>
          <div className='board__inner'>
            {containers.map((id) => (
              <KanbanColumn key={id} id={id} addCard = {addCard}>
                {items[id].map((item) => (
                  <JobCard key={item.id} id={item.id} parent={id} item={item}>
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
      <AddNewJobModal 
        trigger={buttonPopUp} 
        setTrigger={handlePopUpClose} 
        addCard={addCard} 
        item={selectedItem} 
        id={selectedItem ? selectedItem.status : 'Wishlist'} 
      />
    </>
    );
  }

export default KanbanBoard