import React, { useState, useEffect } from 'react';

// accepts text, placeholder values & input type so can be styled properly
const Editable = ({
    text,
    type,
    placeholder,
    children,
    childRef,
    ... props
}) => {

    // determines whether or not the input box will show
    const [isEditing, setEditing] = useState(false);

    // focus depending on whether or not editing
    useEffect(() => {
        if (childRef && childRef.current && isEditing === true){
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    // handler for keys being pressed during editing
    const handleKeyDown = (event, type) => {
        // key is pressed
        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];
        if (
            (type === "textarea" && keys.indexOf(key) > -1) ||
            (type !== "textarea" && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false);
        }
    };


    return (
        <section {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => handleKeyDown(e, type)}
                    >
                    {children}
                </div>
            ) : (
                <div
                    onClick={() => setEditing(true)}
                >
                    <span>
                        {text || placeholder || "Editable content"}
                    </span>
                </div>
            )}
        </section>
    );

}

export default Editable;
