import assert from 'node:assert/strict'
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)

const braces = require('braces')
assert.deepEqual(braces('{a,b}'), ['(a|b)'])
assert.deepEqual(braces('{1..3}', {expand: true}), ['1', '2', '3'])

const deeplyNested = '{'.repeat(101) + 'x' + '}'.repeat(101)
assert.throws(
  () => braces(deeplyNested),
  (error) => error instanceof SyntaxError && /nesting depth/.test(error.message),
)

const frameworks = require('@vercel/frameworks/dist/read-config-file')
const directory = await mkdtemp(join(tmpdir(), 'd-nine-vendor-security-'))

try {
  const yamlPath = join(directory, 'fixture.yaml')
  const tomlPath = join(directory, 'fixture.toml')
  await writeFile(yamlPath, 'service:\n  enabled: true\n')
  await writeFile(tomlPath, '[service]\nenabled = true\n')

  assert.deepEqual(await frameworks.readConfigFile(yamlPath), {
    service: {enabled: true},
  })
  const toml = await frameworks.readConfigFile(tomlPath)
  assert.equal(toml.service.enabled, true)
} finally {
  await rm(directory, {recursive: true, force: true})
}

const {typeid} = require('typeid-js')
const generated = typeid('security')
assert.equal(generated.getType(), 'security')
assert.match(generated.toString(), /^security_[0-9a-hjkmnp-tv-z]{26}$/)

const packageVersion = async (name) => {
  const packageJson = new URL(`../node_modules/${name}/package.json`, import.meta.url)
  return JSON.parse(await readFile(packageJson, 'utf8')).version
}

assert.equal(await packageVersion('js-yaml'), '4.3.2')
assert.equal(await packageVersion('smol-toml'), '1.9.1')
assert.equal(await packageVersion('uuid'), '11.1.1')
assert.equal(await packageVersion('braces'), '3.0.4')

console.log('Vendored dependency security checks passed.')
