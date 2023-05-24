declare class ModuleFederationPlugin {
  constructor(options: ModuleFederationPluginOptions)

  /**
   * Apply the plugin
   */
  apply(compiler: Compiler): void
}
declare interface ModuleFederationPluginOptions {
  /**
   * Modules that should be exposed by this container. When provided, property name is used as public name, otherwise public name is automatically inferred from request.
   */
  exposes?: (string | ExposesObject)[] | ExposesObject

  /**
   * The filename of the container as relative path inside the `output.path` directory.
   */
  filename?: string

  /**
   * Options for library.
   */
  library?: LibraryOptions

  /**
   * The name of the container.
   */
  name?: string

  /**
   * The external type of the remote containers.
   */
  remoteType?:
    | 'import'
    | 'var'
    | 'module'
    | 'assign'
    | 'this'
    | 'window'
    | 'self'
    | 'global'
    | 'commonjs'
    | 'commonjs2'
    | 'commonjs-module'
    | 'commonjs-static'
    | 'amd'
    | 'amd-require'
    | 'umd'
    | 'umd2'
    | 'jsonp'
    | 'system'
    | 'promise'
    | 'script'
    | 'node-commonjs'

  /**
   * Container locations and request scopes from which modules should be resolved and loaded at runtime. When provided, property name is used as request scope, otherwise request scope is automatically inferred from container location.
   */
  remotes?: (string | RemotesObject)[] | RemotesObject

  /**
   * The name of the runtime chunk. If set a runtime chunk with this name is created or an existing entrypoint is used as runtime.
   */
  runtime?: string | false

  /**
   * Share scope name used for all shared modules (defaults to 'default').
   */
  shareScope?: string

  /**
   * Modules that should be shared in the share scope. When provided, property names are used to match requested modules in this compilation.
   */
  shared?: (string | SharedObject)[] | SharedObject
}

declare module 'webpack/lib/container/ModuleFederationPlugin' {
  export default ModuleFederationPlugin
}

declare module 'component_app/RemoteComponent' {
  import { defineAsyncComponent } from 'vue'
  const Component: ReturnType<typeof defineAsyncComponent>
  export default Component
}
