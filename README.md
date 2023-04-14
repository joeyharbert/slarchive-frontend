# [slarchive](https://slarchive.onrender.com)

slarchive is a web application for parsing and displaying slack archival json from an exported slack zip file. The frontend takes the response from the backend and uses Bootstrap to display the messages in a user friendly format.

Frontend is built in React through vite, and uses Bootstrap (and React Bootstrap) for styling.

\*\*Note, if visiting above link to use slarchive without a local install, it may take a few minutes for the backend to respond, as it is deployed on the free tier of render.

## Installation - Frontend Display

** First, make sure you've followed the install instructions for the backend API [here](https://github.com/joeyharbert/slarchive-api#installation---backend-parsing-api)**

After cloning the repo and navigating to the project directory, it's a typical npm project install.

```bash
npm install
npm run dev
```

## Usage

Once your development server is running (and the backend rails app is running). You can visit `localhost:5173`. From there, the app will prompt you to select the slack zip file for parsing.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
