import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
    const { bold, home, main } = styles;
    return (
        <div className={main}>
            <p className={bold}>404</p>
            <p>Sorry, we couldn't find that page :(</p>
            <p>If you want, you can go back to the <Link className={home} to="/">main page</Link>.
            </p>
        </div>
    );
};

export default NotFound;