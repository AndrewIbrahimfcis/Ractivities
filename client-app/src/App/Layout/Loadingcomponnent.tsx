import { Dimmer, Loader } from "semantic-ui-react";
interface props {
    inverted?: boolean
    content?: string
}
export default function Loadingcomponent({ inverted = true, content = 'loading...' }: props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}