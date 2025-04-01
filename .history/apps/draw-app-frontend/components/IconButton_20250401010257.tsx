import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({icon, onClick} : { icon: ReactNode, onClick: () => void}){
    return <div className="pointer rounded-full border p-2 bg-black hover:bg-amber-200" onClick={onClick}>
        {icon}
    </div>
    
}

function Topbar(){
    return <div style={{
        position:"fixed",
        top:10,
        left:10
    }}>

    </div>
}