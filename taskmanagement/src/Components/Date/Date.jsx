import { useState } from 'react';
import './Date.css'

function Date({ number }) {
    // Modal
    const [showModal, setModal] = useState(false); // Modal non-visible at start

    const toggleModal = () => {
        setModal(!showModal);
    }

    // Modal logic functions

    // HTML
    return (
        <>
            <div className='CardContainer' onClick={toggleModal}>
                {number.map((mNum, index) => (
                    <div className="Day" key={index}>{mNum}</div>
                ))}
            </div>

            {showModal && (
                <div className="Modal">
                    <div className="ModalOverlay">
                        <div className="ModalContent">

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Date;