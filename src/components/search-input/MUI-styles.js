import { makeStyles } from "@material-ui/core/styles";

export const searchStyles = makeStyles((theme) => ({
    root: {
        padding: "2px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));