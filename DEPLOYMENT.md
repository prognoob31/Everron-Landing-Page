# GitHub Pages Deployment Guide for EVERRON Landing Page

## Prerequisites
- GitHub account
- Git installed on your computer

## Step-by-Step Deployment Instructions

### 1. Initialize Git Repository (if not already done)
```bash
cd C:\Users\user\Desktop\Everrondottech
git init
git add .
git commit -m "Initial commit: EVERRON landing page"
```

### 2. Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click the **+** icon in the top right
3. Select **New repository**
4. Repository name: `Everrondottech` (or your preferred name)
5. Description: "EVERRON AI Automation Agency - Landing Page"
6. Choose **Public** (required for free GitHub Pages)
7. **Do NOT** initialize with README, .gitignore, or license
8. Click **Create repository**

### 3. Connect Local Repository to GitHub
```bash
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/Everrondottech.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### 5. Access Your Live Site
Your site will be available at:
```
https://yourusername.github.io/Everrondottech/
```

## Custom Domain (Optional)

### If you want to use your own domain (e.g., everron.tech):

1. **In GitHub:**
   - Go to Settings > Pages
   - Under "Custom domain", enter: `www.everron.tech`
   - Click Save

2. **In your domain registrar (e.g., Namecheap, GoDaddy):**
   Add these DNS records:
   ```
   Type: CNAME
   Host: www
   Value: yourusername.github.io
   
   Type: A (add all 4)
   Host: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

3. Wait 24-48 hours for DNS propagation

## Making Updates

After making changes to your site:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your site within 1-2 minutes.

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after first deployment
- Check Settings > Pages to see deployment status
- Ensure repository is Public

### 404 Error?
- Verify the repository name matches the URL
- Check that `index.html` is in the root directory
- Clear your browser cache

### Changes not showing?
- Wait 1-2 minutes for GitHub to rebuild
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you pushed to the `main` branch

## Important Notes

✅ **Files are ready for deployment** - All paths are relative
✅ **No build process needed** - Pure HTML/CSS/JS
✅ **Mobile optimized** - Responsive design included
✅ **SEO ready** - Meta tags configured

## Next Steps After Deployment

1. **Update Contact Info** in `index.html`:
   - Line 301: Email address
   - Line 303: WhatsApp link (already updated to your number)

2. **Connect Form** in `js/form-validation.js`:
   - Replace the simulated API call with your actual backend
   - Consider using: Formspree, Netlify Forms, or your own API

3. **Add Analytics**:
   - Google Analytics
   - Facebook Pixel
   - Other tracking tools

4. **Test Everything**:
   - Form submission
   - All links
   - Mobile responsiveness
   - Cross-browser compatibility

## Support

If you encounter any issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Verify all files are committed and pushed
3. Check browser console for errors

---

Good luck with your deployment! 🚀
