import { useState } from 'react'

export const useMessage = message => {
    const [msg, setMsg] = useState(message);
    setTimeout(() => {
        setMsg('');
    }, 3000);

    return [msg, setMsg];
}