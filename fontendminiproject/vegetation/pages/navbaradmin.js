import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Nav.module.css";
const Navbar = () => {
    const router = useRouter();
  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <div>
          <Link href="/">
            <a className={styles.link_a}>Vegetation</a>
          </Link>
        </div>

        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search{""}
          </button>
          <button class="btn btn-outline-success" type="submit" >
          <Link href="/order" >Order</Link> 
          </button>
          <button class="btn btn-outline-success" type="submit">
              <Link href="/admin" >Admin</Link> 
          </button>
        </form>
      </div>
    </nav>
  );
};
export default Navbar;
