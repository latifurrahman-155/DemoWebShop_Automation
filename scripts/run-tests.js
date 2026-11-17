
const { spawnSync } = require('child_process');

const testFile = process.argv[2];

const args = ['playwright', 'test'];

if (testFile) {
    args.push(testFile);
}

console.log('\n================================');
console.log('Starting Playwright Test...');
console.log('================================\n');

const testResult = spawnSync('npx', args, {
    stdio: 'inherit',
    shell: true
});

console.log('\n================================');
console.log('Generating Allure Report...');
console.log('================================\n');

const reportResult = spawnSync(
    'npx',
    [
        'allure',
        'generate',
        'allure-results',
        '--clean',
        '-o',
        'allure-report'
    ],
    {
        stdio: 'inherit',
        shell: true
    }
);

if (reportResult.status !== 0) {
    console.log('Allure report generation failed.');
}

if (testResult.status !== 0) {
    process.exit(1);
}

console.log('\nTest execution completed.');
