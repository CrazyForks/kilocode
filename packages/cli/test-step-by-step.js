#!/usr/bin/env node

console.log("Step-by-step CLI test...")

async function testStepByStep() {
    try {
        console.log("Step 1: Testing basic imports...")
        const { CLIProvider } = require('@kilo-code/vscode-mock')
        console.log("✅ VS Code mock imports work")

        console.log("Step 2: Creating CLI provider...")
        const cliProvider = new CLIProvider(process.cwd())
        console.log("✅ CLI provider created")

        console.log("Step 3: Initializing CLI provider...")
        cliProvider.initialize()
        console.log("✅ CLI provider initialized")

        console.log("Step 4: Creating VS Code module...")
        const vscodeModule = cliProvider.createVSCodeModule()
        console.log("✅ VS Code module created")

        console.log("Step 5: Setting up global vscode...")
        global.vscode = vscodeModule
        console.log("✅ Global vscode set up")

        console.log("Step 6: Testing basic VS Code API...")
        console.log("- Workspace folders:", global.vscode.workspace.workspaceFolders?.length || 0)
        console.log("- Environment machine ID:", global.vscode.env.machineId)
        console.log("✅ Basic VS Code API works")

        console.log("Step 7: Testing TelemetryService...")
        const { TelemetryService } = require('@roo-code/telemetry')
        if (!TelemetryService.hasInstance()) {
            TelemetryService.createInstance([])
            TelemetryService.instance.updateTelemetryState(false)
        }
        console.log("✅ TelemetryService initialized")

        console.log("Step 8: Testing file system operations...")
        const fs = global.vscode.workspace.fs
        const workspaceUri = global.vscode.Uri.file(process.cwd())
        const stat = await fs.stat(workspaceUri)
        console.log("✅ File system operations work")

        console.log("Step 9: Testing extension context...")
        const mockContext = cliProvider.getVSCodeAPI().createExtensionContext()
        console.log("- Extension ID:", mockContext.extension.id)
        console.log("- Global storage URI:", mockContext.globalStorageUri.fsPath)
        console.log("✅ Extension context works")

        console.log("\n🎉 All basic components are working!")
        console.log("The hang is likely in the Task or ClineProvider initialization.")

        process.exit(0)

    } catch (error) {
        console.error("❌ Test failed at step:", error.message)
        console.error("Stack:", error.stack)
        process.exit(1)
    }
}

testStepByStep()