import fs from 'fs-extra'

export class PackageModifier {

    static modifyPackageJson(packageJsonPath: string, modifications: any): void {
        const packageData = fs.readJsonSync(packageJsonPath)
        for (const [key, value] of Object.entries(modifications)) {
            packageData[key] = value
        }
        fs.writeJsonSync(packageJsonPath, packageData, {spaces: 2})
    }

}
