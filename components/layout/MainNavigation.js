import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
	return (
		<header className={classes.header}>
			<Link href='/' className={classes.logo}>
				Poland 🏙
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/new-city'>Add New City</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
