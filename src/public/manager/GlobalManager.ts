
/**
 *Created by renjianfeng
 */
import {ModuleName} from "../enum/ModuleName";
import {DisplayPool} from "../others/DisplayPool";
export class GlobalManager {

    //管理器单例
    private static instance: GlobalManager;

    public static get ins(): GlobalManager {
        if (!this.instance) {
            this.instance = new GlobalManager();
        }
        return this.instance;
    }

    /**
     * 打开一个模块
     * @param {ModuleName} moduleName
     */
    public openModule(moduleName:string, ...args): void {
        DisplayPool.ins.displayPool[moduleName].show(...args)
    }
}