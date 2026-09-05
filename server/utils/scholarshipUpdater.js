import cron from 'node-cron'
import axios from 'axios'
import Scholarship from '../models/Scholarship.model.js'

// NSP API endpoints - Government of India open data
const NSP_BASE = 'https://scholarships.gov.in'

// This runs every Sunday at midnight
export function startScholarshipUpdater() {
  console.log('✅ Scholarship auto-updater scheduled — runs every Sunday midnight')

  cron.schedule('0 0 * * 0', async () => {
    console.log('🔄 Running weekly scholarship check...')
    await checkForNewScholarships()
  })
}

async function checkForNewScholarships() {
  try {
    // Check NSP for new scholarships via their open API
    const response = await axios.get(
      'https://api.data.gov.in/resource/a0e5f8b5-ef35-4ddd-8e75-9f0dc4fc15c4',
      {
        params: {
          'api-key': 'your_data_gov_key', // free from data.gov.in
          format: 'json',
          limit: 100,
        },
        timeout: 10000,
      }
    )

    if (response.data?.records) {
      let added = 0
      for (const record of response.data.records) {
        // Check if already exists
        const exists = await Scholarship.findOne({
          title: record.scheme_name,
        })

        if (!exists && record.scheme_name) {
          await Scholarship.create({
            title:        record.scheme_name || 'Unknown Scheme',
            provider:     record.ministry   || 'Government of India',
            providerType: 'Central Government',
            eligibility: {
              states:        ['All India'],
              categories:    [],
              genderSpecific:'All',
            },
            amount:          0,
            amountDesc:      'Check official portal for amount',
            deadline:        record.last_date || 'Check official portal',
            applicationLink: 'https://scholarships.gov.in',
            description:     record.scheme_name,
            tags:            ['auto-updated', 'central-government', 'all-india'],
            isActive:        true,
          })
          added++
        }
      }
      console.log(`✅ Scholarship check complete — ${added} new scholarships added`)
    }
  } catch (error) {
    // Silent fail — don't crash server if API is down
    console.log('ℹ️ NSP API check skipped this week — will retry next Sunday')
  }
}

// Manual trigger for testing
export async function triggerManualUpdate() {
  console.log('🔄 Manual scholarship update triggered...')
  await checkForNewScholarships()
}