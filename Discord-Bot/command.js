import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'create',
    description: 'creates a new short URL',
  },
];

const rest = new REST({ version: '10' }).setToken('Token');

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(''), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}