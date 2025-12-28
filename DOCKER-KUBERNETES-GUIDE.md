# Docker & Kubernetes Deployment Guide

## 🐳 Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Quick Start with Docker Compose

1. **Build and Run all services**:
```bash
cd nextin-fullstack
docker-compose up -d
```

2. **Access the application**:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

3. **View logs**:
```bash
docker-compose logs -f
```

4. **Stop services**:
```bash
docker-compose down
```

5. **Rebuild after changes**:
```bash
docker-compose up -d --build
```

### Build Individual Images

**Backend**:
```bash
cd backend
docker build -t nextin-backend:latest .
```

**Frontend**:
```bash
cd frontend
docker build -t nextin-frontend:latest .
```

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl installed and configured
- Docker images built and pushed to registry

### Deploy to Kubernetes

1. **Create namespace**:
```bash
kubectl apply -f k8s/namespace.yaml
```

2. **Deploy MongoDB**:
```bash
kubectl apply -f k8s/mongodb-deployment.yaml
```

3. **Wait for MongoDB to be ready**:
```bash
kubectl wait --for=condition=ready pod -l app=mongodb -n nextin --timeout=300s
```

4. **Deploy Backend**:
```bash
kubectl apply -f k8s/backend-deployment.yaml
```

5. **Deploy Frontend**:
```bash
kubectl apply -f k8s/frontend-deployment.yaml
```

6. **Deploy Ingress (optional)**:
```bash
kubectl apply -f k8s/ingress.yaml
```

### Tag and Push Images to Registry

For production deployment, push images to a container registry:

```bash
# Tag images
docker tag nextin-backend:latest your-registry.com/nextin-backend:latest
docker tag nextin-frontend:latest your-registry.com/nextin-frontend:latest

# Push to registry
docker push your-registry.com/nextin-backend:latest
docker push your-registry.com/nextin-frontend:latest

# Update k8s deployment files to use your registry images
```

### Monitor Deployments

```bash
# Check all resources
kubectl get all -n nextin

# Check pod status
kubectl get pods -n nextin

# View logs
kubectl logs -f deployment/backend -n nextin
kubectl logs -f deployment/frontend -n nextin

# Describe pod for troubleshooting
kubectl describe pod <pod-name> -n nextin
```

### Scale Deployments

```bash
# Manual scaling
kubectl scale deployment backend --replicas=5 -n nextin
kubectl scale deployment frontend --replicas=3 -n nextin

# Auto-scaling is configured via HorizontalPodAutoscaler
kubectl get hpa -n nextin
```

## 🔧 Configuration

### Environment Variables

**Backend** (k8s/backend-deployment.yaml):
- `NODE_ENV`: production
- `PORT`: 5000
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Change in production!

**MongoDB Credentials** (k8s/mongodb-deployment.yaml):
- Update `mongodb-secret` with secure credentials

### Ingress Configuration

Update `k8s/ingress.yaml`:
- Change `nextin.example.com` to your domain
- Enable TLS by uncommenting the tls section
- Create TLS secret: `kubectl create secret tls nextin-tls-secret --cert=path/to/cert.crt --key=path/to/cert.key -n nextin`

## 🚀 Real-Time Connection Features

### WebSocket Support
- Nginx ingress configured with WebSocket support
- Proxy headers set for upgrade connections
- Frontend nginx proxy passes real-time requests to backend

### Health Checks
- All services have liveness and readiness probes
- Automatic restart on failure
- Graceful degradation

### Load Balancing
- Backend: 3 replicas (auto-scales 2-10)
- Frontend: 2 replicas
- Horizontal Pod Autoscaler based on CPU/memory

## 📊 Monitoring

### Resource Limits
- **Backend**: 256Mi-512Mi RAM, 250m-500m CPU
- **Frontend**: 128Mi-256Mi RAM, 100m-200m CPU
- **MongoDB**: 512Mi-1Gi RAM, 500m-1000m CPU

### Useful Commands

```bash
# Port forward for local testing
kubectl port-forward svc/frontend-service 8080:80 -n nextin
kubectl port-forward svc/backend-service 5000:5000 -n nextin

# Execute commands in pod
kubectl exec -it <pod-name> -n nextin -- /bin/sh

# View resource usage
kubectl top pods -n nextin
kubectl top nodes

# Restart deployment
kubectl rollout restart deployment/backend -n nextin
```

## 🔐 Security Best Practices

1. **Change default passwords** in secrets
2. **Use image scanning** before deployment
3. **Enable RBAC** for access control
4. **Use network policies** to restrict pod communication
5. **Store secrets** in external vault (e.g., HashiCorp Vault)
6. **Enable pod security policies**

## 🐛 Troubleshooting

### Container won't start
```bash
kubectl describe pod <pod-name> -n nextin
kubectl logs <pod-name> -n nextin
```

### Database connection issues
```bash
# Check MongoDB is running
kubectl get pods -l app=mongodb -n nextin

# Test connection from backend pod
kubectl exec -it <backend-pod> -n nextin -- wget -O- http://mongodb-service:27017
```

### Image pull errors
- Ensure images are built: `docker images | grep nextin`
- For Kubernetes, images must be in a registry accessible to the cluster
- Use `imagePullSecrets` if using private registry

## 📦 Clean Up

**Docker**:
```bash
docker-compose down -v  # Remove volumes too
```

**Kubernetes**:
```bash
kubectl delete namespace nextin  # Deletes all resources in namespace
```

## 🎯 Production Checklist

- [ ] Change all default passwords
- [ ] Configure persistent storage for MongoDB
- [ ] Set up backup strategy for database
- [ ] Configure domain and SSL certificates
- [ ] Set up monitoring and alerting
- [ ] Configure log aggregation
- [ ] Review and adjust resource limits
- [ ] Set up CI/CD pipeline
- [ ] Configure network policies
- [ ] Enable pod security policies
