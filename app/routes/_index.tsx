import type {MetaFunction} from "@remix-run/cloudflare";
import * as styles from "../styles.css";
import {Link} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    return (
        <div className={styles.wrapper}>
          <Link to={'/play'}>
            <button type="button">play</button>
          </Link>
        </div>
    );
}
