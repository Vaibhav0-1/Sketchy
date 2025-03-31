import { useLayoutEffect, useRef, useState } from "react";

function useDimensions(){
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        setDimensions(ref.current.getBoundingCLientReact().toJSON());
    })
}