import { optionsBaseEmo, optionsAffectEmo, optionsComplexEmo } from '../../config/checkboxConfig'
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setEmotions } from '../.././store/reducers/FilterSlice';
import { fetchData } from '../.././store/reducers/ActionCreators';
import React, { useEffect } from 'react';
import { Checkbox, Col, Row } from 'antd';
import './CheckboxFilter.css';


function CheckboxFilter() {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(state => state.filterReducer);

    const onChange = (checkedValues: CheckboxValueType[]) => {
        dispatch(setEmotions(checkedValues as string[]));
    };

    useEffect(() => {
        dispatch(fetchData(filter.num, filter.minVary, filter.maxVary, filter.emotions));
    }, [filter.emotions]);

    return (
        <>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
                        <h4>Базовые</h4>
                        <span className='checkbox-wrapper'>
                            {optionsBaseEmo.map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
                        <h4>Аффекты</h4>
                        <span className='checkbox-wrapper'>
                            {optionsAffectEmo.slice(0, 8).map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
                        <h4>Приглушенные</h4>
                        <span className='checkbox-wrapper'>
                            {optionsAffectEmo.slice(-8).map(emo => <Checkbox value={emo.value}>{emo.label}</Checkbox>)}
                        </span>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', marginRight: 25 }}>
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