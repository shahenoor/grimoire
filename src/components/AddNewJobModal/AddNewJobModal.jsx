import { useState, useRef, forwardRef } from 'react';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { BlockPicker } from 'react-color';
import dayjs from 'dayjs';
import apiClient from '../../utils/ApiClient';
import './AddNewJobModal.scss';


function AddNewJobModal(props) {
    const [value, setValue] = useState('');
    const quillRef = useRef(null);
    const navigate = useNavigate();
    const [blockPickerColor, setBlockPickerColor] = useState("#FF8A65");
    const [showPicker, setShowPicker] = useState(false); 
  
    const handleFormCancel = () => {

       if (props.date) {
        const dateObject = dayjs(props.date);

        const year = dateObject.year(); 
        const month = dateObject.month() + 1; 
        const date = dateObject.date();      

        props.setTrigger(false);
        navigate('/board', {
            state: { date, month, year }
        });
    } else {
        console.error("Date is undefined in props.");
    }
          
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const elements = e.target.elements;
        
        for (let element of elements) {
            if (element.name && element.value) {
            formData.append(element.name, element.value);
            }
        }
        
        formData.append('color', blockPickerColor);
        formData.append('description', value);
        formData.append('user_id', 1);
        formData.append('creation_date', props.date);
        
        const formDataObject = {};
            formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        const status = formData.get('status');

        props.addCard(status, formDataObject);
        props.setTrigger(false);
        
    
        try {
            await apiClient.createJob(formData);
            props.setTrigger(false);
        }
            
        catch (error) {
            console.error('Error submitting Job Application: ', error);
            alert('Failed to submit the Job Application. Please try again.');
        }
    }            

    return props.trigger ? (
        <section className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <header className='modal__header'>
                    <h1 className="modal__title">New Job Application</h1>
                    <button type="button" className='modal__button' onClick={handleFormCancel}></button>
                </header>
                <main className="modal__form-wrapper">
                <form className="modal-form" onSubmit={handleFormSubmit}>
                    
                    <div className='modal-form__row'>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="company" className="modal-form__label">
                                Company *
                            </label>
                            <input type="text" name="company" className="modal-form__input" size="30" placeholder="Enter company name"/>
                        </div>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="title-input" className="modal-form__label">
                                Job Title *
                            </label>
                            <input type="text" name="title" className="modal-form__input" size="40" placeholder="Enter job title"/>
                        </div>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="deadline-input" className="modal-form__label">
                                Deadline 
                            </label>
                            <input type="date" name="deadline" className="modal-form__input" placeholder="Enter application deadline"/>
                        </div>
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="url-input" className="modal-form__label">
                                Post URL
                            </label>
                            <input type="text" name="url" className="modal-form__input model-form__input--url" size="40" placeholder="Enter job post URL"/>
                        </div>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="salary-input" className="modal-form__label">
                                Salary
                            </label>
                            <input type="number" name="salary" className="modal-form__input" placeholder="Enter salary"/>
                        </div>                    
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="location-input" className="modal-form__label">
                                Location 
                            </label>
                            <input type="text" name="location" size="30" className="modal-form__input" placeholder="Enter location"/>
                        </div>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="status-select" className="modal-form__label">
                                Status *
                            </label>
                            <select name="status" className="modal-form__select">
                                <option value="Wishlist">Wishlist</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className='modal-form__input-wrapper modal-form__color-wrapper'>
                            <label htmlFor="color-input" className="modal-form__label">
                                Color
                            </label>
                            <div
                                style={{
                                    backgroundColor: `${blockPickerColor}`,
                                    width: 80,
                                    height: 40,
                                     cursor: 'pointer',
                                    border: "2px solid white",
                                }}
                                onClick={() => setShowPicker(!showPicker)} className='modal__color'
                                >
                                {showPicker && (   
                                    <div className='modal__color-picker'> 
                                        <BlockPicker
                                        color={blockPickerColor} 
                                        onChange={(color) => {
                                            setBlockPickerColor(color.hex); 
                                            
                                        }} />
                                    </div>
                                    
                                )}
                                </div>
                        </div>
                    </div>
                    <div className='modal-form__text-editor'>
                        <label htmlFor="description-textarea" className="modal-form__label">
                            Description
                        </label>
                        
                        <ReactQuill  ref={quillRef} theme="snow" value={value}  onChange={setValue} style={{
                            backgroundColor: 'rgba(77, 70, 55, 0.1)',  width: '100%'}}/>
                    </div>
                    <div className="modal-form__actions">
                        <button type="submit" className="modal-form__button">Submit</button>
                    </div>
                </form>

                </main>
            </div>
        </section>
    ) : (
    ""
    );
}

export default AddNewJobModal