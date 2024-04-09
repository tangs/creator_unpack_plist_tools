const fs = require("fs")
const path = require('node:path')
const { resDestPath } = require('./config')

const run = () => {

    const getFiles = (dir) => {
        let files = new Set()
        if (!fs.existsSync(dir)) {
            dir = path.dirname(dir)
        }
        for (const file of fs.readdirSync(dir)) {
            const path1 = path.join(dir, file)
            const stat = fs.lstatSync(path1)
            if (stat.isFile()) {
                files.add(file) 
            }
        }
        return files
    }

    /**
     * 
     * @param {string} base 
     * @param {string} src 
     * @param {string} dest 
     */
    const completeFiles = (base, src, dest) => {
        const [srcPath, destPath] = [path.join(base, src), path.join(base, dest)]
        console.log(srcPath)
        console.log(destPath)

        const [files1, files2] = [getFiles(srcPath), getFiles(destPath)]

        for (const file of files1) {
            if (files2.has(file)) continue
            const [srcFilePath, destFilePath] = [path.join(srcPath, file), path.join(destPath, file)]
            fs.cpSync(srcFilePath, destFilePath, { force: true })
        }

        console.log()
    }

    /**
     * 
     * @param {string} dir 
     */
    const fileListRec = (dir) => {
        // const dirs = []
        const dirs = new Set()
        if (!fs.existsSync(dir)) {
            dir = path.dirname(dir)
        }
        for (const file of fs.readdirSync(dir)) {
            const path1 = path.join(dir, file)
            const stat = fs.lstatSync(path1)
            if (stat.isDirectory()) {
                fileListRec(path1)
                dirs.add(file)
            }
        }

        for (const dir1 of dirs) {
            const originDir = `${dir1}_origin`
            if (!dirs.has(originDir)) continue
            completeFiles(dir, dir1, originDir)
        }
    }

    fileListRec(resDestPath)
}

run()
