const { exec } = require('child_process');

class SchedulerTasks{

    cronSyntax;
    command;
    taskName;

    constructor(cronSyntax, command, taskName){
        this.cronSyntax = cronSyntax;
        this.command = command;
        this.taskName = taskName;
        this.convert();
        this.createScheduledTask()
    }

    convert(){

        const cronParts = this.cronSyntax.split(' ');
        const minutes = cronParts[0];
        const hours = cronParts[1];
        const daysOfMonth = cronParts[2];
        const months = cronParts[3];
        const daysOfWeek = cronParts[4];

        let taskSchedulerSchedule = `daily /ST ${hours}:${minutes}`;

        if (daysOfWeek !== '*') {
            taskSchedulerSchedule.replace('daily', `weekly /D ${daysOfWeek}`);
        }
        
        if (daysOfMonth !== '*') {
            taskSchedulerSchedule.replace('daily', `monthly /D ${daysOfMonth}`);
        }

        if (months !== '*') {
            taskSchedulerSchedule.replace('daily', `monthly /M ${months}`);
        }

        return `schtasks /create /tn "UipathSchedules\\${this.taskName}" /tr "cmd /c ${this.command}" /sc ${taskSchedulerSchedule}`
    }

    createScheduledTask(scheduleTaskCommand){
        exec(scheduleTaskCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao criar tarefa: ${error.message}`);
              return;
            }
            console.log(`Tarefa criada com sucesso: ${taskName}`);
        });
    }
}