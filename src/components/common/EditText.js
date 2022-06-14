import { useNavigate } from 'react-router';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import styles from '../../styles/components/editText.module.scss';

const EditText = ({ title, contents, isIcon, isPassword, path }) => {
	const navigate = useNavigate();
	return (
		<div className={styles.eidt}>
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.contents}>{contents}</p>
				{isPassword ? <p className={styles.password}>••••••••</p> : null}
			</div>
			{isIcon ? (
				<Edit
					onClick={() => {
						navigate(`${path}`);
					}}
				/>
			) : null}
		</div>
	);
};

export default EditText;
