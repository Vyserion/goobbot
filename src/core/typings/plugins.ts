export interface PluginHandlerStrategy {
	handleMessage(): Promise<void>;
}
