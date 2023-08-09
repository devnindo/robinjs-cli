import {execSync} from 'child_process'
import command from './command-mapper'
import path from 'node:path'
import * as fs from 'fs'


class CLI {
    @command('create')
    createProject(projectName: string): void {

        const createVitePath = path.resolve(__dirname, '../node_modules/.bin/create-vite')
        execSync(`${createVitePath} ${projectName} --template react-ts`, {stdio: 'inherit'})


        const projectPath = path.resolve(process.cwd(), projectName)


        if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) {
            console.log('Detected Yarn. Installing dependencies using Yarn...')
            execSync('yarn install', {stdio: 'inherit', cwd: projectPath})
        } else if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) {
            console.log('Detected npm. Installing dependencies using npm...')
            execSync('npm install', {stdio: 'inherit', cwd: projectPath})
        } else {
            console.log('Using npm as the default. Installing dependencies using npm...')
            execSync('npm install', {stdio: 'inherit', cwd: projectPath})
        }
    }

    @command('dev')
    startDevServer(): void {
        execSync(`npx vite`, {stdio: 'inherit'})
    }

    @command('build')
    buildProject(projectName: string): void {
        execSync(`npx vite build`, {stdio: 'inherit'})
    }

    @command('start')
    serveProject(projectName: string): void {
        execSync(`npx vite preview`, {stdio: 'inherit'})
    }
}

export const cli = new CLI()
