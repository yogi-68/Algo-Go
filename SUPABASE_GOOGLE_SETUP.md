# Fix Google OAuth "Provider Not Enabled" Error

## 🚨 Error: `{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}`

This error means Google OAuth is not properly configured in your Supabase project. Follow these steps to fix it:

## 🔧 Step-by-Step Fix

### 1. Enable Google Provider in Supabase

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Navigate to Authentication Settings**
   - Click on "Authentication" in the left sidebar
   - Click on "Providers" tab

3. **Enable Google Provider**
   - Find "Google" in the list of providers
   - Toggle the switch to **"Enabled"**
   - You should see configuration fields appear

### 2. Get Google OAuth Credentials

If you don't have Google OAuth credentials yet:

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity" API

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/callback` (for development)
   
   **⚠️ IMPORTANT**: Replace `your-project-ref` with your actual Supabase project reference!

4. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Keep these secure!

### 3. Configure Supabase Google Provider

Back in your Supabase dashboard:

1. **Enter Google Credentials**
   - **Client ID**: Paste your Google Client ID
   - **Client Secret**: Paste your Google Client Secret

2. **Set Redirect URL**
   - The redirect URL should be: `https://your-project-ref.supabase.co/auth/v1/callback`
   - This is automatically set by Supabase

3. **Save Configuration**
   - Click "Save" or "Update" to save the configuration

### 4. Configure OAuth Consent Screen

In Google Cloud Console:

1. **Go to OAuth Consent Screen**
   - Navigate to "APIs & Services" → "OAuth consent screen"

2. **Configure Consent Screen**
   - Choose "External" user type
   - Fill in required fields:
     - App name: "Algo-Go" (or your app name)
     - User support email: Your email
     - Developer contact: Your email

3. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Add these scopes:
     - `email`
     - `profile`
     - `openid`

4. **Add Test Users** (for development)
   - Add your email address as a test user
   - This allows you to test OAuth during development

### 5. Update Site URL in Supabase

1. **Go to Authentication Settings**
   - In Supabase dashboard: "Authentication" → "URL Configuration"

2. **Set Site URL**
   - **Development**: `http://localhost:5173`
   - **Production**: `https://yourdomain.com`

3. **Add Redirect URLs**
   - Add your app's redirect URLs:
     - `http://localhost:5173/auth/callback`
     - `https://yourdomain.com/auth/callback`

### 6. Test the Configuration

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Test Google Login**
   - Go to your app
   - Click "Continue with Google"
   - You should be redirected to Google's OAuth consent screen
   - After authorization, you should be redirected back to your app

## 🔍 Troubleshooting

### Still Getting the Error?

1. **Check Provider Status**
   - Go to Supabase → Authentication → Providers
   - Make sure Google is **enabled** (toggle should be green)

2. **Verify Credentials**
   - Double-check Client ID and Client Secret are correct
   - Make sure there are no extra spaces or characters

3. **Check Redirect URLs**
   - In Google Cloud Console, verify redirect URIs include:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
   - In Supabase, verify Site URL and redirect URLs are set

4. **Clear Browser Cache**
   - Sometimes cached auth state can cause issues
   - Try in an incognito/private window

### Common Issues:

1. **"redirect_uri_mismatch"** ⚠️ **MOST COMMON ERROR**
   - **Problem**: The redirect URI in Google Console doesn't match what Supabase sends
   - **Solution**: 
     - Go to Google Cloud Console → Credentials → Your OAuth Client
     - In "Authorized redirect URIs", add EXACTLY:
       - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
     - Replace `YOUR-PROJECT-REF` with your actual Supabase project reference
     - Find your project reference in Supabase Dashboard → Settings → General
     - Example: If your Supabase URL is `https://abcdefgh.supabase.co`, then use `https://abcdefgh.supabase.co/auth/v1/callback`

2. **"invalid_client"**
   - Verify Client ID and Secret are correct
   - Check that the OAuth consent screen is configured

3. **"access_denied"**
   - Make sure the OAuth consent screen is published
   - Add test users if in testing mode

## 🚀 Quick Test

After configuration, test with this simple flow:

1. Click "Continue with Google" in your app
2. You should see Google's consent screen
3. After clicking "Allow", you should be redirected back to your app
4. You should be logged in automatically

## 📱 Production Deployment

When deploying to production:

1. **Update Google Cloud Console**
   - Add your production domain to authorized origins
   - Add production redirect URI

2. **Update Supabase**
   - Update Site URL to production domain
   - Add production redirect URLs

3. **Test in Production**
   - Verify Google OAuth works on your live site

## ✅ Success Indicators

You'll know it's working when:
- ✅ Google provider shows as "Enabled" in Supabase
- ✅ Clicking "Continue with Google" redirects to Google
- ✅ After authorization, you're logged into your app
- ✅ No more "provider is not enabled" errors

## 🆘 Still Having Issues?

If you're still getting errors:

1. **Check Supabase Logs**
   - Go to Supabase → Logs
   - Look for authentication errors

2. **Verify Environment Variables**
   - Make sure your `.env.local` has correct Supabase URL and key

3. **Test with Demo Account**
   - Use the demo credentials to ensure basic auth works
   - This isolates the issue to Google OAuth specifically

The error should be resolved once you enable the Google provider in Supabase and configure it with valid Google OAuth credentials! 🎉
