import { useForm } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

import { forms } from "@/config";

const FormsComponent = ({ name, button, btnStyle, def, callback, change }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: def,
  });

  const form = forms[name];

  const onSubmit = (data) => callback(data);

  const renderActions = (name, button) => {
    switch (name) {
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(form).map(([name, field]) => {
          switch (field.type) {
            case "radio":
              return (
                <Box key={name}>
                  <FormControl margin="normal">
                    <FormLabel>{field.label}</FormLabel>
                    <RadioGroup defaultValue={def && def[name]} row>
                      {field.items.map((item) => (
                        <FormControlLabel
                          key={`${name}-${item.value}`}
                          value={item.value}
                          {...register(name)}
                          label={item.label}
                          control={<Radio />}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <br />
                </Box>
              );
            case "checkbox":
              return (
                <Box key={name}>
                  <FormControlLabel
                    value={name}
                    {...register(name)}
                    label={field.label}
                    control={<Checkbox />}
                  />
                  <br />
                </Box>
              );
            case "color":
              return (
                <TextField
                  key={name}
                  {...register(name)}
                  label={field.label}
                  type="color"
                  placeholder={field.placeholder}
                  margin="normal"
                  fullWidth
                />
              );
            case "select":
              return (
                <FormControl margin="normal" key={name} fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    defaultValue={def && def[name]}
                    {...register(name)}
                    placeholder={field.placeholder}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem
                        key={`${name}-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            case "textarea":
              return (
                <TextField
                  key={name}
                  {...register(name, {
                    onChange: (e) => change(e.target.value),
                  })}
                  label={field.label}
                  type={field.secure ? "password" : field.type}
                  placeholder={field.placeholder}
                  margin="normal"
                  rows={5}
                  fullWidth
                  multiline
                />
              );
            default:
              return (
                <TextField
                  key={name}
                  {...register(name)}
                  disabled={field.disabled}
                  label={field.label}
                  type={field.secure ? "password" : field.type}
                  placeholder={field.placeholder}
                  margin="normal"
                  fullWidth
                />
              );
          }
        })}
        {button && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{ color: "white", mt: 1 }}
            fullWidth={btnStyle.fullWidth}
            disabled={btnStyle.disabled}
            disableElevation
          >
            {button}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default FormsComponent;
