/**
 * @typedef {object} BrowserFileDef windows文件对象
 * @property {number} lastModified 最后修改的时间，格式是数值时间戳
 * @property {Date} lastModifiedDate 最后修改的时间，格式是Date
 * @property {string} name 文件名称
 * @property {number} size 文件尺寸，多少字节
 * @property {string} type 文件类型，如 "image/png"
 * @property {string} webkitRelativePath 文件在webkit内核下的系统路径
 * */
/**
 * @param {object} options
 * @param {Array<string>} [options.fileTypeList=[]] 文件类型
 * @return {Promise<Array<BrowserFileDef>>}
 */
export const openFileSelectionWindow = options => {
    return selectOSFile(options.fileTypeList, true);
};

/**
 * @param {object} options
 * @param {Array<string>} [options.fileTypeList=[]] 文件类型
 * @return {Promise<BrowserFileDef>}
 */
export const openOneFileSelectionWindow = options => {
    return selectOSFile(options.fileTypeList, false);
};
/**
 * @description 从windows资源管理器选择文件
 * @param {Array<string>} [fileTypeList=[]] 文件类型，如果不传递则不限制文件选择的类型范围
 * @param {boolean} [multiple=false] 是否支持多选
 * @return {Promise<Array<BrowserFileDef>>}
 */
const selectOSFile = async (fileTypeList=[], multiple=false)=>{
    fileTypeList = convertMimes(fileTypeList)
    return new Promise(resolve => {
        // let { fileTypeList } = options;
        // fileTypeList = fileTypeList || [];
        const fileInputEle = document.createElement('input');
        fileInputEle.style.display = 'none';
        fileInputEle.setAttribute('type', 'file');
        if(multiple){
            fileInputEle.setAttribute('multiple', 'multiple');
        }
        let accept = fileTypeList.length ? fileTypeList.join(',') : '*/*';
        fileInputEle.setAttribute(
            'accept',
            accept,
        );
        fileInputEle.onchange = () => {
            const { files } = fileInputEle;
            if(multiple){
                resolve(files);
            }else{
                resolve(files[0]);
            }
            document.body.removeChild(fileInputEle);
        };
        fileInputEle.click();
        document.body.appendChild(fileInputEle);
    });
}

/**
 * @description 对不同形式的mime进行转换，给底层的文件系统使用
 * @param {Array<string>} mimeList # ['jpg', 'png', ...]
 * @return {Array<string>}
 */
export function convertMimes(mimeList) {
    mimeList = completeMime(mimeList)
    return mimeList.map(mime=>{
        return MimeDef[mime] ? MimeDef[mime] : mime
    });
}

/**
 * @description 对特殊的mime进行补全
 * @param {Array<String>} mimeList
 */
export const completeMime = ( mimeList=[])=>{
    //避免出现要求jpeg，但是调用方传入JpeG, JPeg
    mimeList = [...mimeList].map(value=>value.toLowerCase());

    //['jpg'] or ['jpeg'] to ['jpeg', 'jpg']
    //先判断是否包含了其中一种
    let jpgList = ['jpg', 'jpeg']
    let isIncluded = mimeList.some(mime=>{
        return jpgList.includes(mime);
    })
    // 将缺失的另外一种包含进去
    if(isIncluded){
        jpgList.forEach(mime=>{
            if(!mimeList.includes(mime)){
                mimeList.push(mime);
            }
        })
    }
    return mimeList;
}

/**
 * @description 精简类型的Mime定义
 * @type {{ZIP: string, JPG: string, RAR: string, SVG: string, PNG: string, JPEG: string, HTML: string, TXT: string, FLV: string, PDF: string, PPT: string, DOC: string, M4A: string, XLS: string, DOCX: string, PSD: string, PPTX: string, SWF: string, BMP: string, GIF: string, AI: string, XLSX: string, MP4: string, MP3: string, EXE: string, ICO: string}}
 */
export const MimeShortDef = {
    ZIP: 'zip',
    JPG: 'jpg',
    SVG: 'svg',
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    BMP: 'bmp',
    DOC: 'doc',
    XLS: 'xls',
    DOCX: 'docx',
    XLSX: 'xlsx',
    PPT: 'ppt',
    PPTX: 'pptx',
    MP3: 'mp3',
    M4A: 'm4a',
    MP4: 'mp4',
    PDF: 'pdf',
    EXE: 'exe',
    HTML: 'html',
    ICO: 'ico',
    TXT: 'txt',
    FLV: 'flv',
    SWF: 'swf',
    PSD: 'psd',
    AI: 'ai',
    RAR: 'rar',
};
/**
 * @description 完整的Mime定义，需要配合MimeShortDef，给文件系统使用
 */
export const MimeDef = {
    [MimeShortDef.ZIP]: 'application/x-zip-compressed',
    [MimeShortDef.JPG]: 'image/jpg',
    [MimeShortDef.SVG]: 'image/svg+xml',
    [MimeShortDef.JPEG]: 'image/jpeg',
    [MimeShortDef.PNG]: 'image/png',
    [MimeShortDef.GIF]: 'image/gif',
    [MimeShortDef.BMP]: 'image/bmp',
    [MimeShortDef.DOC]: 'application/msword',
    [MimeShortDef.XLS]: 'application/vnd.ms-excel',
    [MimeShortDef.DOCX]:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [MimeShortDef.XLSX]:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [MimeShortDef.PPT]: 'application/vnd.ms-powerpoint',
    [MimeShortDef.PPTX]:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    [MimeShortDef.MP3]: 'audio/mpeg',
    [MimeShortDef.M4A]: 'audio/MP4A-LATM',
    [MimeShortDef.MP4]: 'video/mp4',
    [MimeShortDef.PDF]: 'application/pdf',
    [MimeShortDef.EXE]: 'application/x-msdownload',
    [MimeShortDef.HTML]: 'text/html',
    [MimeShortDef.ICO]: 'image/x-icon',
    [MimeShortDef.TXT]: 'text/plain',
    [MimeShortDef.FLV]: 'flv',
    [MimeShortDef.SWF]: 'application/x-shockwave-flash',
    [MimeShortDef.PSD]: 'psd',
    [MimeShortDef.AI]: 'ai',
    [MimeShortDef.RAR]: '.rar',
};
/**
 * @description 由完整的mime获取简短的mime
 * @param {string} mime
 * @return {string}
 */
export const getShortMimeByMime = (mime)=>{
    let entries = Object.entries(MimeDef)
    for(let pair of entries){
        let key = pair[0]
        let value = pair[1]
        if(value === mime){
            return key;
        }
    }
}

export const FileSizeDef = {
    BYTE: 1,
    KB: 1024,
    MB: 1024*1024
}