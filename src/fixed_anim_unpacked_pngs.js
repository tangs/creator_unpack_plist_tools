const fs = require("fs")
const Path = require('node:path')
const sharp = require('sharp')

const resDestPath = "/Users/tangs/Desktop/vegass/unzip/resources"

var re = /(.*)_(\d*).png/;

const check = async (path) => {
    const dirname = Path.basename(path)
    const files = []
    let [w, h] = [0, 0]
    let checkWH = -1
    let allWHSame = true
    for (const file of fs.readdirSync(path)) {
        if (file.startsWith(".DS_Store")) continue
        const fullPath = `${path}/${file}`
        if (fs.lstatSync(fullPath).isDirectory()) return false
        const match = file.match(re)
        if (match == null || match[1] != dirname) return false
        files.push(file)
        const {width, height} = await sharp(fullPath).metadata()
        if (checkWH == -1) {
            checkWH = (width << 16) | height;
        } else if (((width << 16) | height) != checkWH) {
            allWHSame = false
        }
        // console.log(width, height)
        w = Math.max(w, width)
        h = Math.max(h, height)
    }

    if (allWHSame) return false

    const fixedDirPath = `${path}_fixed`
    if (!fs.existsSync(fixedDirPath)) {
        fs.mkdirSync(fixedDirPath)
    }
    for (const file of fs.readdirSync(path)) {
        if (file.startsWith(".DS_Store")) continue
        const srcFullPath = `${path}/${file}`
        const destFullPath = `${fixedDirPath}/${file}`
        const {width, height} = await sharp(srcFullPath).metadata()
        sharp(srcFullPath).extend(
            {
                top: Math.floor((h - height) / 2 + 0.5),
                bottom: Math.floor((h - height) / 2),
                left: Math.floor((w - width) / 2 + 0.5),
                right: Math.floor((w - width) / 2),
                background: { r: 0, g: 0, b: 0, alpha: 0 },
                // background: { r: 255, g: 0, b: 0, alpha: 1 },
            }
            ).toFile(destFullPath)
        // sharp(srcFullPath).resize(
        //     w, h, {
        //         fit: 'fill'
        //     }
        //     ).toFile(destFullPath)
    }

    return true
}

/**
 * 
 * @param {string} path 
 */
const run = async (path) => {
    for (const file of fs.readdirSync(path)) {
        const fullPath = `${path}/${file}`
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (await check(fullPath)) {
                console.log(`fixed: ${fullPath}`)
            }
            run(fullPath)
        }
    }
}

run(resDestPath)
