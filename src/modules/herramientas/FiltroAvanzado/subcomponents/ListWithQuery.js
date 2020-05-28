import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { ListBox } from 'primereact/listbox';

const StyledListBox = styled(ListBox)`
    width: 100%;
`;

const getProperty = (obj, route) => {
    const props = route.split(".");
    return props.reduce((acc = {}, currVal) => acc[currVal], obj);
}

export default ({ query, valuesProperty, name, value, onChange }) => {

    return (
        <Query
            query={query}
        >
            {({ data, loading, error }) => {

                let values = [];
                if (data) values = getProperty(data, valuesProperty) || [];

                return (
                    <StyledListBox
                        listStyle={{ maxHeight: '80px' }}
                        disabled={loading || error}
                        options={values}
                        optionLabel="nombre"
                        multiple={true}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                )
            }}
        </Query>
    )
}