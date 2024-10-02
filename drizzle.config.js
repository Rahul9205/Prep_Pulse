/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://preppulse_owner:Cn6mFIO1Ekvo@ep-bitter-fire-a1vosw07.ap-southeast-1.aws.neon.tech/preppulse?sslmode=require',
    }
  };