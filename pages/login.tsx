import { useEffect, useRef } from 'react'

export default function Login() {    

    const penmarkRef = useRef(null)

    useEffect(() => {
        const script = document.createElement('script');
        script.setAttribute('type', 'module');
        script.setAttribute('src', 'https://penmark.appsinprogress.com/dist/LoginClient.js');
    
        penmarkRef.current.appendChild(script);

        if(window.penmarkLoginInit) {
            window.penmarkLoginInit();
        }
    }, []);
    
    return (
        <>  
            <div ref={penmarkRef}></div>
        </>
    );
}
