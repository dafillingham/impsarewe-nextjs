# GitHub Actions Setup

Guide to configure GitHub Actions for automatic deployment to IONOS VPS.

## Step 1: Generate SSH Key

On your local machine:

```bash
# Generate SSH key (no passphrase)
ssh-keygen -t ed25519 -f ~/.ssh/ionos_deploy -N ""

# Get the private key
cat ~/.ssh/ionos_deploy
```

## Step 2: Add SSH Key to VPS

On your VPS:

```bash
# Login to VPS
ssh root@your-vps-ip

# Create .ssh directory
mkdir -p ~/.ssh

# Add public key
echo "your-public-key-content" >> ~/.ssh/authorized_keys

# Set permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the following secrets:

### VPS_HOST
- **Value:** Your VPS IP address
- **Example:** `123.45.67.89`

### VPS_USER
- **Value:** SSH username (usually `root`)
- **Example:** `root`

### VPS_SSH_KEY
- **Value:** Private SSH key content
- **Example:** Copy the entire content of `~/.ssh/ionos_deploy`

### DATABASE_URL
- **Value:** MySQL connection string
- **Example:** `mysql://user:password@host:3306/impsarewe`

### JWT_SECRET
- **Value:** A random secret key
- **Example:** Generate with: `openssl rand -base64 32`

## Step 4: Test Deployment

1. Make a small change to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```

3. Go to GitHub → Actions tab
4. Watch the deployment workflow run
5. Verify your site is updated at `https://impsarewe.com`

## Step 5: Monitor Deployments

### View Logs
1. Go to GitHub → Actions
2. Click on the latest workflow run
3. Click on "deploy" job to see logs

### Common Issues

**SSH Connection Failed**
- Verify VPS_HOST is correct
- Check VPS_SSH_KEY is valid
- Ensure SSH key is added to VPS

**Build Failed**
- Check build logs in GitHub Actions
- Verify DATABASE_URL is correct
- Ensure all dependencies are listed

**Deployment Failed**
- Check VPS has enough disk space: `df -h`
- Verify PM2 is running: `pm2 list`
- Check application logs: `pm2 logs impsarewe`

## Step 6: Manual Deployment (if needed)

If GitHub Actions fails, deploy manually:

```bash
# SSH into VPS
ssh root@your-vps-ip

# Navigate to project
cd /var/www/impsarewe

# Pull latest code
git pull origin main

# Install dependencies
pnpm install

# Build
pnpm build

# Restart application
pm2 restart impsarewe
```

## Troubleshooting

### "Permission denied (publickey)"
- SSH key not properly added to VPS
- Check authorized_keys permissions: `chmod 600 ~/.ssh/authorized_keys`

### "npm: command not found"
- Node.js not installed on VPS
- Run: `apt install -y nodejs npm`

### "pnpm: command not found"
- pnpm not installed globally
- Run: `npm install -g pnpm`

### Application not starting
- Check PM2 logs: `pm2 logs impsarewe`
- Check port 3000 is available: `lsof -i :3000`
- Verify environment variables are set

## Next Steps

1. ✅ Add SSH key to VPS
2. ✅ Add GitHub secrets
3. ✅ Test deployment
4. ✅ Monitor first deployment
5. ✅ Set up SSL certificate (automatic with Certbot)

Your deployment pipeline is now ready! 🚀
