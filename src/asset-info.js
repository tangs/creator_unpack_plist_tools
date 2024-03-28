const { decodeUuid } = require("./handlerPlist")

class AssetInfo {
    /**
     * 
     * @param {string} uuid 
     * @param {string} path 
     */
    constructor(uuid, path) {
        this.uuid = uuid
        this.path = path
    }

    getImportPath() {
        const path = decodeUuid(this.uuid)
        return path
    }
}

exports.AssetInfo = AssetInfo
