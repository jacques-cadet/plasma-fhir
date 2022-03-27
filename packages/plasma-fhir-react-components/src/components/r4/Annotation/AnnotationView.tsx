import React from "react";
import { Annotation } from "fhir/r4";

export interface IAnnotationViewProps { annotation?: Annotation; }
export const AnnotationView: React.FC<IAnnotationViewProps> = (props) => {
    if (!props.annotation) { return <div />; }

    return (
        <div className="AnnotationView_container">
            <div>
                TODO: AnnotationView
            </div>
        </div>
    );
}

export default AnnotationView;