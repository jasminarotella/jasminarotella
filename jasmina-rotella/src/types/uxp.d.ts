declare module 'uxp' {
    export const storage: any;
    export const versions: any;

    export namespace photoshop {
        export function executeAsModal<T>(
            callback: (executionContext: { hostControl: any }) => Promise<T>,
            options?: { commandName: string }
        ): Promise<T>;

        export const action: {
            batchPlay: (commands: any[], options: { synchronousExecution: boolean }) => Promise<any>;
        };

        export const app: {
            activeDocument: any;
            documents: any[];
            open: (filePath: string) => Promise<any>;
            save: () => Promise<void>;
            close: () => Promise<void>;
        };
    }
}
