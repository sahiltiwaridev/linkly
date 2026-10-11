const { withAppBuildGradle } = require("@expo/config-plugins");

const LOADER = `
def keystoreProps = new Properties()
def keystoreFile = rootProject.file("../keystore.properties")
if (keystoreFile.exists()) {
    keystoreProps.load(new FileInputStream(keystoreFile))
}
`;

const RELEASE_SIGNING = `signingConfigs {
        release {
            if (keystoreProps['storeFile']) {
                storeFile rootProject.file("../" + keystoreProps['storeFile'])
                storePassword keystoreProps['storePassword']
                keyAlias keystoreProps['keyAlias']
                keyPassword keystoreProps['keyPassword']
            }
        }`;

module.exports = (config) =>
  withAppBuildGradle(config, (cfg) => {
    let g = cfg.modResults.contents;
    if (!g.includes("keystoreProps")) {
      g = g.replace(/^android\s*\{/m, `${LOADER}\nandroid {`);
      g = g.replace(/signingConfigs\s*\{/, RELEASE_SIGNING);
      g = g.replace(
        /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/,
        "$1signingConfig signingConfigs.release"
      );
    }
    cfg.modResults.contents = g;
    return cfg;
  });