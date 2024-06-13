import {formatText} from 'src/app/components/common/utils';

export const Text = ({children, id}: {children: string; id: string}) => {
  return <p id={id}>{formatText(children)}</p>;
};
