import {Text} from "src/app/common/button/Text";

export const Button = ({children, onClick, id, text}) => {
    return (
        <button onClick={onClick} id={id}>
            {children}
            <Text id='button-text'>{text}</Text>
        </button>
    );
}
