import { Grid , TextField,Alert} from "@mui/material"
import PropTypes from "prop-types";

const TextInputComp = ({
  xs,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  type,
  required,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField 
        name={id}
        required={required}
        autoFocus={autoFocus}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        fullWidth
        />
        {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  )
}
TextInputComp.propTypes = {
  xs: PropTypes.number,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool.isRequired,
}

TextInputComp.defaultProps = {
  xs: 6,
  autoFocus: false,
};


export default TextInputComp