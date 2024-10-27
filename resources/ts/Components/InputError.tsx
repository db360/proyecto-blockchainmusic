import { InputErrorTypes } from '@/types/props/formProps';
import React from 'react';


export default function InputError({ message, className = '', ...props }:InputErrorTypes) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 dark:text-red-400 ' + className}
        >
            {message}
        </p>
    ) : null;
}
