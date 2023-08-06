import {execSync} from 'child_process'
import command from './command-mapper'


class CLI {
    @command('create')
    createProject(projectName: string): void {
        execSync(`npx create-vite ${projectName} --template react-ts`, {stdio: 'inherit'})
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
