const path = require("path");
const Asset = require("parcel-bundler/lib/Asset");
const localRequire = require("parcel-bundler/lib/utils/localRequire");

class EJSAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = "html";
  }

  async generate() {
    const ejs = await localRequire("ejs", this.name);
    const config = (await this.getConfig([".ejsrc", ".ejsrc.js", "ejs.config.js"])) || {};

    const compiled = ejs.compile(this.contents, {
      cache              : config.cache,
      filename           : this.name,
      root               : config.root,
      context            : config.context,
      compileDebug       : config.compileDebug || false,
      client             : config.client,
      delimiter          : config.delimiter,
      debug              : config.debug,
      strict             : config.strict,
      _with              : config._with || false,
      localsName         : config.localsName,
      rmWhitespace       : config.rmWhitespace,
      escape             : config.escape,
      outputFunctionName : config.outputFunctionName ,
      async              : false,
    });

    return compiled;
  }
}

module.exports = EJSAsset;
