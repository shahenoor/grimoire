import {useDraggable} from '@dnd-kit/core';
import deleteIcon from '@assets/icons/delete.svg';
import linkIcon from '@assets/icons/link.svg';
import EditJobModal from '../EditJobModal/EditJobModal';
import './JobCard.scss';
import { useState } from 'react';

function JobCard(props) {
  const [isOpen , setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      parent: props.parent,
    },
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(5deg)`,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
  } : undefined;

  const style_color = props.item.color ? {
    borderLeft: `3px solid ${props.item.color}` 
  } : undefined;

  const handleOpenModal = () => {
      setIsOpen(true); 
  };

  const handlePopUpClose = (() => {
    setIsOpen(false);
  })
  return (
    <>
      <div ref={setNodeRef} style={{ ...style}}  className={`card ${isDragging ? 'card__is-dragging' : ''}`} {...listeners} {...attributes}  onClick={handleOpenModal}>
       
       <div className='card__content' style={{ ...style_color}}>
          <div className='card__left-wrapper'>
            <h3 className='card__job-title'>{props.item.title}</h3>
            <p className='card__company'>{props.item.company}</p>
          </div>

          <div className='card__right-wrapper'>
            <img className='card__icon' src={linkIcon}/>
            <img className='card__icon' src={deleteIcon}/>
          </div>
      </div> 
      </div>
      {isOpen ? (
        <EditJobModal trigger={isOpen} setTrigger={handlePopUpClose} item={props.item} isUpdate = {true} updateCard={props.updateCard} date={props.date}/>
      ) : ''}
    </>
  );
}

export default JobCard