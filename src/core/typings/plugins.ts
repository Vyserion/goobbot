export interface IPluginHandlerStrategy {
    handleMessage(): Promise<void>;
}