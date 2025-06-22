import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, SyntheticEvent, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';
import { Separator } from 'src/ui/separator';
import { clsx } from 'clsx';

type ArticleParamsFormProps = {
	onApplyParams: (paramsState: ArticleStateType) => void;
	onResetParams: () => void;
	initState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApplyParams,
	onResetParams,
	initState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef(null);

	const [paramsState, setParamsState] = useState<ArticleStateType>(initState);

	const toggleOpenBtn = () => {
		setIsOpen(!isOpen);
	};

	const handleInputChange = (inputName: string) => (option: OptionType) => {
		setParamsState({ ...paramsState, [inputName]: option });
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onApplyParams(paramsState);
	};

	const handleReset = () => {
		onResetParams();
		setParamsState(initState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpenBtn} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={paramsState.fontFamilyOption ?? {}}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleInputChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontsize'
						options={fontSizeOptions}
						selected={paramsState.fontSizeOption ?? {}}
						title='Размер шрифта'
						onChange={handleInputChange('fontSizeOption')}
					/>
					<Select
						selected={paramsState.fontColor ?? {}}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleInputChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={paramsState.backgroundColor ?? {}}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleInputChange('backgroundColor')}
					/>
					<Select
						selected={paramsState.contentWidth ?? {}}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleInputChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
