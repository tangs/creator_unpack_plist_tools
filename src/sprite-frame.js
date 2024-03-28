const { decodeUuid } = require("./handlerPlist")

class SpriteFrame {
    /**
     * 
     * @param {string} name 
     * @param {string} uuid 
     */
    constructor(name, uuid) {
        this.name = name
        this.uuid = uuid
    }

    getImportPath() {
        const path = decodeUuid(this.uuid)
        return path
    }
}

exports.SpriteFrame = SpriteFrame
