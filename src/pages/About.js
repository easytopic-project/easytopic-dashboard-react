import { Container, Typography } from "@material-ui/core";
import React from "react";

function About() {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography gutterBottom variant="h4">
        Easytopic Dashboard React
      </Typography>
      <Typography align="justify" gutterBottom>
        The Easytopic Dashboard is a client-side web based tool, developed using
        React as main framework and Material UI library for design and some
        components. The main goal is to provide a clean and intuitive dashboard
        to control the core functionalities of the Easytopic project.
      </Typography>
      <Typography align="justify" gutterBottom>
        To achieve this goal, the dashboard consumes an API that connects the
        client side application to the microservices that actually run the
        application. Currently, the dashboard also handles part of the file
        management by having access to the file system server which is used to
        store the files that will be used on the processes and the results of
        the processes.
      </Typography>

      <Typography gutterBottom variant="h4">
        Application description
      </Typography>
      <Typography align="justify" gutterBottom>
        The flow of the application currently consists in choosing one of the
        available pipelines. A pipeline is a set of different processes through
        which the input information will pass until the process is completed and
        returned as results, mainly in form of text or files available to
        download. These pipelines are predefined on the server side and are
        dynamically displayed as options to the user at the "/pipelines" route.{" "}
      </Typography>
      <Typography align="justify" gutterBottom>
        With a pipeline set, the user must upload the required data to continue.
        By sending the form, the user will be redirected to that specific job
        results page (/jobs/id), and as soon as the job is done, the output
        information will be showed.
      </Typography>
      <Typography align="justify" gutterBottom>
        This process can be repeated as much as needed, and the user may want to
        check previous jobs, which can be done by going to the jobs route
        (/jobs), and searching for the previously requested job.
      </Typography>
    </Container>
  );
}

export default About;
