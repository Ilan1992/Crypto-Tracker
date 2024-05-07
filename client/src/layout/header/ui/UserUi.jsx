import { Typography,IconButton,Box } from '@mui/material';
import useCompare from '../../../hooks/useCompare';
import PropType from 'prop-types';

const UserUi = ({ onClick }) => {
  const { inputsValues } = useCompare();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton aria-label="" onClick={onClick}>
        <img src={inputsValues.url} alt={inputsValues.alt} width={40} />
      </IconButton>
      <Typography variant="body1" color="gray.500" fontFamily={"Lorn"}>
        Welcome Back ! {inputsValues.first}
      </Typography>
    </Box>
  );
};
UserUi.propTypes ={
  onClick:PropType.func
}
export default UserUi