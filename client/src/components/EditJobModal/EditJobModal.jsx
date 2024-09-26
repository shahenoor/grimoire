import { useEffect, useState, useRef } from 'react';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { BlockPicker } from 'react-color';
import dayjs from 'dayjs';
import apiClient from '../../utils/ApiClient';
import edit from '../../assets/icons/edit.svg';
import info from '../../assets/icons/info.svg';
import editActive from '../../assets/icons/edit_active.svg';
import infoActive from '../../assets/icons/info_active.svg';
import linkIcon from '../../assets/icons/link.svg';
import './EditJobModal.scss';


function EditJobModal(props) {
    const [value, setValue] = useState('');
    const [isInfo, setIsInfo] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const quillRef = useRef(null);
    const navigate = useNavigate();
    const [blockPickerColor, setBlockPickerColor] = useState("#FF8A65");
    const [showPicker, setShowPicker] = useState(false); 
    const [formState, setFormState] = useState({
        company: '',
        title: '',
        deadline: '',
        url: '',
        salary: '',
        location: '',
        status: 'Wishlist',
    });

    const validateForm = (formElements) => {
        const newErrors = {};
    
        if (!formElements.company.value.trim()) {
          newErrors.company = 'Company is required';
        }
        if (!formElements.title.value.trim()) {
          newErrors.title = 'Job Title is required';
        }
        if (!formElements.location.value.trim()) {
          newErrors.location = 'Location is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

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
        console.error("There is no prop named Date");
    }
          
    }

    useEffect(() => {
        if (props.item && props.isUpdate) {
            setFormState({
                company: props.item.company || '',
                title: props.item.title || '',
                deadline: props.item.deadline ? dayjs(props.item.deadline).format('YYYY-MM-DD') : '',
                url: props.item.url || '',
                salary: props.item.salary || '',
                location: props.item.location || '',
                status: props.item.status || 'Wishlist',
            });
            setValue(props.item.description || '');
            setBlockPickerColor(props.item.color || "#FF8A65");
        }
    }, [props.item, props.isUpdate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInfoNavigation = () => {
        setIsEdit(false);
        setIsInfo(true);
    }

    const handleEditNavigation = () => {
        setIsInfo(false);
        setIsEdit(true);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!validateForm(e.target.elements)) {
            return; 
        }

        const formData = new FormData();
        const elements = e.target.elements;
        
        for (let element of elements) {
            if (element.name && element.value) {
            formData.append(element.name, element.value);
            }
        }
        
        formData.append('color', blockPickerColor);
        formData.append('description', value);

        try {
            const data = await apiClient.updateJob(props.item.id, formData);
            props.updateCard(data.status, data); 
            props.setTrigger(false);
        }
        catch (error) {
            console.error('Error updating the Job Application: ', error);
            alert('Failed to update the Job Application. Please try again.');
        }
                
    }

    const getInputClass = (name) => {
        return `modal-form__input ${isSubmitted && errors[name] ? 'modal-form__input--error' : ''}`;
    };

    return props.trigger ? (
        <section className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <header className='modal__header'>
                    <div className='modal__header-info'>
                        <h1 className="modal__job-title">{formState.title}</h1>
                        <h4 className="modal__company">{formState.company}</h4>
                    </div>

                    <nav className='modal__header-nav'>   
                        <div className='modal__header-nav-wrapper'>
                            <img src={isInfo ? infoActive : info} className='modal__header-icon'onClick={handleInfoNavigation}/>
                            <span className='modal__header-text' onClick={handleInfoNavigation}>Info</span>
                        </div>
                        
                        <div className='modal__header-nav-wrapper'>
                            <img src={isEdit ? editActive : edit} className='modal__header-icon' onClick={handleEditNavigation}/>
                            <span className='modal__header-text' onClick={handleEditNavigation}>Edit</span>
                        </div>
                        
                    </nav>
                    <button type="button" className='modal__button' onClick={handleFormCancel}></button>
                </header>

                <main className="modal__form-wrapper">
                { isInfo ? 
                    <>
                    <div className="modal-form">
                    <div className='modal-form__row'>

                        <div className='modal__label-wrapper '>
                            <label htmlFor="company" className="modal__label">
                                Company :
                            </label>
                            <p className='modal__label-value'>{formState.company}</p>
                        </div>

                        <div className='modal__label-wrapper'>
                            <label htmlFor="title-input" className="modal__label">
                                Job Title :
                            </label>
                           <p className='modal__label-value'>{formState.title}</p>
                        </div>

                        <div className='modal__label-wrapper'>
                            <label htmlFor="deadline-input" className="modal__label">
                                Deadline :
                            </label>
                           <p className='modal__label-value'>{formState.deadline}</p>
                        </div> 
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal__label-wrapper'>
                            <label htmlFor="url-input" className="modal__label">
                                Post URL :
                            </label>
                           <p className='modal__label-value'>
                                <a className='modal__label-url' href={formState.url}>
                                    <img className='modal__label-url-icon' src={linkIcon}/>
                                    View Job Posting
                                </a>
                            </p>
                        </div>       
                        <div className='modal__label-wrapper'>
                            <label htmlFor="salary-input" className="modal__label">
                                Salary :
                            </label>
                            <p className='modal__label-value'>{formState.salary}</p>
                        </div>            
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal__label-wrapper'>
                            <label htmlFor="location-input" className="modal__label">
                                Location 
                            </label>
                           <p className='modal__label-value'>{formState.location}</p>
                        </div>
                        <div className='modal__label-wrapper'>
                            <label htmlFor="status-select" className="modal__label">
                                Status :
                            </label>
                            <p className='modal__label-value'>{formState.status}</p>
                        </div>
                        <div className='modal__label-wrapper'>
                            <label htmlFor="color-input" className="modal__label">
                                Color 
                            </label>
                            <div
                                style={{
                                    backgroundColor: `${blockPickerColor}`,
                                    width: 40,
                                    height: 30,
                                    border: "2px solid white",
                                }}
                               >
                            </div>
                        </div>
                    </div>
                    <div className='modal-form__text-editor'>
                        <label htmlFor="description-textarea" className="modal__label modal__label-description">
                            Description 
                        </label>

                        <ReactQuill ref={quillRef} readOnly={true} theme="snow" value={value}  onChange={setValue} style={{
                            backgroundColor: 'rgba(77, 70, 55, 0.1)',  width: '100%'}}/>
                    </div>
                    </div>
                    </>
                : ''}
                { isEdit ? <form className="modal-form" onSubmit={handleFormSubmit}>
                    
                    <div className='modal-form__row'>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="company" className="modal-form__label">
                                Company  <span className='modal-form__required'>*</span>
                            </label>
                            <input type="text" name="company" className={getInputClass('company')} size="30" placeholder="Enter company name" value={formState.company} onChange= {handleInputChange}/>
                        </div>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="title-input" className="modal-form__label">
                                Job Title  <span className='modal-form__required'>*</span>
                            </label>
                            <input type="text" name="title"className={getInputClass('title')} size="40" placeholder="Enter job title" value={formState.title} onChange= {handleInputChange}/>
                        </div>

                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="deadline-input" className="modal-form__label">
                                Deadline 
                            </label>
                            <input type="date" name="deadline" className="modal-form__input" placeholder="Enter application deadline" value={formState.deadline} onChange= {handleInputChange} />
                        </div>
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="url-input" className="modal-form__label">
                                Post URL
                            </label>
                            <input type="text" name="url" className="modal-form__input model-form__input--url" size="40" placeholder="Enter job post URL" value={formState.url} onChange= {handleInputChange} />
                        </div>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="salary-input" className="modal-form__label">
                                Salary
                            </label>
                            <input type="number" name="salary" className="modal-form__input" placeholder="Enter salary" value={formState.salary} onChange= {handleInputChange}/>
                        </div>                    
                    </div>
                    <div className='modal-form__row'>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="location-input" className="modal-form__label">
                                Location  <span className='modal-form__required'>*</span>
                            </label>
                            <input type="text" name="location" size="30"  className={getInputClass('location')}  placeholder="Enter location" value={formState.location} onChange= {handleInputChange}/>
                        </div>
                        <div className='modal-form__input-wrapper'>
                            <label htmlFor="status-select" className="modal-form__label">
                                Status 
                            </label>
                            <select name="status" className="modal-form__select" value={formState.status} onChange= {handleInputChange}>
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

                        <ReactQuill ref={quillRef}  theme="snow" value={value} style={{
                            backgroundColor: 'rgba(77, 70, 55, 0.1)',  width: '100%'}}/>
                    </div>
                    <div className="modal-form__actions">
                        <button type="submit" className="modal-form__button">Submit</button>
                    </div>
                </form> : '' }

                </main>
            </div>
        </section>
    ) : (
    ""
    );
}

export default EditJobModal