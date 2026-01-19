import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    type SelectProps,
} from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

type SelectOption = {
    value: string;
    label: string;
};

type VSelectFieldProps = SelectProps & {
    name: string;
    label: string;
    options: SelectOption[];
};

export const VSelectField = ({ name, label, options, ...rest }: VSelectFieldProps) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue ?? ''),
            clearValue: () => setValue(''),
        });
    }, [fieldName, registerField, value]);



    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{label}</InputLabel>

            <Select
                {...rest}
                label={label}
                value={value}
                onChange={(e) => {
                    clearError();
                    setValue(e.target.value);
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};
