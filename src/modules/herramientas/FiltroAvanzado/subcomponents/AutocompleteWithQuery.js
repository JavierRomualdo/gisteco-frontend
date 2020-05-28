import React, { useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import { Query } from 'react-apollo';

const getProperty = (obj, route) => {
    const props = route.split(".");
    return props.reduce((acc = {}, currVal) => acc[currVal], obj);
}

const XAutocomplete = ({ options, ...otherACProperties }) => {

    const [sugerencias, setSugerencias] = useState([]);

    function handleComplete(e) {
        const sugs = options.filter((o) => o.nombre.toLowerCase().includes(e.query.toLowerCase()));
        setSugerencias(sugs);
    }

    return (
        <div className="p-fluid">
            <AutoComplete
                field={"nombre"}
                multiple={true}
                dropdown={true}
                minLength={0}
                {...otherACProperties}
                suggestions={sugerencias}
                completeMethod={handleComplete}
            />
        </div>
    );
}

export default ({ query, variables = {}, valuesProperty, ...otherACProperties }) => {

    return (
        <Query
            query={query}
            variables={variables}
        >
            {({ data, loading, error }) => {
                let values = [];
                if (data) values = getProperty(data, valuesProperty) || [];
                return (
                    <XAutocomplete
                        options={values}
                        disabled={loading || error}
                        {...otherACProperties}
                    />
                );
            }}
        </Query>
    );
}