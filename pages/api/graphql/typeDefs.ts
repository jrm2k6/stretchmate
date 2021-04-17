import { gql } from 'apollo-server-micro'

export default gql`
enum AssetType {
    image
    video
}

type Step {
    uuid: ID!
    order: Int!
    description: String
    duration: Int
    assetUrl: String
    assetType: AssetType
    stretchUuid: String!
}

type Stretch {
    uuid: ID!
    name: String
    steps: [Step]!
}

type StretchSession {
    stretches: [Stretch]
    numStretches: Int
}

type Query {
    stretches: [Stretch]
    session(numStretches: Int): [Stretch]
}`