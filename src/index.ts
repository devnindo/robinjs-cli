#!/usr/bin/env node
import {Command} from 'commander'
import {input} from '@inquirer/prompts'
import {commandHandler} from './command-mapper'
import {cli} from './cli-command'

const program = new Command()

const executeCommandHandler = (commandName: string, projectName?: string) => {
    const handler = commandHandler.get(commandName)
    if (handler) {
        projectName ? handler.call(cli, projectName) : handler.call(cli)
    } else {
        console.error(`Unknown command: ${commandName}`)
    }
}

program
    .command('create [projectName]')
    .description('Create a new project')
    .action((projectName) => {
        if (projectName) {
            executeCommandHandler('create', projectName)
        } else {
            input({message: 'Enter a project name'}).then(projectName => {
                executeCommandHandler('create', projectName)
            })
        }
    })

program
    .command('dev')
    .description('Start the dev server')
    .action(() => {
        executeCommandHandler('dev')
    })

program
    .command('build')
    .description('Build the project')
    .action(() => {
        executeCommandHandler('build')
    })

program
    .command('start')
    .description('Serve the project')
    .action(() => {
        executeCommandHandler('prod')
    })

program.parse(process.argv)
