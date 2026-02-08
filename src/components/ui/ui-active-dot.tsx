export default function UiActiveDot(params:{enable: boolean}){
    if(params.enable){
        return(
            <span className="absolute  -right-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" /> 
        )
    }else{
        return <></>
    }
}