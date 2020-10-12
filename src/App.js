import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import leftNotesData from './data/startingNotesLeft';
import middleNotesData from './data/startingNotesMiddle';
import rightNotesData from './data/startingNotesRight';

import Header from './components/Header';

import CardHeader from './components/CardHeader';
import CardBody from './components/CardBody';
import CardFooter from './components/CardFooter';

import './App.css';
import './styles/style.css';

function App() {
    const [lastSelectedDay, setLastSelectedDay] = useState(null);
    const [lastTimePicked, setLastTimePicked] = useState(null);

    const addNote = btn => {
        let card = btn.closest('.card');
        setLastSelectedDay(card);
        moveEditorLeft();
    };

    const createBadgeFromRadioButtons = () => {
        let span = document.createElement('span');

        span.innerHTML = 'Deadline';
        let classNames = ['badge', 'badge-pill'];
        let [deadline, link, time] = ['deadline', 'link', 'time'].map(num =>
            document.querySelector('#badge-' + num)
        );

        if (deadline.checked) {
            span.innerHTML = 'Deadline';
            classNames.push('badge-warning');
        } else if (link.checked) {
            span.innerHTML = 'Link or reference';
            classNames.push('badge-info');
        } else {
            // time.checked
            span.innerHTML = lastTimePicked;
            classNames.push('badge-light');
        }

        span.className = classNames.join(' ');
        return span;
    };

    const submitNote = () => {
        let noteContent = document.querySelector('#note-content').value;

        let span = createBadgeFromRadioButtons();

        let li = document.createElement('li');
        li.innerHTML = noteContent;
        li.className = 'list-group-item';

        let card = lastSelectedDay;
        let list = card.querySelector('.list-group');

        list.insertBefore(li, list.firstElementChild);
        list.insertBefore(span, list.firstElementChild);

        moveEditorRight();
    };

    const delimiterAfterHeader = 'header-delimiter';
    const moveEditorLeft = () => {
        let editor = document.querySelector('.note-editor');
        let offset = 
            document.querySelector('.jumbotron').offsetHeight + 
            document.querySelector('.' + delimiterAfterHeader).offsetHeight;

        editor.style.top = offset + 'px';
        editor.style.left = '0';
    };

    const moveEditorRight = () => {
        let editor = document.querySelector('.note-editor');
        editor.style.left = '100vw';
    };

    const init = () => {
        document.querySelectorAll('.add-note').forEach(btn => {
            btn.addEventListener('click', () => addNote(btn));
        });

        document.querySelector('.submit-note').addEventListener('click', submitNote);
        document.querySelector('.cancel-note').addEventListener('click', moveEditorRight);
    };

    const timePickerChange = date => {
        console.log(date);
        let h = date.getHours();
        let m = date.getMinutes();
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        const temp = `${h}:${m}`;
        setLastTimePicked(temp);
    };

    document.addEventListener('DOMContentLoaded', init);


    const [startingNotesLeft] = useState(leftNotesData);
    const [startingNotesMiddle] = useState(middleNotesData);
    const [startingNotesRight] = useState(rightNotesData);
    
    return (
        <div id="#bootstrap-overrides">
            <Header title='Notes' version='v0.0.1' />
            <div className={delimiterAfterHeader}></div>

            <div className='flex-wrapper'>
                <div id='days-container' className='flex-container'>
                    <div className='card flex-card'>
                        <CardHeader 
                            monthDay='7th October' 
                            weekDay='Wednesday' 
                            relativeDay='Yesterday' 
                            badgeType='badge-danger'
                        />
                        <CardBody notes={startingNotesLeft}/>
                        <CardFooter/>
                    </div>

                    <div className='card flex-card'>
                        <CardHeader 
                            monthDay='8th October' 
                            weekDay='Thursday' 
                            relativeDay='Today' 
                            badgeType='badge-warning'
                        />
                        <CardBody notes={startingNotesMiddle}/>
                        <CardFooter/>
                    </div>

                    <div className='card flex-card'>
                        <CardHeader 
                            monthDay='9th October' 
                            weekDay='Friday' 
                            relativeDay='Tomorrow' 
                            badgeType='badge-primary'
                        />
                        <CardBody notes={startingNotesRight}/>
                        <CardFooter/>
                    </div>
                    <div className='card flex-card'>
                        <CardHeader 
                            monthDay='9th October' 
                            weekDay='Friday' 
                            relativeDay='Tomorrow' 
                            badgeType='badge-primary'
                        />
                        <CardBody notes={startingNotesRight}/>
                        <CardFooter/>
                    </div>
                    <div className='card flex-card'>
                        <CardHeader 
                            monthDay='9th October' 
                            weekDay='Friday' 
                            relativeDay='Tomorrow' 
                            badgeType='badge-primary'
                        />
                        <CardBody notes={startingNotesRight}/>
                        <CardFooter/>
                    </div>
                </div>
            </div>
            <div className='note-editor'>
                <div className='card note-editor-card'>
                    <div className='card-body'>
                        <h5>Note or Event</h5>
                        <div className='form-group note-content-input'>            
                            <input id='note-content' className='form-control' placeholder="Write down anything important for you"/>
                        </div>
                        <h5>Choose label for your note</h5>

                        <div className='form-check note-badge-line'>
                            <input
                             className='form-check-input'
                             type='radio'
                             name='badge-radio'
                             id='badge-deadline'
                             defaultChecked
                             ></input>
                            <label
                             className='form-check-label badge-radio'
                             htmlFor='badge-deadline'
                            >
                            <span className='badge badge-pill badge-warning'>Deadline</span>
                            </label>
                        </div>

                        <div className='form-check note-badge-line'>
                            <input
                             className='form-check-input'
                             type='radio'
                             name='badge-radio'
                             id='badge-link'
                             ></input>
                            <label className='form-check-label badge-radio' htmlFor='badge-link'>
                                <span className='badge badge-pill badge-info'>
                                    Link or reference
                                </span>
                            </label>
                        </div>

                        <div className='form-check note-badge-line'>
                            <input
                             className='form-check-input'
                             type='radio'
                             name='badge-radio'
                             id='badge-time'
                             ></input>
                            <label className='form-check-label badge-radio' htmlFor='badge-time'>
                                <span className='badge badge-pill badge-light'>Time</span>
                            </label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker onChange={e => timePickerChange(e)} />
                            </MuiPickersUtilsProvider>
                        </div>


                        <button className='submit-note btn btn-primary'>Add</button>
                        <button className='cancel-note btn'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
);
}

export default App;
