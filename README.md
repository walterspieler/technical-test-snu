# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug :

- Sign up to the app
- Create at least 2 others users on people page ( not with signup )
- Edit these profiles and add aditional information
- Create a project
- Input some information about the project
- Input some activities to track your work in the good project

Then, see what happens in the app and fix the bug you found doing that.

## Then

Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions :

- What bugs did you find ? How did you solve these and why ?

- The PASSWORD_NOT_VALIDATED error was outputting a Success 200 status instead of a Bad Request 400 error.
- Components were missing a display name, which can be a problem when using the developer tool. This was fixed in multiple places by exporting a named arrow function.
- I removed the col reverse flex CSS class for more clarity.
- Replaced the HTML form with the Form Component from Formik. Using a library as recommended by the library itself is a good practice. It also enhances readability and reduces the line count.
  Some missing fields were added to the user edit form.
- I removed multiple unnecessary React Fragments and added keys to some loops that didn't have one or had a wrong one (duplicate keys).
- I replaced Find with FindOne in the route /project/:id. Find outputs an array, but we only want an object for this route.
- I used FieldArray to handle array values in forms. With this component, I've been able to have only one form. It's bad practice to have forms within other forms.
- Activity removal was fixed (It was updating the state after component removal).
- In Activity, the date wasn’t being sent to the API. This has been fixed.
- All the details of what I fixed are viewable in the different Pull Requests I made. They're closed, but you can still view them.

- Which feature did you develop and why ?

- The feature I developed was a single view for activity details, to enable users to view data of a single activity. I also added a button to allow users to export activity data as a CSV. This can help users analyze their data, and CSV is a format that is widely used. It also aids in data portability if the user has tools other than ours.
- It's not major change but I replaced the method to handle dates to be able to choose the wanted date format with it. I used date-fns since it's a popular tool easy to use to handle dates. Since the project could evolve and have date calculations/comparisons it doesn't feel useless to begin to use it and add this dependency.

- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ?

There are still some improvements that could be made to the project. Here are a few:

- To improve UI/UX coherence. This could be be achieved by using more reusable components.
- Some files contain multiple components. It's better to have one component per file and import other components as needed. Non-reusable components could be stored in a path such as components/views/VIEW_NAME/COMPONENT_NAME. This would make the project more maintainable and easier to read.
- I’d recommend switching to TypeScript for its many advantages, the main one being the addition of typing and enums to reduce the risk of bugs and make it easier for developers to understand the data structure.
- .env files aren't in gitignore. Better practice would be to make a .env.example to have the key names but not its secrets stored in git.
