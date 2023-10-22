import React from 'react';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ param }) => {

    return (<div className="fixed z-10 right-5 text-center animate-bounce ease-in-out duration-200 transition-all">
        <p className="rounded-full py-2 px-4 bg-red opacity-80">
            <FontAwesomeIcon
                icon={faXmark}
                className="mr-4"
            />
            {param}
        </p>
    </div>
    )
}

export default ErrorMessage;