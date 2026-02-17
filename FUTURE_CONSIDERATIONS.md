# Coke Logger - Future Considerations & Questions

## Privacy & Social Features

### User Profiles
**Question:** Should we create a public profile page for each user showing their public logs?
- Example URL: `/profile/[username]`
- Would display: user's public logs, stats, join date, etc.
- **Considerations:** 
  - Privacy implications
  - What information should be visible?
  - Should users be able to customize their profile?

### Public Feed Filtering
**Question:** Should the public feed allow filtering?
- **Filter options:**
  - By coke type (original, zero, light)
  - By format (glass, can, plastic)
  - By date range
  - By user
- **Considerations:**
  - UI/UX for filter controls
  - Performance with large datasets
  - Save filter preferences?

### Privacy Bulk Actions
**Question:** Should users be able to bulk toggle privacy?
- **Examples:**
  - "Make all my logs public"
  - "Make all my logs private"
  - "Make all logs from [date range] public"
- **Considerations:**
  - Accidental bulk changes (need confirmation?)
  - Undo functionality?

### Default Privacy Preference
**Question:** Should users have a setting to change their default privacy preference?
- **Current:** Always defaults to private (safer)
- **Option:** User setting to choose default (public or private)
- **Considerations:**
  - User settings page needed
  - Store preference in user profile/settings table

### Activity Tracking
**Question:** Do you want to track when logs are made public?
- **Potential features:**
  - Activity feed ("User X shared a new log")
  - Follows/followers system
  - Likes/reactions on public logs
  - Comments on public logs
- **Considerations:**
  - Additional database tables needed
  - Notification system
  - Complexity vs value

### Username Management
**Question:** Should we rate-limit username changes?
- **Current:** Users can change username anytime
- **Options:**
  - Limit changes (e.g., once per month)
  - Charge a "cost" (if gamification added)
  - Keep history of username changes
- **Considerations:**
  - Links to profiles break if username changes
  - Consider using user ID in URLs with username for display only

---

## Statistics & Analytics

### Personal Statistics
**Ideas for user dashboard:**
- Total cokes consumed
- Favorite type (original, zero, light)
- Favorite format (glass, can, plastic)
- Most common size
- Consumption trends over time
- Daily/weekly/monthly averages
- Streak tracking (consecutive days logging)

### Public Statistics
**Global/community stats:**
- Most popular coke type
- Most popular format
- Average consumption per user
- Leaderboards (most logs, biggest consumer, etc.)
- Trending preferences over time

---

## Data Visualization

### Charts & Graphs
- Line chart: consumption over time
- Bar chart: type distribution
- Pie chart: format preferences
- Heatmap: consumption by day of week/hour
- Comparison charts: you vs community average

---

## Export & Backup

### Export Features
- Export personal data as JSON
- Export as CSV (for spreadsheet analysis)
- Generate PDF reports
- Email digests (weekly/monthly summary)

---

## Gamification

### Achievement System
- Badges for milestones (10 logs, 100 logs, etc.)
- Special badges (tried all types, all formats, etc.)
- Consecutive day streaks
- Community challenges

---

## Mobile & UX

### Progressive Web App (PWA)
- Install as mobile app
- Offline support
- Push notifications
- Camera integration (photo upload)

### Quick Log Entry
- One-tap logging with defaults
- Voice input
- Recent entries quick-repeat

---

## Data Quality

### Validation Enhancements
- Warn on unusually large sizes
- Suggest common sizes based on format
- Auto-complete for notes (common locations, occasions)

### Data Cleaning
- Duplicate detection
- Outlier flagging
- Data correction suggestions

---

## Integration

### Third-party Integrations
- Calendar integration (add to calendar)
- Health app integration (track sugar intake)
- Social media sharing
- API for external apps

---

## Current Implementation Status

### ✅ Completed Features
- User authentication (email/password)
- Username system (unique, changeable)
- Coke log schema with privacy control
- Full CRUD operations for coke logs
- Public/private log toggle
- Public feed for community
- Validation (Zod schemas)
- Database migrations applied
- Type-safe implementation

### 📋 Schema Details

**User Table:**
- `id` (primary key)
- `name` (display name)
- `email` (unique)
- `username` (unique, required)
- `emailVerified`
- `image`
- `createdAt`, `updatedAt`

**Coke Log Table:**
- `id` (primary key)
- `userId` (foreign key → user.id)
- `cokeType` (original, zero, light)
- `format` (glass, can, plastic)
- `sizeML` (integer)
- `notes` (max 250 characters)
- `isPublic` (boolean, default: false)
- `consumedAt` (timestamp, validated: not future)
- `createdAt`, `updatedAt`

**Indexes:**
- `coke_log.userId`
- `coke_log.consumedAt`
- `coke_log.isPublic`

### 🎯 Next Immediate Steps

1. **UI Implementation:**
   - Create signup form with username field
   - Create coke log entry form
   - Create dashboard to view user's logs
   - Create public feed page

2. **Update Existing UI:**
   - Add username field to signup flow
   - Update any existing forms

3. **Settings Page:**
   - Allow username changes
   - Privacy preferences
   - Account management

---

## Notes

- Keep privacy-first approach (default to private)
- Consider scalability for public feed (pagination, caching)
- Think about moderation if building social features
- Username changes could break links (consider using user ID in URLs)
- Size presets: [250, 330, 375, 500, 600, 1000, 1500, 2000] ml
- Future dates are blocked for `consumedAt`
- Hard delete strategy (no soft deletes)
