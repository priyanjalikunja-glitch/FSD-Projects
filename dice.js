import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function parseDiceNotation(text) {
  const match = text.trim().toLowerCase().match(/^(\d*)d(\d+)$/);
  if (!match) return null;

  const count = Number(match[1] || 1);
  const sides = Number(match[2]);
  if (!Number.isInteger(count) || count < 1 || !Number.isInteger(sides) || sides < 2) {
    return null;
  }

  return { count, sides };
}

async function rollDice(count, sides) {
  const rolls = Array.from({ length: count }, () => rollDie(sides));
  const total = rolls.reduce((sum, value) => sum + value, 0);
  return { rolls, total };
}

function printHelp() {
  console.log(`\nDice App commands:
  roll           - roll 1d6
  roll NdM       - roll N dice with M sides (example: roll 3d8)
  help           - show this help message
  exit           - quit the app\n`);
}

async function main() {
  console.log('Dice App');
  console.log('Type "help" for commands.');

  while (true) {
    const inputText = await rl.question('> ');
    const trimmed = inputText.trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.toLowerCase() === 'exit') {
      break;
    }

    if (trimmed.toLowerCase() === 'help') {
      printHelp();
      continue;
    }

    const parts = trimmed.split(/\s+/);
    if (parts[0].toLowerCase() === 'roll') {
      const notation = parts[1] ?? '1d6';
      const parsed = parseDiceNotation(notation);

      if (!parsed) {
        console.log('Invalid dice notation. Use roll NdM, for example: roll 3d6');
        continue;
      }

      const { rolls, total } = await rollDice(parsed.count, parsed.sides);
      console.log(`Rolled ${parsed.count}d${parsed.sides}: ${rolls.join(', ')} (total: ${total})`);
      continue;
    }

    console.log('Unknown command. Type "help" for usage.');
  }

  rl.close();
  console.log('Goodbye!');
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  rl.close();
});
