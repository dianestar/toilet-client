import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';
import styles from '../../styles/components/input.module.scss';

const EmailInput = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const [writing, setWriting] = useState(false);

	const onChange = (e) => {
		if (e.target.value !== '') {
			setWriting(true);
		} else {
			setWriting(false);
		}
	};

	return (
		<>
			<div className={styles[`form-input-div`]}>
				<label className={`${styles.placeholder} ${writing && styles.moved}`}>
					이메일
				</label>
				<input
					autoComplete="off"
					className={`${styles[`form-input`]} ${writing && styles.writing} ${
						errors.email && styles.error
					}`}
					{...register('email', {
						required: {
							value: true,
							message: '이메일을 입력해주세요',
						},
						pattern: {
							value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i,
							message: '올바르지 않은 형식의 이메일 입니다',
						},
						onChange: onChange,
					})}
				/>
			</div>
			{errors.email && <FormErrorMessage message={errors.email.message} />}
		</>
	);
};

export default EmailInput;
