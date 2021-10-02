import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

function TimeChart({ jobData }) {
  var data = {
    labels: [],
    datasets: [
      {
        label: "Steps duration",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  jobData &&
    jobData.status === "done" &&
    Object.keys(jobData.jobStatus).forEach((job) => {
      const time =
        new Date(jobData.jobStatus[job].finishAt.toString()) -
        new Date(jobData.jobStatus[job].startAt.toString());
      data.labels.push(job);
      data.datasets[0].data.push(time / 1000);
    });

  if (jobData)
    return (
      <Card raised>
        <CardContent>
          <Typography variant="h4">Steps Duration</Typography>
          <Doughnut
            data={data}
            options={{ plugins: { legend: { position: "bottom" } } }}
          />
        </CardContent>
      </Card>
    );
  return null;
}

export default TimeChart;
