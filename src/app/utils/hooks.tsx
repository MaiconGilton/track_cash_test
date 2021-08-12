import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClickAlerter(ref, open, cb) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (open && ref.current && !ref.current.contains(event.target)) {
                cb()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open, cb]);
}


/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClickAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideClickAlerter(wrapperRef, props.open, () => {
        props.onClickOutside()
    });

    return <div ref={wrapperRef}>{props.children}</div>;
}