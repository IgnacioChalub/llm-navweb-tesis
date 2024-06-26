import {Typography} from '@mui/material';
import type {SxProps} from '@mui/system';

interface TextProps {
  children: string | string[];
  id?: string;
  sx?: SxProps;
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';
}

export const Text = (props: TextProps) => {
  return (
    <Typography variant={props.variant} id={props.id} sx={props.sx}>
      {props.children}
    </Typography>
  );
};
