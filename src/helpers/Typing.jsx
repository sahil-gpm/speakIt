import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';

const Typinganimation = () => {
    // Create reference to store the DOM element containing the animation
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            loop: true,
            strings: ['different languages easily', 'and solve quick exercises', 'sentence formation', 'appropriate pronunciation'],
            typeSpeed: 50,
            showCursor: false,
            backSpeed: 55
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <span className='bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text' ref={el} />
    );
}

export default Typinganimation