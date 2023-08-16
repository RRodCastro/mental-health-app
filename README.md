# Mental Health App

This is a mental health app built using React, Redux, RTK Query, and Firebase. The app allows users to journal their thoughts and feelings, track their mood, and practice mindfulness exercises for improved mental well-being.

## Features

- Journal Entries: Users can write and save journal entries to reflect on their thoughts and feelings.
- Mood Tracking: Users can track their mood over time and visualize their emotional well-being.
- Mindfulness Exercises: Guided and unguided mindfulness audio exercises to help users relax and reduce stress.
- Data Storage: Firebase Firestore is used to store user data securely.

## Prerequisites

- Npm should be installed on your machine.
- Firebase project set up with Firestore enabled.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mental-health-app.git
   cd mental-health-app
   ```
2. Install dependencies:

    ```bash
    npm install
    ```
3. Create a .env file in the root directory of the project with the following keys:


    VITE_REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    VITE_REACT_APP_FIRESTORE_URL=your-firestore-url
4. Run the app locally:

    ```bash
    npm run dev
    ```
4. Build the application:

    ```bash
    npm run build
    firebase deploy --only hosting
    ```

Open your browser and navigate to http://localhost:3000 to access the app.
## Technologies Used

- React
- Redux
- RTK Query
- Firebase (Firestore)

## Contributing
Contributions are welcome! Please create an issue or pull request if you have any suggestions, bug fixes, or improvements.

## License
This project is licensed under the MIT License.
adme.md` file.




