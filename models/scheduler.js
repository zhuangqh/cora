const schedule = require('node-schedule')

class Scheduler {
  constructor (action) {
    this.job = null // cron job
    this.action = action
    this.nextTick = new Date()
    this.interval = 3 // minute
  }

  setInterval (interval) {
    if (typeof interval === 'number') {
      this.interval = interval
    }
  }

  run () {
    const generateSchedule = () => {
      this.nextTick.setHours(this.nextTick.getHours() + this.interval)
      this.job = schedule.scheduleJob(this.nextTick, generateSchedule)
    }

    generateSchedule()
  }
}

module.exports = Scheduler
