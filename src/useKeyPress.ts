import { useEffect, useLayoutEffect, useRef } from 'react';

export const useKeyPress = (callback: () => void, keys: string[]) => {
    const callbackRef = useRef(callback);
    const keysRef = useRef(keys);

    useLayoutEffect(() => {
        callbackRef.current = callback;
        keysRef.current = keys;
    });

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (keysRef.current.includes(event.key)) {
                event.preventDefault();
                callbackRef.current();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);
};
