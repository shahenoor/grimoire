import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import wishlist from '@assets/icons/wishlist.svg';
import applied from '@assets/icons/applied.svg';
import interview from '@assets/icons/interview.svg';
import offer from '@assets/icons/offer.svg';
import rejection from '@assets/icons/rejection.svg';
import add from '@assets/icons/add.svg';
import AddNewJobModal from '../../components/AddNewJobModal/AddNewJobModal';
import './KanbanColumn.scss';

function KanbanColumn(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    const [buttonPopUp, setButtonPopUp] = useState(false);
    
    const icons = {
      Wishlist: wishlist,
      Applied: applied,
      Interview: interview,
      Offer: offer,
      Rejection: rejection
    };

    const getClassName = () => {
        return `column__droppable-area ${isOver ? 'column__droppable-area--over' : ''}`;
    };

    const handleNavigation = (() => {
      setButtonPopUp(true);
    })

    const handlePopUpClose = (() => {
      setButtonPopUp(false);
    })
    
    return (
      <>
      <section ref={setNodeRef} className='column'>
          <div className='column__header'>
             <div className='column__details'>
                <img 
                  src={icons[props.id]} 
                  alt={`${props.id} icon`} 
                  className='column__icon' 
                />

                <div className='column__info-wrapper'>
                    <h3 className='column__title'>{props.id}</h3>
                    <p className='column__job-count'>0 JOBS</p>
                </div>
              </div> 
             
          </div>
          <button className='column__button' onClick = {handleNavigation}><img src={add}/></button>
          {/* <button className='column__button' onClick = {() => props.addCard(props.id)}><img src={add}/></button> */}
          <div className={getClassName()}>
            {props.children}
          </div>
      </section>
       <AddNewJobModal trigger={buttonPopUp} setTrigger={handlePopUpClose} addCard = {props.addCard} id={props.id}  date={props.date} />
      </>
    );
}

export default KanbanColumn