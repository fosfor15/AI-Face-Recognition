import { createRef, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import axiosInstance from '../../network/axios-instance';

import './ProfileModal.css';


export const petsMap = new Map([
    [ 'cat', '🐈' ], // 0x1F408
    [ 'dog', '🐕' ], // 0x1F415
    [ 'rabbit', '🐇' ], // 0x1F407
    [ 'mouse', '🐁' ], // 0x1F401
    [ 'parrot', '🐦' ], // 0x1F426
    [ 'horse', '🐴' ], // 0x1F434
    [ 'fish', '🐟' ], // 0x1F41F
    [ 'pig', '🐖' ], // 0x1F416
    [ 'snail', '🐌' ], // 0x1F40C
    [ 'turtle', '🐢' ], // 0x1F422
    [ 'snake', '🐍' ], // 0x1F40D
    [ 'scorpion', '🦂' ], // 0x1F982
    [ 'spider', '🕷' ], // 0x1F577
    [ 'kind-monster', '👾' ] // 0x1F47E
]);


const ProfileModal = ({ isModalOpen, toggleProfileModal }) => {
    const { user, setUser } = useContext(AuthContext);
    
    const nameInput = createRef();
    const ageInput = createRef();
    const petSelect = createRef();
    
    const updateProfile = () => {        
        let userUpdateData = {};

        if (nameInput.current.value && nameInput.current.value != user.name) {
            userUpdateData.name = nameInput.current.value;
        }

        if (ageInput.current.value && ageInput.current.value >= 0 &&
            ageInput.current.value != user.age) {
                userUpdateData.age = ageInput.current.value;
        }

        if (petSelect.current.value != 'null' && petSelect.current.value != user.pet) {
            userUpdateData.pet = petSelect.current.value;
        }

        if (Object.entries(userUpdateData).length) {
            
            axiosInstance.post(`/user/${user.id}`, userUpdateData)
                .then(response => {
                    const { user, description } = response.data;

                    if (user) {
                        setUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                    }

                    console.log('description :>> ', description);
                })
                .catch(error => {
                    console.log('error :>> ', error);
                });
        }
    };

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
                        { user.name }
                        { user.pet && <span className='pet'>{ petsMap.get(user.pet ?? 'kind-monster') }</span> }
                    </div>

                    { user.age &&
                        <div className='age'>
                            Age of { user.age } years
                        </div>
                    }

                    <div className='joined'>
                        Joined on {
                            new Date(user.registrationdatetime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                        }
                    </div> 

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
                    onClick={ updateProfile }
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
