import schedule from "node-schedule";

export function scheduleTask(targetDate: Date, task: () => void) {
  const oneWeekBefore = new Date(targetDate.getTime());
  oneWeekBefore.setDate(targetDate.getDate() - 7);

  schedule.scheduleJob(oneWeekBefore, () => {
    console.log("7일 전 알림 실행");
    task();
  });
}

export function threeDaysBeforeSchedule(targetDate: Date, task: () => void) {
  const threeDaysBefore = new Date(targetDate.getTime());
  threeDaysBefore.setDate(targetDate.getDate() - 3);

  schedule.scheduleJob(threeDaysBefore, () => {
    console.log("3일 전 알림 실행");
    task();
  });
}

export function oneHourBeforeSchedule(targetDate: Date, task: () => void) {
  const oneHourBefore = new Date(targetDate.getTime());
  oneHourBefore.setHours(targetDate.getHours() - 1);

  schedule.scheduleJob(oneHourBefore, () => {
    console.log("1시간 전 알림 실행");
    task();
  });
}
