import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({icon, onClick, activated} : { icon: ReactNode, onClick: () => void}){
    return <div className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-amber-200 ${activated ? "text-red" : "text-white"}`} onClick={onClick}>
        {icon}
    </div>
    
}

