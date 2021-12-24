#!/usr/bin/env node
declare function runGatsby(command: 'build' | 'clean' | 'serve' | 'develop'): void;
export default runGatsby;
