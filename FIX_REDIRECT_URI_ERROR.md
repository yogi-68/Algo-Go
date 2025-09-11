# 🚨 Fix "redirect_uri_mismatch" Error

## Error: `Error 400: redirect_uri_mismatch`

This error means the redirect URI in your Google OAuth configuration doesn't match what Supabase is sending.

## 🔧 Quick Fix (2 minutes)

### Step 1: Find Your Supabase Project Reference

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Get Your Project Reference**
   - Go to "Settings" → "General"
   - Look for "Reference ID" or check your project URL
   - Example: If your URL is `https://abcdefgh.supabase.co`, then `abcdefgh` is your project reference

### Step 2: Update Google Cloud Console

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Select your project

2. **Edit OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click on your OAuth 2.0 Client ID

3. **Fix Redirect URIs**
   - In "Authorized redirect URIs" section
   - **Remove** any incorrect URIs
   - **Add** the correct URI:
     ```
     https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
     ```
   - Replace `YOUR-PROJECT-REF` with your actual project reference
   - Example: `https://abcdefgh.supabase.co/auth/v1/callback`

4. **Save Changes**
   - Click "Save" at the bottom

### Step 3: Test Again

1. **Clear browser cache** (or use incognito mode)
2. **Try Google login again**
3. **Should work now!** ✅

## 📋 Common Mistakes

### ❌ Wrong Redirect URIs:
- `https://your-project-ref.supabase.co/auth/v1/callback` (placeholder text)
- `http://localhost:3000/auth/callback` (wrong port)
- `https://supabase.co/auth/v1/callback` (missing project reference)

### ✅ Correct Redirect URI:
- `https://abcdefgh.supabase.co/auth/v1/callback` (actual project reference)

## 🔍 How to Find Your Project Reference

### Method 1: Supabase Dashboard
1. Go to Supabase Dashboard → Your Project
2. Go to Settings → General
3. Look for "Reference ID"

### Method 2: From Your Environment Variables
Check your `.env.local` file:
```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
```
The project reference is `abcdefgh`

### Method 3: From Your Supabase URL
If your Supabase URL is `https://abcdefgh.supabase.co`, then `abcdefgh` is your project reference.

## 🚀 Complete Example

Let's say your Supabase project URL is `https://myproject123.supabase.co`:

1. **Your project reference**: `myproject123`
2. **Correct redirect URI**: `https://myproject123.supabase.co/auth/v1/callback`
3. **Add this exact URI** to Google Cloud Console → Credentials → OAuth Client → Authorized redirect URIs

## ⚡ Still Not Working?

1. **Double-check the URI** - it must be EXACTLY right
2. **Wait 5-10 minutes** - Google changes can take time to propagate
3. **Clear browser cache** completely
4. **Try in incognito/private window**
5. **Check Supabase logs** for any additional errors

## 🎯 Success Indicators

You'll know it's fixed when:
- ✅ No more "redirect_uri_mismatch" error
- ✅ Google OAuth consent screen appears
- ✅ After clicking "Allow", you're redirected back to your app
- ✅ You're automatically logged in

The redirect URI must match EXACTLY - even a single character difference will cause this error! 🎯
