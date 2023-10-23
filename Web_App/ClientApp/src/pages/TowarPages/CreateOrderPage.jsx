import React, { useState, useEffect, useLocation} from 'react';


const CreateOrderPage = () => {

    const [selectedIndex, setSelectedIndex] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.selectedItemList) {
            setSelectedIndex(location.state.selectedItemList);
        }
    }, [location.state]);




    return (

        <div>
            {selectedIndex.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );



};
export default CreateOrderPage;