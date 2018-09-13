export class DisplayPool{
    private static instance: DisplayPool;

    public static get ins(): DisplayPool {
        if (!this.instance) {
            this.instance = new DisplayPool();
        }
        return this.instance;
    }
    //场景名称
    public displayPool: any = {};
}