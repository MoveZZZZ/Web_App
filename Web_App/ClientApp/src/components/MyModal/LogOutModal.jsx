import React from 'react';

const MyModal = ({ children, visible, setVisible }) => {

    const modalClasses = `fixed top-0 bottom-0 right-0 left-0 ${visible ? 'block' : 'hidden'
        } bg-primary-400 bg-opacity-50  flex items-center justify-center`;
    const modalContentClasses = 'p-6 bg-primary-100 rounded-lg min-w-[250px] flex items-center justify-center ';

    return (
        <div className={modalClasses} onClick={() => setVisible(false)}>
            <div className={modalContentClasses} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Button 1
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Button 2
                    </button>
                    <p>FDESFDFDF</p>
                {children}
                </div>
            </div>
            </div>
    );
};

export default MyModal;