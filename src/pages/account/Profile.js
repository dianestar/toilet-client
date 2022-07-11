import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import MenuList from '../../components/common/MenuList';
import ProfileInfo from '../../components/common/ProfileInfo';

const Profile = () => {
	const menuList = [
		{ text: '계정 정보 관리', url: 'account/account_info' },
		{ text: '리뷰 관리', url: 'my_review' },
		{ text: '개인정보 이용', url: '' },
		{ text: '오픈소스 라이선스', url: '' },
	];
	return (
		<Layout>
			<section>
				<article>
					<Header type="hamburger" text="프로필" />
					<ProfileInfo />
					{menuList.map((menu) => {
						return <MenuList key={menu.text} text={menu.text} url={menu.url} />;
					})}
				</article>
			</section>
		</Layout>
	);
};

export default Profile;
