import { useHistory } from "react-router";
import { Link } from "react-router-dom";

type Props = {
	url?: string;
};

export default function Logo(props: Props) {
	const history = useHistory();

	return (
		<div className="h-full flex justify-center items-end">
			{props.url && (
				<Link
					to={{
						pathname: props.url,
						state: { prevPath: history.location.pathname },
					}}
				>
					<img src="/assets/logo.svg" />
				</Link>
			)}

			{!props.url && <img src="/assets/logo.svg" />}
		</div>
	);
}
