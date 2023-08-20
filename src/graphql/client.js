import {useApolloClient} from "@vue/apollo-composable";

const { resolveClient } = useApolloClient()
const client = resolveClient()

export default client