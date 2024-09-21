import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import deleteIcon from '@assets/icons/delete.svg';
import linkIcon from '@assets/icons/link.svg';
import AddNewJobModal from '../AddNewJobModal/AddNewJobModal';
import './JobCard.scss';
import { useState } from 'react';

function JobCard(props) {
  const [isOpen , setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 1000
       
      },
    })
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      parent: props.parent,
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(5deg)`,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
  } : undefined;

  const style_color = props.color ? {
    borderLeft: `3px solid ${props.color}` 
  } : undefined;

  const handleOpenModal = () => {
   
      console.log("its going in "); 
      setIsOpen(true);
    
  };

  const handlePopUpClose = (() => {
    setIsOpen(false);
  })
  return (
    <>
      <div ref={setNodeRef} style={{ ...style}} className='card' {...listeners} {...attributes}  onClick={handleOpenModal}>
       
       <div className='card__content' style={{ ...style_color}}>
          <div className='card__left-wrapper'>
            <h3 className='card__job-title'>{props.title}</h3>
            <p className='card__company'>{props.company}</p>
          </div>

          <div className='card__right-wrapper'>
            <img className='card__icon' src={linkIcon}/>
            <img className='card__icon' src={deleteIcon}/>
          </div>
      </div> 
      </div>
      {isOpen ? (
        <AddNewJobModal trigger={isOpen} setTrigger={handlePopUpClose} />
      ) : ''}
    </>
  );
}

export default JobCard