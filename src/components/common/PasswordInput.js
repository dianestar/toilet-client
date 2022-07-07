import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeUnprotected } from '../../assets/icons/eyeUnprotected.svg';
import styles from '../../styles/components/input.module.scss';

const PasswordInput = ({ withCheck = false, text, text2, exist, setError }) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();
	const [pwProtected, setPwProtected] = useState(true);
	const [pwcheckProtected, setPwcheckProtected] = useState(true);
	const [existProtected, setExistProtected] = useState(true);

	const [writingPw, setWritingPw] = useState(false);
	const [writingPwcheck, setWritingPwcheck] = useState(false);
	const [writingExist, setWritingExist] = useState(false);
	const onChangePw = (e) => {
		if (setError) { setError(false); }
		
		if (e.target.value !== '') {
			setWritingPw(true);
		} else {
			setWritingPw(false);
		}
	};
	const onChangePwcheck = (e) => {
		if (setError) { setError(false); }

		if (e.target.value !== '') {
			setWritingPwcheck(true);
		} else {
			setWritingPwcheck(false);
		}
	};

	const onChangeExist = (e) => {
		if (setError) { setError(false); }
		
		if (e.target.value !== '') {
			setWritingExist(true);
		} else {
			setWritingExist(false);
		}
	};

	return (
		<>
			{exist ? (
				<>
					<div className={styles[`form-input-div`]}>
						<label
							className={`${styles.placeholder} ${
								writingExist && styles.moved
							}`}
						>
							기존 비밀번호
						</label>
						<input
							autoComplete="off"
							className={`${styles[`form-input`]} ${
								writingExist && styles.writing
							} ${errors.pw && styles.error}`}
							type={existProtected ? 'password' : 'text'}
							{...register('exist', {
								required: {
									value: true,
									message: '기존 비밀번호를 입력해주세요',
									pattern: {
										value:
											/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
										message:
											'비밀번호는 숫자,영문자,특수문자를 포함하여 8자리 이상입니다',
									},
								},

								onChange: onChangeExist,
							})}
						/>
						{existProtected ? (
							<Eye
								className={styles[`form-eye`]}
								onClick={() => setExistProtected(!existProtected)}
							/>
						) : (
							<EyeUnprotected
								className={styles[`form-eye`]}
								onClick={() => setExistProtected(!existProtected)}
							/>
						)}
					</div>
					{errors.pw && <FormErrorMessage message={errors.pw.message} />}
				</>
			) : (
				''
			)}
			<div className={styles[`form-input-div`]}>
				<label className={`${styles.placeholder} ${writingPw && styles.moved}`}>
					{text}
				</label>
				<input
					autoComplete="off"
					className={`${styles[`form-input`]} ${writingPw && styles.writing} ${
						errors.pw && styles.error
					}`}
					type={pwProtected ? 'password' : 'text'}
					{...register('pw', {
						required: {
							value: true,
							message: '비밀번호를 입력해주세요',
						},
						pattern: {
							value:
								/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
							message:
								'비밀번호는 숫자,영문자,특수문자를 포함하여 8자리 이상입니다',
						},
						onChange: onChangePw,
					})}
				/>
				{pwProtected ? (
					<Eye
						className={styles[`form-eye`]}
						onClick={() => setPwProtected(!pwProtected)}
					/>
				) : (
					<EyeUnprotected
						className={styles[`form-eye`]}
						onClick={() => setPwProtected(!pwProtected)}
					/>
				)}
			</div>
			{errors.pw && <FormErrorMessage message={errors.pw.message} />}
			{withCheck && (
				<>
					<div className={styles[`form-input-div`]}>
						<label
							className={`${styles.placeholder} ${
								writingPwcheck && styles.moved
							}`}
						>
							{text2}
						</label>
						<input
							autoComplete="off"
							className={`${styles[`form-input`]} ${
								writingPwcheck && styles.writing
							} ${errors.pwcheck && styles.error}`}
							type={pwcheckProtected ? 'password' : 'text'}
							{...register('pwcheck', {
								required: {
									value: true,
									message: '비밀번호 확인을 입력해주세요',
								},
								validate: (value) =>
									value === watch('pw') || '비밀번호가 일치하지 않습니다',
								onChange: onChangePwcheck,
							})}
						/>
						{pwcheckProtected ? (
							<Eye
								className={styles[`form-eye`]}
								onClick={() => setPwcheckProtected(!pwcheckProtected)}
							/>
						) : (
							<EyeUnprotected
								className={styles[`form-eye`]}
								onClick={() => setPwcheckProtected(!pwcheckProtected)}
							/>
						)}
					</div>
					{errors.pwcheck && (
						<FormErrorMessage message={errors.pwcheck.message} />
					)}
				</>
			)}
		</>
	);
};

export default PasswordInput;
