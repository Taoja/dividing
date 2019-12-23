const args = process.argv

module.exports = {
  isDev: args.includes('development'),
  dashboard: args.includes('dashboard')
}