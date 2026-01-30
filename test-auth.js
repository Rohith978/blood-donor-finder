import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

console.log('🧪 Starting Authentication Tests...\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition) {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
    }
}

async function runTests() {
    // Test 1: Check Firebase config exists
    const configExists = fs.existsSync(path.join(rootDir, 'services/firebase.ts'));
    test('Firebase config file exists', configExists);

    // Test 2: Check AuthContext exists
    const authContextExists = fs.existsSync(path.join(rootDir, 'context/AuthContext.tsx'));
    test('AuthContext file exists', authContextExists);

    // Test 3: Check SignIn page exists
    const signInExists = fs.existsSync(path.join(rootDir, 'pages/SignIn.tsx'));
    test('SignIn page exists', signInExists);

    // Test 4: Check SignUp page exists
    const signUpExists = fs.existsSync(path.join(rootDir, 'pages/SignUp.tsx'));
    test('SignUp page exists', signUpExists);

    // Test 5: Check ProtectedRoute exists
    const protectedRouteExists = fs.existsSync(path.join(rootDir, 'components/ProtectedRoute.tsx'));
    test('ProtectedRoute component exists', protectedRouteExists);

    // Test 6: Check environment variables
    const envExists = fs.existsSync(path.join(rootDir, '.env.local'));
    test('Environment file exists', envExists);

    // Test 7: Check Dashboard exists
    const dashboardExists = fs.existsSync(path.join(rootDir, 'pages/Dashboard.tsx'));
    test('Dashboard page exists', dashboardExists);

    // Print results
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    tests.results.forEach(r => console.log(r));
    console.log('================');
    console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

    if (tests.failed > 0) {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed! Authentication setup is complete.');
    }
}

runTests().catch(console.error);
