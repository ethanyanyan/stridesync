# StrideSync

StrideSync is a comprehensive platform designed for coaches to create and manage long-distance running training plans for their athletes. The platform supports both web and mobile applications, providing flexibility and accessibility for users.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Customizable Training Plans:** Coaches can create, edit, and manage training plans tailored to each athlete's needs.
- **Athlete Management:** Coaches can manage athlete profiles and track their progress over time.
- **Interactive Calendar:** Training sessions are displayed in an interactive calendar for easy scheduling and tracking.
- **Notifications:** Athletes receive notifications for upcoming training sessions and plan updates.
- **Performance Tracking:** Track and analyze athlete performance metrics and progress.
- **Multi-Platform Access:** Available on both web and mobile platforms for convenience.

## Tech Stack

- **Frontend:**
  - Mobile: React Native
  - Web: React
- **Backend:**
  - Framework: Gin (Go)
  - Database: PostgreSQL
- **Authentication:** Firebase Authentication
- **Hosting:**
  - Web: Vercel
  - Mobile: Expo
- **APIs:**
  - RESTful API for data communication between frontend and backend

## Installation

### Prerequisites

- Node.js and npm
- Go
- PostgreSQL

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stridesync.git
   cd stridesync

2. Install Go dependencies:

    ```bash
    go mod download

3. Set up PostgreSQL database and configure environment variables:

    ```bash
    export DB_HOST=your_db_host
    export DB_PORT=your_db_port
    export DB_USER=your_db_user
    export DB_PASSWORD=your_db_password
    export DB_NAME=your_db_name

4. Run the backend server:

    ```bash
    go run main.go

### Frontend Setup

#### Web

1. Navigate to the web directory:

    ```bash
    cd web

2. Install npm dependencies:

    ```bash
    npm install

3. Run the web application:

    ```bash
    npm start

#### Mobile

1. Navigate to the mobile directory:

    ```bash
    cd mobile

2. Install npm dependencies:

    ```bash
    npm install

3. Start the mobile application:

    ```bash
    expo start

## Usage

1. Sign up as a coach and create your profile.
2. Add athletes to your profile and create individualized training plans.
3. Athletes can view their training plans, receive notifications, and track their progress.
4. Use the interactive calendar to manage and schedule training sessions.

## Contributing

We welcome contributions to improve StrideSync. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or inquiries, please contact me at ethanyan01@gmail.com.
