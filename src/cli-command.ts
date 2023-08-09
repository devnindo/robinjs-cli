import {execSync} from 'child_process'
import path from 'path'
import fs from 'fs-extra'
import command from './command-mapper'
import {PackageModifier} from './package-modifier'


class CLI {
    @command('create')
    createProject(projectName: string): void {
        const templatePath = path.resolve(__dirname, '../template/react-ts')
        const projectPath = path.resolve(process.cwd(), projectName)

        fs.copySync(templatePath, projectPath)
        const newPackageJsonPath = path.join(projectPath, 'package.json')
        PackageModifier.modifyPackageJson(newPackageJsonPath, {name: projectName})

        console.log('Using npm as the default. Installing dependencies using npm...')
        execSync('npm update -y', {stdio: 'inherit', cwd: projectPath})
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
