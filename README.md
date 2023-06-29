![Logo](/images/logo.png)

# CodeCollab

This is a collaborative coding website made in MERN stack.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in

- `backend`

    - `MONGO_SERVER_URI`

    - `JWT_SECRET`

    - `PORT`

- `frontend`

    - `REACT_APP_BACKEND_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/nitishgupta08/CodeForges.git
```

- Run frontend

  Go to the frontend project directory

  ```bash
  cd frontend
  ```

  Install frontend dependencies

  ```bash
  npm install
  ```

  Start frontend

  ```bash
  npm run start
  ```

- Run backend

  Go to the backend project directory

  ```bash
  cd backend
  ```

  Install backend dependencies

  ```bash
  npm install
  ```

  Start the server

  ```bash
  npm run server:dev
  ```

## Tech Stack

**Client:** React, MaterialUI, Codemirror

**Server:** Node, Express

## Roadmap

- Fix editor issue when two users type at the same time. If you find a way to do this in codemirrorV6, please raise an ```issue``` and let me know.

- More languages support

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
