
export const JOB_QUEUES = { // DA RIVEDERE
  // User-related jobs
  USER_CREATED: 'user.created',
  
  //USER_DELETED: 'user.deleted',
  USER_PASSWORD_RESET: 'user.password-reset',
  USER_EMAIL_VERIFICATION: 'user.email-verification',
  
  // Device-related jobs
  DEVICE_ASSIGNED: 'device.assigned',
 //DEVICE_RETURNED: 'device.returned',
  //DEVICE_MAINTENANCE: 'device.maintenance',
  
  // Assignment-related jobs
  //ASSIGNMENT_REMINDER: 'assignment.reminder',
  //ASSIGNMENT_EXPIRING: 'assignment.expiring',
  //ASSIGNMENT_EXPIRED: 'assignment.expired',
  
  // Email jobs
  //EMAIL_SEND: 'email.send',
  //EMAIL_BULK: 'email.bulk',
  
  // Reporting
  //REPORT_DAILY: 'report.daily',
  //REPORT_MONTHLY: 'report.monthly',
  
  // Cleanup
  //CLEANUP_OLD_DATA: 'cleanup.old-data',
  //CLEANUP_ASSIGNMENTS: 'cleanup.assignments',
} as const;

// Job options configurations
export const JOB_OPTIONS = {
  // Retry configuration
  RETRY_DEFAULT: {
    retryLimit: 3,
    retryDelay: 60, // secondi
    retryBackoff: true,
  },
  
  // Email jobs (più retry)
  RETRY_EMAIL: {
    retryLimit: 5,
    retryDelay: 120,
    retryBackoff: true,
  },
  
  // Critical jobs (no retry)
  NO_RETRY: {
    retryLimit: 0,
  },
  
  // Expiration
  EXPIRE_1_HOUR: {
    expireInSeconds: 3600,
  },
  
  EXPIRE_1_DAY: {
    expireInSeconds: 86400,
  },
} as const;