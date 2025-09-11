# Admin Panel Setup & Usage Guide

## 🔐 **Admin Functionality Overview**

Your app now includes a comprehensive admin panel that allows administrators to:

- ✅ **View all registered users**
- ✅ **Delete user accounts and their data**
- ✅ **Monitor user progress on problems**
- ✅ **Delete individual progress records**
- ✅ **View platform statistics**
- ✅ **Manage user roles**

## 🚀 **How to Access Admin Panel**

### **Method 1: Demo Account (Immediate)**
1. Login with: `demo@algogo.com` / `demo123`
2. The demo user has admin privileges by default
3. Click "Admin" in the navigation bar

### **Method 2: Make Real User Admin**
1. Create a new account through the signup form
2. Go to your Supabase SQL Editor
3. Run this command (replace with your email):
   ```sql
   SELECT make_user_admin('your-email@example.com');
   ```
4. Log out and log back in
5. You'll see the "Admin" link in navigation

## 📊 **Admin Panel Features**

### **Statistics Tab**
- Total registered users
- Total problems in database
- Total problem completions
- Active users (last 30 days)

### **Users Tab**
- View all registered users
- See registration dates and last login
- Check email verification status
- **Delete users** (with confirmation)
- Search users by email

### **User Progress Tab**
- Monitor all user progress records
- See which problems users are working on
- Track completion status and attempts
- **Delete progress records** (with confirmation)
- Search by problem name or user ID

## 🗑️ **Record Deletion Capabilities**

### **Delete Users**
- Removes user from authentication system
- Automatically deletes all associated progress records
- Requires confirmation dialog
- Cannot be undone

### **Delete Progress Records**
- Removes individual user progress entries
- Useful for resetting specific user-problem combinations
- Requires confirmation dialog
- Cannot be undone

## ⚠️ **Security Notes**

1. **Admin Role Required**: Only users with `role: 'admin'` can access the panel
2. **Confirmation Dialogs**: All delete operations require confirmation
3. **Audit Trail**: All admin actions are logged in browser console
4. **Fallback Handling**: Admin functions gracefully handle Supabase connection issues

## 🔧 **Technical Implementation**

### **API Methods Added**
```typescript
// User Management
apiService.getAllUsers()          // Get all users
apiService.deleteUser(userId)     // Delete user & progress
apiService.updateUserRole(userId, role) // Change user role

// Progress Management  
apiService.getAllUserProgress()   // Get all progress records
apiService.deleteUserProgress(id) // Delete specific progress

// Statistics
apiService.getAdminStats()        // Get platform statistics
```

### **Database Functions**
```sql
-- Make user admin
SELECT make_user_admin('email@example.com');
```

## 🎯 **Quick Start**

1. **Login as demo user**: `demo@algogo.com` / `demo123`
2. **Click "Admin"** in the top navigation
3. **Explore the three tabs**: Statistics, Users, User Progress
4. **Test deletion** (be careful - demo data will be restored on refresh)

## 🛡️ **Admin Best Practices**

1. **Always confirm** before deleting users or progress
2. **Use search** to find specific records quickly
3. **Monitor statistics** to track platform usage
4. **Back up data** before bulk operations (if needed)
5. **Test with demo account** before using on real data

## 🔄 **Demo vs Production**

- **Demo Account**: Full admin access for testing
- **Real Users**: Need to be promoted to admin via SQL
- **Local Data**: Deletions only affect database, not local fallback data
- **Supabase Required**: Admin functions require active Supabase connection

The admin panel is now ready to use! Start with the demo account to explore all features safely.
