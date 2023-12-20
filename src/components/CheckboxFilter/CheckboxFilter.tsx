import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import './CheckboxFilter.css';
import { useAppDispatch, useAppSelector } from '../../hooks.ts/redux';
import { setParams, setNum, setRange, setEmotions } from '../.././store/reducers/FilterSlice';
import { fetchData } from '../.././store/reducers/ActionCreators';

const optionsBaseEmo = [
    { label: 'Радость', value: 'Радость' },
    { label: 'Доверие', value: 'Доверие' },
    { label: 'Страх', value: 'Страх' },
    { label: 'Удивление', value: 'Удивление' },
    { label: 'Печаль', value: 'Печаль' },
    { label: 'Брезгливость', value: 'Брезгливость' },
    { label: 'Гнев', value: 'Гнев' },
    { label: 'Ожидание', value: 'Ожидание' }
];

const optionsAffectEmo = [
    { label: 'Экстаз', value: 'Экстаз' },
    { label: 'Восхищение', value: 'Восхищение' },
    { label: 'Ужас', value: 'Ужас' },
    { label: 'Изумление', value: 'Изумление' },
    { label: 'Горе', value: 'Горе' },
    { label: 'Отвращение', value: 'Отвращение' },
    { label: 'Ярость', value: 'Ярость' },
    { label: 'Бдительность', value: 'Бдительность' },
    { label: 'Спокойствие', value: 'Спокойствие' },
    { label: 'Признание', value: 'Признание' },
    { label: 'Опасение', value: 'Опасение' },
    { label: 'Отвлечение', value: 'Отвлечение' },
    { label: 'Задумчивочть', value: 'Задумчивочть' },
    { label: 'Скука', value: 'Скука' },
    { label: 'Досада', value: 'Досада' },
    { label: 'Интерес', value: 'Интерес' }
];

const optionsComplexEmo = [
    { label: 'Оптимизм', value: 'Оптимизм' },
    { label: 'Любовь', value: 'Любовь' },
    { label: 'Подчинение', value: 'Подчинение' },
    { label: 'Трепет', value: 'Трепет' },
    { label: 'Неодобрение', value: 'Неодобрение' },
    { label: 'Сожаление', value: 'Сожаление' },
    { label: 'Презрение', value: 'Презрение' },
    { label: 'Агрессия', value: 'Агрессия' },
];


function CheckboxFilter() {

    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(state => state.filterReducer);
    const { data } = useAppSelector(state => state.filterReducer);

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        dispatch(setEmotions(checkedValues as string[]));
    };

    useEffect(() => {
        dispatch(fetchData(filter.num, filter.minVary, filter.maxVary, filter.emotions));
    }, [filter.emotions]);

    return (
        <>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4>Базовые</h4>
                        <span className='checkbox-wrapper'>
                            {optionsBaseEmo.map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>

                    <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4>Аффекты</h4>
                        <span className='checkbox-wrapper'>
                            {optionsAffectEmo.slice(0, 8).map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>
                    <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4>Приглушенные</h4>
                        <span className='checkbox-wrapper'>
                            {optionsAffectEmo.slice(-8).map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>
                    <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4>Составные</h4>
                        <span className='checkbox-wrapper'>
                            {optionsComplexEmo.map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>

                </Row>
            </Checkbox.Group>
        </>
    )
};

export default CheckboxFilter;