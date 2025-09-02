import {Button} from "@mui/material";
type ButtonProps = {
    text: string;
};
const SubmitButton = ({text} : ButtonProps) =>{
    return(
        <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
                mt: 3,
                fontSize: 20,
                backgroundColor: "#008DDA",
                color: "#e3f2fd",
                fontWeight: "bold",
            }}
        >
            {text}
        </Button>);
}
export default SubmitButton;