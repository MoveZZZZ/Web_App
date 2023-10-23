import React from 'react';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({ param }) => {

    return (<div className="fixed z-10 right-5 text-center animate-bounce ease-in-out duration-200 transition-all">
        <p className="rounded-full py-2 px-4 bg-greenLight opacity-80">
            <FontAwesomeIcon
                icon={faCheck}
                className="mr-4"
            />
            { param }
        </p>
    </div>
    )
}

export default Message;