import {execSync} from 'child_process'
import path from 'path'
import fs from 'fs-extra'
import command from './command-mapper'
import {PackageModifier} from './package-modifier'

class CLI {
    private readonly CONFIG_FILE_NAME = 'robin.config.ts'

    @command('create')
    createProject(projectName: string): void {
        try {
            const templatePath = path.resolve(__dirname, '../template/react-ts')
            const projectPath = path.resolve(process.cwd(), projectName)

            fs.copySync(templatePath, projectPath)
            const newPackageJsonPath = path.join(projectPath, 'package.json')
            PackageModifier.modifyPackageJson(newPackageJsonPath, {name: projectName})

            console.log('Using npm as the default. Installing dependencies using npm...')
            execSync('npm update -y', {stdio: 'inherit', cwd: projectPath})
        } catch (error: any) {
            this.handleCommandError('createProject', error)
        }
    }

    @command('dev')
    startDevServer(): void {
        try {
            const config = require(path.resolve(process.cwd(), this.CONFIG_FILE_NAME))
            const port = config.dev.port
            const args = process.argv.slice(3).join(' ')
            execSync(`npx vite --port ${port} ${args}`, {stdio: 'inherit'})
        } catch (error: any) {
            this.handleCommandError('startDevServer', error)
        }
    }

    @command('build')
    buildProject(): void {
        try {
            const args = process.argv.slice(3).join(' ')
            execSync(`npx vite build ${args}`, {stdio: 'inherit'})
        } catch (error: any) {
            this.handleCommandError('buildProject', error)
        }
    }

    @command('start')
    serveProject(): void {
        try {
            const config = require(path.resolve(process.cwd(), this.CONFIG_FILE_NAME))
            const port = config.production.port
            const args = process.argv.slice(3).join(' ')
            execSync(`npx vite preview --port ${port} ${args}`, {stdio: 'inherit'})
        } catch (error: any) {
            this.handleCommandError('serveProject', error)
        }
    }

    private handleCommandError(methodName: string, error: any) {
        if (error.signal === 'SIGINT' || error.message.includes('Command failed')) {
            console.info(`CTRL + C pressed, exiting...`)
        } else {
            console.error(`Error executing ${methodName}:`, error.message)
        }
    }
}

export const cli = new CLI()
