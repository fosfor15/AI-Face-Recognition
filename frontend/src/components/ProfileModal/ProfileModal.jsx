import { createRef, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import './ProfileModal.css';


const ProfileModal = ({ isModalOpen, toggleProfileModal }) => {
    const { user } = useContext(AuthContext);
    
    const nameInput = createRef();
    const ageInput = createRef();
    const petSelect = createRef();

    return (
        <Modal
            isOpen={ isModalOpen }
            toggle={ toggleProfileModal }
        >
            <ModalHeader toggle={ toggleProfileModal }>
                Profile Settings
            </ModalHeader>

            <ModalBody>
                <div className='profile-info'>
                    <div className='name'>
                        { user.name } <span className='pet'>Kind monster</span>
                    </div>
                    {/* <div className='age'>
                        50 years
                    </div>
                    <div className='joined'>
                        Joined in { user.registrationdatetime }
                    </div> */}
                    <div className='rank'>
                        The rank is #{ user.entries }
                    </div>
                </div>

                <form className='profile-form'>
                    <div className='form-control'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            ref={ nameInput }
                            placeholder='Enter your name'
                            required
                        />
                    </div>

                    <div className='form-control'>
                        <label htmlFor='age'>Age</label>
                        <input
                            type='number'
                            id='age'
                            ref={ ageInput }
                            placeholder='Enter your age'
                            min='0'
                        />
                    </div>

                    <div className='form-control'>
                        <label htmlFor='pet'>Pet</label>
                        <select
                            id='pet'
                            ref={ petSelect }
                            defaultValue='null'
                        >
                            <option value='null' disabled>Select pet's kind</option>
                            <option value='cat'>&#128008; Cat</option>
                            <option value='dog'>&#128021; Dog</option>
                            <option value='rabbit'>&#128007; Rabbit</option>
                            <option value='mouse'>&#128001; Mouse</option>
                            <option value='parrot'>&#128038; Parrot</option>
                            <option value='horse'>&#128052; Horse</option>
                            <option value='fish'>&#128031; Fish</option>
                            <option value='pig'>&#128022; Pig</option>
                            <option value='snail'>&#128012; Snail</option>
                            <option value='turtle'>&#128034; Turtle</option>
                            <option value='snake'>&#128013; Snake</option>
                            <option value='scorpion'>&#129410; Scorpion</option>
                            <option value='spider'>&#128375; Spider</option>
                            <option value='kind-monster'>&#128126; Kind monster</option>
                        </select>
                    </div>
                </form>
            </ModalBody>

            <ModalFooter>
                <button
                    className='profile-form-button'
                >
                    Save
                </button>
                <button
                    className='profile-form-button'
                    onClick={ toggleProfileModal }
                >
                    Cancel
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default ProfileModal;
