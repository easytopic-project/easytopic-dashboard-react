import {
  Container,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
  Typography,
  List,
  ListSubheader,
  Grid,
} from "@material-ui/core";
import React from "react";

function StepDialog({ step, open, onClose }) {
  if (!step) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{step.id}</DialogTitle>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <List subheader={<ListSubheader>Arguments</ListSubheader>}>
              {step &&
                Object.keys(step.arguments).map((keyName, index) => (
                  <ListItem key={keyName}>
                    <ListItemText>
                      <Typography>{`${keyName}: ${step.arguments[keyName]}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item>
            <List subheader={<ListSubheader>Outputs</ListSubheader>}>
              {step &&
                Object.keys(step.output).map((keyName, index) => (
                  <ListItem key={keyName}>
                    <ListItemText>
                      <Typography>{`${keyName}: ${step.output[keyName]}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Container>
      <Typography // TODO remover ?
        style={{ color: "grey", margin: "10px" }}
        align="right"
        variant="caption"
      >
        *Queues are not beeing displayed
      </Typography>
    </Dialog>
  );
}

export default StepDialog;
