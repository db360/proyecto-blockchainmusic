export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    className?: string;
    isFocused?: boolean;
}

export interface TexInputRef {
    focus: () => void;
}

