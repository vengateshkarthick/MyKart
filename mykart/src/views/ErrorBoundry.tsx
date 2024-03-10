import * as React from 'react';
import Button from '../components/Button';

function RefreshPage() {
  return (
    <div className="flex flex-col items-start justify-start gap-4 p-16">
      <h1 className="text-3xl font-semibold">Oops!!</h1>
      <h3 className="text-lg ">Something went wrong</h3>
      <h3 className="text-base text-gray-700">Please reload the page.⚒️ </h3>
      <Button code="primary" variant="filled" className="w-52" onClick={() => window.location.reload()} label="Reload" />
    </div>
  );
}


class ErroBoundary extends React.Component {
    constructor(props:any) {
    super(props);
      this.state = { errorOccurred: false };
    }

    componentDidCatch(): void {
      this.setState({ errorOccurred: false });
    }

    render(): React.ReactNode {
        return (
            //@ts-ignore
            this.state?.errorOccurred  ? <RefreshPage /> : this.props.children
        )
    }

}

export default ErroBoundary;
