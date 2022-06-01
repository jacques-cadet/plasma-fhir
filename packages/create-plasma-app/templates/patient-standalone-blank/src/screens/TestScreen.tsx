import { useContext } from 'react';
import { FHIRClientContext } from "plasma-fhir-react-client-context";

interface ITestScreenProps { };
function TestScreen(props: ITestScreenProps) {
    const context = useContext(FHIRClientContext);    

    return (
        <div className="p-5">
        </div>
    )
}

export default TestScreen;