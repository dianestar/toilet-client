import { useSelector } from 'react-redux';
import styles from '../../styles/components/ProfileInfo.module.scss';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';

const ProfileInfo = ({
	onClick,
	isPhoto,
	editImg,
	modify,
	imageInputRef,
	onChangeImage,
	onCancelImage,
	editMode,
	onConfirmImage,
}) => {
	const user = useSelector((state) => state.profileInfo);

	return (
		<div className={styles.profile}>
			<div className={styles.img}>
				{modify ? (
					<>
						<label htmlFor="image-input">
							<img src={user.imgUrl} alt="profile" />
							<OpenPhoto className={styles.photo} />
						</label>
						<input
							id="image-input"
							type="file"
							accept="image/*"
							ref={imageInputRef}
							onChange={onChangeImage}
							className={styles.hidden}
						/>
					</>
				) : (
					<>
						<label htmlFor="image-input">
							<img src={user.imgUrl} alt="profile" onClick={onClick} />
							{isPhoto ? (
								<OpenPhoto className={styles.photo} onClick={editImg} />
							) : null}
						</label>
					</>
				)}
			</div>

			{editMode ? (
				<div>
					<div className={styles.edit}>
						<button className={styles.cancel} onClick={onCancelImage}>
							취소
						</button>
						<button className={styles.confirm} onClick={onConfirmImage}>
							완료
						</button>
					</div>
				</div>
			) : (
				<>
					<h2>{user.nickname}</h2>
					<p>{user.email}</p>
				</>
			)}
		</div>
	);
};

export default ProfileInfo;
