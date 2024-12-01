import type {MetaFunction} from "@remix-run/cloudflare";
import * as styles from "../styles.css";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    return (
        <div className={styles.container}>
            [under construction]
        </div>
    );
}
