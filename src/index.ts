export type MyProject = {
    red: string;
}

export interface MyInterface {
    green: Record<string, unknown>;
}

/** This is my cool class */
export class MyClass {
    /**
     * The name
     */
    public name: string = "hello";

    /** Returns the name of something */
    public getName() {
        return '';
    }
}