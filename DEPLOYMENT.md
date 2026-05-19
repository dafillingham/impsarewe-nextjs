# Deployment Guide - IONOS VPS

This guide explains how to deploy the Next.js application to IONOS VPS with Ubuntu 24.04.

## Prerequisites

- IONOS VPS M+ (Linux Ubuntu 24.04)
- Node.js 22+ installed
- Git installed
- Your domain pointing to the VPS IP

## Step 1: Connect to VPS

```bash
ssh root@your-vps-ip
```

## Step 2: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install Certbot (SSL certificates)
apt install -y certbot python3-certbot-nginx
```

## Step 3: Clone Repository

```bash
cd /var/www
git clone https://github.com/yourusername/impsarewe.git
cd impsarewe
```

## Step 4: Install Project Dependencies

```bash
pnpm install
```

## Step 5: Set Environment Variables

```bash
# Create .env.local file
nano .env.local
```

Add the following:

```
DATABASE_URL=mysql://user:password@host:3306/impsarewe
JWT_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://impsarewe.com
```

## Step 6: Build Project

```bash
pnpm build
```

## Step 7: Start with PM2

```bash
# Start the application
pm2 start "pnpm start" --name "impsarewe"

# Save PM2 configuration
pm2 save

# Enable PM2 startup
pm2 startup
```

## Step 8: Configure Nginx

Create `/etc/nginx/sites-available/impsarewe`:

```nginx
server {
    server_name impsarewe.com www.impsarewe.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/impsarewe /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Step 9: Setup SSL Certificate

```bash
certbot --nginx -d impsarewe.com -d www.impsarewe.com
```

## Step 10: Verify Deployment

Visit `https://impsarewe.com` in your browser. Your site should be live!

## Monitoring

```bash
# View logs
pm2 logs impsarewe

# Monitor processes
pm2 monit

# Restart application
pm2 restart impsarewe

# Stop application
pm2 stop impsarewe
```

## Updating

When you push updates to GitHub:

```bash
cd /var/www/impsarewe
git pull origin main
pnpm install
pnpm build
pm2 restart impsarewe
```

## Troubleshooting

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Nginx not working
```bash
nginx -t  # Test configuration
systemctl status nginx
```

### Database connection error
- Verify DATABASE_URL is correct
- Check MySQL is accessible from VPS
- Ensure firewall allows port 3306

### SSL certificate issues
```bash
certbot renew --dry-run  # Test renewal
```
