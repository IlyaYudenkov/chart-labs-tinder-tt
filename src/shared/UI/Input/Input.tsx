import { PropsWithChildren } from 'react';
import { InputText } from './Text/InputText';
import { InputCheckbox } from './Checkbox/InputCheckbox';
import { InputImage } from './Image/InputImage';

interface IInput extends PropsWithChildren {}

export const Input = ({ children }: IInput) => {
    return <>{children}</>;
};

Input.Text = InputText;
Input.Checkbox = InputCheckbox;
Input.Image = InputImage;
