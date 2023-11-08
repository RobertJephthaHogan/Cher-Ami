import { useRouteError } from "react-router-dom";




export default function ErrorBoundary() {

    const error : any = useRouteError()

    return (
        <div>
            Error Boundary! <br/>
            Status: {error?.status}
        </div> 
    )
}