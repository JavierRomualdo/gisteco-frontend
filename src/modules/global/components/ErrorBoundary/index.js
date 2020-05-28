import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className='p-2'>
                    <p className='text-danger font-weight-bold'>Un error ocurrió! <i className="fas fa-exclamation-triangle ml-2"></i></p>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        {/*this.state.errorInfo.componentStack*/}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}