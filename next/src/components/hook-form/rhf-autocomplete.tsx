import { useFormContext, Controller } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { AutocompleteFreeSoloValueMapping } from "@mui/material";

// ----------------------------------------------------------------------

interface OptionType {
  name: string;
  [key: string]: any;
}

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  optionKey?: string;
  optionLabel?: string;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  placeholder,
  optionKey,
  options,
  optionLabel,
  helperText,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={
            optionKey
              ? options.find((option: any) => option[optionKey] === value)
              : value
          }
          options={options}
          onChange={(event, newValue) => {
            if (typeof newValue === "object" && optionKey) {
              const typedOption = newValue as OptionType;
              setValue(name, typedOption[optionKey ? optionKey : "name"], {
                shouldValidate: true,
              });
            } else {
              setValue(name, newValue, {
                shouldValidate: true,
              });
            }
          }}
          getOptionLabel={(
            option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
          ) => {
            if (typeof option === "object" && optionLabel) {
              const typedOption = option as OptionType;
              return typedOption[optionLabel ? optionLabel : "name"];
            }
            if (typeof option === "string") {
              return option;
            }
            return "";
          }}
          isOptionEqualToValue={(option, value) => {
            if (typeof option === "object" && optionKey) {
              const typedOption = option as OptionType;
              return typedOption[optionKey ? optionKey : "id"];
            }
            if (typeof option === "string") {
              return option;
            }
          }}
          renderInput={({ InputLabelProps, ...params }) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
