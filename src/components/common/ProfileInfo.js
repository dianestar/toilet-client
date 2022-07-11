import { useSelector } from 'react-redux';
import styles from '../../styles/components/ProfileInfo.module.scss';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';

const ProfileInfo = ({
	onClick,
	isPhoto,
	editImg,
	modify,
	imgUrl,
	imageInputRef,
}) => {
	const user = useSelector((state) => state.profileInfo);

	return (
		<div className={styles.profile}>
			<div className={styles.img}>
				<img src={imgUrl} alt="profile" onClick={onClick} />
				{isPhoto ? (
					<OpenPhoto className={styles.photo} onClick={editImg} />
				) : null}
			</div>
			{modify ? (
				<div className={styles.modify}>
					<input
						id="image-input"
						type="file"
						accept="image/*"
						ref={imageInputRef}
					/>
				</div>
			) : null}

			<h2>{user.nickname}</h2>
			<p>{user.email}</p>
		</div>
	);
};

export default ProfileInfo;
