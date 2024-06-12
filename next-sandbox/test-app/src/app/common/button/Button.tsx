export const Button = ({children, onClick, id}) => {
    return (
        <button onClick={onClick} id={id}>
            {children}
        </button>
    );
}
