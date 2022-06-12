import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import ProfileInfo from '../../components/common/ProfileInfo';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { useDispatch } from 'react-redux';

const AccountInfo = () => {
	const dispatch = useDispatch();
	return (
		<Layout>
			<section>
				<article>
					<Header />
					<ProfileInfo />
					<div>
						<p>
							닉네임 <span></span>
						</p>
						<Edit />
					</div>
				</article>
			</section>
		</Layout>
	);
};

export default AccountInfo;
