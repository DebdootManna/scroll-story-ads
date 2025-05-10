
# Instagram-Style Feed with GSAP Animated Ads

An interactive and visually engaging Instagram-style feed demo with dynamically animated advertisements using GSAP (GreenSock Animation Platform). This project showcases a realistic Instagram feed layout with parallax-animated ads similar to those found on premium websites like Apple or MetaMask.

![Instagram Feed Demo](https://placeholder.pics/svg/1200x630/DEDEDE/555555/Instagram%20Feed%20Demo)

## Features

- **Realistic Instagram Feed**: Mimics Instagram's scrolling feed layout with mock user accounts, posts, likes, comments, and timestamps
- **Dynamic Content**: Posts and ads are shuffled on each refresh to create a realistic feed experience
- **GSAP Animated Advertisements**: Scroll-aware animations that respond differently to scroll direction
- **Responsive Design**: Fully responsive layout for both mobile and desktop devices
- **Dockerized Development**: Easy local setup with Docker and Docker Compose

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animation Libraries**: GSAP (GreenSock Animation Platform)
- **Image Loading**: React Lazy Load Image Component
- **Icons**: Lucide React
- **Development**: Vite
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Git](https://git-scm.com/downloads) for cloning the repository

### Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd instagram-feed-demo
```

2. Start the application with Docker Compose
```bash
docker-compose up
```

3. Open your browser and visit [http://localhost:3000](http://localhost:3000)

### Development without Docker

If you prefer to run the application without Docker:

1. Make sure you have Node.js (v16 or later) installed
2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit [http://localhost:8080](http://localhost:8080)

## Project Structure

- `src/components/`: React components including Feed, Post, and Ad components
- `src/data/`: Data models and mock data generation
- `src/styles/`: CSS styles for Instagram-like UI
- `src/pages/`: Page components for routing
- `public/`: Static assets and images

## Deployment

### Production Docker Deployment

To deploy this application in a production environment using Docker:

1. Build the production Docker image
```bash
docker build -t instagram-feed-app:production --target production .
```

2. Run the container
```bash
docker run -d -p 80:80 --name instagram-feed instagram-feed-app:production
```

The application will be available at `http://your-server-ip`.

### Deploying to a Cloud Provider

#### AWS Elastic Container Service (ECS)

1. Push your Docker image to Amazon ECR
```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker tag instagram-feed-app:production <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/instagram-feed-app:latest
docker push <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/instagram-feed-app:latest
```

2. Create an ECS cluster and service using the AWS Management Console or CLI

#### Using Docker with Nginx as a Reverse Proxy

For production environments, you may want to use Nginx as a reverse proxy:

1. Create a `docker-compose.prod.yml` file:

```yaml
version: "3.8"
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    restart: always
    environment:
      - NODE_ENV=production
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - web
    restart: always
```

2. Run with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Customization

### Adding New Ad Types

1. Create a new ad component in `src/components/ads/`
2. Add the new ad type to the `Ad` component switch statement
3. Update the mock data generator to include your new ad type

### Modifying Animation Effects

The GSAP animations are primarily defined in the ad components. Customize them by modifying:

- The ScrollTrigger configuration
- Animation timelines
- The element transformations and effects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
