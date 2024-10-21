# ChatSGG


This brief documentation aims to provide a general overview of the ChatSGG Web App, describing its use, the main technologies employed, and the logic behind it, as well as a user guide.

- OVERVIEW AND USER GUIDE
When the web app is opened, users are directed to the login page, which allows them to log in or register. To create an account, users must enter their information and choose a unique username and password. Specifically, if an already used username is chosen, an error will appear on the screen, as it will also happen if the “password” and “confirm password” fields do not match. Before being stored in the database, passwords are hashed using Bcrypt to ensure secure authentication. After creating a new account, users are redirected to the login page, from which they can access the main page. At this point, they can see their friends, with whom they can exchange real-time messages. The web app only allows conversations with friends: to add a friend, users need to go to the "friends" page and enter the username of the person they want to send a friend request to. The recipient can either accept or decline the request, and only after approval can contact be initiated. It should be noted that the app does not allow users to send friend requests to themselves, thus preventing the creation of a “self-chat.” Friendships can always be managed: by removing a friend, the chat will be deleted for both parties.

- FRONTEND
The frontend is entirely built with React (running on port 3000) and consists of three pages (Chat Panel, Login, and Register), which call various components (notably, the Navbar, which creates the top bar for navigation between pages, and the Chat component, which renders the conversations). Routes have been used to map page URLs, while useEffect is employed to handle side effects. Additionally, the useState and useRef hooks are used to manage component state and create mutable references, respectively. Real-time communication is managed using Socket.io, and HTTP requests to the backend are made with Axios.

- BACKEND
The backend is built with Node.js, specifically using the Express framework. The app listens on port 4000 (port 5000 is sometimes used by a macOS component), where it can expose its APIs. The backend interfaces with the cloud-based MongoDB database through Mongoose (used to create the schemas in /models). Using Express, routes were created to call various functions handled by two controllers. The app uses CORS middleware to allow Socket.io to work, as well as express.json. The logic is based on two controllers: messageController, which handles messaging, and userController, which manages friendships and authentication. Further details on the logic are provided as comments within the code.

Made by
# Matteo Potito Giorgio
m.giorgio4@studenti.poliba.it

# Serafino Sinisi
s.sinisi@studenti.poliba.it

# Vincenzo Gentile
v.gentile2@studenti.poliba.it

