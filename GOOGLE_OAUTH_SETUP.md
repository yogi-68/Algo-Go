# Google OAuth Setup Guide

## 🚀 Quick Setup for Google Login

### 1. Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click on the project dropdown at the top
   - Create a new project or select an existing one
   - Give it a name like "Algo-Go Authentication"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity" API

### 2. Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth Consent Screen**
   - If prompted, configure the OAuth consent screen first
   - Choose "External" user type
   - Fill in required fields:
     - App name: "Algo-Go"
     - User support email: Your email
     - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email) for development

3. **Create OAuth Client**
   - Application type: "Web application"
   - Name: "Algo-Go Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:5173/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)

4. **Save Credentials**
   - Copy the Client ID and Client Secret
   - Keep these secure!

### 3. Supabase Configuration

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to "Authentication" → "Providers"

2. **Enable Google Provider**
   - Find "Google" in the list
   - Toggle it to "Enabled"
   - Enter your Google OAuth credentials:
     - Client ID: (from Google Cloud Console)
     - Client Secret: (from Google Cloud Console)
   - Set redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

3. **Configure Site URL**
   - Go to "Authentication" → "URL Configuration"
   - Set Site URL to your domain
   - Add redirect URLs for your app

### 4. Environment Variables

Update your `.env.local` file:

```env
# Existing Supabase variables
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google OAuth (optional - mainly for reference)
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 5. Test the Integration

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test Google Login**
   - Go to your app
   - Click "Continue with Google"
   - You should be redirected to Google's OAuth flow
   - After authorization, you'll be redirected back to your app

### 6. Production Deployment

1. **Update Google Cloud Console**
   - Add your production domain to authorized origins
   - Add production redirect URI

2. **Update Supabase**
   - Update Site URL to production domain
   - Add production redirect URLs

3. **Deploy your app**
   - Make sure environment variables are set in production

## 🔧 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that redirect URIs in Google Console match exactly
   - Include both HTTP (dev) and HTTPS (prod) versions

2. **"invalid_client" Error**
   - Verify Client ID and Secret are correct
   - Check that the OAuth consent screen is configured

3. **"access_denied" Error**
   - Make sure the OAuth consent screen is published
   - Add test users if in testing mode

4. **Supabase Redirect Issues**
   - Verify the redirect URL in Supabase matches your app
   - Check that the OAuth callback route is set up

### Development vs Production:

- **Development**: Use `http://localhost:5173`
- **Production**: Use your actual domain with HTTPS
- **Supabase**: Always uses HTTPS for callbacks

## 📱 Mobile Considerations

If you plan to add mobile support later:

1. **Create additional OAuth clients** for iOS/Android
2. **Use different redirect URIs** for mobile apps
3. **Consider using Supabase's mobile SDKs**

## 🔒 Security Best Practices

1. **Never expose Client Secret** in frontend code
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** in production
4. **Regularly rotate** OAuth credentials
5. **Monitor OAuth usage** in Google Cloud Console

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)

## 🎯 Next Steps

After setting up Google OAuth:

1. **Test thoroughly** in both development and production
2. **Add other providers** (GitHub, Discord, etc.) if needed
3. **Implement user profile sync** from Google data
4. **Add social login analytics** to track usage
5. **Consider adding** profile picture sync from Google

Your Google OAuth integration is now ready! 🎉
