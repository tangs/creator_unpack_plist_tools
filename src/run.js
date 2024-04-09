const { decodeUuid } = require('./handlerPlist')
const fs = require('fs')
const { AssetInfo } = require('./asset-info')
const Path = require('node:path')
const sharp = require('sharp')
const { resOriginPath, resDestPath, assetsImportPath, infoJsonPath } = require('./config')

// console.log(decodeUuid("3axndHaX5BpaAM0sLzpmjZ"))
// console.log(decodeUuid("80UhoqjbJC7IFiWcqUzKMI"))
// console.log(decodeUuid("f2FZiimR5GypDNXLyOW4Gt"))
// console.log(decodeUuid("fdXwj1SeRDbb1UjqJt8EXH"))
// console.log(decodeUuid("25vJaiFT1KJasEbSEwDpWl"))
// console.log(decodeUuid("e3lyJ4+x5Iv5bItfWRgP4N"))
// console.log(decodeUuid("0eRlg2ujBHh6YdMUX1GZzV"))
// console.log(decodeUuid("38CwynOn1P6a5f50uRDjb5"))
// console.log(decodeUuid("00qhrAuFFMW434Cs/Uh0NI"))
// console.log(decodeUuid("5f+pz4pItON45nYYSgkMmF"))
// console.log(decodeUuid("6d/a7gl1dJAr+IGw7UiSEp"))
// console.log(decodeUuid("a76aA6DB9MVaytoFM74HF1"))
// console.log(decodeUuid("1cSF9kEixCIaNwDBz112Z+"))
// console.log(decodeUuid("371Iu/6mtES6STzohEQlvX"))
// console.log(decodeUuid("f7y/n6j7JBtLFrxWI9xwvF"))
// return

const settingContent = fs.readFileSync(infoJsonPath)
const { assets } = JSON.parse(settingContent)


const resPreffix = "resources/"

// exec(`rm -rf ${resDestPath}; cp -rf ${resOriginPath} ${resDestPath}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error('Error running script:', error)
//       }
// })
fs.rmSync(resDestPath, { recursive: true, force: true })
fs.cpSync(resOriginPath, resDestPath, { recursive: true, force: true })

const assetInfos = new Map()
const uuidToSpriteFrameName = new Map()
const spriteFrameDecodeUuidToSpriteAltasUuid = new Map()
const spriteFrameDecodeUuidToInfo = new Map()
const uuidToPath = new Map()

/**
 * 
 * @param {string} uuid 
 * @returns 
 */
const getAssetPathByUuid = (uuid) => {
    const fileName = decodeUuid(uuid)
    return `${assetsImportPath}/${fileName.substring(0, 2)}/${fileName}`
}

const getAltasPathAndInfo = (spriteFrameUuid) => {
    const decodeSpriteFrameUuid = decodeUuid(spriteFrameUuid)
    const altasUuid = spriteFrameDecodeUuidToSpriteAltasUuid.get(decodeSpriteFrameUuid)
    if (altasUuid == null) return { ret : false }
    const info = spriteFrameDecodeUuidToInfo.get(decodeSpriteFrameUuid)
    const fileName = decodeUuid(altasUuid)
    const path = `${assetsImportPath}/${fileName.substring(0, 2)}/${fileName}.json`
    const spriteFrameName = uuidToSpriteFrameName.get(spriteFrameUuid)
    return {
        ret : true,
        altasUuid : altasUuid,
        path : path,
        info : info,
        spriteFrameName: spriteFrameName,
    }
}

const serachAssetsImportPath = () => {
    for (const path of fs.readdirSync(assetsImportPath)) {
        const fullPath = `${assetsImportPath}/${path}`
        if (!fs.lstatSync(fullPath).isDirectory()) continue

        for (const file of fs.readdirSync(fullPath)) {
            if (!file.endsWith(".json")) continue
            const uuid = file.substring(0, file.lastIndexOf(".json"))
            const fileFullPath = `${fullPath}/${file}`

            if (!fs.lstatSync(fileFullPath).isFile()) continue

            const { __type__, _spriteFrames, content } = JSON.parse(fs.readFileSync(fileFullPath))

            if (__type__ == "cc.SpriteAtlas") {
                if (_spriteFrames == null) continue
                for (const [spriteFrameName, {__uuid__}] of Object.entries(_spriteFrames)) {
                    const assetPath = getAssetPathByUuid(__uuid__)
                    // if (__uuid__.length != 22) continue
                    uuidToSpriteFrameName.set(__uuid__, spriteFrameName)
                    // console.log(`asset path: ${assetPath}`)
                }
            } else if (__type__ == "cc.SpriteFrame") {
                const packedPngUuid = content.texture
                spriteFrameDecodeUuidToSpriteAltasUuid.set(uuid, packedPngUuid)
                spriteFrameDecodeUuidToInfo.set(uuid, content)
            }
        }
    }
}

const generateAssetsMap = () => {
    for (const [uuid, [resPath]] of Object.entries(assets)) {
        // if (uuid.length != 22) continue
        if (resPath.endsWith(".mp3")) continue
        let path = `${resPath}`
        // if (path.endsWith(".pac")) console.log(`pac: ${path}`)
        if (!path.startsWith(`${resPreffix}slots`)) continue
        if (!path.endsWith(".png") && !path.endsWith(".jpg") && !path.endsWith(".pac")) continue
        if (resPath.startsWith(resPreffix)) {
            const decode = decodeUuid(uuid)
            const path = `${resDestPath}/${resPath.substring(resPreffix.length)}`
            uuidToPath.set(uuid, path)
            uuidToPath.set(decode, path)
        }
    
        path = getAssetPathByUuid(uuid)
        const info = new AssetInfo(uuid, path)
        assetInfos.set(uuid, info)
    }
}

generateAssetsMap()
serachAssetsImportPath()

const run = async () => {

    for ([uuid, spriteFrameName] of uuidToSpriteFrameName) {
        const { altasUuid, path, info, spriteFrameName, ret } = getAltasPathAndInfo(uuid)
        if (!ret) continue
        let { rect: [x, y, w, h], offset: [ox, oy], originalSize: [ow, oh], rotated } = info
        // let [x, y, w, h] = rect
        if (rotated == 1) {
            [w, h, ow, oh, ox, oy] = [h, w, oh, ow, oy, ox]
        }
        // if (rotated == 1) {
        //     [ow, oh] = [oh, ow]
        // }
        // if (rotated == 1) {
        //     [ox, oy] = [oy, ox]
        // }
        const altasPngPath = uuidToPath.get(altasUuid)
        if (altasPngPath == null) continue
        // console.log(`${spriteFrameName}: ${altasPngPath}`)
        if (altasPngPath.endsWith(".jpg")) {
            // console.log(`jpg: ${altasPngPath}`)
        } else {
            // continue
        }
        // if (!altasPngPath.endsWith(".png")) continue
    
        const altasDirPath = Path.dirname(altasPngPath)
        let baseName = Path.basename(altasPngPath, ".png")
        baseName = Path.basename(baseName, ".jpg")
    
        if (!fs.existsSync(altasDirPath)) continue
    
        const destPath = Path.join(altasDirPath, baseName)
        const destPngPath = Path.join(destPath, `${spriteFrameName}.png`)
    
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath)
        }
    
        await sharp(altasPngPath).extract({
            left: x, top: y,
            width: w, height: h,
        }).rotate(rotated == 1 ? -90 : 0).toFile(destPngPath)
        // console.log(ret1)
    
        // .then((_info) => {
        //     console.log(`Image cropped and saved: ${destPngPath}`)
        // }).catch(() => {
        //     console.error(`An error occured: ${destPngPath}`);
        // })
    
        console.log(uuid, path, spriteFrameName)
    
        if (w != ow || h != oh) {
            // if (ox < 0 || ox > 1 || oy < 0 || oy > 1) continue;
            const destOriginPath = `${destPath}_origin`
            if (!fs.existsSync(destOriginPath)) {
                fs.mkdirSync(destOriginPath)
            }
            const destOriginPngPath = Path.join(destOriginPath, `${spriteFrameName}.png`)
    
            const [wd, hd] = [ow - w, oh - h]
            const [t, l] = [Math.floor(hd / 2 - oy), Math.floor(wd / 2 - ox)]
            // const [t, l] = [Math.floor(hd * (1 - oy)), Math.floor(wd * ox)]
            const [b, r] = [hd - t, wd - l]
            console.log(destOriginPngPath, decodeUuid(uuid))
            console.log(t, b, l, r)
            console.log(ow, oh, w, h, ox, oy, wd, hd)
            await sharp(destPngPath).extend({
                top: t,
                bottom: b,
                left: l,
                right: r,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            }).toFile(destOriginPngPath)
            // console.log(ret2)
        }
    }
}

const main = () => {
    run()
}

main()
// console.log(1)
