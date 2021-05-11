# Easytopic Dashboard React

The Easytopic Dashboard is a client-side web based tool, developed using React as main framework and Material UI library for design and some components. The main goal is to provide a clean and intuitive dashboard to control the core functionalities of the Easytopic project.

To achieve this goal, the dashboard consumes an API that connects the client side application to the microservices that actually run the application. Currently, the dashboard also handles part of the file management by having access to the file system server which is used to store the files that will be used on the processes and the results of the processes.

## Application description

The flow of the application currently consists in choosing one of the available pipelines. A pipeline is a set of different processes through which the input information will pass until the process is completed and returned as results, mainly in form of text or files available to download. These pipelines are predefined on the server side and are dynamically displayed as options to the user at the "/pipelines" route.
With a pipeline set, the user must upload the required data to continue. By sending the form, the user will be redirected to that specific job results page (/jobs/id), and as soon as the job is done, the output information will be showed.
This process can be repeated as much as needed, and the user may want to check previous jobs, which can be done by going to the jobs route (/jobs), and searching for the previously requested job.

## Usage

To use and test the application, currently you will need to have the server side application running locally. This can be done by following the instructions in https://github.com/easytopic-project/easytopic-dashboard-api

Then you can run `npm install` followed by `npm start` in the dashboard cloned directory.

PS: Urls configurations for the correct API paths might need to be made.
