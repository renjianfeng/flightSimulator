import {fileData} from "./fileData";

export interface ResourceData {
    /**
     * 二进制文件
     */
    binarys:Array<fileData>;
    /**
     * 图片文件
     */
    images: Array<fileData>;
    /**
     * 模型文件
     */
    models: Array<fileData>;
    /**
     * 贴图文件
     */
    textures: Array<fileData>;
    /**
     * 环境天空盒子
     */
    cubeTextures: Array<fileData>;
}