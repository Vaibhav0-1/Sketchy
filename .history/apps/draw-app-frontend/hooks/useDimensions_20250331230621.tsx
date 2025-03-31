import { useLayoutEffect, useRef, useState } from "react";

function useDimensions(){
    const ref = useRef<HTMLElement>(null);
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        if (ref.current) {
            setDimensions(ref.current.getBoundingCLientReact().toJSON());
        }
    }, [ref.current])

    return [ref, dimensions]
}