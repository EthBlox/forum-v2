const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default
const KeyDidResolver = require('key-did-resolver').default
const { Resolver } = require('did-resolver')
const { DID } = require('dids')
const fromString = require('uint8arrays/from-string')
require('dotenv/config');

const CERAMIC_URL = 'http://localhost:7007'

const ProfileSchema = {
    "type": "object",
    "title": "Profile",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
      "name": {
        "type": "string",
        "title": "name",
        "maxLength": 150
      },
      "email": {
        "type": "string",
        "title": "email",
        "maxLength": 150
      }
    }
  }


async function run() {
    // The seed must be provided as an environment variable
    const seed = fromString(process.env.SEED, 'base16')
    console.log("Created seed", seed);
        // Connect to the local Ceramic node
    const ceramic = new Ceramic(CERAMIC_URL)
        // Provide the DID Resolver and Provider to Ceramic
    const resolver = new Resolver({
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic)
    })
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver })
    await ceramic.setDID(did)
        // Authenticate the Ceramic instance with the provider
    await ceramic.did.authenticate()


    // Publish the two schemas
    const [profile] = await Promise.all([
        publishSchema(ceramic, { content: ProfileSchema })
    ])

    console.log("Profile Schema", profile);


    // Create the definition using the created schema ID
    const profileDefinition = await createDefinition(ceramic, {
        name: 'Profile',
        description: 'Profile Schema',
        schema: profile.commitId.toUrl(),
      })

    // Write config to JSON file
    const config = {
        definitions: {
          profile: profileDefinition.id.toString(),
        },
        schemas: {
          profile: profile.commitId.toUrl(),
        },
      }

      
    await writeFile('./src/config.json', JSON.stringify(config))

    console.log('Config written to src/config.json file:', config)
    process.exit(0)
}

run().catch(console.error)