const schedule = require('node-schedule')

class Scheduler {
  constructor (action) {
    this.job = null // cron job
    this.action = action
    this.nextTick = new Date()
    this.interval = 3 // hours
  }

  setInterval (interval) {
    console.log('set interval')
    if (typeof interval === 'number') {
      this.interval = interval
    }
  }

  run () {
    const generateSchedule = () => {
      this.nextTick.setHours(this.nextTick.getHours() + this.interval)
      this.action()
      this.job = schedule.scheduleJob(this.nextTick, generateSchedule)
    }

    generateSchedule()
  }
}

module.exports = Scheduler
