import { useSelector } from 'react-redux';
import styles from '../../styles/components/ProfileInfo.module.scss';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';

const ProfileInfo = ({ onClick, isPhoto, editImg }) => {
	const user = useSelector((state) => state.profileInfo);

	return (
		<div className={styles.profile}>
			<div className={styles.img}>
				<img src={user.imgUrl} alt="profile" onClick={onClick} />
				{isPhoto ? (
					<OpenPhoto className={styles.photo} onClick={editImg} />
				) : null}
			</div>
			<h2>{user.nickname}</h2>
			<p>{user.email}</p>
		</div>
	);
};

export default ProfileInfo;
