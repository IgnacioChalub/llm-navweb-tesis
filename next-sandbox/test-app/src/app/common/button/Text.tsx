import {formatText} from "src/app/common/button/utils";

export const Text = ({children, id}) => {
    return (
        <p id={id}>
            {formatText(children)}
        </p>
    );
}
