import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TextIcon from "@material-ui/icons/Description";
import InputIcon from "@material-ui/icons/Input";
import React from "react";

function PipelineResultsPreview({ pipeline }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Results</Typography>
        <List>
          {pipeline &&
            pipeline.output.map((result, index) => (
              <ListItem key={result.id}>
                <ListItemIcon>
                  {result.type === "file" ? (
                    <AttachFileIcon />
                  ) : result.type === "text" ? (
                    <TextIcon />
                  ) : (
                    <InputIcon />
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={result.name}
                  secondary={
                    <>
                      <Typography component="span" style={{ display: "block" }}>
                        {result.description}
                      </Typography>
                      {`Type: ${result.type}`}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PipelineResultsPreview;
