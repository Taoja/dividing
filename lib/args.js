const args = process.argv

module.exports = {
  isDev: args.includes('development'),
  type: args.includes('single') ? 'single' : 'multi',
  dashboard: args.includes('dashboard')
}