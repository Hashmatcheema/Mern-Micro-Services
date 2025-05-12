# MERN Microservices Application

A full-stack microservices application with a React frontend, Node.js backend, and MongoDB database, deployed on Minikube using Kubernetes.

## Architecture
- **Frontend Service**: React app served by Nginx, handles UI for registration, login, forgot password, and dashboard.
- **Auth Service**: Node.js/Express service for user authentication (signup, login, forgot password, reset password) using JWT and MongoDB.
- **User Service**: Node.js/Express service for dashboard data, communicates with MongoDB.
- **Database**: MongoDB Atlas (cloud-hosted).

## Prerequisites
- Docker Desktop
- Minikube
- kubectl
- Node.js (for local development)
- MongoDB Atlas account

## Local Development
1. Clone the repository:

   git clone <repository-url>
   cd MERN-Microservices-Project

2. Set up environment variables:
  
   Copy .env files in auth-service, user-service, frontend-service and update with your MongoDB Atlas credentials.
   
3. Run with Docker Compose:

   docker-compose up --build
   
4. Access the app at http://localhost:5173.
   
5. Kubernetes Deployment

  Start Minikube:

	minikube start --driver=docker

6.Configure Minikube’s Docker environment (Windows):

	@FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env --shell cmd') DO @%i	
	
7. Build Docker images:

docker-compose build

8. Apply Kubernetes configurations:

	kubectl apply -f k8s/

9. Access the app:
NodePort: minikube service frontend-service --url (e.g., http://192.168.49.2:30080)
Ingress:
Start the tunnel: minikube tunnel
Add 192.168.49.2 mern-app.local to your hosts file
Access at http://mern-app.local
Testing
Register a user at /register.
Log in at /login.
Access the dashboard at /dashboard.
Use /forgotpassword to test password reset (email sending is mocked).