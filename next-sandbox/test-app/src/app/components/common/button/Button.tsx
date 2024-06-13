import {Text} from 'src/app/components/common/Text/Text';
import type {ReactNode} from 'react';

export const Button = ({
  children,
  onClick,
  id,
  text,
}: {
  children: ReactNode;
  onClick: () => void;
  id: string;
  text: string;
}) => {
  return (
    <button onClick={onClick} id={id}>
      {children}
      <Text id='button-text'>{text}</Text>
    </button>
  );
};
