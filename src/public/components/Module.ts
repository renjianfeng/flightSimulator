
/**
 *Created by cuiliqiang on 2018/3/1
 * 组件基类
 */


export class Module {
    private timeoutId;

    /**
     * 显示对象（皮肤）
     */
    protected display: any;
    /**
     * 是否初始化完成
     */
    protected isInit: boolean;
    /**
     * 点击事件回调池
     */
    private clickCallbackPool: any;

    constructor() {
      //  var skinClass: any = eval(this.module.skinName);
       // this.display = new skinClass();
       // this.clickCallbackPool = {};
    }

    /**
     * 初始化UI
     */
    protected initUI(): void {

    }

    /**
     * 显示
     */
    protected show(...args): void {
        this.addEvent();
    }

    /**
     * 隐藏
     */
    protected hide(...args): void {
        this.removeEvent();
    }

    /**
     * 添加事件
     */
    protected addEvent(): void {

    }

    /**
     * 移除事件
     */
    protected removeEvent(): void {

    }

    /**
     * 更新页面
     * @param args
     */
    public updateData(...args): void {
        if (!this.isInit) {
            this.initUI();
            this.isInit = true;
        }
    }

    /**
     * 添加点击事件
     * @param display
     *
     * @param callback
     */
    protected addClick(display: any, callback: Function) {
        var _this= display.onPointerUpObservable.add(callback);
        return _this;
    }

    /**
     * 移除点击事件
     * @param display
     * @param callback
     */
    protected removeClick(display: any, event): void {
        display.onPointerUpObservable.remove(event);
      //  delete this.clickCallbackPool[display.instanceId];
    }

    /**
     * 延时启用点击事件
     * @param display 显示对象
     * @param {number} delay 延时事件
     */
    protected delayEnable(display: any, delay?: number): void {
        display.mouseEnable = display.mouseChildren = false;
        //如果已经禁用事件重新计算
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(function () {
            this.timeoutId = 0;
            display.mouseEnable = display.mouseChildren = true;
        }, delay ? delay : 500);
    }


    public dispose(): void {

    }
}