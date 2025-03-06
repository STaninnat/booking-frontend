# booking-fe-react

Frontend for the booking system, providing the user interface and interacting with the backend API.

The first page displays the available rooms, allowing users to view a preview of the rooms before making any decisions. However, users cannot take any further action unless they sign up or sign in. Once logged in, users will be able to select and book rooms.

## Installation and Tools Used

- Vite React: A fast build tool for developing the frontend.
- js-cookie: A simple JavaScript API for handling cookies.
- react: A JavaScript library for building user interfaces.
- react-calendar: A flexible and customizable calendar component for React.
- react-dom: Provides DOM-specific methods for React.
- react-router-dom: A library for handling routing in React applications.
- react-slick: A React wrapper for the Slick carousel.
- slick-carousel: A popular carousel library with touch support.

## Local Development

Clone the repository

```bash
git clone https://github.com/STaninnat/booking-frontend
cd booking-frontend
```

Run .sh file, but if it doesn't work, make sure to run chmod +x first.

```bash
chmod +x ./scripts/setup.sh
./scripts/setup.sh
```

Run the server:

```bash
./scripts/run_project.sh
```

or

```bash
npm run preview
```

_Once the server is running, you can press o + Enter to open the browser, and press q + Enter to stop the server._

## Notes

- Before running the frontend, don't forget to run the backend first. Thank you.
