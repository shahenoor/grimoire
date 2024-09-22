import React, { useEffect, useState} from 'react';
import debounce from 'lodash.debounce'; 
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
    const currentDate = dayjs().format('YYYY-MM-DD');

    const { longFormat, shortFormat } = date && month && year ? formatDate(date, month, year) : formatDate(dayjs().date(), dayjs().month() + 1, dayjs().year());
    const containers = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejection'];
    const [buttonPopUp, setButtonPopUp] = useState(false);
   
    const [items, setItems] = useState({
      Wishlist: [],
      Applied: [],
      Interview: [],
      Offer: [],
      Rejection: []
    });
    
    const updateJobStatus = debounce(async (jobId, newStatus) => {
      try {
        await apiClient.updateJobStatus(jobId, newStatus);
        console.log('Job status updated successfully');
      } catch (error) {
        console.error('Error updating job status:', error);
      }
    }, 500);

    function handleDragEnd(event) {
      const { active, over } = event;
      
      if (over) {
        setItems((prev) => {
          const newItems = { ...prev };
          const draggedItem = newItems[active.data.current.parent].find(item => item.id === active.id);
          newItems[active.data.current.parent] = newItems[active.data.current.parent].filter(item => item.id !== active.id);
          newItems[over.id].push(draggedItem);
          updateJobStatus(draggedItem.id, over.id);
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
        const dateToUse = shortFormat || currentDate;
        const data = await apiClient.getJobByDate(1, dateToUse);
         
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

    function addCard(container, item) {
      const newId = uuidv4();
      setItems((prev) => ({
        ...prev,
        [container]: [...prev[container], { id: newId , ...item }]
      }));
    }  

    const updateCard = (columnId, updatedCardData) => {
      setItems((prevItems) => ({
          ...prevItems,
          [columnId]: prevItems[columnId].map((card) =>
              card.id === updatedCardData.id ? { ...card, ...updatedCardData } : card
          ),
      }));
  }; 
    
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
            <p className='board__date'>{longFormat}</p>
          </div>
          <div className='board__inner'>
            {containers.map((id) => (
              <KanbanColumn key={id} id={id} addCard = {addCard} date={shortFormat}>
                {items[id].map((item) => (
                  <JobCard key={item.id} id={item.id} parent={id} item={item}  updateCard={updateCard} date={shortFormat}>
                    {item.content}
                  </JobCard>
                ))}
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
        date={shortFormat}
      />
    </>
    );
  }

export default KanbanBoard