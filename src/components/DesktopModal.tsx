type Props = {
	children: any;
};

export default function DesktopModal(props: Props) {
	return (
		<div className="fixed z-20 min-w-full min-h-screen flex items-center justify-center bg-black/50">
			<div className="max-w-lg w-full shadow-xl rounded-2xl bg-white">
				{props.children}
			</div>
		</div>
	);
}
