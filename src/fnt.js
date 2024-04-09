const fs = require("fs")
const { decodeUuid } = require("./handlerPlist")
const path = require('node:path')
const { exec } = require('child_process');
const sharp = require('sharp');

const settingContent = fs.readFileSync("./src/info.json")
const { assets } = JSON.parse(settingContent)
const { resDestPath: resDestPathOrigin, assetsImportPath } = require('./config')

const resDestPath = path.dirname(resDestPathOrigin)

// const resDestPath = path.dirname("/Users/tangs/Desktop/vegass/unzip/resources")
// const assetsImportPath = "/Users/tangs/Desktop/vegass/apk/assets/res/import"

const run = async () => {
    const pathToUuid = new Map()
    const uuidToPath = new Map()
    
    for (const [encodeUuid, [path]] of Object.entries(assets)) {
        const uuid = decodeUuid(encodeUuid)
        pathToUuid.set(path, uuid)
        uuidToPath.set(uuid, path)
        uuidToPath.set(encodeUuid, path)
        // console.log(encodeUuid, uuid, path)
    }
    
    /**
     * 
     * @param {string} dir 
     */
    const fileListRec = (dir) => {
        let files = []
        if (!fs.existsSync(dir)) {
            dir = path.dirname(dir)
        }
        for (const file of fs.readdirSync(dir)) {
            const path1 = path.join(dir, file)
            const stat = fs.lstatSync(path1)
            if (stat.isFile()) {
                files.push(path1) 
            } else if (stat.isDirectory()) {
                const files1 = fileListRec(path1)
                files = files.concat(files1)
            }
        }
        return files
    }
    
    const fntInfos = []
    for (const [encodeUuid, [assetPath]] of Object.entries(assets)) {
        if (!assetPath.endsWith(".fnt")) continue
        if (!assetPath.startsWith("resources/slots")) continue
    
        const uuid = decodeUuid(encodeUuid)
        const dir = path.dirname(assetPath)
        const basename = path.basename(assetPath, ".fnt")
        const pngname = `${basename}.png`
    
        const pngPath = path.join(dir, pngname)
        const dirAbsPath = path.join(resDestPath, dir)
        if (!fs.existsSync(dirAbsPath)) continue
    
        // console.log(dir, basePath, pngPath, jpgPath)
        // console.log(pngPath)
        if (pathToUuid.has(pngPath)) {
            // console.log(uuid, pngPath)
            fntInfos.push([uuid, pngPath])
            continue
        }
        
        // console.log(dirAbsPath, pngname)
        let files = fileListRec(dirAbsPath).filter((file) => file.endsWith(pngname))
        console.assert(files.length < 3, dirAbsPath, pngname, files.length)
        if (files.length >= 3) continue
    
        if (files.length == 2) {
            const [maxFile, minFile] = files[0].length > files[1].length ? [files[0], files[1]] : [files[1], files[0]]
            const idx = maxFile.indexOf("_origin")
            if (idx != -1 && maxFile.replace("_origin", "") == minFile) {
                files = [minFile]
            }
        }
    
        for (const file of files) {
            const destPngPath = file.substring(resDestPath.length)
            fntInfos.push([uuid, destPngPath])
        }
    }
    
    const getAssetPathByUuid = (uuid) => {
        const fileName = decodeUuid(uuid)
        return `${assetsImportPath}/${fileName.substring(0, 2)}/${fileName}`
    }
    
    for (const [uuid, pngPath] of fntInfos) {
        console.log(uuid, pngPath)
        const dir = path.dirname(pngPath)
        const basename = path.basename(pngPath, ".png")
        const parentDir = path.join(resDestPath, dir);
        const destDir = path.join(parentDir, basename)
        const destCodeDir = path.join(parentDir, `${basename}_code`)
        const resPngPath = path.join(resDestPath, pngPath)
    
        if (!fs.existsSync(parentDir)) continue
        if (!fs.existsSync(resPngPath)) continue
    
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir)
        if (!fs.existsSync(destCodeDir)) fs.mkdirSync(destCodeDir)
    
        const jsonPath = `${getAssetPathByUuid(uuid)}.json`
        if (!fs.existsSync(jsonPath)) continue
        
        const { _fntConfig: { fontDefDictionary } } = JSON.parse(fs.readFileSync(jsonPath))
    
        for (const [code, { rect: {x, y, width: w, height: h}}] of Object.entries(fontDefDictionary)) {
            const ch = String.fromCharCode(code)
            if (w == 0 && h == 0) continue

            const [rx, ry] = [x + w, y + h];
            const {width: originWidth, height: originHeight} = await sharp(resPngPath).metadata()
            const [extendX, extendY] = [Math.max(0, rx - originWidth), Math.max(0, ry - originHeight)]
            // console.log(ch, code, x, y, w, h)
            const chPath = path.join(destDir, `${ch}.png`)
            const codePath = path.join(destCodeDir, `${code}.png`)
            console.log(chPath)
            // console.log(resPngPath)
            // console.log(x, y, w, h)
            // console.log(rx, ry, originWidth, originHeight)
            // console.log(extendX, extendY)
            // console.log(x, y, w - extendX, h - extendY)

            await sharp(resPngPath)
            .extract({
                left: x, 
                top: y,
                width: w - extendX, 
                height: h - extendY,
            })
            .extend({
                top: 0,
                bottom: extendY,
                left: 0,
                right: extendX,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .toFile(chPath)
            // .then((_info) => {
            //     console.log(`Image cropped and saved: ${resPngPath}, ${ch}`)
            // }).catch(() => {
            //     console.error(`An error occured: ${resPngPath}, ${ch}`);
            // })
    
            await sharp(resPngPath)
            .extract({
                left: x, 
                top: y,
                width: w - extendX, 
                height: h - extendY,
            })
            .extend({
                top: 0,
                bottom: extendY,
                left: 0,
                right: extendX,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            }).toFile(codePath)
            // .then((_info) => {
            //     console.log(`Image cropped and saved: ${resPngPath}, ${code}`)
            // }).catch(() => {
            //     console.error(`An error occured: ${resPngPath}, ${code}`);
            // })
        }
    
        // console.log(destDir, jsonPath)
        // console.log(uuid, pngPath)
    }
}

run()
