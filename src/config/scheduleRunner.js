const { exec } = require('child_process');

const taskName = 'My Task Name';
const taskCommand = 'dir';
const scheduleRule = '0 0 * * *'; // agendar para executar todos os dias à meia-noite

const task = () => {
  const command = `schtasks /create /tn "${taskName}" /tr "cmd /c ${taskCommand}" /sc daily /st 00:00`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao criar tarefa: ${error.message}`);
      return;
    }
    console.log(`Tarefa criada com sucesso: ${taskName}`);
  });
}