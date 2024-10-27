import React from "react";

export interface UploadFormData {
    album_title: string;
    files: File[];
    titles: string[];
    image: File | null;
    title: string;
}

export type DangerButtonTypes = {
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () =>void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export interface SecondaryButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    type: "reset" | "button" | "submit";
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode | undefined;
}

export interface InputLabelTypes {
    children?: React.ReactNode | undefined;
    value: string;
    className?: string;
    htmlFor: string;
}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    className?: string;
    isFocused?: boolean;
    ref?: React.Ref<HTMLInputElement>;
}

export interface TexInputRef {
    focus: () => void;
}

export interface InputErrorTypes {
    message: string;
    className: string;
    props: React.PropsWithChildren
}