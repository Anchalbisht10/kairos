# Data.gov.in API Setup

To enable auto-scholarship updates:

1. Go to https://data.gov.in
2. Register for free account  
3. Get your API key from dashboard
4. Add to server/.env:
   DATA_GOV_API_KEY=your_key_here
5. Update scholarshipUpdater.js line 14:
   'api-key': process.env.DATA_GOV_API_KEY

The cron job runs every Sunday at midnight automatically.
Manual trigger: import { triggerManualUpdate } from './utils/scholarshipUpdater.js'